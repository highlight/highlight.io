---
title: Console Messages
slug: console-messages
createdAt: 2021-09-14T01:47:28.000Z
updatedAt: 2022-08-11T16:28:21.000Z
---

Highlight out of the box shows you the console messages that were logged during a session.

## Configuration

-   Disabling console recording can be configured with `disableConsoleRecording`.

-   You can specify which console methods to record with `consoleMethodsToRecord`.

```hint
Console messages are not recorded on `localhost` because Highlight emits debug messages which could cause an infinite loop in some situations.
```

See [H.init()](../../sdk-docs/client.md#Hinit) for more information.
