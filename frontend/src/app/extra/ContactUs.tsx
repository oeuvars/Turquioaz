import React from 'react'
import Navbar from '../home/Navbar'
import Footer from '../home/Footer'
import { Button } from '@nextui-org/button';

const ContactUs: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <Navbar />
      <div className='grid md:grid-cols-[2fr_1fr] gap-5 w-[98%] mx-auto md:h-[90vh]'>
         <video
            autoPlay
            loop
            className="object-cover w-full h-full -z-10 opacity-90"
         >
            <source src="/videos/contact.mp4" />
         </video>
         <div className='flex flex-col justify-center phone:gap-3 md:gap-10 h-full phone:w-[98%] tablet:w-full mx-auto'>
            <h1 className='phone:text-3xl tablet:4xl md:text-5xl lg:text-6xl tracking-tighter font-semibold phone:text-center'><span className='gradient-text px-1'>Contact US</span></h1>
            <div className='flex flex-col gap-2'>
               <p className='phone:text-sm tablet:base lg:text-xl text-[#BBBBBB] tracking-tighter text-center font-medium w-[90%] mx-auto'>Fill out the form below and one of our rental experts will contact you within 24 hours.</p>
               <div className='flex flex-col justify-between gap-2 mt-5'>
                  <input className='bg-[#141414] px-5 py-3 rounded text-[#FAFAFA] outline-none tracking-tight' placeholder='Full Name'/>
                  <input className='bg-[#141414] px-5 py-3 rounded text-[#FAFAFA] outline-none tracking-tight' placeholder='Email'/>
               </div>
               <textarea className='bg-[#141414] px-5 py-3 rounded text-[#FAFAFA] outline-none tracking-tight w-full' placeholder='Your Message'/>
               <Button className='bg-[#222222] py-2 w-full rounded'>Submit</Button>
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
