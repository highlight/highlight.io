import { QuickStartContent } from "../quickstart-content";
import { identifySnippet, initializeSnippet, setupBackendSnippet, verifySnippet } from "./shared-snippets";

export const ReactContent: QuickStartContent = {
    subtitle: "Learn how to set up highlight.io with any application that gives you access to an `index.html` file.",
    entries: [
        {
            title: "Import the script in your index html file.",
            content: "Add the following script tag to your `index.html` file.",
            code: {
                text: `<html>
	<head>
		<script src="https://unpkg.com/highlight.run"></script>
	</head>
	<body>
		<!-- Your Application -->
	</body>
</html>
`,
                language: "bash",
            }
        },
        {
            title: "Initialize the SDK.",
            content: "Call the `init()` method in a script tag just below the initialize script tag",
            code: {
                text: `<html>
	<head>
		<script src="https://unpkg.com/highlight.run"></script>
        <script>
            window.H.init('<YOUR_PROJECT_ID>') // Get your project ID from https://app.highlight.io/setup
        </script>
	</head>
	<body>
		<!-- Your Application -->
	</body>
</html>
`,
                language: "bash",
            }
        },
        identifySnippet,
        verifySnippet,
        setupBackendSnippet,
    ]
}
