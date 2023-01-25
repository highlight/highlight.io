---
title: Fullstack Mapping
slug: backend-sdk
createdAt: 2022-03-28T20:05:46.000Z
updatedAt: 2022-04-01T20:40:53.000Z
---

## What's this?

In order to make the most out of Highlight's full-stack integration, we suggest instrumenting your frontend so that you can attribute frontend requests with backend errors. Below, we detail the requirements to get this working as well how to troubleshoot.

## How can I start using this?

Required Highlight `highlight.run` version: `>=2.8.1`

### Turn on `tracingOrigins`

Set the `tracingOrigins` option to an array of patterns matching the location of your backend. You may also simply specify `true`, which will default `tracingOrigins` to all subdomains/domains of the url for your frontend app.

```javascript
H.init("<YOUR_PROJECT_ID>", {
	tracingOrigins: ['localhost', 'example.myapp.com/backend'],
    ...
});
```

### Turn on `networkRecording`

```javascript
H.init("<YOUR_PROJECT_ID>", {
	networkRecording: {
		enabled: true,
		recordHeadersAndBody: true,
	},
	...
});
```

## Backend Changes

Backend changes are dependent on the underlying language/framework used on the server-side codebase. All you need to add is a middleware and code to capture errors.

Below are solutions for what we support today. If you'd like us to support a new framework, feel free to shoot us a message at [support@highlight.io](mailto:support@highlight.io) or drop us a note in our [discord](https://discord.gg/yxaXEAqgwN).

- [Go Backend Integration](/getting-started/backend-sdk/go)

- [Next.js Backend Integration](/getting-started/backend-sdk/nextjs)

- [Node.js Backend Integration](/getting-started/backend-sdk/nodejs)

- [Express Backend Integration](/getting-started/backend-sdk/express)

## Troubleshooting

1.  Ensure `tracingOrigins` and `networkRecording` are properly set.

2.  Ensure your backend has `CORS` configured for your frontend hostname, explicitely allowing header `x-highlight-request`.

3.  For debugging the backend sdk of your choice, in order to debug, we suggest enabling verbose logging. For example, in go, add `highlight.SetDebugMode(myLogger)`

4. If all else fails, please send us an email at support@highlight.io or join the #support channel on our [discord](https://discord.gg/yxaXEAqgwN).
