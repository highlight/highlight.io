---
title: EC2 Instance Setup
slug: tvEx-ec2-instance-setup
createdAt: 2021-09-15T00:03:46.000Z
updatedAt: 2021-09-15T23:20:39.000Z
---

1\. Log into AWS and go to the EC2 dashboard
2\. Click `Launch Instance`

![](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/CAxmhKR-GCWurs2IwssNN_image.png)

3\. Select Ubuntu Server 20.04 LTS (x86)
4\. Select the instance type. You should choose at least t2.large as we need at least 8GB of RAM.
5\. Give the instance at least 100gb of disk.

![storage configuration](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/Yq3WkGNnl2OOIFmvWggAJ_image.png)


6\. Make sure the DB is running in a VCP that you can SSH into later (only necessary if not choosing our recommended server selection).
7\. Add security groups for indound HTTP and HTTPS traffic to your instance as follows:

![security group configuration](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/UafMXyfsT84f9agdTkCDm_image.png)

8\. Create and download an SSH key pair onto your local machine (this will be used to connect to your EC2 instance for configuration).

![](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/zJWrQwQHOKiqf27PpnzPv_image.png)

9\. Launch your instance!

