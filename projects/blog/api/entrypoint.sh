#!/bin/sh

# 開発環境(dotfilesが存在する場合)のみ、SSH/dotfiles環境を構築する。
# CI環境ではdotfilesが存在しないため、このセットアップ自体をスキップする。
if [ -d /root/dotfiles/nvim ]; then
  /scripts/setup-ssh.sh
fi

# CIを実行するにあたって空のnode_modulesがコピーされる為、後続実行である当該スクリプトでnpmをインストールする
npm install
# アプリケーションがDBを接続するために使用するprisma clientを生成
npx prisma generate
# prismaで定義したテーブルをDBに適用する
npx prisma migrate deploy

npm run dev

