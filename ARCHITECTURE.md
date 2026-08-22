# Project Architecture

## Three-Tier Architecture

The application consists of three main layers.

### 1. Presentation Layer

React is used to build the frontend.

Nginx serves the production frontend application.

### 2. Application Layer

Spring Boot provides REST APIs.

The backend handles:

- Business logic
- API requests
- Database communication
- Application health checks

### 3. Data Layer

PostgreSQL is used as the database.

The database stores application data.

---

## Overall Architecture

```text
                         Internet
                            |
                            v
                   AWS Load Balancer
                            |
                            v
                   Kubernetes Ingress
                            |
                            v
                   Frontend Service
                            |
                            v
                    React/Nginx Pods
                            |
                            v
                   Backend Service
                            |
                            v
                  Spring Boot Pods
                            |
                            v
                    Database Service
                            |
                            v
                   PostgreSQL Database

## Blue-Green Architecture
                         Users
                           |
                           v
                    Load Balancer
                           |
                           v
                     Kubernetes
                       Service
                           |
                    +------+------+
                    |             |
                    v             v
                  Blue          Green
                   v1             v2
                    |             |
                 Pods           Pods

## CI/CD Architecture
Developer
    |
    v
GitHub
    |
    v
Jenkins
    |
    +---- Maven Build
    |
    +---- Tests
    |
    +---- SonarQube
    |
    +---- Docker Build
    |
    +---- Container Registry
    |
    v
Kubernetes
    |
    +---- Blue
    |
    +---- Green

## AWS and Kubernetes
AWS
 |
 +---- S3
 |      |
 |      +---- kOps Cluster State
 |
 +---- Kubernetes Cluster
        |
        +---- Control Plane
        |
        +---- Worker Nodes
