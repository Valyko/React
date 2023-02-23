import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './BreadCrumbs.module.scss'
import { useSelector } from 'react-redux'

const NavigatePanel = ({ startFrom }) => {
  const pathname = useSelector(state => state.location.location)
  const pathNames = pathname.split('/').filter(routing => routing)
  const symbol = <span className={styles.symbol}>&#9474;</span>

  return (
    <div className={styles.block}>
      <Link to='/' className={styles.link_f}>
        {startFrom + ' '}
      </Link>
      {pathNames.map((path, index) => {
        const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`
        const isLast = index === pathNames.length - 1
        path = path[0].toUpperCase() + path.slice(1)

        return path !== 'Filter' ? (
          isLast ? (
            <Link className={styles.link} key={index}>
              {symbol}
              {' ' + path + ' '}
            </Link>
          ) : (
            <Link
              key={index}
              to={path !== 'Catalog' ? routeTo : '/catalog/filter'}
              className={styles.link}
            >
              {symbol}
              {' ' + path + ' '}
            </Link>
          )
        ) : null
      })}
    </div>
  )
}

NavigatePanel.defaultProps = {
  startFrom: 'Home'
}

NavigatePanel.propTypes = {
  startFrom: PropTypes.string.isRequired
}

export default NavigatePanel
