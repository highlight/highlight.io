---
title: Vue.js
slug: vuejs
createdAt: 2021-09-13T22:48:48.000Z
updatedAt: 2022-05-26T17:21:23.000Z
---

```hint
Reference our [client-side sdk docs](/docs/sdk/client) for advanced functionality and our [fullstack mapping guide](/docs/getting-started/frontend-backend-mapping) on pairing backend errors with your replay.
```
## Installing the SDK


Install `highlight.run` using your package manager.

```shell
# with npm
npm install highlight.run

# with yarn
yarn add highlight.run
```

## Initialize

Initialize Highlight where your application starts.

```typescript
import { H } from 'highlight.run'

H.init(
	'<YOUR_PROJECT_ID>', // Get your project ID from https://app.highlight.io/setup
)
```

### Example

```typescript
import { H } from 'highlight.run'
import { createApp } from 'vue'
import App from './App.vue'

H.init('9me23yd2') // Get your project ID from https://app.highlight.io/setup

createApp(App).mount('#app')
```

## Verify Installation

Start your app, go to it in the browser, then click around. Highlight will be recording your session and it will show up on <https://app.highlight.io/sessions> a few seconds after recording has started.

## Next Steps

After installing Highlight for your frontend application, there are a few other things you should check out about our Session Replay product, namely:

- [Privacy Controls](/docs/session-replay/privacy)

- [Network Request Recording](/docs/session-replay/recording-network-requests-and-responses)

- [Backend Setup Guides](/docs/getting-started/backend-sdk/overview)
