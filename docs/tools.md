# Development Tools

This document describes the tools used in the Blue-Green Deployment project.

## Git

Git is a distributed version control system.

Purpose:
- Track project changes
- Create commits
- Manage branches
- Roll back changes

## GitHub

GitHub stores the Git repository remotely.

Purpose:
- Store source code
- Collaborate
- Maintain project history
- Showcase the project

## Java

Java is used to develop the backend application.

The backend will use Spring Boot.

## Maven

Maven is used to build and manage the Java backend.

Basic lifecycle:

Source Code
    ↓
Compile
    ↓
Test
    ↓
Package
    ↓
JAR

## Docker

Docker packages applications and their dependencies into containers.

Docker will be used to containerize:

- Frontend
- Backend

## kubectl

kubectl is the command-line tool used to communicate with Kubernetes.

Examples:

kubectl get pods
kubectl get nodes
kubectl get services

## AWS CLI

AWS CLI allows us to manage AWS resources from Ubuntu.

Examples:

aws s3 ls
aws ec2 describe-instances
aws sts get-caller-identity

## kOps

kOps is used to create and manage Kubernetes clusters on AWS.

## Terraform

Terraform is an Infrastructure as Code tool.

It can define and manage infrastructure using configuration files.

For this project, kOps will manage the Kubernetes cluster. Terraform will only be used for infrastructure that is explicitly assigned to Terraform.

## Jenkins

Jenkins will be used later to automate the CI/CD pipeline.

## SonarQube

SonarQube will be used later to analyze source code quality and identify bugs, vulnerabilities, and code smells.

## Kubernetes

Kubernetes will be used to deploy, scale, and manage application containers.

## Project Flow

Developer
    ↓
GitHub
    ↓
Jenkins
    ↓
Maven
    ↓
SonarQube
    ↓
Docker
    ↓
Container Registry
    ↓
Kubernetes
    ↓
AWS
