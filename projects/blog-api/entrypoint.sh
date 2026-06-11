#!/bin/sh
stow -d /root/dotfiles nvim tmux ghostty
mkdir -p /root/.ssh
echo "$(cat /root/.ssh_keys/authorized_keys)" >> /root/.ssh/authorized_keys
chmod 700 /root/.ssh
chmod 600 /root/.ssh/authorized_keys
ssh-keygen -A
/usr/sbin/sshd
npm run dev
