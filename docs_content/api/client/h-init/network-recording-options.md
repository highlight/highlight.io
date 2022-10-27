---
title: NetworkRecordingOptions
slug: UXu0-networkrecordingoptions
createdAt: 2021-09-14T01:21:56.000Z
updatedAt: 2022-10-14T00:25:20.000Z
---

These are the [H.init()](/api/client/h-init) options to configure how and what network requests/responses Highlight records. You can see [Recording Network Requests and Responses](/session-replay/recording-network-requests-and-responses) for more information about the feature.

## `enabled` *(boolean)*

&#x20;Enables recording of network requests. The data includes the URLs, the size of the request, and how long the request took.

The default value is `true`.

## `recordHeadersAndBody` *(boolean)*

This enables recording `XMLHttpRequest` and `Fetch` headers and bodies.

The default value is `false`.

## `networkHeadersToRedact` *(string\[])*

Request and response headers where the value is not recorded. The header value is replaced with `'[REDACTED]'`. These headers are case-insensitive.

`recordHeadersAndBody` needs to be `true`.

### Example

```typescript
H.init("<YOUR_PROJECT_ID>", {
    networkRecording: {
        recordHeadersAndBody: true,
        networkHeadersToRedact: ['Secret-Header', 'Plain-Text-Password']
    }
})
```

## `urlBlocklist` *(string\[])*

URLs to not record headers and bodies for. To disable recording headers and bodies for all URLs, set  `recordHeadersAndBody` to `false`.

A request's header/body will be ignored if the network request's URL contains one of the `urlBlocklist` entries.

### Example

```typescript
H.init("<YOUR_PROJECT_ID>", {
    networkRecording: {
        recordHeadersAndBody: true,
        urlBlocklist: ['https://www.googleapis.com/identitytoolkit', 'https://securetoken.googleapis.com']
    }
})
```

The default value is listed in [Recording Network Requests and Responses](/session-replay/recording-network-requests-and-responses).



## `headerKeysToRecord` *(string\[])*

Specifies the keys for request/response headers to record.

This option wil override `networkHeadersToRedact` if specified. `recordHeadersAndBody` needs to be enabled, otherwise this is a no-op.

Only available in `highlight.run` versions newer than `4.1.0`.

### Example

```javascript
H.init("YOUR_PROJECT_ID", {
    networkRecording: {
        recordHeadersAndBody: true,
        headerKeysToRecord: ['id', 'pageNumber']
    }
})

// Only `headers.id` and `headers.pageNumber` will be recorded.
headers = {
    'id': '123',
    'pageNumber': '1',
    'secret-token': 'super-sensitive-value',
    'plain-text-password': 'password123',
}
```

See [Recording Network Requests and Responses](/session-replay/recording-network-requests-and-responses) for more information.

## `bodyKeysToRecord` *(string\[])*

Specifies the keys for request/response bodies to record.

Only available in `highlight.run` versions newer than `4.1.0`.

### Example

```javascript
H.init("YOUR_PROJECT_ID", {
    networkRecording: {
        recordHeadersAndBody: true,
        bodyKeysToRecord: ['id', 'pageNumber']
    }
})

// Only `body.id` and `body.pageNumber` will be recorded.
body = {
    'id': '123',
    'pageNumber': '1',
    'secret-token': 'super-sensitive-value',
    'plain-text-password': 'password123',
}
```

See [Recording Network Requests and Responses](/session-replay/recording-network-requests-and-responses) for more information.

## `destinationDomains` *(string\[])*

Record frontend network request metrics that are sent to the following list of domains. A domain substring match is used to determine if a network request matches one of the following values.

Only available in `highlight.run` versions newer than `4.4.0`.

### Example

```javascript
H.init("YOUR_PROJECT_ID", {
    networkRecording: {
        destinationDomains: ['backend.example.com']
    }
})

// Only network requests to the domains listed will have their metrics recorded
// for display in dashboards or for use in metric monitors.
```

See [Recording Network Requests and Responses](/session-replay/recording-network-requests-and-responses) for more information.

