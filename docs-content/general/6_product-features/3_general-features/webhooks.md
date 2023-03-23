---
title: Webhooks
slug: webhooks
createdAt: 2021-09-14T00:14:56.000Z
updatedAt: 2021-09-14T19:03:52.000Z
---

All alerts can route notifications to webhooks via a HTTP POST JSON payload. For example, if you are hosting an HTTP webserver listening on `https://example.com/api/webhook`, you can [configure alerts on Highlight](https://app.highlight.io/alerts)

```json
{
  "Event": "ERROR_ALERT",
  "ErrorCount": 1,
  "ErrorTitle": "RetryableError OPENSEARCH_ERROR [docker_errors-com...",
  "SessionURL": "https://app.highlight.io/1/sessions/",
  "ErrorURL": "https://app.highlight.io/1/errors/sqavrqpCyrkOdDoYjMF7iM0Md2WT/instances/11493",
  "ErrorResolveURL": "https://app.highlight.io/1/errors/sqavrqpCyrkOdDoYjMF7iM0Md2WT/instances/11493?action=resolved",
  "ErrorIgnoreURL": "https://app.highlight.io/1/errors/sqavrqpCyrkOdDoYjMF7iM0Md2WT/instances/11493?action=ignored",
  "ErrorSnoozeURL": "https://app.highlight.io/1/errors/sqavrqpCyrkOdDoYjMF7iM0Md2WT/instances/11493?action=snooze",
  "UserIdentifier": "vadim@highlight.run",
  "VisitedURL": "https://app.highlight.io/1/alerts"
}
```
