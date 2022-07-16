import classNames from 'classnames';
import React from 'react';

import styles from './Section.module.scss';

export const Section = ({
  reverseMobile,
  className,
  children,
  ...props
}: React.PropsWithChildren<{
  reverseMobile?: boolean;
  className?: string;
}>) => {
  return (
    <div
      {...props}
      className={classNames(className, styles.section, {
        [styles.sectionReverseMobile]: reverseMobile,
      })}
    >
      {children}
    </div>
  );
};
