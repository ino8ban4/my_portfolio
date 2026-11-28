# k8s Secret

本物のSecretは Git に入れません(.gitignore で除外)。`*.example.yaml` が雛形です。

## 使い方
1. 雛形をコピーする: `cp db-secret.example.yaml db-secret.yaml`(api も同様)
2. `CHANGE_ME` を、実際の値に書き換える(正本はパスワードマネージャー)
3. `kubectl apply -f db-secret.yaml -f api-secret.yaml`

## Prune=false の印について
この Secret は ArgoCD の管理対象(app/)の外に置いている。
過去に ArgoCD が管理していた名残で、Git から外した際に ArgoCD が削除しないよう、
`argocd.argoproj.io/sync-options: Prune=false` を付けている。
