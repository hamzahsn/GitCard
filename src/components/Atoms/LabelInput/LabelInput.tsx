import React from 'react'
import styles from './LabelInput.scss'
import cs from 'classnames'

export interface ILabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  type?: string
  name?: string
  labelText?: string
  register?: any
  variant?: 'primary' | 'secondary'
}

export const LabelInput = ({ id, name, labelText, register, variant = 'primary', ...inputProps }: ILabelInputProps) => {
  return (
    <label htmlFor={id} className={cs(styles.LabelInputContainer)}>
      {labelText}
      <input {...inputProps} name={name} id={id} className={cs(styles.baseInput, styles[variant])} />
    </label>
  )
}
