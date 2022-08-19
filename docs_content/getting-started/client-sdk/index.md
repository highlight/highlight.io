
title: Client SDK
slug: 7uAC-client-sdk
createdAt: 2022-04-01T19:38:31.000Z
updatedAt: 2022-05-26T18:53:53.000Z
---

## Frameworks

Get started with one of these guides if you're using a listed framework:

*   [React.js](docId\:a5qoybjBTPZltvOSMXJw7)&#x20;

*   [Next.js](docId\:d3G0HZZ8r1u28kGfwC442)&#x20;

*   [Vue.js](docId\:AmCXqaAHpNp-oz9w53jy6)&#x20;

*   [Gatsby.js](docId:4TkG0OS3iRJAlg_jIa7IL)&#x20;

*   [HTML](docId\:XgeS-yhIeWnM9dOIAiv0l)

*   [SvelteKit](docId\:nQvOED-yuuH8Y-fkWyjRy)&#x20;

*   [Angular](docId\:QEimoLCsQ0JnhloZC7tFV)&#x20;

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
