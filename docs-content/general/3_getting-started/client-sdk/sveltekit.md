---
title: SvelteKit
slug: sveltekit
createdAt: 2021-09-13T23:00:44.000Z
updatedAt: 2022-04-01T19:51:13.000Z
---
```hint
Reference our [client-side sdk docs](../../../sdk/client.md) for advanced functionality and our [fullstack mapping guide](../2_frontend-backend-mapping.md) on pairing backend errors with your replay.
```

## Initialize and Start Highlight

You will need to initialize and start Highlight in your SvelteKit application. You can do so by making the following change in `index.html`.

```html
... %svelte.head%

<script src="https://cdn.jsdelivr.net/npm/highlight.run@latest"></script>
<script>
	window.H.init('<YOUR_PROJECT_ID>')
</script>

...
```

## Verify

Start your app, go to it in the browser, then click around. Highlight will be recording your session and it will show up on [app.highlight.io/sessions](https://app.highlight/sessions) a few seconds after recording has started.

## Next Steps

After installing Highlight for your frontend application, there are a few other things you should check out about our Session Replay product, namely:

- [Privacy Controls](../../4_session-replay/privacy.md)

- [Network Request Recording](../../4_session-replay/recording-network-requests-and-responses.md)

- [Backend Setup Guides](../backend-sdk/backend-sdk-overview.md)