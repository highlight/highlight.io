---
title: H.isInitialized()
slug: fQeG-hisinitialized
createdAt: 2022-10-24T20:56:56.000Z
updatedAt: 2022-10-24T22:58:56.000Z
---

```typescript
isInitialized: () => boolean
```

## Purpose

`H.isInitialized()` returns true if the Highlight backend SDK has been initialized. This may be handy if your initialization code could be called multiple times, e.g. if it is called conditionally from a request handler when a backend error or metric needs to be recorded.

## Example Usage

```typescript
import { H } from "@highlight-run/node";

const highlightOptions = {};
if (!H.isInitialized()) {
  H.init(highlightOptions);
}
```

