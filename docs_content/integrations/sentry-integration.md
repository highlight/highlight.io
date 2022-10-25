---
title: Sentry Integration
slug: ixW4-sentry-integration
createdAt: 2021-10-18T22:03:24.000Z
updatedAt: 2022-06-01T17:58:57.000Z
---

Highlight's [H.getSessionURL()](/api/client/h-get-session-url) gives you the URL to view a session. You can use this with [Sentry's Custom Contexts](https://docs.sentry.io/platforms/javascript/enriching-events/context/) to quickly view what happened in the session right before an error was thrown.

## Vanilla Javascript

This code example should be followed if you're using [Sentry's Javascript SDK](https://docs.sentry.io/platforms/javascript/).

```javascript
import * as Sentry from "@sentry/browser";
import { H } from 'highlight-run';

H.init("<YOUR_PROJECT_ID");

Sentry.init({
  // Your Sentry config.
});

// `sessionUrl` is `undefined` if the session hasn't started yet.
// This is why we pass a function to `getSessionURL()` which is
// called when the session has started.
H.getSessionURL().then(sessionUrl => {
    Sentry.setContext("highlight", {
        "url": sessionUrl
    });
});

```

## React

This code example should be followed if you're using [Sentry's React SDK](https://docs.sentry.io/platforms/javascript/guides/react/enriching-events/context/).

```javascript
import * as Sentry from "@sentry/react";
import { H } from 'highlight-run';

H.init("<YOUR_PROJECT_ID");

Sentry.init({
  // Your Sentry config.
});

// `sessionUrl` is `undefined` if the session hasn't started yet.
// This is why we pass a function to `getSessionURL()` which is
// called when the session has started.
H.getSessionURL().then(sessionUrl => {
    Sentry.setContext("highlight", {
        "url": sessionUrl
    });
});

```

## Sentry with Highlight Proxy

When [Proxying Highlight](/tips/proxying-highlight), you'll find Sentry tracking the session recording traffic flowing to your subdomain. Since this traffic isn't useful to monitor, you may want to ignore these requests in Sentry. You can find the Sentry docs describing how to do that [here](https://docs.sentry.io/platforms/javascript/enriching-events/breadcrumbs/#customize-breadcrumbs).&#x20;

For example, to filter Sentry recording of Highlight data when your domain is `example.com`

```javascript
Sentry.init({
  // ...
  beforeBreadcrumb(breadcrumb, hint) {
    if (
        breadcrumb.category === 'xhr' &&
        breadcrumb.data?.url.contains('highlight.example.com')
    ) {
        return null;
    }
    return breadcrumb;
  },
});
```

