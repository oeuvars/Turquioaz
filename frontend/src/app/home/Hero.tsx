import React from 'react'
import { Link } from 'react-router-dom'

const Hero:React.FC = () => {
  return (
    <>
      <div className="phone:mt-[5vh] md:my-[2vw] phone:px-[2vh] md:px-[2vw] hover:saturate-[1.25] animation">
         <h1 className="font-medium phone:text-center tablet:text-right"><span className='phone:text-[12vh] md:text-[17.5vw] phone:leading-[9vh] md:leading-[14vw] gradient-text tracking-tighter'>URBAN</span></h1>
         <h1 className="font-medium phone:text-center tablet:text-right md:mr-[10vw] mt-2"><span className='phone:text-[12vh] md:text-[17.5vw] phone:leading-[9vh] md:leading-[14vw] gradient-text tracking-tighter px-2'>LUXURY</span></h1>
      </div>
      <div className="flex phone:justify-center tablet:justify-end tablet:mr-[15vw] phone:gap-3 md:gap-[2vw] phone:mt-[5vh] md:mt-[1vw]">
         <p className="phone:text-lg md:text-2xl text-[#999999]">(1)</p>
         <p className="phone:text-lg md:text-2xl tracking-tighter text-[#FAFAFA]">Turquioaz Rides — Exclusive membership <br /> only high-end luxury rental service</p>
      </div>
      <div className="flex gap-2 tablet:gap-[3vw] phone:justify-center tablet:justify-end phone:mt-[3vh] md:mt-[1vw] tablet:mr-[11vw]">
         <Link to="/" className="flex gap-1 px-5 py-2 rounded">
            <p className="text-[#999999] hover:text-[#FAFAFA] tablet:uppercase font-medium my-auto animation phone:text-sm tablet:text-xl tracking-tight">View Membership</p>
            <img src='/icons/arrow-up-right.svg' alt='' className='phone:w-4 phone:h-4 lg:w-6 lg:h-6 my-auto'/>
         </Link>
         <Link to="/the-collection" className="flex gap-1 px-5 py-2 rounded">
            <p className="text-[#999999] hover:text-[#FAFAFA] tablet:uppercase font-medium my-auto animation phone:text-sm tablet:text-xl tracking-tight">View The Collection</p>
            <img src='/icons/arrow-up-right.svg' alt='' className='phone:w-4 phone:h-4 lg:w-6 lg:h-6 my-auto'/>
         </Link>
      </div>
    </>
  )
}

export default Hero
