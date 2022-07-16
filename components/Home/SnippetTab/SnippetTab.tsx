import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { Section } from '../../common/Section/Section';
import { Typography } from '../../common/Typography/Typography';

import styles from '../../Home/Home.module.scss';

export interface SnippetTabObject {
  image: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  key: string;
  content: JSX.Element;
  beta?: boolean;
}

export const SnippetTab = ({ tabs }: { tabs: SnippetTabObject[] }) => {
  const [currentTabKey, setCurrentTabKey] = useState(tabs[0]?.key);
  const [currentTabElement, setCurrentTabElement] = useState(
    tabs.find((tab) => tab.key === currentTabKey)
  );
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setCurrentTabElement(
      tabs.find((tab) => tab.key === currentTabKey) || tabs[0]
    );
  }, [currentTabKey, setCurrentTabElement, tabs]);

  return (
    <div>
      <div
        className={classNames(styles.snippetTabs, styles.secondaryBackground)}
      >
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={classNames(styles.snippetTab, {
              [styles.tabSelected]: tab.key === currentTabKey,
            })}
            onClick={() => setCurrentTabKey(tab.key)}
          >
            {tab.beta && (
              <div className={styles.snippetBeta}>
                <Typography type="outline">in beta</Typography>
              </div>
            )}
            <tab.image
              color={tab.key === currentTabKey ? '#EBFF5E' : '#72E4FC'}
            />
          </div>
        ))}
      </div>
      <Section noYBottomPadding={true}>
        <div className={styles.snippetDropdownContainer}>
          <div
            className={styles.snippetDropdown}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className={styles.snippetDropdownValue}>
              <currentTabElement.image color={'#72E4FC'} />
            </div>
            <AiOutlineDown />
          </div>
          {showDropdown && (
            <div className={styles.snippetDropdownList}>
              {tabs.map((tab) => (
                <div
                  key={tab.key}
                  onClick={() => {
                    setShowDropdown(false);
                    setCurrentTabKey(tab.key);
                  }}
                >
                  <tab.image color={'#72E4FC'} />
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>
      <div className={styles.snippetContent}>
        {tabs.map((tab) =>
          tab.key === currentTabKey ? (
            <div key={tab.key}>{tab.content}</div>
          ) : (
            <div key={tab.key}></div>
          )
        )}
      </div>
    </div>
  );
};
