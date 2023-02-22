---
title: Firebase Backend
slug: firebase-backend
---

Highlight's `@highlight-run/node` package includes wrappers for Firebase Cloud Functions, which will automatically report backend errors to Highlight and link them to the frontend sessions that caused them.

## Getting Started

This backend SDK requires one of our [Client SDK](../1_overview.md#for-your-frontend)s to be installed, so please follow the instructions there if you have not done so.

For server-side linking to Highlight sessions, your client-side call to `H.init` should include the `tracingOrigins` setting. See [H.init()](../../sdk/nodejs.md#Hinit) for more details.

```typescript
H.init('<YOUR_PROJECT_ID>', {
    ...
    tracingOrigins: true,
    ...
});
```

## Adding Highlight to your Backend

Import the `@highlight-run/node` package

```shell
# with npm
npm install @highlight-run/node

# with yarn
yarn add @highlight-run/node
```

### Wrap your Cloud Functions

```javascript
const highlightNode = require('@highlight-run/node')

// Callable function wrapper
exports.exampleCallable = functions.https.onCall(
	highlightNode.Handlers.firebaseCallableFunctionHandler((data, context) => {
		// ... your handler code here
		return { result: 'useful result!' }
	}, {projectID: "YOUR_PROJECT_ID"}),
)
```

```javascript
const highlightNode = require('@highlight-run/node')

// Http function wrapper
exports.exampleHttp = functions.https.onRequest(
	highlightNode.Handlers.firebaseHttpFunctionHandler((req, res) => {
		// ... your handler code here
		res.json({ result: 'useful result!' })
	}, {projectID: "YOUR_PROJECT_ID"}),
)
```

### Verify

To view and resolve the recorded error, log into [app.highlight.io/errors](https://app.highlight.io/errors) and open your project. Clicking on the error's title will open a page where you can see detailed information and mark it as resolved. You can also view frontend sessions where the error was thrown, and see the individual request which caused the error.
