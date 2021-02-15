import React from 'react'
import styles from './IconPicker.scss'
import { IconPicker } from 'react-fa-icon-picker'

interface IIconPicker {
  setSelectedIcon: (icon: string) => void
}

export const IconsPicker: React.FC<IIconPicker> = ({ setSelectedIcon }) => {
  const [value, setValue] = React.useState<any>('')

  const handleIcon = (value: string) => {
    setValue(value)
    setSelectedIcon(value)
  }

  return (
    <div className={styles.iconPicker}>
      <IconPicker value={value} onChange={icon => handleIcon(icon)} />
    </div>
  )
}
