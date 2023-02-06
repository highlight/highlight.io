---
title: Self-hosted [Hobby]
slug: self-host-enterprise
createdAt: 2022-04-01T20:28:14.000Z
updatedAt: 2022-04-15T02:07:22.000Z
---

# Running Highlight

## Docker Compose

```shell
cd docker
docker compose up -d --build
```

After a brief frontend load time, the app should be accessible at https://localhost:3000

For deploying on Linux with Docker, we recommend having at least 16 CPU cores, 32GB RAM, 256GB disk.
Reach out to our [community](https://community.highlight.io/) with any questions!

# Limitations

We don't recommend hosting Highlight yourself if you have more than 10k monthly sessions or 50k monthly errors. The infrastructure configuration in the docker compose is not meant to scale beyond a small number of sessions, and isn't resilient to an outage or version upgrades. 

That being said, if the benefits of self hosting Highlight are signficant enough, you may want to consider an enterprise deployment (see [our Enterprise Self Hosted Docs](./self-host-enterprise.md)).

If you have any questions, don't hesitate to [reach out](https://community.highlight.io)!
