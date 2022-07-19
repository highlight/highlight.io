import React from 'react';
import classNames from 'classnames';

import styles from './Typography.module.scss';

export const Typography = ({
  children,
  emphasis = false,
  className,
  ...props
}: React.PropsWithChildren<{
  type: 'copy1' | 'copy2' | 'copy3' | 'outline';
  emphasis?: boolean;
  className?: string;
}>) => {
  return (
    <span
      {...props}
      className={classNames({
        [styles.copy1]: props.type === 'copy1',
        [styles.copy2]: props.type === 'copy2',
        [styles.copy3]: props.type === 'copy3',
        [styles.outline]: props.type === 'outline',
        [styles.emphasis]: emphasis,
        [className]: true,
      })}
    >
      {children}
    </span>
  );
};
