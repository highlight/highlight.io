import classNames from 'classnames';
import React, { useState } from 'react';

import styles from '../../Home/Home.module.scss';

export interface SnippetTabObject {
  image: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  key: string;
  content: JSX.Element;
}

export const SnippetTab = ({ tabs }: { tabs: SnippetTabObject[] }) => {
  const [currentTabKey, setCurrentTabKey] = useState(tabs[0]?.key);
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
            <tab.image
              color={tab.key === currentTabKey ? '#EBFF5E' : '#72E4FC'}
            />
          </div>
        ))}
      </div>
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
