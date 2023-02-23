---
title: Application Architecture
slug: architecture
createdAt: 2023-01-24T20:28:14.000Z
updatedAt: 2023-01-24T02:07:22.000Z
---

# Application Architecture

First, you'll want to understand how Highlight is built to make changes. The best way to get a sense of this is to try and make simple dummy changes to different parts of the stack and see how the changes propagate.

-   SDKs `sdk/`

    -   Firstload

    -   Client

    -   highlight-node / other SDKs

-   Public Graph `backend/public-graph/graph/schema.resolvers.go`

-   Private Graph `backend/private-graph/graph/schema.resolvers.go`

-   Workers `backend/worker.go`

    -   Public graph worker `processPublicWorkerMessage`

    -   Async worker `Start`

## General Architecture Diagram

![](/images/architecture.png)

## Code Structure Diagram

![](/images/software-components.png)

## Kafka Diagram

![](/images/kafka.png)

## InfluxDB Diagram

![](/images/influx.png)

## OpenTelemetry Diagram

![](/images/opentelemetry.png)
