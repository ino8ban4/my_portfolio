# 振り返りの対象と弱点

| 日付 | 範囲 | 結果 | 弱点・要復習 |
|---|---|---|---|
| 10/5 | Terraform: stateのリモート管理(S3、lock、バージョニング) | 選択式80% | plan と state の関係(stateが古いと、誤った差分が出る) |
| 10/19 | Terraform: VPC・EC2、依存関係、planの読み方、data、destroyの順序 | 選択式100% | destroyは、作成順の逆ではなく、依存グラフの逆向きで並行 |
| 10/21 | Terraform: variable、tfvars、Budgets | 選択式80% | 変数の宣言と値の違い。tfvarsをgitに入れるかの判断 |
| 10/21 | EKSの準備: ネットワーク、IAM、クラスタ、ノードグループ | 初回40%、再テスト67%、記述は合格 | サブネットとAZ、IGW・ルートテーブル・関連付けの関係、validateの守備範囲 |
| 11/3 | EKS検証: 構築、BlogAPI、名前解決、PV/PVC、破棄 | 選択式80% | 破棄の前にnamespaceを消す理由(Kubernetesが作ったAWSリソースはstateにない) |
| 9月以前 | kubeadm(IPIP・SG)、CD(GHCR)、PV、Terraform基礎 | (別チャットの記録。要補完) | |

## 関連する学習ログ
- docs/learning-logs/2026-09.md、2026-10.md
