---
title: Adding an SDK
slug: adding-an-sdk
createdAt: 2023-01-24T20:28:14.000Z
updatedAt: 2023-01-24T02:07:22.000Z
---

# Adding an SDK

## OpenTelemetry

When implementing a Highlight backend SDK, we use an existing OpenTelemtry SDK under the hood
to send data to our OpenTelemetry collector (hosted on https://otel.highlight.io). This makes it
See the [architecture page](architecture.md) for a diagram of how data is sent to the collector and the public graph.
