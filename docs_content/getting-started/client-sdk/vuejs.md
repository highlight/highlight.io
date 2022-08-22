---
title: Vue.js
slug: AmCX-vuejs
createdAt: 2021-09-13T22:48:48.000Z
updatedAt: 2022-05-26T17:21:23.000Z
---

## 👋 Welcome!

Let's get you up and running with Highlight. **We should be done in less than 2 minutes.**

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
    "<YOUR_PROJECT_ID>", // Get your project ID from https://app.highlight.run/setup
);
```

### Example

```typescript
import { H } from "highlight.run";
import { createApp } from "vue";
import App from "./App.vue";

H.init("9me23yd2"); // Get your project ID from https://app.highlight.run/setup

createApp(App).mount("#app");
```

## Verify

Start your app, go to it in the browser, then click around. Highlight will be recording your session and it will show up on <https://app.highlight.run/sessions> a few seconds after recording has started.
