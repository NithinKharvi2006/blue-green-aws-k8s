# Blue-Green Deployment on AWS Using Kubernetes (kOps)

## Project Overview

This project demonstrates a complete three-tier application deployment on AWS using Kubernetes and a Blue-Green deployment strategy.

The application consists of:

- React frontend
- Spring Boot backend
- PostgreSQL database

The application is containerized using Docker and deployed to Kubernetes.

kOps is used to create and manage the Kubernetes cluster on AWS.

Jenkins is used to automate the CI/CD process.

## Architecture

```text
User
  |
  v
AWS Load Balancer
  |
  v
Kubernetes Ingress
  |
  +-------------------+
  |                   |
  v                   v
Frontend            Backend
React/Nginx         Spring Boot
                        |
                        v
                    PostgreSQL
