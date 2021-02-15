import React from 'react'
import cs from 'classnames'
import styles from './Button.scss'

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export const Button = ({ children, variant = 'primary', ...buttonProps }: IButton) => {
  return (
    <button className={cs(styles.baseButton, styles[variant])} {...buttonProps}>
      {children}
    </button>
  )
}
