# Kubernetes Manifest Templates

Kubernetesマニフェストのテンプレート集

## 📁 ファイル一覧

| ファイル | 用途 | 必須度 |
|---------|------|--------|
| `deployment.yaml` | アプリケーションのPod管理 | ⭐⭐⭐⭐⭐ |
| `service.yaml` | ネットワークアクセス経路 | ⭐⭐⭐⭐⭐ |
| `configmap.yaml` | 設定データ（非機密） | ⭐⭐⭐⭐ |
| `secret.yaml` | 機密データ（パスワード等） | ⭐⭐⭐⭐ |
| `persistentvolume.yaml` | 永続ストレージ（管理者用） | ⭐⭐⭐ |
| `persistentvolumeclaim.yaml` | ストレージ要求（開発者用） | ⭐⭐⭐ |
| `kustomization.yaml` | Kustomize設定 | ⭐⭐⭐⭐⭐ |
| `namespace.yaml` | Namespace定義（オプション） | ⭐⭐ |
| `ingress.yaml` | 外部公開・ルーティング | ⭐⭐⭐ |

---

## 🚀 基本的な使い方

### 1. テンプレートをコピー
```bash
cp templates/deployment.yaml my-app/
cp templates/service.yaml my-app/
cp templates/configmap.yaml my-app/
```

### 2. 置換項目を編集

各ファイル内の `<>` で囲まれた項目を実際の値に置き換え
```yaml
# 置換前
metadata:
  name: <APP_NAME>

# 置換後
metadata:
  name: express-api
```

### 3. 適用
```bash
kubectl apply -f my-app/
```

---

## 📋 主な置換項目

| 項目 | 説明 | 例 |
|------|------|-----|
| `<APP_NAME>` | アプリケーション名 | `express-api`, `nginx-web` |
| `<NAMESPACE>` | Namespace名 | `production`, `development` |
| `<IMAGE>` | Dockerイメージ名 | `node:18-alpine`, `nginx:latest` |
| `<SERVICE_NAME>` | Service名 | `express-api-service` |
| `<CONFIGMAP_NAME>` | ConfigMap名 | `app-config` |
| `<SECRET_NAME>` | Secret名 | `db-credentials` |

---

## 🎯 ユースケース別ガイド

### ケース1: シンプルなWebアプリ

**必要なファイル:**
- `deployment.yaml`
- `service.yaml`
- `configmap.yaml`

**手順:**
```bash
# 1. テンプレートコピー
cp templates/deployment.yaml myapp-deployment.yaml
cp templates/service.yaml myapp-service.yaml
cp templates/configmap.yaml myapp-config.yaml

# 2. 編集（<APP_NAME>等を置換）

# 3. 適用
kubectl apply -f myapp-deployment.yaml
kubectl apply -f myapp-service.yaml
kubectl apply -f myapp-config.yaml
```

---

### ケース2: データベースを含むアプリ

**必要なファイル:**
- `deployment.yaml`
- `service.yaml`
- `configmap.yaml`
- `secret.yaml`（DB認証情報）
- `persistentvolume.yaml`
- `persistentvolumeclaim.yaml`

**手順:**
```bash
# 1. ストレージ準備
kubectl apply -f db-pv.yaml
kubectl apply -f db-pvc.yaml

# 2. 認証情報
kubectl apply -f db-secret.yaml

# 3. アプリデプロイ
kubectl apply -f db-deployment.yaml
kubectl apply -f db-service.yaml
```

---

### ケース3: Kustomizeで環境管理

**ディレクトリ構成:**
```
myapp/
  ├── base/
  │   ├── deployment.yaml
  │   ├── service.yaml
  │   └── kustomization.yaml
  └── overlays/
      ├── dev/
      │   ├── configmap.yaml
      │   └── kustomization.yaml
      └── prod/
          ├── configmap.yaml
          └── kustomization.yaml
```

**手順:**
```bash
# dev環境デプロイ
kubectl apply -k myapp/overlays/dev/

# prod環境デプロイ
kubectl apply -k myapp/overlays/prod/
```

---

## 💡 ベストプラクティス

### ✅ 推奨

- **環境別にNamespace分離**
```yaml
  metadata:
    namespace: production  # dev, staging, prod
```

- **ConfigMapで設定外部化**
```yaml
  # ハードコード ❌
  env:
  - name: LOG_LEVEL
    value: "debug"
  
  # ConfigMap参照 ✅
  envFrom:
  - configMapRef:
      name: app-config
```

- **Secretで機密情報管理**
```yaml
  # 平文 ❌
  DB_PASSWORD: "password123"
  
  # Secret参照 ✅
  env:
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: db-secret
        key: password
```

- **リソース制限設定**
```yaml
  resources:
    requests:
      memory: "128Mi"
      cpu: "100m"
    limits:
      memory: "256Mi"
      cpu: "200m"
```

### ❌ 避けるべき

- Secret/ConfigMapをGitにコミット（機密情報の場合）
- defaultNamespace使用（本番環境）
- リソース制限なし（メモリリーク時に影響拡大）
- rootユーザーでコンテナ実行

---

## 🔧 よくあるトラブルシューティング

### Pod起動しない
```bash
# Pod状態確認
kubectl get pods
kubectl describe pod <POD_NAME>

# ログ確認
kubectl logs <POD_NAME>
```

**よくある原因:**
- イメージが見つからない（ImagePullBackOff）
- ConfigMap/Secretが存在しない
- リソース不足

---

### Serviceに接続できない
```bash
# Service確認
kubectl get service
kubectl describe service <SERVICE_NAME>

# Endpoint確認
kubectl get endpoints <SERVICE_NAME>
```

**チェック項目:**
- Service.selector と Pod.labels が一致しているか
- targetPort と containerPort が一致しているか

---

### PVC が Pending
```bash
# PVC状態確認
kubectl describe pvc <PVC_NAME>
```

**よくある原因:**
- マッチするPVがない
- storageClassName不一致
- accessModes不一致
- 容量不足

---

## 📚 参考リソース

- [Kubernetes公式ドキュメント](https://kubernetes.io/docs/)
- [Kustomize公式](https://kustomize.io/)
- [kubectl チートシート](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

---

## 📝 学習メモ

このテンプレート集は以下の学習を通じて作成:

- Issue #4: Kubernetes環境構築・基礎実践
- Issue #5: Kubernetesマニフェスト作成・Kustomize基礎

**作成日**: 2026年2月-3月  
**目的**: プラットフォームエンジニアリング学習用ポートフォリオ
