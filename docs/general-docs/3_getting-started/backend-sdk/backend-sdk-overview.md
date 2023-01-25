---
title: Backend Quickstart / Overview
slug: backend-sdk
createdAt: 2022-03-28T20:05:46.000Z
updatedAt: 2022-04-01T20:40:53.000Z
---

## What's this?

Highlight's Full-stack integration allows you to get visibility into errors and issues across your whole stack, not just your frontend. These errors are paired with outgoing requests on your frontend so that you can understand:

- Exactly what happened when a user reports a bug

- Where specific errors are initiated and what caused them

- What backend issues could have caused corresponding frontend bugs.

## What does it look like?

Below is an example of a backend error (thrown in `go` ) ,mapped to an actual network request on a user's frontend.

![](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/BCFnjSPEUco_QFvl8bs4S_image.png)

## Quick Start

### Enable proper flags in your client-side snippet:

As a first step, you must enable the correct options in your client-side code snippet detailed in our [full stack mapping reference](/getting-started/frontend-backend-mapping). 

### Make the appropriate backend changes:

Backend changes are dependent on the underlying language/framework used on the server-side codebase. All you need to add is a middleware and code to capture errors.

Below are solutions for what we support today. If you'd like us to support a new framework, feel free to shoot us a message at [support@highlight.io](mailto:support@highlight.io) or shoot us a note in our [discord](https://discord.gg/yxaXEAqgwN).

- [Go Backend Integration](/getting-started/backend-sdk/go)

- [Next.js Backend Integration](/getting-started/backend-sdk/nextjs)

- [Node.js Backend Integration](/getting-started/backend-sdk/nodejs)

- [Express Backend Integration](/getting-started/backend-sdk/express)
