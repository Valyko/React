import React, { useCallback, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ReactComponent as User } from './svg/user.svg'
import { ReactComponent as Cart } from './svg/cart.svg'
import { ReactComponent as Fav } from './svg/fav.svg'
import { ReactComponent as Search } from './svg/search.svg'
import { ReactComponent as Logo } from './svg/logo.svg'
import { ReactComponent as Logout } from './svg/logout.svg'
import { useDispatch, useSelector } from 'react-redux'
import Menu from './Menu/Menu'
import Burger from './Burger'
import Count from './Count'
import styles from './Header.module.scss'
import { logout } from '../../store/tokenWork/tokenWork'
import { checkInCart, checkInFav } from '../../store/counter/counter'
import SearchForm from '../Search'
import { useEffect } from 'react'
import { clearStatus } from '../../store/signIn/signIn'
import { useRef } from 'react'
import { clearSearch } from '../../store/searchProducts/searchSlice'

const Header = () => {
  const [menu, setMenu] = useState(false)
  const [searchView, setSearchView] = useState(false)
  const { inFav, inCart } = useSelector(state => state.counter)
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useSelector(state => state.location.location)
  const refSearch = useRef(null)
  const refMenu = useRef(null)

  useEffect(() => {
    setSearchView(false)
    setMenu(false)
  }, [location])

  useEffect(() => {
    menu
      ? document.body.classList.add('body_active')
      : document.body.classList.remove('body_active')
  }, [menu])

  const clickMenu = useCallback(() => {
    setMenu(!menu)
  }, [menu])

  const clickSearch = useCallback(() => {
    setSearchView(!searchView)
  }, [searchView])

  useEffect(() => {
    if (searchView) {
      const handleClick = e => {
        if (!refSearch.current.contains(e.target)) {
          clickSearch()
          dispatch(clearSearch())
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }
  }, [searchView, clickSearch, dispatch])

  useEffect(() => {
    if (menu) {
      const handleClick = e => {
        if (!refMenu.current.contains(e.target)) {
          clickMenu()
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }
  }, [menu, clickMenu, dispatch])

  const logOut = () => {
    dispatch(logout())
    dispatch(checkInCart(0))
    dispatch(checkInFav(0))
    dispatch(clearStatus())
    navigate('/')
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__block_logo}>
          <NavLink to='/' className='logo'>
            <Logo />
          </NavLink>
        </div>
        <div className={styles.header__block_svg}>
          {token && (
            <Logout style={{ cursor: 'pointer' }} onClick={() => logOut()} />
          )}
          <NavLink to={token ? '/profile' : '/signin'}>
            <User style={{ cursor: 'pointer' }} />
          </NavLink>
          <Search
            onClick={!searchView ? () => clickSearch() : null}
            style={{ cursor: 'pointer' }}
          />
          <NavLink to='/fav'>
            <Fav />
            {inFav ? <Count count={inFav} /> : null}
          </NavLink>
          <NavLink to='/cart'>
            <Cart />
            {inCart ? <Count count={inCart} /> : null}
          </NavLink>
        </div>
        <Burger onClick={() => clickMenu()} />
      </header>
      {menu && (
        <Menu
          closeFunc={() => clickMenu()}
          clickOnHash={clickMenu}
          reff={refMenu}
        />
      )}
      {searchView && <SearchForm reff={refSearch} />}
    </>
  )
}

export default Header
