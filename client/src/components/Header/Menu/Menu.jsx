import React from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { ReactComponent as Close } from './svg/close.svg'
import PropTypes from 'prop-types'
import styles from './Menu.module.scss'

const Menu = ({ closeFunc, clickOnHash, reff }) => {
  const arr = [
    { option: 'New lingerie', link: '/catalog/filter' },
    { option: 'About Us', link: '/aboutus' },
    { option: 'Profile', link: '/profile' },
    { option: 'Catalogue', link: '/catalog/filter' },
    { option: 'Contact', hash: '#contact' }
  ]

  return (
    <>
      <div className={styles.menu__back}></div>
      <div className={styles.menu__body} ref={reff}>
        <div className={styles.menu__body_close}>
          <Close onClick={closeFunc} />
        </div>
        <div className={styles.menu__body_list}>
          <div>
            {arr.map((value, index) => {
              const { option, link, hash } = value
              return link ? (
                <NavLink to={link} key={index}>
                  {option}
                </NavLink>
              ) : (
                <HashLink key={index} to={hash} onClick={clickOnHash}>
                  {option}
                </HashLink>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

Menu.propTypes = {
  closeFunc: PropTypes.func.isRequired,
  clickOnHash: PropTypes.func.isRequired,
  reff: PropTypes.string
}

export default Menu
