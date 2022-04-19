import React from 'react';

import styles from './Section.module.scss';

export const Section = ({
  children,
  ...props
}: React.PropsWithChildren<{}>) => {
  return (
    <div {...props} className={styles.section}>
      {children}
    </div>
  );
};
