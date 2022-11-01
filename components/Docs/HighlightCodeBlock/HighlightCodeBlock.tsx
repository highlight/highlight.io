import styles from '../Docs.module.scss';
import { CodeBlock } from 'react-code-blocks';
import { PropsWithChildren, useState } from 'react';
import highlightCodeTheme from '../../../components/common/CodeBlock/highlight-code-theme';
import Image from 'next/legacy/image';
import CopyIcon from '../../../public/images/document-duplicate.svg';
import CheckmarkIcon from '../../../public/images/checkmark_circle.svg';
import classNames from 'classnames';

export const HighlightCodeBlock = (props: PropsWithChildren<any>) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className={styles.codeBlock}>
      <CodeBlock
        language={props.language}
        text={props.text}
        showLineNumbers={props.showLineNumbers}
        theme={highlightCodeTheme}
      />
      <div
        className={classNames(styles.codeCopyIcon)}
        onClick={() => {
          navigator.clipboard.writeText(props.text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1000);
        }}
      >
        <Image src={CopyIcon} alt="Copy" />
      </div>
      {copied && (
        <div className={classNames(styles.codeCopyIcon, styles.active)}>
          <Image src={CheckmarkIcon} alt="Text Copied" />
        </div>
      )}
    </div>
  );
};
