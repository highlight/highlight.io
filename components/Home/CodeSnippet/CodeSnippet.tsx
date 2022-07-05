import SyntaxHighlighter, {
  SyntaxHighlighterProps,
} from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import styles from '../../Home/Home.module.scss';

export const CodeSnippet = ({
  content,
  HeaderImage,
  ...props
}: SyntaxHighlighterProps & {
  content: string;
  HeaderImage: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}) => {
  return (
    <div className={styles.codeSnippetFrame}>
      <div className={styles.codeSnippetTopbar}>
        <div className={styles.codeSnippetButtons}>
          <div className={styles.codeSnippetCircle}></div>
          <div className={styles.codeSnippetCircle}></div>
          <div className={styles.codeSnippetCircle}></div>
        </div>
        <div className={styles.codeSnippetIcon}>
          <HeaderImage color="white" />
        </div>
      </div>
      <div className={styles.codeSnippetContent}>
        <SyntaxHighlighter
          style={dracula}
          customStyle={{
            backgroundColor: 'transparent',
            padding: 0,
            margin: 0,
            overflow: 'scroll',
          }}
          {...props}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
