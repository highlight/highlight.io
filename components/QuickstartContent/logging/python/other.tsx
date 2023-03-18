import { QuickStartContent } from '../../QuickstartContent'
import { previousInstallSnippet, verifyLogs } from '../shared-snippets'

export const PythonOtherLogContent: QuickStartContent = {
  title: 'Python',
  subtitle: 'Learn how to set up highlight.io Python log ingestion without a logging library.',
  entries: [
    previousInstallSnippet('python'),
    {
      title: 'Call the built-in Python logging library.',
      content:
        'Logs are automatically recorded by the highlight SDK. Arguments passed as a dictionary as the second parameter will be interpreted as structured key-value pairs that logs can be easily searched by.',
      code: {
        text: `import logging

def main():
    logging.info('hello, world!')
    logging.warn('whoa there', {'key': 'value'})
`,
        language: 'python',
      },
    },
    verifyLogs,
  ],
}
