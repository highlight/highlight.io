---
title: H.stop()
slug: RFnK-hstop
createdAt: 2021-09-13T23:30:11.000Z
updatedAt: 2022-07-28T22:02:16.000Z
---

This method is used to stop Highlight from recording. Recording can be resumed later by calling [`H.start()`](/api/client/h-start).

```typescript
H.stop()
```

## Example

```typescript
H.init("<YOUR_PROJECT_ID>");

// Elsewhere in your app
H.stop();
```

