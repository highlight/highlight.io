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

export const GoGinContent: QuickStartContent = {
  subtitle: 'Learn how to set up highlight.io on your Go gqlgen backend.',
  entries: [
    frontendInstallSnippet,
    goGetSnippet,
    initializeGoSdk,
    {
      title: 'Add the Highlight middleware.',
      content: '`highlightGin.Middleware()` provides is a Gin compatible middleware.',
      code: {
        text: `import (
  highlightGin "github.com/highlight/highlight/sdk/highlight-go/middleware/gin"
)

func main() {
  // ...
  r := gin.Default()
  r.Use(highlightGin.Middleware())
  // ...
}`,
        language: 'go',
      },
    },
    customGoError,
    verifyCustomError,
    setUpLogging('gin'),
  ],
}
