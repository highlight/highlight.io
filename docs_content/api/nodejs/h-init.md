---
title: H.init()
slug: bmjm-hinit
createdAt: 2022-10-24T20:56:50.000Z
updatedAt: 2022-10-24T22:58:55.000Z
---

```typescript
init: (options: NodeOptions) => void
```

## Purpose

`H.init()` initializes the Highlight backend SDK. It is required to call this method before recording backend errors or metrics.

## Example Usage

```typescript
import { H } from "@highlight-run/node";

const highlightOptions = {};
if (!H.isInitialized()) {
  H.init(highlightOptions);
}
```

## Options

`disableErrorSourceContext` : optional boolean, default false

*   Disables source code context lines for error reporting. This may be useful for performance if your source files are particularly large or memory is limited.

`errorSourceContextCacheSizeMB` : optional number, default 10

*   Source files are cached in memory to speed up error reporting and avoid costly disk access. The default cache size is 10MB, but this can be overridden. Specifying a value <= 0 removes all cache size limits.

