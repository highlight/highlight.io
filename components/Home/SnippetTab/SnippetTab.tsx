import classNames from 'classnames';
import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';

import styles from '../../Home/Home.module.scss';

export interface SnippetTabObject {
  image: StaticImageData;
  key: string;
  content: JSX.Element;
}

export const SnippetTab = ({ tabs }: { tabs: SnippetTabObject[] }) => {
  const [currentTabKey, setCurrentTabKey] = useState(tabs[0]?.key);
  return (
    <div>
      <div className={styles.snippetTabs}>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={classNames(styles.snippetTab, {
              [styles.tabSelected]: tab.key === currentTabKey,
            })}
            onClick={() => setCurrentTabKey(tab.key)}
          >
            <Image src={tab.image} alt={tab.key} />
          </div>
        ))}
      </div>
      <div className={styles.snippetContent}>
        {tabs.map((tab) =>
          tab.key === currentTabKey ? (
            <div key={tab.key}>{tab.content}</div>
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  );
};
