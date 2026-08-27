#!/bin/bash
# scripts/start-cluster.sh
set -e
export AWS_PAGER=""

# .envから変数を読み込む
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/.env"

echo "Starting EC2 inst<D-b>ances..."
aws ec2 start-instances --instance-ids "${CONTROL_PLANE_ID}" "${WORKER_ID}"

echo "Waiting for instances to be running..."
aws ec2 wait instance-running --instance-ids "${CONTROL_PLANE_ID}" "${WORKER_ID}"

echo "Fetching public IPs..."
aws ec2 describe-instances \
  --instance-ids "${CONTROL_PLANE_ID}" "${WORKER_ID}" \
  --query "Reservations[].Instances[].[Tags[?Key=='Name'].Value|[0],PublicIpAddress]" \
  --output table

echo "Updating security group with current IP..."
MY_IP=$(curl -s -4 ifconfig.me)
aws ec2 authorize-security-group-ingress \
  --group-id "${SG_ID}" \
  --protocol tcp \
  --port 22 \
  --cidr "${MY_IP}/32" 2>/dev/null || echo "SSH rule may already exist for this IP"

echo "Done. Current IP (${MY_IP}) is now allowed for SSH."
