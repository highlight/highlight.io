
title: Content-Security-Policy
slug: 9pQt-content-security-policy
createdAt: 2022-03-01T00:39:25.000Z
updatedAt: 2022-03-01T01:08:28.000Z
---

:::hint
You should keep reading this if your application runs in an environment that enforces content security policies.
:::

`Content-Security-Policy` allows you to tell the browser what and how your page can interact with third-party scripts.

Here are the policies you'll need to set to use Highlight:

1.  `script-src`: `https://static.highlight.run/`
    1.  This policy is to allow downloading the Highlight runtime code for session recording and error monitoring.

2.  `connect-src`: `https://pub.highlight.run`
    1.  This policy is to allow connecting with Highlight servers to receive recorded session data.
