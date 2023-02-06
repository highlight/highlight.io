---
title: tRPC Backend
slug: tprc-backend
createdAt: 2022-12-23T00:00:00.000Z
updatedAt: 2022-12-23T00:00:00.000Z
---

Highlight's `@highlight-run/node` package includes a tRPC compatible error handler, which will automatically report backend errors to Highlight and link them to the frontend sessions that caused them.

## Getting Started

In order to use the backend sdk, we recommend using one of our Client SDKs (with `H.init()`) so that errors are properly matched from your sessions to your backend errors. In your javascript environment, it would look like something like this:

```typescript
H.init('<YOUR_PROJECT_ID>', {
    ...
    tracingOrigins: true,
	networkRecording: {
		enabled: true,
		recordHeadersAndBody: true,
	},
    ...
});
```


The full guide for initializing Highlight in your client can be found [here](../client-sdk/1_client-sdk-overview.md) and more information about setting up frontend/backend mapping for any stack can be found [here](../2_frontend-backend-mapping.md).

Lastly, see [H.init()](../../../sdk-docs/client.md#Hinit) for a full sdk reference.


## Adding Highlight to your Backend

Import the `@highlight-run/node` package

```shell
# with npm
npm install @highlight-run/node

# with yarn
yarn add @highlight-run/node
```

### Handle errors

When you're exporting an API handler, use `Handlers.trpcOnError` as your `onError` function. Here's an example with tRPC + Next.js:

```typescript
// pages/api/trpc/[trpc].ts

import { createNextApiHandler } from '@trpc/server/adapters/next'
import { Handlers } from '@highlight-run/node'

export default createNextApiHandler({
	// ... your config
	onError: Handlers.trpcOnError,
})
```

If you're already doing your own error handling logic in a custom `onError` function, you can call this handler with the `error` and `req` arguments.

```typescript
// pages/api/trpc/[trpc].ts

import { createNextApiHandler } from '@trpc/server/adapters/next'
import { Handlers } from '@highlight-run/node'

export default createNextApiHandler({
	// ... your config
	onError: ({ error, req }) => {
		// ... your own error handling logic here
		Handlers.trpcOnError({ error, req })
	},
})
```

### Verify

To view and resolve the recorded error, log into [app.highlight.io/errors](https://app.highlight.io/errors) and open your project. Clicking on the error's title will open a page where you can see detailed information and mark it as resolved. You can also view frontend sessions where the error was thrown, and see the individual request which caused the error.
