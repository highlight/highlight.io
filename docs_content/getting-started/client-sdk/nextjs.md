---
title: Next.js
slug: d3G0-nextjs
createdAt: 2021-09-13T23:00:33.000Z
updatedAt: 2022-04-01T19:51:07.000Z
---

## 👋 Welcome!

Let's get you up and running with Highlight. **We should be done in less than 2 minutes.**

## Installing the SDK

Install `highlight.run` and `@highlight-run/react` using your package manager.

:::codeblocktabs
```none
npm install highlight.run @highlight-run/react
```

```shell
yarn add highlight.run @highlight-run/react
```
:::

## Initialize

Initialize Highlight where your application starts.

```typescript
import { H } from 'highlight.run';

H.init(
    "<YOUR_PROJECT_ID>" // Get your project ID from https://app.highlight.run/setup
);
```

### Example

```typescript
import type { AppProps } from 'next/app';
import { H } from 'highlight.run';
import { ErrorBoundary } from '@highlight-run/react'


H.init('<YOUR_PROJECT_ID>'); // Get your project ID from https://app.highlight.run/setup

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
export default MyApp;
```

## Verify

Start your app, go to it in the browser, then click around. Highlight will be recording your session and it will show up on <https://app.highlight.run/sessions> a few seconds after recording has started.
