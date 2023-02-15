import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkInCart, checkInFav } from '../store/counter/counter'
import {
  addToWishlist,
  deleteItemFromWishlist
} from '../store/wishlist/ActionCreator'
import {
  fetchAddToCart,
  fetchDeletaCardFromCart,
  fetchDeleteFromCart
} from '../store/cart/ActionCreators'

export const useFunctionality = id => {
  const [inFav, setInFav] = useState(false)
  const [inCart, setInCart] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const cardInCart = useSelector(state => state.cart.data)
  const cardInFav = useSelector(state => state.wishlist.data)
  const forCartActions = useRef(null)
  const forFavActions = useRef(null)
  const values = useRef(null)

  const checkForDependency = useCallback(() => {
    return token ? (cardInCart, cardInFav) : null
  }, [cardInCart, cardInFav, token])

  //static arrays
  useMemo(() => {
    forCartActions.current = {
      localName: 'cart',
      counter: checkInCart,
      localState: setInCart,
      valueLocalState: inCart,
      deleteInServer: fetchDeleteFromCart,
      addInServer: fetchAddToCart
    }
    forFavActions.current = {
      localName: 'fav',
      counter: checkInFav,
      localState: setInFav,
      valueLocalState: inFav,
      deleteInServer: deleteItemFromWishlist,
      addInServer: addToWishlist
    }
  }, [inCart, inFav])

  //array selection depending on the specified value
  const selectVarriable = useCallback(
    value => {
      if (value === 'fav') {
        values.current = forFavActions
      } else if (value === 'cart') {
        values.current = forCartActions
      }
    },
    [forFavActions, forCartActions]
  )

  //Check cards in cart and in wishlist from server and state change depending on the result of the check
  const checkCards = useCallback(
    (id, value) => {
      let array
      selectVarriable(value)
      const { localState } = values.current.current
      if (value === 'fav' ? cardInFav.length !== 0 : cardInCart.products) {
        if (value === 'fav') {
          array = cardInFav.products
        } else if (value === 'cart') {
          array = cardInCart.products.map(item => {
            return item.product
          })
        }
        const arrayId = array.map(item => {
          return item._id
        })
        if (arrayId.includes(id)) {
          localState(true)
        }
      }
    },
    [cardInCart.products, cardInFav.products, cardInFav.length, selectVarriable]
  )

  //check cards in cart and wishlist in localsorage
  const checkCardsFromLocalStorage = useCallback(
    value => {
      selectVarriable(value)
      const { localName, counter, localState } = values.current.current
      const arrayFromLocalStorage = JSON.parse(localStorage.getItem(localName))
      if (arrayFromLocalStorage) {
        dispatch(counter(arrayFromLocalStorage.length))
        arrayFromLocalStorage.forEach(item => {
          if (item === id) {
            localState(true)
          }
        })
      }
    },
    [dispatch, id, selectVarriable, values]
  )

  useEffect(() => {
    if (!token) {
      checkCardsFromLocalStorage('fav')
      checkCardsFromLocalStorage('cart')
    } else {
      checkCards(id, 'cart')
      checkCards(id, 'fav')
    }
  }, [token, checkForDependency, checkCards, checkCardsFromLocalStorage, id])

  const checkValue = value => {
    return value != null
  }

  //adding and removing card to the cart and wishlist on the server and localstorage, changing the counter
  const actionOnCkickFavOrCart = (id, value) => {
    selectVarriable(value)
    const {
      localName,
      counter,
      localState,
      valueLocalState,
      deleteInServer,
      addInServer
    } = values.current.current

    if (!token) {
      if (localStorage.getItem(localName)) {
        const array = JSON.parse(localStorage.getItem(localName))
        if (!array.includes(id)) {
          array.push(id)
          localStorage.setItem(localName, JSON.stringify(array))
          localState(true)
          dispatch(counter(array.length))
        } else {
          const newArray = array.map(item => {
            return item !== id ? item : null
          })
          const filter = newArray.filter(checkValue)
          dispatch(counter(filter.length))
          localStorage.setItem(localName, JSON.stringify(filter))
          localState(false)
        }
      } else {
        localStorage.setItem(localName, JSON.stringify([id]))
        localState(true)
        dispatch(counter(1))
      }
    } else {
      if (valueLocalState) {
        dispatch(deleteInServer(id))
        localState(false)
      } else {
        dispatch(addInServer(id))
        localState(true)
      }
    }
  }

  //reduce the quantity of items in the cart by one
  const clickDeleteCardInCart = id => {
    if (token) {
      dispatch(fetchDeleteFromCart(id))
    } else {
      const cart = JSON.parse(localStorage.getItem('cart'))
      const arrayId = cart.map(el => {
        return el === id ? el : null
      })
      const arrayWithoutId = cart.map(el => {
        return el !== id ? el : null
      })
      const arrayWithoutIdFilter = arrayWithoutId.filter(checkValue)
      const arrayIdFilter = arrayId.filter(checkValue)
      arrayIdFilter.shift()
      const newArrayCart = arrayWithoutIdFilter.concat(arrayIdFilter)
      dispatch(checkInCart(newArrayCart.length))
      localStorage.setItem('cart', JSON.stringify(newArrayCart))
    }
  }

  //removal item from cart
  const clickDeleteProductInCart = id => {
    if (token) {
      dispatch(fetchDeletaCardFromCart(id))
      setInCart(false)
    } else {
      const cart = JSON.parse(localStorage.getItem('cart'))
      const newCart = cart.map(item => {
        return item !== id ? item : null
      })
      const filter = newCart.filter(checkValue)
      dispatch(checkInCart(filter.length))
      localStorage.setItem('cart', JSON.stringify(filter))
      setInCart(false)
    }
  }

  //increase the quantity of items in the cart by one
  const clickAddInCart = () => {
    if (token) {
      dispatch(fetchAddToCart(id))
    } else {
      const cart = JSON.parse(localStorage.getItem('cart'))
      cart.push(id)
      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch(checkInCart(cart.length))
    }
  }

  return {
    inFav,
    inCart,
    setInFav,
    clickDeleteCardInCart,
    clickAddInCart,
    clickDeleteProductInCart,
    actionOnCkickFavOrCart
  }
}
