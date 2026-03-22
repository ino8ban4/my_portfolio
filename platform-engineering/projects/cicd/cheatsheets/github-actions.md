# GitHub Actions チートシート

## 基本構造
```yaml
name: ワークフロー名（Actionsタブに表示される）

on:           # トリガー（いつ起動するか）
  push:
    branches: [main]

jobs:         # ジョブ（何をするかのグループ）
  job-name:
    runs-on: ubuntu-latest  # 実行環境

    steps:    # 手順（上から順番に実行）
    - name: ステップ名
      uses: actions/checkout@v4
```

---

## トリガー一覧
```yaml
on:
  push:                          # pushされたとき
    branches: [main]             # 対象ブランチを限定
    paths:                       # 対象パスを限定
      - 'src/**'

  pull_request:                  # PRが作成・更新されたとき
    branches: [main]

  workflow_dispatch:             # 手動実行ボタンを追加

  schedule:                      # 定期実行
    - cron: '0 9 * * 1'         # 毎週月曜9時
```

---

## runs-on（実行環境）
```yaml
runs-on: ubuntu-latest    # Ubuntu（最もよく使う）
runs-on: macos-latest     # macOS
runs-on: windows-latest   # Windows
```

---

## よく使うステップ
```yaml
steps:
# リポジトリをチェックアウト（ほぼ必須）
- name: Checkout
  uses: actions/checkout@v4

# Dockerログイン（ghcr.io）
- name: Log in to ghcr.io
  uses: docker/login-action@v3
  with:
    registry: ghcr.io
    username: ${{ github.actor }}
    password: ${{ secrets.GITHUB_TOKEN }}

# Dockerイメージのビルド・プッシュ
- name: Build and push
  uses: docker/build-push-action@v5
  with:
    context: ./app        # Dockerfileのある場所
    push: true
    tags: ghcr.io/user/image:latest

# シェルコマンドを実行
- name: Run tests
  run: |
    npm install
    npm test
```

---

## 変数・コンテキスト
```yaml
${{ github.actor }}            # 実行したユーザー名
${{ github.repository }}       # リポジトリ名（owner/repo）
${{ github.repository_owner }} # オーナー名
${{ github.ref }}              # ブランチ/タグのref（refs/heads/main）
${{ github.sha }}              # コミットSHA
${{ github.event_name }}       # トリガーイベント名（push/pull_request等）
${{ secrets.GITHUB_TOKEN }}    # GitHub自動発行トークン
${{ secrets.MY_SECRET }}       # リポジトリに登録したシークレット
```

---

## GITHUB_TOKEN

GitHubがワークフロー実行時に自動発行する一時トークン。
ワークフロー終了後に自動失効するため、自分で管理する必要がない。
```yaml
permissions:                  # 必要な権限を明示
  contents: read              # リポジトリの読み取り
  packages: write             # ghcr.ioへの書き込み
```

---

## ghcr.io（GitHub Container Registry）

GitHubが提供するDockerイメージの保管場所（レジストリ）。
```
ビルド → ghcr.ioに保管（CI） → K8sがpullして起動（CD）
```

| | Docker Hub | ghcr.io |
|---|---|---|
| 運営 | Docker社 | GitHub |
| 認証 | Docker Hubアカウント | GitHubアカウント |
| GitHub連携 | 別途設定が必要 | GITHUB_TOKENで自動認証 |

---

## イメージタグの自動生成（metadata-action）
```yaml
- uses: docker/metadata-action@v5
  id: meta
  with:
    images: ghcr.io/user/image
    tags: |
      type=sha,prefix=sha-    # sha-56e39c8（コミット追跡用）
      type=ref,event=branch   # main（ブランチ名）
      type=raw,value=latest,enable=${{ github.ref == 'refs/heads/main' }}
```

| タグ種別 | 例 | 用途 |
|---|---|---|
| sha | sha-56e39c8 | どのコミットか追跡・ロールバック用 |
| branch | main | ブランチの最新イメージ |
| latest | latest | 本番最新版 |

---

## ファイル配置ルール
```
.github/             # 固定（変更不可）
  workflows/         # 固定（変更不可）
    ci.yml           # ファイル名は自由
    deploy.yml       # 複数ファイルで役割を分けられる
```

ワークフローの表示名はファイル名ではなく `name:` フィールドで決まる。
