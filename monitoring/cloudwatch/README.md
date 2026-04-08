# CloudWatch Monitoring for ShopEasy

This directory contains configuration files for AWS CloudWatch to monitor your Jenkins server and App Server.

## 🚀 Setup Instructions

### 1. IAM Role Permissions
Ensure the IAM roles associated with your EC2 instances (`shopeasy-jenkins-role` and `shopeasy-ec2-role`) have the following managed policy attached:
- `CloudWatchAgentServerPolicy`

### 2. Install CloudWatch Agent
On both **Jenkins Server** (`32.194.172.5`) and **App Server** (`52.205.250.123`), run:

```bash
sudo wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i -E ./amazoncloudwatch-agent.deb
```

### 3. Configure the Agent
Upload the `amazon-cloudwatch-agent.json` file to the servers and run:

```bash
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:./amazon-cloudwatch-agent.json -s
```

### 4. Verify in AWS Console
1.  Go to **CloudWatch** -> **Log Groups**. You should see `syslog`, `jenkins-logs`, and `docker-logs`.
2.  Go to **CloudWatch** -> **Metrics** -> **CWAgent**. You should see metrics for disk and memory usage.

## 📊 CloudWatch Dashboards
You can create a custom dashboard in the CloudWatch console to visualize:
- **EC2 CPU Utilization**: (AWS/EC2 namespace)
- **Memory Used Percent**: (CWAgent namespace)
- **Disk Used Percent**: (CWAgent namespace)
- **CloudFront Requests**: (AWS/CloudFront namespace)
- **CloudFront 4xx/5xx Errors**: (AWS/CloudFront namespace)
- **RDS CPU Utilization**: (AWS/RDS namespace)
- **RDS Database Connections**: (AWS/RDS namespace)
- **RDS Free Storage Space**: (AWS/RDS namespace)

## 🔔 Alarms
It is recommended to set up an alarm for:
- **CPU > 80%** for 5 minutes.
- **Memory > 90%** for 5 minutes.
- **CloudFront 5xx Errors > 5** for 1 minute.
- **RDS CPU > 80%** for 5 minutes.
- **RDS Storage < 1GB** for 1 minute.
