# 🛒 ShopEasy: Enterprise-Grade DevOps & Cloud Project

A comprehensive, production-ready e-commerce infrastructure deployment featuring a **React Frontend**, **Spring Boot Backend**, and **MySQL RDS**, orchestrated with **Jenkins**, **Docker**, and **AWS CloudFront**.

---

## 🏗️ Architecture Overview

The application is split into a modern decoupled architecture:
1.  **Frontend**: React.js hosted on **Amazon S3** and served via **AWS CloudFront (CDN)** for global low-latency delivery.
2.  **Backend**: Java Spring Boot microservice running in **Docker** containers on **AWS EC2** (evolving to ALB/ASG and EKS).
3.  **Database**: **Amazon RDS (MySQL)** for managed, high-availability data storage.
4.  **CI/CD**: **Jenkins** pipeline automating builds, security scans, and multi-origin deployments.
5.  **Monitoring**: **AWS CloudWatch** for system metrics, logs, and SNS-based alerting.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following:
- **AWS Account** (Free Tier eligible).
- **GitHub Account** for source control.
- **Tools installed locally**: Git, AWS CLI, Node.js, Java 21, Maven, Docker.

---

## 🚀 Step-by-Step Setup Guide

### 1. Infrastructure Setup (AWS Console)

#### **A. Database (RDS)**
1.  Go to **RDS** -> **Create Database**.
2.  Select **MySQL**, **Free Tier** template.
3.  **DB Instance Identifier**: `shopeasy-db`.
4.  **Credentials**: Set your username and password (note these down).
5.  **Connectivity**: Allow Public Access (for initial setup) and ensure the Security Group allows **Port 3306**.

#### **B. Container Registry (ECR)**
1.  Go to **ECR** -> **Create Repository**.
2.  **Name**: `shopeasy`.
3.  Note the **Repository URI** (e.g., `420905172627.dkr.ecr.us-east-1.amazonaws.com/shopeasy`).

#### **C. Frontend Hosting (S3 & CloudFront)**
1.  **S3**: Create a bucket named `shopeasy-frontend-static-unique-id`. Uncheck "Block all public access".
2.  **CloudFront**: Create a distribution.
    - **Origin**: Select your S3 bucket.
    - **Origin Access**: Use **Origin Access Control (OAC)** (Recommended).
    - **Default Root Object**: `index.html`.
    - **Behaviors**: (Once backend is up) Add `/products` and `/health` to point to your Backend Load Balancer/EC2.

---

### 2. Code Customization (Where to make changes)

To clone and run this project, you **MUST** update the following values with your own AWS details:

| File Path | Variable to Change | Purpose |
| :--- | :--- | :--- |
| [Jenkinsfile](file:///jenkins/Jenkinsfile) | `AWS_ACCOUNT_ID` | Your 12-digit AWS ID |
| [Jenkinsfile](file:///jenkins/Jenkinsfile) | `S3_BUCKET` | Your unique S3 bucket name |
| [Jenkinsfile](file:///jenkins/Jenkinsfile) | `DB_ENDPOINT` | Your RDS Endpoint URL |
| [Jenkinsfile](file:///jenkins/Jenkinsfile) | `DISTRIBUTION_ID` | Your CloudFront Distribution ID |
| [App.js](file:///frontend/src/App.js) | `BACKEND_URL` | Set to `window.location.origin` for CloudFront Proxy |
| [application.properties](file:///app/src/main/resources/application.properties) | `spring.datasource.url` | Update with your RDS Endpoint |

---

### 3. CI/CD Pipeline (Jenkins)

#### **Installation**
On your Jenkins EC2 instance:
```bash
sudo apt update && sudo apt install openjdk-17-jdk -y
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt update && sudo apt install jenkins -y
```

#### **Pipeline Configuration**
1.  Install Plugins: **Docker**, **AWS Steps**, **Pipeline**, **Maven Integration**.
2.  Add Credentials:
    - `aws-creds`: AWS Access Key & Secret Key.
    - `docker-creds`: DockerHub or ECR credentials.
3.  Create a **Multibranch Pipeline** or **Pipeline** job pointing to your GitHub Repo.

---

### 4. Deployment Commands (Manual/Docker)

#### **Run Backend Locally**
```bash
cd app
mvn clean package
java -jar target/shopeasy-0.0.1-SNAPSHOT.jar \
  --spring.datasource.url=jdbc:mysql://YOUR_RDS_ENDPOINT:3306/shopeasy \
  --spring.datasource.username=admin \
  --spring.datasource.password=your_password
```

#### **Build & Run Docker Container**
```bash
docker build -t shopeasy:latest -f docker/Dockerfile .
docker run -d -p 8080:8080 \
  -e DB_ENDPOINT=your_rds_endpoint \
  -e DB_USERNAME=admin \
  -e DB_PASSWORD=your_password \
  shopeasy:latest
```

---

### 5. Monitoring (CloudWatch)

#### **Install CloudWatch Agent**
```bash
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb
```

#### **Apply Configuration**
Use the provided [amazon-cloudwatch-agent.json](file:///monitoring/cloudwatch/amazon-cloudwatch-agent.json):
```bash
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:monitoring/cloudwatch/amazon-cloudwatch-agent.json -s
```

---

### 6. Kubernetes (EKS) - Future Roadmap
To migrate to Kubernetes, use the manifests in the [k8s/](file:///k8s) folder:
```bash
kubectl apply -f k8s/base/deployment.yaml
kubectl apply -f k8s/base/service.yaml
```

---

## 👤 Author
**Siddhesh Somvanshi**  
*Cloud & DevOps Engineer*

---
*Note: This project is part of a production-grade portfolio. Ensure you delete resources after testing to avoid AWS charges.*
