import React from 'react'
import Navbar from '../home/Navbar'
import Footer from '../home/Footer'
import useMediaQuery from '@/hooks/useMediaQuery';

const ContactUs: React.FC = () => {
   const isAboveSmallScreens = useMediaQuery("(min-width: 914px)");
  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <Navbar />
      <div className='grid md:grid-cols-[2fr_1fr] gap-5 w-[98%] mx-auto md:h-[90vh]'>
         {isAboveSmallScreens ? (
         <div className='relative'>
            <img src='/images/membership/onyx.webp' alt='' className='md:absolute -z-10 phone:h-[45vh] md:h-[90vh] object-cover'/>
         </div>) : (<></>) }
         <div className='flex flex-col justify-center phone:gap-3 md:gap-10 h-full phone:w-[98%] tablet:w-full mx-auto'>
            <h1 className='phone:text-4xl md:text-7xl tracking-tight font-medium phone:text-center'><span className='gradient-text'>Contact US</span></h1>
            <div className='flex flex-col gap-2'>
               <p className='phone:text-sm md:text-2xl text-[#BBBBBB] tracking-tighter text-center'>Fill out the form below and one of our rental experts will contact you within 24 hours.</p>
               <div className='flex flex-col justify-between gap-2 mt-5'>
                  <input className='bg-[#141414] px-5 py-3 rounded text-[#FAFAFA] outline-none tracking-tight' placeholder='Full Name'/>
                  <input className='bg-[#141414] px-5 py-3 rounded text-[#FAFAFA] outline-none tracking-tight' placeholder='Email'/>
               </div>
               <textarea className='bg-[#141414] px-5 py-3 rounded text-[#FAFAFA] outline-none tracking-tight w-full' placeholder='Your Message'/>
               <button className='bg-[#222222] py-2 w-full rounded'>Submit</button>
            </div>
         </div>
      </div>
      <div className='md:mt-[2vw]'>
         <Footer />
      </div>
    </div>
  )
}

export default ContactUs
