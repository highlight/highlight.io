import { QuickStartContent } from '../../QuickstartContent'
import { previousInstallSnippet, verifyLogs } from '../shared-snippets'

export const GoOtherContent: QuickStartContent = {
  subtitle: 'Learn how to set up highlight.io Go log ingestion without a logging library.',
  entries: [
    previousInstallSnippet,
    {
      title: 'Call the Highlight logging SDK.',
      content: '',
      code: {
        text: `import (
  "github.com/highlight/highlight/sdk/highlight-go"
  "github.com/highlight/highlight/sdk/highlight-go/log"
  "github.com/sirupsen/logrus"
  "go.opentelemetry.io/otel/attribute"
)

func main() {
  // set whether you want highlight printing logs to console
  highlight.SetLogOut(true)
  hlog.Info("welcome to highlight.io")
  hlog.Warn("oh no...")
  
  // extract session id and request id from our frontend sdk x-highlight-request header
  hlog.Error(
    "error handling frontend request with highlight context", 
    attribute.String(highlight.SessionIDAttribute, "..."), 
    attribute.String(highlight.RequestIDAttribute, "..."),
    )
}`,
        language: 'go',
      },
    },
    verifyLogs,
  ],
}
