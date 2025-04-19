# push
Push to multiple remote repositories at once

#### Installation and Configuration

1. install package:
```bash
npm install -D push-all-remotes
```

2. add script in `package.json`:
```json
{
  "scripts": {
    "push": "push-all-remotes -b <> -async" // `--branch` default: develop, 
  }
}
```

| Parameter | Description |
| --- | --- |
| `--branch <branch name>` | Specify the target branch, default is `develop`. `--branch` can be replaced with `-b` |
| `-async` | Whether to push asynchronously, the default synchronization push may have mixed logs but clear result indicators |
