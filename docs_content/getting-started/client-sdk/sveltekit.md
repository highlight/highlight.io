
title: SvelteKit
slug: nQvO-sveltekit
createdAt: 2021-09-13T23:00:44.000Z
updatedAt: 2022-04-01T19:51:13.000Z
---

## 👋 Welcome!

Let's get you up and running with Highlight. **We should be done in less than 2 minutes.**

## Initialize and Start Highlight

You will need to initialize and start Highlight in your SvelteKit application. You can do so by making the following change in `index.html`.

```html
...

%svelte.head%

<script src="https://cdn.jsdelivr.net/npm/highlight.run@latest"></script>
<script>
	window.H.init('<YOUR_PROJECT_ID>');
</script>

...
```

## Verify

Start your app, go to it in the browser, then click around. Highlight will be recording your session and it will show up on <https://app.highlight.run/sessions> a few seconds after recording has started.
