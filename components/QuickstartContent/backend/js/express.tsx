import { siteUrl } from '../../../../utils/urls'
import { QuickStartContent } from '../../QuickstartContent'
import { frontendInstallSnippet } from '../shared-snippets'
import { addIntegrationContent, initializeNodeSDK, jsGetSnippet, setupLogging, verifyError } from './shared-snippets'

export const JSExpressContent: QuickStartContent = {
  title: 'Express.js',
  subtitle: 'Learn how to set up highlight.io in Express.js.',
  logoUrl: siteUrl('/images/quickstart/express.svg'),
  entries: [
    frontendInstallSnippet,
    jsGetSnippet('node'),
    initializeNodeSDK('node'),
    {
      title: `Add the Express.js Highlight integration.`,
      content: addIntegrationContent('Node Highlight SDK', 'nodejs'),
      code: {
        text: `import { Handlers } from '@highlight-run/node'
// or like this with commonjs
// const Highlight = require('@highlight-run/node')

const app = express()

const highlightErrorHandler = Handlers.errorHandler({ projectID: 'YOUR_PROJECT_ID' })

app.get('/', (req, res) => {
  res.send(\`Hello World! ${Math.random()}\`)
})

// This should be before any other error middleware and after all controllers (route definitions)
app.use(highlightErrorHandler)
app.listen(8080, () => {
  console.log(\`Example app listening on port 8080\`)
})`,
        language: `js`,
      },
    },
    verifyError(
      'express.js',
      `app.get('/', (req, res) => {
  throw new Error('sample error!')
  res.send(\`Hello World! ${Math.random()}\`)
})`,
    ),
    setupLogging('express'),
  ],
}
