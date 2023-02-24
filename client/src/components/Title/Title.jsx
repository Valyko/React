import React from 'react'
import PropTypes from 'prop-types'
import styles from './Title.module.scss'

const Title = ({ title, subtitle, showContent, className }) => {
  return (
    <>
      {title && (
        <h5 onClick={showContent} className={styles.title + ' ' + className}>
          {title}
        </h5>
      )}
      {subtitle && <h1 className={styles.subtitle}>{subtitle}</h1>}
    </>
  )
}

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default Title
