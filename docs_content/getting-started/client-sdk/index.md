---
title: Client SDK
slug: 7uAC-client-sdk
createdAt: 2022-04-01T19:38:31.000Z
updatedAt: 2022-05-26T18:53:53.000Z
---

## Frameworks

Get started with one of these guides if you're using a listed framework:

*   [React.js](/getting-started/client-sdk/reactjs)&#x20;

*   [Next.js](/getting-started/client-sdk/nextjs)&#x20;

*   [Vue.js](/getting-started/client-sdk/vuejs)&#x20;

*   [Gatsby.js](/getting-started/client-sdk/gatsbyjs)&#x20;

*   [HTML](/getting-started/client-sdk/html)

*   [SvelteKit](/getting-started/client-sdk/sveltekit)&#x20;

*   [Angular](/getting-started/client-sdk/angular)&#x20;

## Installing the SDK

Install `highlight.run` using your package manager.

:::codeblocktabs
```none
npm install highlight.run
```

```shell
yarn add highlight.run
```
:::

## Initialize

Initialize Highlight where your application starts.

```typescript
import { H } from 'highlight.run';

H.init(
    "<YOUR_ORGANIZATION_ID>", // Get this from https://app.highlight.run/setup
);
```

### Example

```typescript
import React from 'react';
import { H } from 'highlight.run';

H.init("<YOUR_ORGANZATION_ID>"); // Get this from https://app.hgihlight.run/setup

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
```

## Verify

Start your app, go to it in the browser, then click around. Highlight will be recording your session and it will show up on <https://app.highlight.run/sessions> a few seconds after recording has started.
