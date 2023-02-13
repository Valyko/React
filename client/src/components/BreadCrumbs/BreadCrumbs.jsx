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
      {pathNames.map((pathname, index) => {
        const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`
        const isLast = index === pathNames.length - 1
        pathname = pathname[0].toUpperCase() + pathname.slice(1)

        return pathname !== 'Filter' ? (
          isLast ? (
            <>
              {symbol}
              <Link className={styles.link} key={index}>
                {' ' + pathname + ' '}
              </Link>
            </>
          ) : (
            <>
              {symbol}
              <Link
                key={index}
                to={pathname !== 'Catalog' ? routeTo : '/catalog/filter'}
                className={styles.link}
              >
                {' ' + pathname + ' '}
              </Link>
            </>
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
