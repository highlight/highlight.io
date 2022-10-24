import styles from '../Docs.module.scss';
import { CodeBlock } from 'react-code-blocks';
import { PropsWithChildren } from 'react';
import highlightCodeTheme from '../../../components/common/CodeBlock/highlight-code-theme';
import Image from 'next/image';
import CopyIcon from '../../../public/images/document-duplicate.svg';

export const HighlightCodeBlock = (props: PropsWithChildren<any>) => {
  return (
    <div className={styles.codeBlock}>
      <CodeBlock
        language={props.language}
        text={props.text}
        showLineNumbers={props.showLineNumbers}
        theme={highlightCodeTheme}
      />
      <div
        className={styles.codeCopyIcon}
        onClick={() => navigator.clipboard.writeText(props.text)}
      >
        <Image src={CopyIcon} alt="Copy" />
      </div>
    </div>
  );
};
