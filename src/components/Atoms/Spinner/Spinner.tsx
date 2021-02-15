import React from 'react'
import styles from './Spinner.scss'

export const Spinner = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>Loading...</div>
    </div>
  )
}
