## ArgoCD (minikube, ローカル開発用)

### インストール
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

### 初期管理者パスワードの取得
値は保存せず、都度このコマンドで取得する。

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

ユーザー名: `admin`

### UIへのアクセス(port-forward)
```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

ブラウザで `https://localhost:8080` にアクセス(自己署名証明書のため警告が出るが「アクセスする」で進める)。

### kubectlの接続先について
`kubectl`はカレントディレクトリに依存せず、`~/.kube/config`の`current-context`を見て動作する。
今はminikubeのみ登録されているため意識不要だが、複数クラスタを扱う場合は
`kubectl config get-contexts` / `kubectl config use-context <名前>` で切り替えが必要になる。
