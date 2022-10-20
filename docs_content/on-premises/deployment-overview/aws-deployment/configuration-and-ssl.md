---
title: Configuration and SSL
slug: fo6M-configuration-and-ssl
createdAt: 2021-09-15T00:04:23.000Z
updatedAt: 2021-10-01T20:27:20.000Z
---

The rest of this walk-through will step through the setup of the instance, adding configuration variables from the previous "Dependency Setup" section, and configuring SSL for the instance.

## Logging into your instance

In order to set configuration variables and such, we'll need to have SSH access to the remote machine. In the \[instance setup]\(https\://docs.highlight.run/docs/linux-instance-setup) section, you downloaded a key pair. In your terminal, navigate to the directory where it lives.

Secondly, you'll need access to the public IP of your ec2 instance, which can be found on the main page for your instance. Further, if you select "Connect" in the top right and then click "SSH Client", you'll be able to directly copy the command.

Assuming:
\- The public URL for your ec2 instance is \`ec2-1234.us-west.-2.compute.amazonaws.com\`
\- The name of your key pair is \`my-company.pem\` (and you've navigated to this respective directory)

The command is as follows:

```shell
ssh -i "my-company.pem" ubuntu@ec2-1234.us-west-2.compute.amazonaws.com
```

## Running Setup Scripts

1\. Once you've logged into your instance via a shell, clone the \[on-premise repo]\(https\://github.com/highlight-run/highlight-onpremise) with:

```shell
git clone https://github.com/highlight-run/highlight-onpremise
```

2\. Navigate into the repo (\`cd highlight-onpremise\`) and run the following command:

```shell
./setup-docker.sh && ./setup-config.sh
```

3\. In the same directory, run:

```shell
./setup-ssl.sh
```

This will run a process that creates ssl keys on this machine. Additionally, it will ask you for the domain that you mapped in the earlier step (e.g. \`highlight.mycompany.com\`) as well as an administrator email (e.g. \`john\@mycompany.com\`).

## Configuration Variables

1\. Navigate to the project and execute the \`setup-config.sh\` bash script (\`./setup.config.sh\`). You should now see a file called \`environment.yml\`, which looks like this:

```yaml
version: "3.7"

# Create a new file called `environment.yml`, copy these contents there,
# and use the secrets generated from instructions at docs.highlight.run to fill out the values.
services:
  env:
    environment:
      DEPLOYMENT_KEY: "--"
      FIREBASE_SECRET: |
        {
          "type": "--",
          "project_id": "--",
          "private_key_id": "--",
          "private_key": "--",
          "client_email": "--",
          "client_id": "--",
          "auth_uri": "--",
          "token_uri": "--",
          "auth_provider_x509_cert_url": "--",
          "client_x509_cert_url": "--"
        }
      REACT_APP_FIREBASE_CONFIG_OBJECT: |
        {
          apiKey: "--",
          authDomain: "--",
          projectId: "--",
          storageBucket: "--",
          messagingSenderId: "--",
          appId: "--"
        }
      AWS_ACCESS_KEY_ID: "--"
      AWS_SECRET_ACCESS_KEY: "--"
      AWS_S3_BUCKET_NAME: "--"
```

