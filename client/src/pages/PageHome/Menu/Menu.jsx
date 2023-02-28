import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styles from './Menu.module.scss'

const Menu = () => {
  const products = useSelector(state => state.products.data)
  const perPage = useSelector(state => state.filter.perPage)

  const getCategories = () => {
    let categories = []
    products.map(item => {
      return categories.push(item.categories)
    })
    const uniqueCategories = new Set(categories)
    const arrayUniqueCategories = Array.from(uniqueCategories)
    return arrayUniqueCategories
  }

  return products ? (
    <div className={styles.menu}>
      {getCategories().map((item, index) => {
        return (
          <NavLink
            key={index}
            to={
              '/catalog/filter?startPage=1&perPage=' +
              perPage +
              '&categories[0]=' +
              item
            }
          >
            {item}
          </NavLink>
        )
      })}
    </div>
  ) : null
}

export default Menu
