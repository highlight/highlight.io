import styles from '../Docs.module.scss';
import ReactMarkdown from 'react-markdown';
import { useMemo, useState } from 'react';
import { Typography } from '../../common/Typography/Typography';
import { HighlightCodeBlock } from '../HighlightCodeBlock/HighlightCodeBlock';
import SelectorIcon from '../../../public/images/selector.svg';
import Image from 'next/image';

interface CodeBlockTabsProps {
  name: string;
  content: string;
}

export const CodeBlockTabs = (props: { content: any }) => {
  const codeBlocks: CodeBlockTabsProps[] = useMemo(() => {
    const splitBlocks = props.content.split('+++');
    const filteredBlocks = splitBlocks.filter(
      (text: string) => text.replaceAll('\n', '') != ''
    );
    const formattedBlocks: CodeBlockTabsProps[] = filteredBlocks.map(
      (text: string) => {
        return {
          name: text.split('\n')[0],
          content: '```' + text + '```',
        };
      }
    );
    return formattedBlocks;
  }, [props.content]);

  const [selectedTab, setSelectedTab] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className={styles.codeBlockTabs}>
      <div className={styles.codeBlockTabBar}>
        <div
          className={styles.codeBlockTabSelect}
          onClick={() => setOpenDropdown((open) => !open)}
        >
          <Typography type="copy3" emphasis>
            {codeBlocks[selectedTab].name}
          </Typography>
          <div>
            <Image src={SelectorIcon} alt="" />
          </div>
        </div>
        {openDropdown && (
          <div className={styles.codeBlockTabList}>
            {codeBlocks.map((block, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedTab(i);
                  setOpenDropdown(false);
                }}
              >
                <Typography type="copy3" emphasis>
                  {block.name}
                </Typography>
              </div>
            ))}
          </div>
        )}
      </div>
      <ReactMarkdown
        className={styles.codeBlockTabContent}
        components={{
          code: (props: any) => {
            return (
              <HighlightCodeBlock
                language={'js'}
                text={props.children[0]}
                showLineNumbers={false}
                className={styles.codeBlockTabBlock}
              />
            );
          },
        }}
      >
        {codeBlocks[selectedTab].content}
      </ReactMarkdown>
    </div>
  );
};
