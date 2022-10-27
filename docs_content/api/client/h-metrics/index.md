---
title: H.metrics()
slug: F65Z-hmetrics
createdAt: 2022-10-03T19:34:32.000Z
updatedAt: 2022-10-18T23:23:34.000Z
---

This method is used to submit custom metrics. You can learn more about [Frontend Observability.](/product-features/frontend-observability)

```typescript
H.metrics(metrics: Metric[]) => void;
```

## `metrics`* (Metrics\[]) *Required

<<<<<<< HEAD:docs_content/api/h-metrics.md
A list of metrics that you'd like to report. Check out [Metrics](/api/h-metrics)&#x20;
=======
A list of metrics that you'd like to report. Check out [Metrics](/api/client/h-metrics/metrics)&#x20;
>>>>>>> 6a87c7f22b46e7119735614fdcc7471572bbfa9f:docs_content/api/client/h-metrics/index.md

### Example

```typescript
H.metrics([{
	name: 'clicks',
	value: 1,
	tags: [{ browser }]
}, {
	name: 'auth_time',
	value: authDelay,
	tags: [{ version: 'v2' }]
}
```


## `name` *(string)*

The name of the metric you are reporting.

## `value` *(number)*

The numeric value of the metric.

## `tags` *({ name: string; value: string }\[])*

A set of name,value pairs the represent tags about the metric. Tags can be used to filter and group metrics. See [Frontend Observability](/product-features/frontend-observability) for more details.