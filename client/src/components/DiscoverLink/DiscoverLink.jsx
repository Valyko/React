import React from 'react'
import { Link } from 'react-router-dom'
import './DiscoverLink.scss'
import PropTypes from 'prop-types'
import { ReactComponent as Arrow } from './svg/arrow.svg'

const DiscoverLink = ({ subClass, to }) => {
  return (
    <div className={`${subClass} set-item4`}>
      <Link to={to} className='collection'>
        Discover <Arrow />
      </Link>
    </div>
  )
}

DiscoverLink.propTypes = {
  subClass: PropTypes.string.isRequired,
  to: PropTypes.string
}

export default DiscoverLink
