---
title: Mixpanel Integration
slug: 8xnb-mixpanel-integration
createdAt: 2021-09-13T23:57:09.000Z
updatedAt: 2021-12-03T23:56:06.000Z
---

We've made it easy to use Mixpanel with Highlight. When you initialize Highlight, you can set your Mixpanel Project Token.

```typescript
H.init(
  '<YOUR_ORGANIZATION_ID>',
  {
    integrations: {
        mixpanel: {
          projectToken: '<MIXPANEL_PROJECT_TOKEN>'
      }
    }
  }
)
```

## API

### `track()`

Calling [`H.track()`](/api/client/h-track) will forward the data to Mixpanel's `track()`. Highlight will also add a Mixpanel property called `highlightSessionURL`  which contains the URL to the Highlight session where the track event happened.

### `identify()`

Calling [`H.identify()`](/api/client/h-identify) will forward the data to Mixpanel's `identify()`.

