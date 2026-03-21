# K8s演習1: Nginx + 設定ファイル配信環境

## 難易度
普通（設定ファイルを自分で書く）

## 要件

1. **ConfigMap** `nginx-config` を作成し、以下のキーを持たせる
   - `ENVIRONMENT`: `staging`
   - `MAX_CONNECTIONS`: `100`

2. **Deployment** `nginx-staging` を作成する
   - イメージ: `nginx:latest`
   - レプリカ数: 2
   - 上記ConfigMapを環境変数として読み込む

3. **Service** `nginx-staging-service` を作成する
   - NodePort
   - ポート: 80

4. **NetworkPolicy** を作成し、`nginx-staging` Podへの通信を同じnamespace内のPodからのみ許可する

## 成果物
- `configmap.yaml`
- `deployment.yaml`
- `service.yaml`
- `network-policy.yaml`

## 学んだこと
- Serviceのport（ClusterIP側）とNodePortは別物。要件の「ポート80」はClusterIP側の指定
- NetworkPolicyのpodSelectorはPodの実際のラベルと一致させる必要がある
- NetworkPolicyのテンプレートがないと詰まる → templates/networkpolicy.yaml を追加
