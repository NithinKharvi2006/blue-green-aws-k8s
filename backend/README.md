# Backend

Spring Boot REST API for the Blue-Green AWS Kubernetes project.

## Technology

- Java 21
- Spring Boot
- Maven
- Spring Web
- Spring Boot Actuator

## APIs

### Health

GET /api/health

### Products

GET /api/products

GET /api/products/{id}

POST /api/products

### Application Health

GET /actuator/health

## Build

```bash
mvn clean package
