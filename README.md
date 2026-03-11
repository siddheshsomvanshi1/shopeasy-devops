# shopeasy-devops
Production-grade DevOps project - Java microservice deployed on AWS EKS using Jenkins, Docker, Kubernetes, Terraform, CloudWatch and Datadog

🚀 ShopEasy DevOps Project

Production-grade deployment of a Java Spring Boot microservice on AWS EKS using a complete CI/CD pipeline.

## 🏗️ Architecture
```
GitHub → Jenkins → SonarQube → Docker → ECR → Kubernetes(EKS)
                                              ↑
                                    Terraform (Infrastructure)
                                              ↓
                                  CloudWatch + Datadog (Monitoring)
```

## 🛠️ Tools Used

| Category | Tool |
|---|---|
| Source Control | Git + GitHub |
| CI/CD | Jenkins |
| Code Quality | SonarQube |
| Containerization | Docker |
| Container Registry | AWS ECR |
| Orchestration | Kubernetes (AWS EKS) |
| Infrastructure as Code | Terraform |
| Cloud | AWS |
| Monitoring | CloudWatch + Datadog |

## 📁 Project Structure
```
shopeasy-devops/
├── app/               # Java Spring Boot application
├── docker/            # Dockerfile and docker-compose
├── k8s/               # Kubernetes manifests
├── terraform/         # Infrastructure as Code
├── jenkins/           # Jenkinsfile and pipeline configs
├── helm/              # Helm charts
├── scripts/           # Automation bash scripts
├── monitoring/        # CloudWatch and Datadog configs
└── docs/              # Architecture and documentation
```

## 🚦 Pipeline Stages
1. Checkout — Pull code from GitHub
2. Build — Maven clean package
3. Test — JUnit tests
4. SonarQube — Code quality scan
5. Docker Build — Build container image
6. Push to ECR — Push to AWS Container Registry
7. Deploy to EKS — Rolling deployment to Kubernetes
8. Monitor — CloudWatch + Datadog alerts

## 👤 Author
Siddhesh Somvanshi — DevOps & Cloud Study Plan
