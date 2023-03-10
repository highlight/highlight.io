import { QuickStartContent } from '../../QuickstartContent'
import { previousInstallSnippet, verifyLogs } from '../shared-snippets'

export const GoOtherLogContent: QuickStartContent = {
  title: 'Go',
  subtitle: 'Learn how to set up highlight.io Go log ingestion without a logging library.',
  entries: [
    previousInstallSnippet('go'),
    {
      title: 'Call the Highlight logging SDK.',
      content: '',
      code: {
        text: `package main
        
import (
  "context"
  "github.com/highlight/highlight/sdk/highlight-go"
  "github.com/highlight/highlight/sdk/highlight-go/log"
)

func main() {
  // setup the highlight SDK
  highlight.SetProjectID("YOUR_PROJECT_ID")
  highlight.Start()
  defer highlight.Stop()
	
  // set whether you want highlight printing logs to console
  hlog.SetOutput(true)
  hlog.SetOutputLevel(hlog.DebugLevel)
  
  // use log sdk
  hlog.Info("welcome to highlight.io")
  // if using a web framework integration, pass the request context along to provide headers to our sdk
  hlog.WithContext(context.TODO()).Warn("oh no...")
  
  // extract session id and request id from our frontend sdk x-highlight-request header
  hlog.WithContext(context.TODO()).WithSession("a1b2c3").WithRequest("d4e5f6").Info("error handling frontend request with highlight context")
}`,
        language: 'go',
      },
    },
    verifyLogs,
  ],
}
