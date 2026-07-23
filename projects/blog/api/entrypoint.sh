#!/bin/sh

# FIXME: 将来的にconfig毎に判定が必要。SSH設定やdotfiles毎に判定を分ける
# 開発環境でnvimを利用するためnvimディレクトリの有無で判定する。
if [ -d /root/dotfiles/nvim ]; then
  stow -d /root/dotfiles nvim tmux ghostty
  mkdir -p /root/.ssh
  echo "$(cat /root/.ssh_keys/authorized_keys)" >> /root/.ssh/authorized_keys
  chmod 700 /root/.ssh
  chmod 600 /root/.ssh/authorized_keys
  ssh-keygen -A
  echo "cd /workspace" >> /root/.profile
  echo "alias ll='ls -la'" >> /root/.profile
  /usr/sbin/sshd
fi

# CIを実行するにあたって空のnode_modulesがコピーされる為、後続実行である当該スクリプトでnpmをインストールする
npm install
# アプリケーションがDBを接続するために使用するprisma clientを生成
npx prisma generate
# prismaで定義したテーブルをDBに適用する
npx prisma migrate deploy

npm run dev
