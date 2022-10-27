---
title: H.init()
slug: yo4F-hinit
createdAt: 2021-09-13T23:24:50.000Z
updatedAt: 2022-10-14T00:28:20.000Z
---

This method is called to initialized Highlight in your application.

```typescript
H.init(projectId?: string, options?: HighlightOptions) => void;
```

*   You can find your `projectId` by going to <https://app.highlight.run/setup>.

### `projectId` *(string)*

The `projectId` tells Highlight where to send data to. You can find your `projectId` on <https://app.highlight.run/setup>.

If `projectId` is not set, then Highlight will not send any data. You can use this as a mechanism to control which environments Highlight gets initialized in if the `projectId` is passed as an environment variable.

## `HighlightOptions`

### `backendUrl`* (string)*

Specifies the URL that Highlight will send data to. You should not use this unless you are running an on-premise instance.

You may be interested in [Proxying](/tips/proxying-highlight) to make sure your errors and sessions are not blocked by extensions.

### `manualStart`* (boolean)*

Specifies if Highlight should not automatically start recording when the app starts. This should be used with [`H.start()`](/api/client/h-start)  and [`H.stop()`](/api/client/h-stop) if you want to control when Highlight records.

The default value is `false`.

### `disableConsoleRecording`* (boolean)*

Specifies whether Highlight records console messages.

It can be helpful to set this to `true` while developing locally so you can see where console messages are being made in your source code.

The default value is `false`.

### `consoleMethodsToRecord`* (string\[])*

This configuration is available starting in version `2.11.0`.

The value here will be ignored if `disabledConsoleRecording` is `true`.

The default value is `['assert', 'count', 'countReset', 'debug', 'dir', 'dirxml', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'table', 'time', 'timeEnd', 'timeLog', 'trace', 'warn']`.

### `enableSegmentIntegration`* (boolean)*

Allows patching of segment requests to enhance data automatically in your application (i.e. `identify`, `track`, etc..)

*The default value is *`false`*.*

### `environment`* (string)*

Specifies the environment your application is running in.

See [Environments](/product-features/environments) to see how setting the environment can help you move faster.

*The default value is *`production`*.*

<<<<<<< HEAD:docs_content/api/h-init.md
### `networkRecording` *(*[*NetworkRecordingOptions*](/api/h-init)*)*
=======
### `networkRecording` *(*[*NetworkRecordingOptions*](/api/client/h-init/network-recording-options)*)*
>>>>>>> 6a87c7f22b46e7119735614fdcc7471572bbfa9f:docs_content/api/client/h-init/index.md

Specifies how and what network requests and responses Highlight records.

See [Recording Network Requests and Responses](/session-replay/recording-network-requests-and-responses) for more information.

### `version`* (string)*

Specifies the version of your application.

See [Versioning Sessions](/session-replay/versioning-sessions) and [Versioning Errors](/error-monitoring/versioning-errors) to see how setting the version can help you move faster.

### `enableStrictPrivacy`* (boolean)*

Specifies whether Highlight should redact all text and image data during recording.

This is useful to make sure you are not recording any personally identifiable information without having to manually add annotations to elements you don't want to be recorded. See [Privacy](/session-replay/privacy) to learn more about the privacy options.

The default value is `false`.

### `integrations`

Specifies the configurations for the integrations that Highlight supports. See [Integrations](/integrations) for more information.

### `enableCanvasRecording`

Specifies whether Highlight will record the contents of `<canvas>` elements. See [Canvas](/product-features/canvas) for more information.

The default value is `false`.

This is only available on versions greater than `2.7.5` of `highlight-run`.

### `enablePerformanceRecording`

Specifies whether Highlight will record performance metrics (e.g. FPS, device memory). See [Performance Data](/product-features/performance-data) for more information.

The default value is `true`.

### `sessionShortcut`

Specifies the keyboard shortcut to open the current session in Highlight.

We support the same syntax as [hotkeys](https://github.com/jaywcjlove/hotkeys) for configuring the keyboard shortcut.

The default value is `false`.

```javascript
// Disable the session shortcut. The is the default behavior.
H.init("<YOUR_PROJECT_ID>", {
    "sessionShortcut": false
});

// Enable the session shortcut with the Ctrl and 0 keys.
H.init("<YOUR_PROJECT_ID>", {
    "sessionShortcut": "ctrl+0"
});

// Enable the session shortcut with the Ctrl+0 and Ctrl+p keys.
H.init("<YOUR_PROJECT_ID>", {
    "sessionShortcut": "ctrl+0,ctrl+p"
});

// Enable the session shortcut with the Ctrl+0 and Command+0 keys.
H.init("<YOUR_PROJECT_ID>", {
    "sessionShortcut": "ctrl+0,command+0"
});
```

See [Session Shortcut](/session-replay/session-shortcut) for more information.

### `feedbackWidget`

Specifies the configuration for the Highlight feedback widget. This widget is used to collect user feedback. The feedback is collected in the context of the session.

### `tracingOrigins` *(boolean | (string | RegExp)\[])*

Specifies where the backend of the app lives. If specified, Highlight will attach the `X-Highlight-Request` header to outgoing requests whose destination URLs match a substring or regexp from this list, so that backend errors can be linked back to the session. If `true` is specified, all requests to the current domain will be matched. Example tracingOrigins: `['localhost', /^\//, 'backend.myapp.com']`


These are the [H.init()](/api/h-init) options to configure how and what network requests/responses Highlight records. You can see [Recording Network Requests and Responses](/session-replay/recording-network-requests-and-responses) for more information about the feature.

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

