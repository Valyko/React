import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from './store/products/ActionCreators'
import { login } from './store/tokenWork/tokenWork'
import { fetchGetAllFromCart } from './store/cart/ActionCreators'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import AppRouter from './router/AppRouter'
import './styles/App.scss'
import { fetchWishlist } from './store/wishlist/ActionCreator'
import { useLocation } from 'react-router-dom'
import { fetchGetUser } from './store/user/ActionCreators'
import { setLocation } from './store/location/location'
import { clearStatusOrder } from './store/order/order'
import UpToTop from './components/UpToTop/UpToTop'
import { useForApp } from './hooks/useForApp'

function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const locationHook = useLocation()
  const { location } = useSelector(state => state.location)
  const { sendItemsFromLocalStorageCart, sendItemsFromLocalStorageWishlist } =
    useForApp()

  useEffect(() => {
    dispatch(setLocation(locationHook.pathname))
    dispatch(fetchProducts())
    if (localStorage.getItem('userToken')) {
      const data = JSON.parse(localStorage.getItem('userToken'))
      dispatch(login(data.token))
      dispatch(fetchGetUser())
    }
    dispatch(clearStatusOrder())
  }, [dispatch, locationHook])

  useEffect(() => {
    if (token) {
      dispatch(fetchGetUser())
      dispatch(fetchWishlist())
      dispatch(fetchGetAllFromCart())
    }
  }, [token, dispatch])

  useEffect(() => {
    if (token) {
      if (JSON.parse(localStorage.getItem('cart'))) {
        sendItemsFromLocalStorageCart()
      }
      if (JSON.parse(localStorage.getItem('fav'))) {
        sendItemsFromLocalStorageWishlist()
      }
    }
  }, [
    token,
    dispatch,
    sendItemsFromLocalStorageCart,
    sendItemsFromLocalStorageWishlist
  ])

  return (
    <>
      <Header />
      <AppRouter />
      {location !== '/login' && location !== '/signin' ? <Footer /> : null}
      <UpToTop />
    </>
  )
}

export default App
