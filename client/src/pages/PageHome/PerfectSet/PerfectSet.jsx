import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import DiscoverLink from '../../../components/DiscoverLink/DiscoverLink'
import Loader from '../../../components/Loader'
import ProductCard from '../../../components/ProductCard'
import Title from '../../../components/Title'
import { getRandomRange } from '../../../hooks/randomRange'
import './index.scss'

const PerfectSet = () => {
  const products = useSelector(state => state.products)
  const [productsCount, setProductCount] = useState(0)
  const [randomRange, setRandomRange] = useState(0)

  useEffect(() => {
    setProductCount(products.data.length)
    setRandomRange(getRandomRange(0, productsCount, 4))
  }, [products.data, productsCount])

  return (
    <section>
      <Title title='new arrivals' subtitle='Choose your perfect set' />
      {products.data ? (
        products.status === 'loading' ? (
          <Loader />
        ) : (
          <section className='set'>
            {products.data
              .slice(randomRange.start, randomRange.end)
              .map(item => (
                <ProductCard
                  ident={item.itemNo}
                  price={item.currentPrice}
                  photoUrl={item.imageUrls[0]}
                  subClass={'set-item'}
                  key={item._id}
                  id={item._id}
                  nameCard={item.name}
                  color={item.color}
                  size={item.size}
                />
              ))}
            <DiscoverLink subClass={'set-link set-item'} to='/catalog/filter' />
          </section>
        )
      ) : null}
    </section>
  )
}
export default PerfectSet
