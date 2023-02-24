import React from 'react'
import Banner from '../../components/Banner'
import PerfectSet from './PerfectSet'
import Sales from './Sales'
import AboutUs from './AboutUs'
import Instagram from './Instagram'
import Menu from './Menu'
import Container from '../../components/Container'

const PageHome = () => {
  return (
    <Container>
      <Menu />
      <Banner />
      <PerfectSet />
      <Sales />
      <AboutUs />
      <Instagram />
    </Container>
  )
}

export default PageHome
