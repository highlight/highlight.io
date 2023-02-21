import React from 'react';
import { ButtonProps } from 'antd';
import classNames from 'classnames';

import styles from './Buttons.module.scss';

export const PrimaryButton = ({
  children,
  ...props
}: React.PropsWithChildren<ButtonProps>) => {

  return (
    <a
      {...props}
      onClick={(e) => {
        if (window.gtag && props.href?.includes("app.highlight.io/?sign_up=1")) {
          e.preventDefault();
          if (props.onClick) {
            props.onClick(e);
          }
          var callback = function () {
            if (typeof (props.href) != 'undefined') {
              // @ts-ignore 
              window.location = props.href;
            }
          };
          window.gtag('event', 'conversion', {
            'send_to': 'AW-10833687189/_C5MCLfmoY0YEJXl860o',
            'event_callback': callback
          });
          return false;
        } else {
          if (props.onClick) {
            props.onClick(e);
          }
        }
      }}
      className={classNames(
        props.className,
        styles.genericButton,
        styles.primaryButton
      )}
    >
      {children}
    </a>
  );
};
