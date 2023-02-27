import { toInteger } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setstartPage } from '../../store/filter/filterSlice'
import './Pagination.scss'

const Pagination = () => {
  const dispatch = useDispatch()
  const { products, startPage, perPage } = useSelector(state => state.filter)
  const pagesCount = Math.ceil(products.productsQuantity / perPage)
  const [pages, setPages] = useState([])

  const filler = useCallback(pagesCount => {
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }
    return pages
  }, [])

  useEffect(() => {
    setPages(filler(pagesCount))
  }, [pagesCount, filler])

  const clickOnPages = page => {
    dispatch(setstartPage(page))
    window.scrollTo(0, 0)
  }

  return (
    <div className='pages'>
      {pages.length !== 0 &&
        pages.map((page, index) => (
          <span
            key={index}
            className={
              toInteger(startPage) === page
                ? 'start-page-number'
                : 'page-number'
            }
            onClick={() => clickOnPages(page)}
          >
            {page}
          </span>
        ))}
    </div>
  )
}
export default Pagination
