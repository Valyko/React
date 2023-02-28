import React from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { ReactComponent as Close } from './svg/close.svg'
import PropTypes from 'prop-types'
import styles from './Menu.module.scss'
import { useSelector } from 'react-redux'

const Menu = ({ closeFunc, clickOnHash, reff }) => {
  const token = useSelector(state => state.auth.token)

  const arr = [
    { option: 'New lingerie', link: '/catalog/filter' },
    { option: 'About Us', link: '/aboutus' },
    { option: 'Catalogue', link: '/catalog/filter' },
    { option: 'Contact', hash: '#contact' }
  ]
  const arrForUser = [...arr, { option: 'Profile', link: '/profile' }]

  return (
    <>
      <div className={styles.menu__back}></div>
      <div className={styles.menu__body} ref={reff}>
        <div className={styles.menu__body_close}>
          <Close onClick={closeFunc} />
        </div>
        <div className={styles.menu__body_list}>
          <div>
            {(token ? arrForUser : arr).map((value, index) => {
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
  reff: PropTypes.object
}

export default Menu
