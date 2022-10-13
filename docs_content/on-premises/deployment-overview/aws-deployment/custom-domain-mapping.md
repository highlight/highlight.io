---
title: Custom Domain Mapping
slug: ySCq-custom-domain-mapping
createdAt: 2021-09-15T00:03:54.000Z
updatedAt: 2021-10-01T19:04:09.000Z
---



:::hint
## Before proceeding

Before going through these instructions, make sure that you have access to the DNS settings on a custom domain of your choice. Most customers choose something like highlight.company-name.com, but this is up to you!
:::

### Point an elastic IP address to your instance

We need to create an elastic IP so that the IP of the instance doesn't reset on every restart.
1\. Create an elastic IP with [these steps](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating).
2\. Map this newly created elastic IP to your existing EC2 instance with [these steps.](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-associating)
3\. Save this newly created IP somewhere handy for next steps.

### Map this IP to your custom domain

Now that we have a static IP for your instance, we should point your custom domain (let's say highlight.company-name.com to this IP address). This is as simple as creating an A record in your DNS settings and pointing the subdomain to this IP address.

![Adding a subdomain for our elastic IP in Google Domains](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/gSKWaB0lx7PKCRw5ReL_3_image.png)

