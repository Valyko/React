import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUpdateCart } from '../store/cart/ActionCreators'
import { fetchUpdateWishlist } from '../store/wishlist/ActionCreator'

export const useForApp = () => {
  const cardInCart = useSelector(state => state.cart.data)
  const favItems = useSelector(state => state.wishlist.data)
  const dispatch = useDispatch()

  const sendItemsFromLocalStorageCart = useCallback(() => {
    const cards = JSON.parse(localStorage.getItem('cart'))
    let arrayOfCards = []
    let result = {}

    if (cardInCart.products) {
      if (cardInCart.products !== 0) {
        cardInCart.products.forEach(item => {
          let step
          for (step = 0; step < item.cartQuantity; step++) {
            cards.push(item.product._id)
          }
        })
      }
    }

    cards.forEach(a => {
      if (result[a] !== undefined) ++result[a]
      else result[a] = 1
    })
    for (let key in result) {
      arrayOfCards.push({ product: key, cartQuantity: result[key] })
    }

    dispatch(fetchUpdateCart(arrayOfCards))
    localStorage.removeItem('cart')
  }, [cardInCart.products, dispatch])

  const sendItemsFromLocalStorageWishlist = useCallback(() => {
    const favs = JSON.parse(localStorage.getItem('fav'))
    if (favItems) {
      if (favItems.length !== 0) {
        favItems.products.forEach(item => favs.push(item._id))
      }
    }

    const uniqueEl = new Set(favs)
    const uniqueToArray = Array.from(uniqueEl)
    dispatch(fetchUpdateWishlist(uniqueToArray))
    localStorage.removeItem('fav')
  }, [dispatch, favItems])

  return { sendItemsFromLocalStorageCart, sendItemsFromLocalStorageWishlist }
}
