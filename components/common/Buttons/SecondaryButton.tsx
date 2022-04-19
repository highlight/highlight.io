import React from 'react';
import { ButtonProps } from 'antd';
import classNames from 'classnames';

import styles from './Buttons.module.scss';

export const SecondaryButton = ({
  children,
  ...props
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <a
      {...props}
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e);
        }
      }}
      className={classNames(
        props.className,
        styles.genericButton,
        styles.secondaryButton
      )}
    >
      {children}
    </a>
  );
};
