import React from 'react';
import { ButtonProps } from 'antd';
import classNames from 'classnames';

import styles from './Buttons.module.scss';

export const PrimaryButton = ({
  children,
  ...props
}: React.PropsWithChildren<ButtonProps>) => {

  const reportSignupConversion = (url: string) => {
    var callback = function () {
      console.log("running callback");
      if (typeof (url) != 'undefined') {
        window.location.href = url;
      }
    };
    console.log("about to send conversion event");
    window.gtag('event', 'conversion', {
      'send_to': 'AW-10833687189/q81TCPDrq40DEJXl860o',
      'event_callback': callback
    });
    console.log("sent conversion event");
  }

  return (
    <a
      {...props}
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e);
        }
        if (props.href && props.href.includes('app.highlight.io/?sign_up=1')) {
          reportSignupConversion(props.href);
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
