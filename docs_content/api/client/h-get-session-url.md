---
title: H.getSessionURL()
slug: BAv_-hgetsessionurl
createdAt: 2021-09-13T23:29:31.000Z
updatedAt: 2021-12-09T00:32:38.000Z
---

This method is used to get the Highlight session URL for the current recording session. This is useful to use if you'd like to send the session URL to another application. See [H.getSessionDetails()](/api/client/h-get-session-details) if you want to get the URL with the current time.

```typescript
const highlightSessionUrl = await H.getSessionURL(); // Returns https://app.highlight.run/sessions/<SESSION_ID>

thirdPartyApi.setMetadata({
    highlightSessionUrl
});
```

## Use Cases

*   [Sentry Integration](/integrations/sentry-integration)&#x20;

