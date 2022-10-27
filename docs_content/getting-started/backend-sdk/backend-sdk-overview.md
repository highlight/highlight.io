---
title: Overview
slug: JtnW-backend-sdk
createdAt: 2022-03-28T20:05:46.000Z
updatedAt: 2022-04-01T20:40:53.000Z
---

## What's this?

Highlight's Full-stack integration allows you to get visibility into errors and issues across your whole stack, not just your frontend. These errors are paired with outgoing requests on your frontend so that you can understand:

*   Exactly what happened when a user reports a bug

*   Where specific errors are initiated and what caused them

See errors and their relevant details in the same session timeline where you can find out exactly what a user was doing that led up to the issue.

## What does it look like?

Below is an example of a backend error (thrown in `go` ) ,mapped to an actual network request on a user's frontend.

![](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/BCFnjSPEUco_QFvl8bs4S_image.png)

## How can I start using this?

### Frontend Changes

All you need to do is enable a flag in Highlight and confirm the version of Highlight you're using on your client to allow the frontend to instrument any requests to your backend.

### Confirm your client version

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

Below are solutions for what we support today.

[Go Backend Integration](/getting-started/backend-sdk/go)&#x20;

[Next.js Backend Integration](/getting-started/backend-sdk/nextjs)

[Express Backend Integration](/getting-started/backend-sdk/express) &#x20;

## Troubleshooting

1.  Ensure `tracingOrigins` and `networkRecording` are properly set.

2.  Ensure your backend has `CORS` configured for your frontend hostname, explicitely allowing header `x-highlight-request`.

3.  For debugging the backend SDK, enable verbose logging. For example, in go, add `highlight.SetDebugMode(myLogger)`&#x20;
