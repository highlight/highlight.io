---
title: Gatsby.js
slug: 4TkG-gatsbyjs
createdAt: 2021-09-13T23:00:44.000Z
updatedAt: 2022-04-01T19:51:11.000Z
---

## 👋 Welcome!

Let's get you up and running with Highlight. **We should be done in less than 2 minutes.**

## Installing the SDK

Install `@highlight-run/gatsby-plugin-highlight` using your package manager.

:::codeblocktabs
```none
npm install @highlight-run/gatsby-plugin-highlight
```

```shell
yarn add @highlight-run/gatsby-plugin-highlight
```
:::

## Register Highlight as a Gatsby Plugin

You will need to register the Highlight Gatsby Plugin.

```javascript
module.exports = {
  plugins: [
    {
      resolve: "@highlight-run/gatsby-plugin-highlight",
      options: {
        orgID: "<YOUR_PROJECT_ID>" // Get your project ID from https://app.highlight.run/setup
      }
    },
  ]
}
```

## Verify

Start your app, go to it in the browser, then click around. Highlight will be recording your session and it will show up on <https://app.highlight.run/sessions> a few seconds after recording has started.
