---
title: H.track()
slug: wQNp-htrack
createdAt: 2021-09-13T23:28:35.000Z
updatedAt: 2022-03-22T16:39:03.000Z
---

This method is used to track events that happen during the session. You can learn more [Tracking Events](/session-replay/tracking-events).

```typescript
H.track(eventName: string, metadata: [key: string]: string | boolean | number) => void;
```

## `eventName`* (string) *Required

The name of the event.

## `metadata`

Metadata for the event. You can think of these as additional tags for the event.

### Example

```typescript
H.track("Opened Shopping Cart", {
    accountType: "premium",
    cartSize: 10
});
```

