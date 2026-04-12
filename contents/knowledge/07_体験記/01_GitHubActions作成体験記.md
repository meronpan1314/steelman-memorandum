---
title: GitHubActions作成体験記
date: "2026-04-12"
tags: ["githubactions", "体験記"]
---

## 作成内容
Issueを作成すると、自動的にブランチが作成され、PRが作成される。

## 作成手順
### 1. Issueテンプレートを作成する

```md
---
name: Output
about: 新しいアウトプット作成
title: '[Output] '
labels: ''
assignees: ''

---

## 内容

## メモ
- 
```
作成場所：.github/ISSUE_TEMPLATE/output.md

### 2. GitHubActionsを作成する

```yaml
name: Create Output from Issue

on: 
  issues: 
    types: opened

permissions:
  contents: write
  pull-requests: write

jobs:
  create-output:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Confiigure Git
        run: |
          git config user.name "github-actions"
          git config user.email "actions@github.com"

      - name: Create branch
        run: |
          BRANCH_NAME="output-${{ github.event.issue.number }}"
          git checkout -b $BRANCH_NAME

      - name: Create markdown file
        run: |
          TITLE="${{ github.event.issue.title }}"
          FILE_NAME=$(echo "$TITLE" | sed 's/\[Output\] //g' | tr  " " "-" | tr '[:upper:]' '[:lower:]')
          mkdir -p contents/knowledge/misc
          cp 99_template/temp.md contents/knowledge/misc/$FILE_NAME.md

      - name: Commit and Push
        run: |
          ls contents/knowledge/misc
          git add .
          git status
          git commit -m "create: ${{ github.event.issue.title }}"
          git push origin HEAD

      - name: Create PR
        env: 
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          gh pr create \
            --title "${{ github.event.issue.title }}" \
            --body "Issueより自動生成" \
            --base main \
            --head "output-${{ github.event.issue.number }}"
```
作成場所：.github/workflows/create-output.yml

### 3. Issueを作成する

```Issue
[Output] test
```

## 結果

Issueを作成すると、自動的にブランチが作成され、PRが作成される。

## 詰まったところ

- PRを作成するためには、リポジトリの設定で"Pull requests"の権限が必要。
  - Settings > Actions > General > Workflow permissions > Read and write permissions
  - Allow GitHub Actions to create and approve pull requests にもチェックを入れる
- 当初、PR作成にpeter-evans/create-pull-request@v5を使用していたが、処理内でmainブランチにリセットされる問題が発生した。
  - gh pr create に変更することで解消