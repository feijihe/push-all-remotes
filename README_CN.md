简体中文 | [English](/README.md)

#### 安装配置

1. 安装依赖
```bash
npm install -D push-all-remotes
```

2. 添加脚本命令到 `package.json` 的 `scripts` 中：
```json
{
  "scripts": {
    "push": "push-all-remotes --branch develop -async"
  }
}
```
你可以运行脚本:
```bash
npm run push:dev
```
or
```bash
npm run push -- -b develop -async
```
or
```bash
npm run push # 默认分支为 `develop`
```



| 参数 | 描述 |
| --- | --- |
| `--branch <分支名>` | 指定目标分支, 默认为 `develop`, `--branch`可换成`-b` |
| `-async` | 是否开启异步推送, 默认为同步推送, 异步推送可能会出现日志混合的情况, 但会标注结果 |


![push-successful.png](./assets/push-successful.png)
