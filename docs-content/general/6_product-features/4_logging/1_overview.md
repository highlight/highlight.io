---
heading: Logging Features
title: Overview
slug: overview
createdAt: 2021-09-10T17:54:08.000Z
updatedAt: 2022-08-18T22:36:12.000Z
---

Logging is currently in alpha and you can find our logging product at [app.highlight.io/logs](https://app.highlight.io/logs). If you'd like to try out our logging features for backend or add a specific integration, hit us up in [our community](https://highlight.io/community) or send us an email at [jay@highlight.io](mailto:jay@highlight.io)!

# Logs overview

Logs are broken down into two discrete concepts: messages and attributes.

Given the following log:

```
logger.info('Queried table', {
  table: 'users',
  query: 'hello',
}),
```

The log message is `Queried table` and the attributes are `table:users` and `query:hello`.

## Searching logs

### Messages search

To search for a log message, simply type the text of the message.

Given the following log:

```
log.info("excluding session due to no user interaction events")
```

We can find this log by typing `excluding session due to no user interaction events`

<img width="736" alt="Screenshot 2023-03-24 at 2 34 02 PM" src="https://user-images.githubusercontent.com/58678/227633390-8c08ec10-f1a7-4f49-924d-f9ccaa211ab0.png">

### Attributes search

To search on a log attribute, add a `:` between search terms.

Given the following log:

```
log.info({
  user_id: 42,
})
```

We can search for it via:

- `user_id:42` matches every log where `user_id` is `42`
- `level:info` matches every log with level `info`

### Wildcard search

To perform a wildcard search, use the `*` symbol:

- `service:frontend*` matches every log that has a service starting with `frontend`
- `frontend*` matches all log messages starting with the word `frontend`
- `*frontend` matches all log messages ending with the word `frontend`

## Autoinjected attributes

By default, Highlight's SDKs will autoinject attributes to provide additional context as well as assisting in linking [sessions](../1_session-replay/) and [errors](../2_error-monitoring/) to their respective logs.

| Attribute        | Description                                        | Example                                                                                                                                           |
|------------------|----------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `code.filepath`  | Filepath of where the log was emitted.             | /build/backend/worker/worker.go                                                                                                                   |
| `code.function`  | Function of where the log was emitted.             | github.com/highlight-run/highlight/backend/worker.(*Worker).Start.func3                                                                           |
| `code.lineno`    | Line number of the file where the log was emitted. | 20                                                                                                                                                |
| `host.name`      | Hostname                                           | ip-172-31-5-211.us-east-2.compute.internal                                                                                                        |
| `os.description` | Description of operating system                    | Alpine Linux 3.17.2 (Linux ip-172-31-5-211.us-east-2.compute.internal 5.10.167-147.601.amzn2.aarch64 #1 SMP Tue Feb 14 21:50:23 UTC 2023 aarch64) |
| `os.type`        | Type of operating system                           | linux                                                                                                                                             |
| `level`          | The log level                                      | info                                                                                                                                              |
| `message`        | The log message                                    | public-graph graphql request failed                                                                                                               |
| `span.id`        | Span id that contains this log                     | 528a54addf6f91cc                                                                                                                                  |
