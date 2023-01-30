---
title: HTML
slug: html
createdAt: 2021-09-13T23:00:58.000Z
updatedAt: 2022-06-13T22:00:02.000Z
---

```hint
Reference our [client-side sdk docs](/docs/sdk/client) for advanced functionality and our [fullstack mapping guide](/docs/getting-started/frontend-backend-mapping) on pairing backend errors with your replay.
```

## Adding the Snippet

Add the snippet to your `index.html`.

```html
<html>
	<head>
		<script src="https://cdn.jsdelivr.net/npm/highlight.run@latest"></script>
		<script>
			window.H.init('<YOUR_PROJECT_ID>') // Get your project ID from https://app.highlight.run/setup
		</script>
	</head>
	<body>
		<!-- Your Application -->
	</body>
</html>
```

## Verify

Start your app, go to it in the browser, then click around. Highlight will be recording your session and it will show up on <https://app.highlight.run/sessions> a few seconds after recording has started.

## Next Steps

After installing Highlight for your frontend application, there are a few other things you should check out about our Session Replay product, namely:

-   [Privacy Controls](/docs/session-replay/privacy)

-   [Network Request Recording](/docs/session-replay/recording-network-requests-and-responses)

-   [Backend Setup Guides](/docs/getting-started/backend-sdk/overview)
