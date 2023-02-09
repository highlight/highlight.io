---
title: Cross Origin Iframe Recording
slug: cross-origin-iframes
createdAt: 2023-01-06T00:14:06.000Z
updatedAt: 2023-01-06T16:44:20.000Z
---

```hint
Cross-origin iframe support is still in development. If you have any questions or suggestions please reach out to us at support@highlight.io
```

[Cross-origin iframes](https://learn.microsoft.com/en-us/skype-sdk/ucwa/cross_domainiframe) are `<iframe>` elements in your app that reference a domain considered to be of a [different origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). When your iframe uses a `src` tag pointing to a different origin, the iframe is not accessible from the parent page. However, the iframe can still emit messages that the parent page can hear.

To support cross-origin iframes, we added functionality into our recording client that allows the iframe to forward its events to the parent session. All you need to do is add the Highlight snippet to both the parent window and the iframe.

Ensure you are using [highlight.run](https://www.npmjs.com/package/highlight.run) 5.2.0 or newer. Then, add the following option to the `H.init` call **inside of your iframe**.

```typescript
import { H } from 'highlight.run'

H.init('<YOUR_PROJECT_ID>', {
    isCrossOriginIframe: true,
})
```

Ensure that you add the `H.init` call to both the parent page and the iframe page, but that you only set `isCrossOriginIframe` **in the H.init call of your iframe**. Otherwise your sessions will not be recorded.
