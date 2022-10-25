---
title: Metrics
slug: BN8E-metrics
createdAt: 2022-10-13T18:20:48.000Z
updatedAt: 2022-10-24T22:59:19.000Z
---

# Submitting Backend Metrics

### Manual Instrumentation

If you want to add record additional metrics from your api handlers, add some manual instrumentation using the `@highlight-run/next`  package. Make sure your [Next.js](/getting-started/nextjs-sdk) frontend integration configures the `tracingOrigins`  in the `H.init`  call, per [H.init()](/api/client/h-init) .

```typescript
import { withHighlight } from "../highlight.config";
import { H } from '@highlight-run/next'

const handler = async (req, res) => {
	const start = global.performance.now();
	// do something expensive
	for (let i = 0; i < 1000; i++) {
		const _ = i * i;
	}
	const delta = global.performance.now() - start;
	H.metrics([{name: 'expensive-duration-ms', value: delta}])
	res.status(200).json({ name: "Jay" });
};

export default withHighlight(handler);

```

