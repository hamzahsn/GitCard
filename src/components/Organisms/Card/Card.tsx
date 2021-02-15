import React from 'react'
import cs from 'classnames'
import styles from './Card.scss'

interface ICard extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  variant?: 'primary' | 'secondary'
  className?: string
  styles?: any
}

export const Card: React.FC<ICard> = ({ title, variant = 'primary', className, children, ...divProps }) => {
  return (
    <div className={cs(className, styles.CardContainer, styles[variant])} styles={styles} {...divProps}>
      {title && <h1 className={cs(styles.cardHeader)}>{title}</h1>}
      {children}
    </div>
  )
}
