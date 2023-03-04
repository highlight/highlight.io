import { QuickStartContent } from '../../QuickstartContent'
import { frontendInstallSnippet } from '../shared-snippets'
import {
  customGoError,
  goGetSnippet,
  initializeGoSdk,
  setUpLogging,
  verifyCustomError,
  verifyGoErrors,
} from './shared-snippets'

export const GoMuxContent: QuickStartContent = {
  subtitle: 'Learn how to set up highlight.io on your Go gqlgen backend.',
  entries: [
    frontendInstallSnippet,
    goGetSnippet,
    initializeGoSdk,
    {
      title: 'Add the Highlight gqlgen error handler.',
      content:
        '`H.NewGraphqlTracer` provides a middleware you can add to your GraphQL handler to automatically record and send GraphQL resolver errors to Highlight.',
      code: {
        text: `import (
  highlightGorillaMux "github.com/highlight/highlight/sdk/highlight-go/middleware/gorillamux"
)

func main() {
  // ...
  r := mux.NewRouter()
  r.Use(highlightGorillaMux.Middleware)
  // ...
}`,
        language: 'go',
      },
    },
    customGoError,
    verifyCustomError,
    setUpLogging('mux'),
  ],
}
