import React from 'react'
import Hero from './Hero'
import FeaturedCar from './FeaturedCar'
import CarMarquee from './CarMarquee'
import Feature from './Feature'
import Membership from './Membership'
import FAQ from './FAQ'
import Discover from './Discover'
import Footer from './Footer'
import Navbar from './Navbar'

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCar />
      <CarMarquee />
      <Feature />
      <Membership />
      <FAQ />
      <Discover />
      <Footer />
    </>
  )
}

export default Home
