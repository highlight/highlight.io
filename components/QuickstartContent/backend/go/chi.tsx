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

export const GoChiContent: QuickStartContent = {
  subtitle: 'Learn how to set up highlight.io on your Go gqlgen backend.',
  entries: [
    frontendInstallSnippet,
    goGetSnippet,
    initializeGoSdk,
    {
      title: 'Add the Highlight middleware.',
      content: '`highlightChi.Middleware` is a Chi compatible middleware.',
      code: {
        text: `import (
  highlightChi "github.com/highlight/highlight/sdk/highlight-go/middleware/chi"
)

func main() {
  // ...
  r := chi.NewRouter()
  r.Use(highlightChi.Middleware)
  // ...
}`,
        language: 'go',
      },
    },
    customGoError,
    verifyCustomError,
    setUpLogging('chi'),
  ],
}
