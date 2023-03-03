import { QuickStartContent } from '../../QuickstartContent'
import { frontendInstallSnippet } from '../shared-snippets'
import { customGoError, goGetSnippet, initializeGoSdk, setUpLogging, verifyGoErrors } from './shared-snippets'

export const GoFiberContent: QuickStartContent = {
  subtitle: 'Learn how to set up highlight.io on your Go Fiber backend.',
  entries: [
    frontendInstallSnippet,
    goGetSnippet,
    initializeGoSdk,
    {
      title: 'Add the Highlight Fiber error handler.',
      content:
        '`highlightFiber.Middleware()` provides a Fiber middleware to automatically record and send errors to Highlight.',
      code: {
        text: `import (
  highlightFiber "github.com/highlight/highlight/sdk/highlight-go/middleware/fiber"
)

func main() {
  // ...
  app := fiber.New()
  app.Use(highlightFiber.Middleware())
  // ...
}`,
        language: 'go',
      },
    },
    customGoError,
    verifyGoErrors,
    setUpLogging('fiber'),
  ],
}
