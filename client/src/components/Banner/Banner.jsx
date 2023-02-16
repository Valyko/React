import React from 'react'
import styles from './Banner.module.scss'
import SlickSlider from './SlickSlider'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../Loader'

const Banner = () => {
  const { status } = useSelector(state => state.slides)
  const navigate = useNavigate()
  const redirectCatalog = () => {
    navigate('/catalog/filter')
  }

  return (
    <div className={styles.banner}>
      <SlickSlider />
      {status === 'resolved' ? (
        <>
          <div className={styles.block_f}>
            <span>handmade</span>
          </div>
          <div className={styles.block_s}>
            <span>LINGERIE</span>
          </div>
          <div className={styles.block_t}>
            <span>for women</span>
          </div>
          <Button
            text='Go to catalog'
            className={styles.btn}
            onClick={redirectCatalog}
            to='/catalog/filter'
          />{' '}
        </>
      ) : status === 'loading' ? (
        <Loader />
      ) : null}
    </div>
  )
}

export default Banner
