import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchFor } from '../../store/searchProducts/ActionCreator'
import ProductCard from '../ProductCard'
import styles from './Search.module.scss'
import Loader from '../Loader'

const SearchForm = ({ reff }) => {
  const [query, setQuery] = useState('')
  const { data, loading } = useSelector(state => state.search)
  const dispatch = useDispatch()

  useEffect(() => {
    if (query) {
      dispatch(searchFor(query))
    }
  }, [query, dispatch])

  const changeMeQuery = event => {
    setQuery(event.target.value)
  }

  return (
    <div className={styles.block} ref={reff}>
      <div className={styles.block_content}>
        <div>
          <input
            onChange={changeMeQuery}
            type='text'
            placeholder='Type what to search...'
          />
        </div>
        <div>
          {loading ? (
            <Loader />
          ) : data.length ? (
            data.map(searchValue => {
              return (
                <ProductCard
                  ident={searchValue.itemNo}
                  price={searchValue.currentPrice}
                  nameCard={searchValue.name}
                  currentPrice={searchValue.currentPrice}
                  photoUrl={searchValue.imageUrls[1]}
                  color={searchValue.color}
                  size={searchValue.size}
                  key={searchValue._id}
                  id={searchValue._id}
                  viewForCart
                />
              )
            })
          ) : (
            <p>No Products</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchForm
