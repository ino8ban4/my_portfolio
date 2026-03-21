# express-api-chart

Helm chart for deploying Express API to Kubernetes with dev/prod environment support.

## Overview

This chart deploys a Node.js Express API with environment-specific configuration managed via external ConfigMaps and Secrets.

## Prerequisites

- Kubernetes 1.20+
- Helm 3.0+
- minikube (for local development)
- ConfigMap and Secret pre-created in the target namespace

## Required Resources

The following resources must exist in the cluster before deploying:

| Kind      | Name (dev)         | Name (prod)         |
|-----------|--------------------|---------------------|
| ConfigMap | express-config-dev | express-config-prod |
| Secret    | express-secret     | express-secret      |

## Installation

### Dev environment
```bash
helm install dev-express-api ./express-api-chart
```

### Prod environment
```bash
helm install prod-express-api ./express-api-chart -f values-prod.yaml
```

## Upgrade
```bash
helm upgrade dev-express-api ./express-api-chart
helm upgrade prod-express-api ./express-api-chart -f values-prod.yaml
```

## Values

| Parameter       | Description                        | Default            |
|-----------------|------------------------------------|--------------------|
| appName         | Application name                   | express-api        |
| replicaCount    | Number of replicas                 | 1                  |
| image.repository| Container image name               | express-api        |
| image.tag       | Container image tag                | v1                 |
| image.pullPolicy| Image pull policy                  | Never              |
| service.type    | Kubernetes Service type            | NodePort           |
| service.port    | Application port                   | 3000               |
| configMapName   | Name of the ConfigMap to mount     | express-config-dev |
| secretName      | Name of the Secret to mount        | express-secret     |

## Resource Naming

All Kubernetes resources are named using `{{ .Release.Name }}` to avoid conflicts between dev and prod deployments in the same namespace.

| Resource   | Name pattern                  | Example                   |
|------------|-------------------------------|---------------------------|
| Deployment | `<release-name>`              | dev-express-api           |
| Service    | `<release-name>-service`      | dev-express-api-service   |

## Ingress

Ingress is managed outside this chart via `k8s-manifests/ingress.yaml`.

| Host                    | Backend                   |
|-------------------------|---------------------------|
| dev.express-api.local   | dev-express-api-service   |
| prod.express-api.local  | prod-express-api-service  |

> **Note:** Ingress via hostname is not accessible on minikube with Docker driver on Mac.
> Use port-forward or `minikube service` for local verification.

## Uninstall
```bash
helm uninstall dev-express-api
helm uninstall prod-express-api
```
