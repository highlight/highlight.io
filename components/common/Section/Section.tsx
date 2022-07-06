import classNames from 'classnames';
import React from 'react';

import styles from './Section.module.scss';

export const Section = ({
  reverseMobile,
  children,
  ...props
}: React.PropsWithChildren<{ reverseMobile?: boolean }>) => {
  return (
    <div
      {...props}
      className={classNames(styles.section, {
        [styles.sectionReverseMobile]: reverseMobile,
      })}
    >
      {children}
    </div>
  );
};
