---
title: H.start()
slug: aSrt-hstart
createdAt: 2021-09-13T23:30:05.000Z
updatedAt: 2022-07-28T21:59:38.000Z
---

This method is used to start Highlight if [`H.init()`](/api/h-init) was called with `manualStart` set to `true`.

```typescript
H.start(options: StartOptions)
```

### `options`

*   `silent` (`boolean`): specifies whether `console.warn` messages created in this method should be skipped.

## Example

```typescript
H.init("<YOUR_PROJECT_ID>", {
    manualStart: true
});

// Elsewhere in your app
H.start({
    silent: false
});
```

