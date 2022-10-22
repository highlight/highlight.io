---
title: External Dependency Setup
slug: toxJ-external-dependency-setup
createdAt: 2021-09-15T00:04:08.000Z
updatedAt: 2021-10-01T20:22:21.000Z
---

## Authentication

## Firebase Project Setup

1\. Navigate to <https://console.firebase.google.com> and create a project:

![](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/XWo9wlUsObbBxN86uSLJS_image.png)

2\. Create an app of type "Web App" or "Javascript" (the third option here):

![](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/vGiebDv24bjh5XlYe0-dU_image.png)

3\. Navigate to the "Authentication" page:

![](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/3UZgju-jELfVgsYanobKm_image.png)

4\. Select "Sign-in method", enable "Email/Password" and "Google" sign-in methods. At the bottom of the page, enter your newly created domain name:

![](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/ieYUZ_8wYck5jYqLQFvkv_image.png)

## Secrets



```hint
### Note these values down!


For the below instructions, you'll need the output values in the "Configuration and SSL" section. Keep track of them.
```

1\. Navigate to the "Project settings" page:

![](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/rJjCwCzY5wA1FSp2JSSf6_image.png)

2\. Under the "General" tab, find the section called "Firebase SDK snippet" and select the "Config" option. Note the javascript object down. The JSON object will be \`REACT\_APP\_FIREBASE\_CONFIG\_OBJECT\`.

![](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/ocy43pW_DhCa6araY5Ug3_image.png)

3\.  Under the "Service Accounts" tab, find the section called "Firebase Admin SDK".

![](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/DapCxSU_0r_XsL2GATcE0_image.png)

4\. Click "Generate new private key" and keep the file around. The contents will be \`\[FIREBASE\_SECRET]\(http\://google.com)\`.

# Object Storage

## Creating an S3 Bucket

Using the AWS Console, [create an S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html) with the default settings.&#x20;

## Permissions

In order to have our EC2 instance access the AWS bucket, we need to create an AWS IAM role and associate it with our EC2 instance.

1\. Navigate to the AWS IAM page and add a "New User" and select "Programmatic Access".

![](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/vwGebcap5ak9U4RcdFj5H_image.png)

2\.  On "Set permissions" ->  "Attach existing policies directly",  select "Create Policy", and use the following JSON string as your policy body (replace \`my-company-highlight-sessions\` with your bucket).

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:*"
            ],
            "Resource": "arn:aws:s3```my-company-highlight-sessions"
        }
    ]
}
```

3\. Back on the "Add User" page, select the newly created policy and create the user. Make sure to save the user credentials for later steps.

