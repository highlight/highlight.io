---
title: WordPress
slug: wordpress
createdAt: 2021-09-13T23:00:58.000Z
updatedAt: 2022-04-01T19:51:18.000Z
---

```hint
Reference our [client-side sdk docs](../../../sdk/client.md) for advanced functionality and our [fullstack mapping guide](../2_frontend-backend-mapping.md) on pairing backend errors with your replay.
```
## Adding the Snippet

Add the snippet to your `index.html`.

```html
<html>
	<head>
		<script src="https://unpkg.com/highlight.run"></script>
		<script>
			window.H.init('<YOUR_PROJECT_ID>') // Get your project ID from https://app.highlight.io/setup
		</script>
	</head>
	<body>
		<!-- Your Application -->
	</body>
</html>
```

## Verify

Start your app, go to it in the browser, then click around. Highlight will be recording your session and it will show up on [app.highlight.io/sessions](https://app.highlight/sessions) a few seconds after recording has started.