---
title: Contributing to Highlight
slug: contributions
createdAt: 2023-01-24T20:28:14.000Z
updatedAt: 2023-01-24T02:07:22.000Z
---

# How to contribute

## Application Architecture

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
    

## Best first issues to take on.

It's best to start with [issues](https://github.com/highlight/highlight/issues) that are well-defined and easily testable. If you're interested in a larger project, adding support for a new programming language via a new SDK is always greatly appreciated. If there is a feature you're missing in Highlight, reach out on our [discussions](https://github.com/highlight/highlight/discussions) to get a conversation started about the best implementation.

## How do I get started?

You'll want to spin up Highlight locally to get to developing. The best way to do this is by using docker. Check out [the self-hosting instructions](/company/open-source/self-host-hobby) for more info.

# Code Style

While we don't fret about whether you prefer tabs or spaces, we want our code to be easy to read and add to. Style preferences are codified and automated as part of CI and automated development workflows (such as `husky` and gomod configurations). If you have ideas on how to improve our style linting, open a PR and let us know!

# License

Highlight is [Apache 2](https://github.com/highlight/highlight/blob/main/LICENSE) licensed.

By contributing to Highlight, you agree that your contributions will be licensed under its Apache 2 license.
