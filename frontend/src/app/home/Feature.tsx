import { ArrowUpRight } from 'lucide-react'
import React from 'react'

const Feature: React.FC = () => {
  return (
    <div className='mx-auto phone:mt-[2.5vh] tablet:mt-[2vw] tablet:h-screen'>
      <div className='tablet:absolute mx-[2vw]'>
         <h1 className='text-[#DDDDDD] phone:text-3xl tablet:text-5xl md:text-7xl font-medium tracking-tighter mb-[1.5vw]'>Ride Comfort+</h1>
         <p className='text-[#BBBBBB] phone:text-sm md:text-2xl mb-[1.5vw]'>Book a private Chauffeur with any <br /> reservation — Members only.</p>
         <div className="flex gap-1 text-[#999999] hover:text-white animation">
            <p className="phone:text-sm md:text-xl font-medium">Book Resevation</p>
            <ArrowUpRight className='my-auto w-6 h-6' />
         </div>
      </div>
      <img src='/images/home/comfort.webp' alt='' className='phone:h-auto md:max-h-screen w-full mx-auto object-cover opacity-70 tablet:absolute -z-10'/>
    </div>
  )
}

export default Feature
