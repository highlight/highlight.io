---
title: Overview
slug: eNAV-aws-deployment
createdAt: 2021-09-15T00:00:28.000Z
updatedAt: 2022-10-13T21:15:18.000Z
---

Complete the following steps in their respectively listed order:

[EC2 Instance Setup](/on-premises/deployment-overview/aws-deployment/ec2-instance-setup)&#x20;
There is a minimum set of requirements for the EC2 instance that you'll create.

[Custom Domain Mapping](/on-premises/deployment-overview/aws-deployment/custom-domain-mapping)
In order to support SSL, you will need to point a custom domain to your EC2 instance. You need access to update your DNS records and create an AWS Elastic IP for this step.

[Dependency Setup](/on-premises/deployment-overview/aws-deployment/external-dependency-setup)
Highlight uses Firebase as an OAuth providor, for which setup takes \~2 minutes. We also use AWS S3 for long-term payload storage.

[Configuration and SSL](/on-premises/deployment-overview/aws-deployment/configuration-and-ssl)
This step requires values from the Dependency Setup step to configure environment variables as well as SSH access to the EC2 instance.

[Frequently Asked Questions](/on-premises/deployment-overview/frequently-asked-questions)&#x20;
Go here to learn about things such as Slack alerts!

