#!/bin/sh
stow -d /root/dotfiles nvim tmux ghostty
mkdir -p /root/.ssh
echo "$(cat /root/.ssh_keys/authorized_keys)" >> /root/.ssh/authorized_keys
chmod 700 /root/.ssh
chmod 600 /root/.ssh/authorized_keys
ssh-keygen -A
echo "cd /workspace" >> /root/.profile
echo "alias ll='ls -la'" >> /root/.profile
/usr/sbin/sshd
npm run dev -- -p 3001
