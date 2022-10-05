import type { NextPage } from 'next'
import React from 'react'
import HeroSearch from '../components/hero-search'
import { Layout } from '../components/layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Layout.Container>
        <HeroSearch />
      </Layout.Container>
    </Layout>
  )
}

export default Home
