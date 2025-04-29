[简体中文](/README_CN.md) | English

#### Installation and Configuration

1. install package:
```bash
npm install -D push-all-remotes
```

2. add script in `package.json`:
```json
{
  "scripts": {
    "push:dev": "push-all-remotes -b develop -async",
    "push": "push-all-remotes"
  }
}
```
you can run the script:
```bash
npm run push:dev
```
or
```bash
npm run push -- -b develop -async
```


| Parameter | Description |
| --- | --- |
| `--branch <branch name>` | Specify the target branch, default is `develop`. `--branch` can be replaced with `-b` |
| `-async` | Whether to push asynchronously, the default synchronization push may have mixed logs but clear result indicators |

![push-successful.png](./assets/push-successful.png)
