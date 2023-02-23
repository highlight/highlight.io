---
title: Adding an OpenTelemetry SDK
slug: adding-an-sdk
createdAt: 2023-01-24T20:28:14.000Z
updatedAt: 2023-01-24T02:07:22.000Z
---

The highlight.io SDKs are powered by [OpenTelemetry](https://opentelemetry.io/) under the hood, and therefore report data to our deployed opentelemetry [collector](https://otel.highlight.io). For a better understanding of the architecture, take a look at the [architecture page](architecture.md) for a diagram of how data is sent to the collector and the public graph.

In our SDKs, we instantiate the following constructs to exports data over OTLP HTTPS to https://otel.highlight.io:4318/v1/traces and https://otel.highlight.io:4318/v1/logs respectively.

- TracerProvider - sets the global otel sdk configuration for traces
- BatchSpanProcessor - batches traces so they are exported in sets
- OTLPSpanExporter - exports traces to our collector over OTLP HTTPS

- LoggerProvider - sets the global otel sdk configuration for logs
- BatchLogRecordProcessor - batches logs so they are exported in sets
- OTLPLogExporter - exports logs to our collector over OTLP HTTPS

The SDK provides common methods for recording exceptions or logging, but this may depend on the language. For example, in Golang, a logger hook API is provided to be configured by the application, but in Python, we automatically ingest a hook into the built in `logging` package.

## Recording an Error

Data we send over the OpenTelemetry specification is sent per the [semantic conventions](https://opentelemetry.io/docs/reference/specification/trace/semantic_conventions/).

### Reporting an Error as an OTEL Trace

### Reporting a Log as an OTEL Trace

## Recording a Log

If an SDK supports the experimental logs ingest endpoint (v1/logs), prefer using that. Otherwise, see above for reporting the log as a trace event.

A LogRecord is exported with an associated trace. Specific attributes for the file logging, line number, and more are set based on the [logging semantic convention keys](https://opentelemetry.io/docs/reference/specification/logs/semantic_conventions/).

Here's an example of the interception of python `logging` calls in our [Python SDK](https://github.com/highlight/highlight/blob/93bfea864440a1976ac945ba2b40a34cf3b53479/sdk/highlight-py/highlight_io/sdk.py#L139-L160) to emit an OTEL LogRecord.

```python

attributes = span.attributes.copy()
attributes["code.function"] = record.funcName
attributes["code.namespace"] = record.module
attributes["code.filepath"] = record.pathname
attributes["code.lineno"] = record.lineno
r = LogRecord(
    timestamp=int(record.created * 1000.0 * 1000.0 * 1000.0),
    trace_id=ctx.trace_id,
    span_id=ctx.span_id,
    trace_flags=ctx.trace_flags,
    severity_text=record.levelname,
    severity_number=std_to_otel(record.levelno),
    body=record.getMessage(),
    resource=span.resource,
    attributes=attributes,
)

```
