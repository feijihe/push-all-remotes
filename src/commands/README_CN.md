#### 功能说明

1. 自动获取远程仓库

   - 通过 git remote 命令动态获取所有远程仓库名称（如 origin、upstream 等）。

   - 无需手动指定仓库名称，适应任意数量的远程地址。

2. 保留原有参数

   - `-b <branch>`：指定分支（默认 develop）。

   - `-async`：启用异步推送（默认同步）。

3. 进度反馈优化

   - 同步模式：逐个仓库推送，显示完整进度信息。

   - 异步模式：并行推送，日志可能混合但会标注结果。

#### 使用示例

1. 同步推送到所有远程仓库

```bash
npm run push -b main
```

输出示例：

```bash
[Sync pushing] Updating origin/main...
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
✅ origin/main push successful
[Sync pushing] Updating upstream/main...
...
```

2. 异步推送到所有远程仓库

```bash
npm run push -b main -async
```

输出示例：

```bash
[Async pushing] Parallel pushing to remotes: origin, upstream...
✅ origin/main push successful
❌ upstream/main push failed: Permission denied
```

3. 使用默认分支

```bash
npm run push          # 同步推送到所有远程的 develop 分支
npm run push -async   # 异步推送到所有远程的 develop 分支
```

#### 异常处理

- 如果未配置远程仓库，脚本会报错提示：

```bash
❌ No remote repositories found. Please add a remote (e.g. git remote add origin <url>).
```

- 任一推送失败时，脚本会以非零状态码退出（process.exit(1)）。
