---
title: Node.js Backend
slug: nodejs-backend
createdAt: 2022-10-24T20:36:04.000Z
updatedAt: 2022-10-25T19:42:49.000Z
---

Highlight ships `@highlight-run/node` which can be installed alongside highlight.run for capturing backend errors and reporting metrics in applications with Node.js backends. This SDK is compatible with many other backend frameworks built on top of Node.js.

## Getting Started

This backend SDK requires one of our [Client SDK](../1_overview.md#for-your-frontend)s to be installed, so please follow the instructions there if you have not done so.

For server-side linking to Highlight sessions, your client-side call to `H.init` should include the `tracingOrigins` setting. See [H.init()](../../sdk/client.md#Hinit) for more details.

```typescript
H.init('<YOUR_PROJECT_ID>', {
    ...
    tracingOrigins: true,
    ...
});
```

## Adding Highlight to your Backend

First, import the package

```shell
# with npm
npm install @highlight-run/node

# with yarn
yarn add @highlight-run/node
```

### Initialize the Highlight backend

Somewhere in your app, typically during startup or when handling errors, initialize the Highlight backend with any necessary options. See [H.init()](../../sdk/client.md) for a full list of options.

```typescript
import { H } from '@highlight-run/node'

const highlightOptions = {}
if (!H.isInitialized()) {
	H.init(highlightOptions)
}
```

### Handle errors

When your app throws a backend error, you can log that error to Highlight by calling [H.consumeError()](../../sdk/nodejs.md#Hconsume-error) using the `secureSessionId` and `requestId` parameters from the request's header. Your error handling code will depend on the backend framework you use, but will likely look something like this:

```typescript
import { H } from '@highlight-run/node'

const onError = (request, error) => {
	const parsed = H.parseHeaders(request.headers)
	if (parsed !== undefined) {
		H.consumeError(error, parsed.secureSessionId, parsed.requestId)
	}
}
```

### Verify

To view and resolve the recorded error, log into [app.highlight.io/errors](https://app.highlight.io/errors) and open your project. Clicking on the error's title will open a page where you can see detailed information and mark it as resolved. You can also view frontend sessions where the error was thrown, and see the individual request which caused the error.
