# GitHub Upload Guide

This guide is for pushing Cap or Fact to GitHub without turning the repo into a messy local dump.

## 1. Create the GitHub repo

Create a new GitHub repository named:

```text
cap-or-fact
```

Recommended settings:

- Public repository.
- Do not add a README on GitHub if this local folder already has one.
- Do not add a `.gitignore` on GitHub if this local folder already has one.
- License can be added later if needed.

## 2. Check the local files

Files that should be included:

- `app/`
- `contracts/`
- `docs/`
- `examples/`
- `.gitignore`
- `package.json`
- `README.md`
- `server.js`
- `server.py`

Files that should stay out:

- `__pycache__/`
- `*.pyc`
- `*.log`
- `.env`
- `node_modules/`
- temporary test files

The `.gitignore` already covers these.

## 3. First push

From the `cap-or-fact` folder:

```text
git init
git add .
git commit -m "Initial Cap or Fact MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cap-or-fact.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## 4. Repo description

Use this short description:

```text
An onchain claim court for crypto rumors, powered by GenLayer receipts and AI judgment.
```

## 5. First public post

Use the demo post in:

```text
docs/demo-post.md
```

Best first proof to show:

```text
Citrea has announced a TGE for a native Citrea token.
```

Studio proof:

```text
0x09845790DE3cF5C5F048C1a9a18B0317526A12f0
```
