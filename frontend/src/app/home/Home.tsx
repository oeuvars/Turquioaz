import React from 'react'
import Hero from './Hero'
import Membership from './Membership'
import FAQ from './FAQ'
import Discover from './Discover'
import Footer from './Footer'
import Navbar from './Navbar'
import Recommended from './Recommended'
import { Bento } from './BentoGrid'

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <Featured /> */}
      <Recommended />
      <Bento />
      <Membership />
      <FAQ />
      <Discover />
      <Footer />
    </>
  )
}

export default Home
