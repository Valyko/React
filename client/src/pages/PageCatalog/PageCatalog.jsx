import React, { useState, useLayoutEffect, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Title from '../../components/Title/Title'
import Category from '../../components/Category'
import Colors from '../../components/Colors'
import Sizes from '../../components/Sizes'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import Button from '../../components/Button'
import Galery from '../../components/Galery'
import SortList from '../../components/SortList'
import { setstartPage, setperPage } from '../../store/filter/filterSlice'
import Pagination from '../../components/Pagination'
import './PageCatalog.scss'
import Container from '../../components/Container'

const PageCatalog = () => {
  const { products, startPage, perPage } = useSelector(state => state.filter)
  const pagesCount = Math.ceil(products.productsQuantity / perPage)
  const currentWidth = useWindowSize()

  const [sizesActive, setsizesActive] = useState(true)
  const [colorActive, setcolorActive] = useState(true)
  const [categoryActive, setcategoryActive] = useState(true)
  const [filtersIsOpen, setfiltersIsOpen] = useState(true)

  function useWindowSize() {
    const [displayWidth, setdisplayWidth] = useState(0)
    useLayoutEffect(() => {
      function updateSize() {
        setdisplayWidth(window.innerWidth)
      }
      window.addEventListener('resize', updateSize)
      updateSize()
      return () => window.removeEventListener('resize', updateSize)
    }, [])
    return displayWidth
  }

  const showColor = () => setcolorActive(!colorActive)
  const showSizes = () => setsizesActive(!sizesActive)
  const showCategory = () => setcategoryActive(!categoryActive)
  const showFilters = () => setfiltersIsOpen(filtersIsOpen => !filtersIsOpen)

  const dispatch = useDispatch()
  useEffect(() => {
    currentWidth < 768 ? dispatch(setperPage(6)) : dispatch(setperPage(6))
    currentWidth < 768 ? setfiltersIsOpen(false) : setfiltersIsOpen(true)
  }, [currentWidth, dispatch])

  const LoadMore = () => {
    dispatch(setstartPage(1))
    dispatch(setperPage(+perPage + 3))
  }

  return (
    <Container>
      <BreadCrumbs startFrom='Home' />
      <Title subtitle='Catalogue' />
      <div className='page-wrapper'>
        <Title
          title='Filters box'
          showContent={showFilters}
          className={'filtering for_catalog'}
        />
        {filtersIsOpen && (
          <aside className='page-sidebar'>
            <Title
              title='Category'
              showContent={showCategory}
              className={'active for_catalog'}
            />
            <Category
              categoryActive={
                currentWidth < 768 ? !categoryActive : categoryActive
              }
            />
            <Title
              title='Colors'
              showContent={showColor}
              className={'active for_catalog'}
            />
            <Colors
              contentActive={currentWidth < 768 ? !colorActive : colorActive}
            />
            <Title
              title='Sizes'
              showContent={showSizes}
              className={'active for_catalog'}
            />
            <Sizes
              sizesActive={currentWidth < 768 ? !sizesActive : sizesActive}
            />
          </aside>
        )}
        <section className='content cards'>
          <SortList />
          <Galery />
        </section>
        <section className='page-controls'>
          {startPage < pagesCount && (
            <Button
              text='Load more beauty'
              className='page__button content-button'
              onClick={LoadMore}
            />
          )}
          {pagesCount !== 1 && <Pagination />}
        </section>
      </div>
    </Container>
  )
}

export default PageCatalog
