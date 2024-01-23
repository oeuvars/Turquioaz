import { ArrowUpRight } from 'lucide-react'
import React from 'react'

const Membership:React.FC = () => {
  return (
      <div className=''>
         <h1 className='phone:text-4xl lg:text-8xl text-[#DDDDDD] font-medium text-center tracking-tighter'>Membership</h1>
         <p className='text-[#BBBBBB] tracking-tighter phone:text-sm lg:text-2xl text-center mt-[1.5vw]'>Become an Onyx Rides member and receive <br /> exclusive ride benefits + rewards</p>
         <div className='flex flex-col phone:gap-2 tablet:gap-5 w-[98%] mx-auto phone:my-5 tablet::my-10'>
            <div className='relative phone:h-[20vh] tablet:h-[30vw] flex justify-center'>
               <img src='/images/membership/clay.jpg' alt='' className='object-cover opacity-70 absolute h-full -z-10 w-full'/>
               <p className='flex items-center justify-center phone:text-3xl lg:text-6xl font-medium'>Clay</p>
            </div>
            <div className='relative phone:h-[20vh] tablet:h-[30vw] flex justify-center'>
               <img src='/images/membership/steel.webp' alt='' className='object-cover opacity-70 absolute h-full w-full -z-10'/>
               <p className='flex items-center justify-center phone:text-3xl lg:text-6xl font-medium text-neutral-950'>Steel</p>
            </div>
            <div className='relative phone:h-[20vh] tablet:h-[30vw] flex justify-center'>
               <img src='/images/membership/onyx.webp' alt='' className='object-cover opacity-70 absolute h-full -z-10'/>
               <p className='flex items-center justify-center phone:text-3xl lg:text-6xl font-medium'>Onyx</p>
            </div>
         </div>
         <div className="flex gap-1 text-[#999999] hover:text-white animation justify-center mt-[1.5vw]">
            <p className="text-xl uppercase font-medium font-roboto-mono tracking-tighter">Apply To Become A Member</p>
            <ArrowUpRight className='my-auto w-6 h-6' />
         </div>
      </div>
  )
}

export default Membership
