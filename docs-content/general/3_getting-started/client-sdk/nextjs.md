---
title: Next.js
slug: nextjs
createdAt: 2021-09-13T23:00:33.000Z
updatedAt: 2022-10-18T23:54:07.000Z
---

```hint
Reference our [client-side sdk docs](../../../sdk/client.md) for advanced functionality and our [fullstack mapping guide](../2_frontend-backend-mapping.md) on pairing backend errors with your replay.
```
## Installing the SDK

Install `highlight.run` and `@highlight-run/react` using your package manager.

```shell
# with npm
npm install highlight.run @highlight-run/react

# with yarn
yarn add highlight.run @highlight-run/react
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

```hint
Using the new `/app` directory in Next.js 13? Refer to [this guide](../fullstack-frameworks/next-js/app-directoy.md) to ensure you're using a client component.
```

```typescript
import type { AppProps } from 'next/app'
import { H } from 'highlight.run'
import { ErrorBoundary } from '@highlight-run/react'

H.init('<YOUR_PROJECT_ID>') // Get your project ID from https://app.highlight.io/setup

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ErrorBoundary>
			<Component {...pageProps} />
		</ErrorBoundary>
	)
}
export default MyApp
```

## Verify

Start your app, go to it in the browser, then click around. Highlight will be recording your session and it will show up on [app.highlight.io/sessions](https://app.highlight/sessions) a few seconds after recording has started.

## Next Steps

After installing Highlight for your frontend application, there are a few other things you should check out about our Session Replay product, namely:

- [Privacy Controls](../../4_session-replay/privacy.md)

- [Network Request Recording](../../4_session-replay/recording-network-requests-and-responses.md)

- [Backend Setup Guides](../backend-sdk/backend-sdk-overview.md)
