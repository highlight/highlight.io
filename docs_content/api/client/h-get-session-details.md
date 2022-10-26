---
title: H.getSessionDetails()
slug: 8gk0-hgetsessiondetails
createdAt: 2021-10-19T20:50:14.000Z
updatedAt: 2021-10-19T20:57:59.000Z
---

This method is used to get the Highlight session URL. This method provides the same URL as [H.getSessionUrl()](/api/client/h-get-session-url) but this also gives you a URL for the exact time (relative to the session recording) the method is called.

```typescript
H.getSessionDetails().then(({url, urlWithTimestamp}) => {
    console.log(url, urlWithTimestamp);
});
```

## Example

An error is thrown in your app and you want to save the Highlight session URL to another app (Mixpanel, Sentry, Amplitude, etc.).

If you just want a URL to the session, you can save `url`.&#x20;

If you want a URL that sets the player to the time of when the error is called, you can save `urlWithTimestamp`.

```typescript
// Some error handling hook
otherLibrary.onError((error, context) => {
    H.getSessionDetails().then(({url, urlWithTimestamp}) => {
         context.addMetadata({
            highlightUrl: url,
            highlightDirectUrl: urlWithTimestamp
        });
    });
});
```



