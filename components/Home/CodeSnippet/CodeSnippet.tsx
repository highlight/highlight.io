import Image from 'next/image';
import SyntaxHighlighter, {
  SyntaxHighlighterProps,
} from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import CopyIcon from '../../../public/images/copy.svg';
import styles from '../../Home/Home.module.scss';

export const CodeSnippet = ({
  content,
  HeaderImage,
  canCopy,
  ...props
}: SyntaxHighlighterProps & {
  content: string;
  HeaderImage: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  canCopy?: boolean;
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
        {canCopy && (
          <div
            className={styles.codeSnippetCopy}
            onClick={() => navigator.clipboard.writeText(content)}
          >
            <div className={styles.codeSnippetCopyIcon}>
              <Image src={CopyIcon} alt="" />
            </div>
          </div>
        )}
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
