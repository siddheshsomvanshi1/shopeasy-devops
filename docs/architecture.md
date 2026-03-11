# ShopEasy — Architecture Document

## AWS Infrastructure

- **Region:** us-east-1
- **VPC:** Custom VPC with public and private subnets across 2 AZs
- **Compute:** EKS managed node group (t3.medium)
- **Database:** RDS MySQL in private subnet
- **Storage:** S3 for artifacts, EFS for shared storage
- **Load Balancer:** ALB in public subnet
- **DNS:** Route 53
- **CDN:** CloudFront

## Network Design
```
Internet
    ↓
CloudFront (CDN + SSL termination)
    ↓
Route 53 (DNS routing)
    ↓
ALB (Load Balancer) — public subnet
    ↓
EKS Worker Nodes — private subnet
    ↓
RDS MySQL — private subnet (no internet access)
```

## Security Design
- All app servers in private subnets
- Bastion host for SSH access only
- IAM roles with least privilege
- Security Groups — only required ports open
- KMS encryption for EBS and S3
- Secrets in AWS Secrets Manager

## IAM Roles Created
- shopeasy-ec2-role — for EC2 instances
- shopeasy-jenkins-role — for Jenkins server
- shopeasy-eks-role — for EKS cluster (Day 9)
