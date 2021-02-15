import React from 'react'
import cs from 'classnames'
import styles from './Typography.scss'

interface ITypography extends React.HTMLAttributes<HTMLParagraphElement> {
  title?: string
  variant?: 'primary' | 'secondary'
}

export const Typography: React.FC<ITypography> = ({ title, className, variant = 'primary', children }) => {
  return (
    <p className={cs(styles.typographyStyles, styles[variant], className)}>
      {title && <h3>{title}</h3>}
      {children}
    </p>
  )
}
