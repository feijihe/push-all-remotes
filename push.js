#!/usr/bin/env node
/* eslint-disable node/prefer-global/process */
import { exec, execSync } from 'node:child_process'

const args = process.argv.slice(2)

// 解析参数
const branchIndex = args.findIndex(arg => arg === '-b' || arg === '--branch')
const branch = branchIndex !== -1 ? args[branchIndex + 1] : 'develop'
const isAsync = args.includes('-async') // 是否同步执行

// 获取所有远程仓库名称（如 ['origin', 'upstream', 'backup']）
function getRemotes() {
  const output = execSync('git remote').toString().trim()
  return output ? output.split('\n') : []
}

// 同步执行（默认）：顺序推送，显示进度
function pushSync(remotes) {
  for (const remote of remotes) {
    try {
      console.log(`[Sync pushing] Updating ${remote}/${branch}...`)
      execSync(`git push ${remote} ${branch}`, { stdio: 'inherit' })
      console.log('\x1B[32m%s\x1B[0m', `✅ ${remote}/${branch} push successful`)
    }
    catch (error) {
      console.error('\x1B[31m%s\x1B[0m', `❌ ${remote}/${branch} push failed:`, error.message)
      process.exit(1)
    }
  }
}

// 异步执行（需 -async 参数）：并行推送，但进度信息可能不完整
function pushAsync(remotes) {
  console.log(`[Async pushing] Parallel pushing to remotes: ${remotes.join(', ')}...`)

  const promises = remotes.map((remote) => {
    return new Promise((resolve) => {
      const child = exec(`git push ${remote} ${branch}`, (error, stdout, stderr) => {
        if (error) {
          console.error('\x1B[31m%s\x1B[0m', `❌ ${remote}/${branch} push failed:`, stderr || error.message)
          resolve(false)
        }
        else {
          console.log('\x1B[32m%s\x1B[0m', `✅ ${remote}/${branch} push successful`)
          resolve(true)
        }
      })
      // 尝试保留部分进度输出（可能混合）
      child.stdout?.pipe(process.stdout)
      child.stderr?.pipe(process.stderr)
    })
  })

  Promise.all(promises).then((results) => {
    if (results.some(success => !success)) {
      process.exit(1)
    }
  })
}

const remotes = getRemotes()
if (remotes.length === 0) {
  console.error('\x1B[31m%s\x1B[0m', '❌ No remote repositories found. Please add a remote (e.g. git remote add origin <url>).')
  process.exit(1)
}

if (isAsync) {
  pushAsync(remotes) // async push
}
else {
  pushSync(remotes) // sync push
}
