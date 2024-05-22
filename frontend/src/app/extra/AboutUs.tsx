import React from 'react'
import Navbar from '../home/Navbar'
import Footer from '../home/Footer'

const About: React.FC = () => {
  return (
    <div className='phone:max-h-screen tablet:h-full'>
      <Navbar />
      <div className='tablet:relative h-screen'>
         <video autoPlay loop className="object-cover w-full h-full -z-10 absolute blur-sm">
            <source src='/videos/ceiling.mp4'/>
         </video>
         <h1 className='h-full uppercase text-[17vw] font-medium text-[#BBBBBB] leading-[14vw] text-right tracking-tight w-[97%] mt-auto mx-auto'>
            RIDE
            LUXURY
            <br />
            <span className='gradient-text'>WORLDWIDE</span>
         </h1>
      </div>
      <Footer />
    </div>
  )
}

export default About
