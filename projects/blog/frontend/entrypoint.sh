#!/bin/sh

# 開発環境(dotfilesが存在する場合)のみ、SSH/dotfiles環境を構築する。
# CI環境ではdotfilesが存在しないため、このセットアップ自体をスキップする。
if [ -d /root/dotfiles/nvim ]; then
  /scripts/setup-ssh.sh
fi

npm install
npm run dev -- -p 3001 -H 0.0.0.0

