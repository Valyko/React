import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Order from '../../components/Forms/Order'
import Title from '../../components/Title'
import { useForCart } from '../../hooks/useForCart'
import { fetchMakeOrder } from '../../store/order/ActionCreators'
import SectionOrder from '../PageCart/SectionOrder'
import styles from './PageCheckout.module.scss'
import Button from '../../components/Button'
import AlsoLike from '../../components/AlsoLike'
import ThanksForOrder from './ThanksForOrder'
import { useEffect } from 'react'
import LoggedBlock from '../../components/LoggedBlock'
import Container from '../../components/Container'

const PageCheckout = () => {
  const cardInCart = useSelector(state => state.cart.data)
  const { totalPrice } = useForCart()
  const dispatch = useDispatch()
  const secuessOrder = useSelector(state => state.order.status)
  const cartCounter = useSelector(state => state.counter)
  const [orderDone, setOrderDone] = useState(false)
  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    if (secuessOrder === 'resolved') {
      setOrderDone(true)
    }
  }, [secuessOrder])

  const createOrder = async value => {
    dispatch(fetchMakeOrder({ value, cardInCart }))
  }
  return token ? (
    <Container>
      {orderDone ? (
        <ThanksForOrder />
      ) : cartCounter.inCart ? (
        <>
          <Title subtitle='Checkout' />
          <div className={styles.checkout}>
            <div className={styles.checkout_block}>
              <Order createOrder={createOrder} />
            </div>
            <div className={styles.checkout_block}>
              <Title title='your order' />
              <SectionOrder
                items={cardInCart}
                totalPrice={totalPrice()}
                check={cardInCart}
              />
            </div>
          </div>
        </>
      ) : (
        <div className={styles.block}>
          <Title subtitle='No items for order. Return to catalog' />
          <Button text='To catalot' to='/catalog' />
          <AlsoLike />
        </div>
      )}
    </Container>
  ) : (
    <LoggedBlock checkout />
  )
}

export default PageCheckout
