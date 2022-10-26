---
title: Highlight()
slug: 6Xia-highlight
createdAt: 2022-10-13T18:11:25.000Z
updatedAt: 2022-10-18T21:48:43.000Z
---

```typescript
Highlight = (options?: NodeOptions) => <T>(origHandler: NextApiHandler<T>) => NextApiHandler<T>;
```

## Purpose

`Highlight()` generates a function that you can use to wrap your API handlers to provide backend error monitoring. If an error is thrown during the handler's execution, it is sent to Highlight and linked to the frontend session which caused the error.

## Example Usage

Typically, you would configure any necessary settings, and then export a common wrapper you can use to wrap all of your API handlers.

```typescript
import { Highlight } from "@highlight-run/next";

export const withHighlight = Highlight();
```

```typescript
import { withHighlight } from "../highlight.config";

const handler = async (req, res) => {
	res.status(200).json({ name: "Jay" });
};

export default withHighlight(handler);
```

## Options

`disableErrorSourceContext` : optional boolean, default false

*   Disables source code context lines for error reporting. This may be useful for performance if your source files are particularly large or memory is limited.

`errorSourceContextCacheSizeMB` : optional number, default 10

*   Source files are cached in memory to speed up error reporting and avoid costly disk access. The default cache size is 10MB, but this can be overridden. Specifying a value <= 0 removes all cache size limits.

