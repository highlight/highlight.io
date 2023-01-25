---
title: Frontend Quickstart / Overview
slug: client-sdk
createdAt: 2022-04-01T19:38:31.000Z
updatedAt: 2022-05-26T18:53:53.000Z
---

```hint
For a more comprehensive tour of our client sdk, visit our [client reference page](/docs/sdk/client).
```

## Frameworks

Get started with one of these guides if you're using a listed framework:

-   [React.js](/getting-started/client-sdk/reactjs)

-   [Next.js](/getting-started/client-sdk/nextjs)

-   [Vue.js](/getting-started/client-sdk/vuejs)

-   [Gatsby.js](/getting-started/client-sdk/gatsbyjs)

-   [HTML](/getting-started/client-sdk/html)

-   [SvelteKit](/getting-started/client-sdk/sveltekit)

-   [Angular](/getting-started/client-sdk/angular)

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
	'<YOUR_ORGANIZATION_ID>', // Get this from https://app.highlight.run/setup
)
```

### Example

```typescript
import React from 'react'
import { H } from 'highlight.run'

H.init('<YOUR_ORGANZATION_ID>') // Get this from https://app.hgihlight.run/setup

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root'),
)
```

## Verify

Start your app, go to it in the browser, then click around. Highlight will be recording your session and it will show up on <https://app.highlight.run/sessions> a few seconds after recording has started.

## Next Steps

After installing Highlight for your frontend application, there are a few other things you should check out about our Session Replay product, namely:

- [Privacy Controls](/docs/session-replay/privacy)

- [Network Request Recording](/docs/session-replay/recording-network-requests-and-responses)

- [Backend Setup Guides](/docs/getting-started/backend-sdk/overview)
