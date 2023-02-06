import React from 'react'
import { useSelector } from 'react-redux'
import ContainerFav from './ContainerFav/ContainerFav'
import Title from '../../components/Title/Title'
import Loader from '../../components/Loader'
import AlsoLike from '../../components/AlsoLike'
import BreadCrumbs from '../../components/BreadCrumbs'

const PageFav = () => {
  const products = useSelector(state => state.products)
  const favCounter = useSelector(state => state.counter.inFav)
  const { data, loading, error } = useSelector(state => state.wishlist)
  const token = useSelector(state => state.auth.token)

  const findItemsFav = () => {
    const itemsFav = JSON.parse(localStorage.getItem('fav'))

    if (itemsFav) {
      return products.data.filter(item => itemsFav.includes(item._id))
    }
  }

  return (
    <div className='container page'>
      <BreadCrumbs startFrom='Home' />
      {favCounter ? (
        <>
          <Title subtitle='Your favourite cards' />
          {loading ? (
            <Loader />
          ) : (token ? data : findItemsFav()) ? (
            <ContainerFav items={token ? data.products : findItemsFav()} />
          ) : null}
        </>
      ) : (
        <>
          <Title subtitle='No cards in favourites' />
          <AlsoLike />
        </>
      )}
    </div>
  )
}

export default PageFav
