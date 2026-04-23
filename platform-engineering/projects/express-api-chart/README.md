# express-api-chart

Helm chart for deploying Express API to Kubernetes with dev/prod environment support.

## Overview

This chart deploys a Node.js Express API with environment-specific configuration.
ConfigMaps, Secrets, and NetworkPolicy are all managed within this chart.

## Prerequisites

- Kubernetes 1.20+
- Helm 3.0+
- Calico CNI（NetworkPolicy適用に必要）
- minikube (for local development)

## Installation

### Dev environment
```bash
helm upgrade --install express-api . -f values.yaml -f values-dev.yaml -n dev
```

### Prod environment
```bash
helm upgrade --install express-api . -f values.yaml -f values-prod.yaml -n prod
```

## Values

| Parameter        | Description                    | Default            |
|------------------|--------------------------------|--------------------|
| replicaCount     | Number of replicas             | 1                  |
| image.repository | Container image name           | express-api        |
| image.tag        | Container image tag            | sha-xxxxxxx        |
| image.pullPolicy | Image pull policy              | Always             |
| service.type     | Kubernetes Service type        | NodePort           |
| service.port     | Application port               | 3000               |
| configMapName    | Name of the ConfigMap to mount | express-config-dev |
| secretName       | Name of the Secret to mount    | express-secret     |

## Resource Naming

All Kubernetes resources are named using `{{ .Release.Name }}` to avoid conflicts between dev and prod deployments.

| Resource      | Name pattern         |
|---------------|----------------------|
| Deployment    | `<release-name>`     |
| Service       | `<release-name>`     |
| NetworkPolicy | `<release-name>`     |

## NetworkPolicy

NetworkPolicyをHelmチャートに組み込み、不要なトラフィックを遮断しています。

- Ingress: port 3000のみ許可
- Egress: DNS（port 53）のみ許可

## Uninstall
```bash
helm uninstall express-api -n dev
helm uninstall express-api -n prod
```
