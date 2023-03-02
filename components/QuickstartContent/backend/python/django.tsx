import { QuickStartContent } from '../../QuickstartContent'

export const PythonDjangoContext: QuickStartContent = {
  subtitle: 'Learn how to set up highlight.io on your Python Django backend API.',
  entries: [
    {
      title: 'Setup your frontend Highlight snippet with tracingOrigins.',
      content:
        'Make sure that you followed the [fullstack mapping guide](../../../getting-started/frontend-backend-mapping#How-can-I-start-using-this).',
      code: {
        text: `H.init("<YOUR_PROJECT_ID>", {
    tracingOrigins: ['localhost', 'example.myapp.com/backend'],
    networkRecording: {
      enabled: true,
      recordHeadersAndBody: true,
    },
  });
`,
        language: 'js',
      },
    },
    {
      title: 'Install the highlight-io python package.',
      content: 'Download the package from pypi and save it to your requirements.',
      code: {
        text: `poetry add highlight-io[Django]
# or with pip
pip install highlight-io[Django]          
`,
        language: 'bash',
      },
    },
    {
      title: 'Initialize the Highlight SDK.',
      content: 'Add Highlight with the Django integration to your `settings.py` file.',
      code: {
        text: `import highlight_io
from highlight_io.integrations.django import DjangoIntegration

H = highlight_io.H("YOUR_PROJECT_ID", integrations=[DjangoIntegration()], record_logs=True)`,
        language: 'python',
      },
    },
    {
      title: 'Verify your installation.',
      content:
        'Check that your installation is valid by throwing an error. ' +
        'Change one of your Django views to the following code which will throw an exception. ' +
        'Access the Django route in your browser. ' +
        'You should see a `DivideByZero` error in the [Highlight errors page](https://app.highlight.io/errors) ' +
        'within a few moments.',
      code: {
        text: `import logging
import random

from django.http import HttpResponse, HttpRequest


def index(request: HttpRequest):
    return HttpResponse(f"This might not go well. result is {2 / 0}")
`,
        language: 'python',
      },
    },
    {
      title: 'Set up logging.',
      content:
        'Next, set up log ingestion! Follow the [logging setup guide](../../../getting-started/backend-logging/python/django).',
    },
  ],
}
