import React from 'react'
import { ButtonProps } from 'antd'
import classNames from 'classnames'

import styles from './Buttons.module.scss'

export const PrimaryButton = ({ children, ...props }: React.PropsWithChildren<ButtonProps>) => {
  return (
    <a {...props} className={classNames(props.className, styles.genericButton, styles.primaryButton)}>
      {children}
    </a>
  )
}
