import React from 'react'
import styles from './Burger.module.scss'
import PropTypes from 'prop-types'

const Burger = ({ onClick }) => {
  return (
    <div className={styles.burger}>
      <div className={styles.burger_btn} onClick={onClick}>
        <div className={styles.burger_btn_line} />
        <div className={styles.burger_btn_line} />
      </div>
    </div>
  )
}

Burger.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Burger
