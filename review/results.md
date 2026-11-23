# テスト結果ログ

(日付、範囲、点数、間違えた点を追記していく)

## 11/23 #60 auto-stop(Budgets → SNS → Lambda → EC2停止)
- 範囲: IAM(IDベース/リソースベース)、aws_lambda_permission、condition、(known after apply)、plan と apply
- 点数: 1回目 20%(1/5) → 再テスト 60%(3/5)。80%は未達
- 間違えた点: aws_lambda_permission と実行ロールの混同、「plan が通れば apply も成功する」の誤解
- 方針: 自分でリソースを作る演習で定着させる(演習の中で再テスト)
