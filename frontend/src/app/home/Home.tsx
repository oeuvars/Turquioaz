import React from 'react'
import Hero from './Hero'
import Featured from './Featured'
import Feature from './Feature'
import Membership from './Membership'
import FAQ from './FAQ'
import Discover from './Discover'
import Footer from './Footer'
import Navbar from './Navbar'
import Recommended from './Recommended'

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Featured />
      <Recommended />
      <Feature />
      <Membership />
      <FAQ />
      <Discover />
      <Footer />
    </>
  )
}

export default Home
