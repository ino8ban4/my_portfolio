#!/bin/bash
# scripts/stop-cluster.sh
set -e
export AWS_PAGER=""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/.env"

echo "Stopping EC2 instances..."
aws ec2 stop-instances --instance-ids "${CONTROL_PLANE_ID}" "${WORKER_ID}"

echo "Waiting for instances to stop..."
aws ec2 wait instance-stopped --instance-ids "${CONTROL_PLANE_ID}" "${WORKER_ID}"

echo "Done. Instances are stopped."
