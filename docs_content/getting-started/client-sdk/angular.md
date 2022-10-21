---
title: Angular
slug: l-ir-angular
createdAt: 2022-05-26T18:54:36.000Z
updatedAt: 2022-05-26T18:55:03.000Z
---

## 👋 Welcome!

Let's get you up and running with Highlight. **We should be done in less than 2 minutes.**

## Installing the SDK

Install `highlight.run` using your package manager.

```codeblocktabs
```none
npm install highlight.run
```

```shell
yarn add highlight.run
```
```

## Initialize

Initialize Highlight where your application starts, likely in the Angular `main.ts` file.

```typescript
import { H } from 'highlight.run';

H.init(
    "<YOUR_PROJECT_ID>", // Get your project ID from https://app.highlight.run/setup
    networkRecording: {
        enabled: true,
        recordHeadersAndBody: true,
    },
    tracingOrigins: true // Optional configuration of Highlight features
);
```

Check out [H.init()](/api/h-init) docs for more details about the options to configure.

If you prefer a full-fledged example, you can also reference our sample [Angular Repo with Highlight Configured](https://github.com/highlight-run/example-angular).

## Verify

Start your app, go to it in the browser, then click around. Highlight will be recording your session and it will show up on <https://app.highlight.run/sessions> a few seconds after recording has started.

## Configuration

Integration with [Angular ErrorHandler](https://angular.io/api/core/ErrorHandler) coming soon!
