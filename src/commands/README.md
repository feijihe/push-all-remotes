#### Feature Description

1. Automatic Remote Detection

   - Dynamically fetches all remote repository names (e.g. origin, upstream) via `git remote` command.
   - No manual specification required, supports any number of remote repositories.

2. Parameter Preservation

   - `-b <branch>`: Specify target branch (default: develop).

   - `-async`: Enable asynchronous push (default: synchronous).

3. Progress Feedback Optimization

   - Sync mode: Sequential pushing with detailed progress.

   - Async mode: Parallel pushing with mixed logs but clear result indicators.

#### Usage Examples

1. Synchronous push to all remotes

```bash
npm run push -b main
```

Sample output:

```bash
[Sync pushing] Updating origin/main...
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
✅ origin/main push successful
[Sync pushing] Updating upstream/main...
...
```

2. Asynchronous push to all remotes

```bash
npm run push -b main -async
```

Sample output:

```bash
[Async pushing] Parallel pushing to remotes: origin, upstream...
✅ origin/main push successful
❌ upstream/main push failed: Permission denied
```

3. Using default branch

```bash
npm run push          # Synchronous push to all remotes (develop branch)
npm run push -async   # Asynchronous push to all remotes (develop branch)
```

#### Error Handling

- No remote repositories configured:

```bash
❌ No remote repositories found. Please add a remote (e.g. git remote add origin <url>).
```

- Any push failure will exit with non-zero status code (process.exit(1)).
