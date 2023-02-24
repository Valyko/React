import React from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import styles from './Menu.module.scss'

const Menu = () => {
  return (
    <div className={styles.menu}>
      <NavLink to='/catalog/filter'>New lingerie</NavLink>
      <NavLink to='/aboutus'>About Us</NavLink>
      <NavLink to='/profile'>Profile</NavLink>
      <NavLink to='/catalog/filter'>Catalogue</NavLink>
      <HashLink smooth to='/#contact'>
        Contact
      </HashLink>
    </div>
  )
}

export default Menu
