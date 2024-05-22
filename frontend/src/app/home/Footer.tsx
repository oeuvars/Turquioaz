import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {

   const ColumnOne = [
      {
         id: 1,
         href: "/the-collection/all-cars",
         link: "The Collection"
      },
      {
         id: 2,
         href: "#membership",
         link: "Membership"
      },
      {
         id: 3,
         href: "/download",
         link: "Download Turquioaz"
      },
   ]

   const ColumnTwo = [
      {
         id: 1,
         href: "/about",
         link: "About"
      },
      {
         id: 2,
         href: "#faq",
         link: "FAQ"
      },
      {
         id: 3,
         href: "/contact-us",
         link: "Contact Us"
      },
   ]

  return (
    <>
      <div className='grid grid-cols-2 gap-5 phone:w-[95%] md:w-[98%] mx-auto mt-auto'>
         <div>
            {ColumnOne.map((one) => (
               <div key={one.id}>
                  <div className='flex w-full justify-between text-[#FAFAFA] animation hover:text-[#BBBBBB]'>
                     <Link to={one.href} className='phone:text-sm tablet:text-base md:text-lg tracking-tighter '>{one.link}</Link>
                     <ArrowUpRight className='phone:w-4 phone:h-4 tablet:w-4 tablet:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 my-auto'/>
                  </div>
                  <hr className='border-t-[1px] border-[#444444] phone:my-1 table:my-2 md:my-4'/>
               </div>
            ))}
         </div>
         <div>
            {ColumnTwo.map((two) => (
               <div key={two.id}>
                  <div className='flex w-full justify-between text-[#FAFAFA] animation hover:text-[#BBBBBB]'>
                     <Link to={two.href} className='phone:text-sm tablet:text-base md:text-lg tracking-tighter'>{two.link}</Link>
                     <ArrowUpRight className='phone:w-4 phone:h-4 tablet:w-4 tablet:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 my-auto'/>
                  </div>
                  <hr className='border-t-[1px] border-[#444444] phone:my-1 table:my-2 md:my-4'/>
               </div>
            ))}
         </div>
      </div>
      <div className='flex justify-between phone:w-[95%] md:w-[98%] mx-auto text-[#999999] phone:my-[1vh] md:my-[1vw] tracking-tighter'>
         <p className='phone:text-sm tablet:text-base md:text-lg'>© 2023 Turquioaz, Inc</p>
         <p className='phone:text-sm tablet:text-base md:text-lg'>Design + build by Oeuvars</p>
      </div>
    </>
  )
}

export default Footer
