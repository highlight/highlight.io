---
title: H.parseHeaders()
slug: FI_f-hparseheaders
createdAt: 2022-10-24T22:21:00.000Z
updatedAt: 2022-10-24T22:58:42.000Z
---

```typescript
parseHeaders: (
	headers: IncomingHttpHeaders,
) => { secureSessionId: string; requestId: string } | undefined
```

## Purpose

`H.parseHeaders()` is a helper function for extracting the Highlight `secureSessionId` and `requestId` from network requests. These fields are sent with network requests as the `'x-highlight-request'` header, encoded as a slash-separated string: `"{secureSessionId}/{requestId}"`&#x20;

## Example Usage

```typescript
import * as http from 'http';
import { H } from "@highlight-run/node";

const onError = (request: http.IncomingMessage, error: Error): void => {
  const parsed = H.parseHeaders(request.headers);
	if (parsed !== undefined) {
		H.consumeError(error, parsed.secureSessionId, parsed.requestId)
	}
};
```

## Arguments

`headers` : IncomingHttpHeaders

*   The headers sent as part of your network request.

