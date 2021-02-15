import React from 'react'
import { HexColorPicker } from 'react-colorful'
import { Typography } from '@atoms/index'

import 'react-colorful/dist/index.css'
import styles from './ColorPicker.scss'

interface IColorPicker {
  setSelectedColor: (color: string) => void
}

export const ColorPicker: React.FC<IColorPicker> = ({ setSelectedColor }) => {
  const [color, setColor] = React.useState('#aabbcc')

  const handleColor = (color: string) => {
    setColor(color)
    setSelectedColor(color)
  }

  return (
    <div className={styles.colorContainer}>
      <div className={styles.colorDisplay} style={{ background: `${color}` }}>
        <Typography>{color}</Typography>
      </div>
      <HexColorPicker className={styles.customLayout} color={color} onChange={handleColor} />
    </div>
  )
}
