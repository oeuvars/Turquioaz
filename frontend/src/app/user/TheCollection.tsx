import React from 'react'
import Navbar from '../home/Navbar'
import CarMarquee from '../home/Recommended'
import { ArrowUpRight } from 'lucide-react'
import Footer from '../home/Footer'
import { Link } from 'react-router-dom'

const TheCollection: React.FC = () => {

  return (
    <div>
      <Navbar />
      <h1 className='phone:px-[1vh] tablet:px-[1vw] text-right text-[#333333] phone:text-[8vh] tablet:text-[15vw] font-semibold tracking-tighter uppercase leading-none'><span className='text-7xl tracking-tighter lowercase gradient-text'>The</span> Turquioaz Collection</h1>
      <div className='phone:m-[1vh] tablet:m-[1vw] relative'>
         <img src="/cars/M4-competition-coupe.webp" alt="" className="phone:h-[70vh] tablet:h-screen w-full px-[1vw] mx-auto object-cover opacity-70 absolute -z-10"/>
         <div className="w-[98%] mx-auto flex flex-col phone:h-[70vh] tablet:h-screen justify-between py-[1vw]">
            <div className="flex justify-between">
               <div className="flex gap-2">
                  <img src='/icons/dot.svg' alt='' className='phone:w-3 phone:h-3 tablet:w-4 tablet:h-4 md:w-5 md:h-5 my-auto'/>
                  <p className="phone:text-sm tablet:text-lg md:text-xl lg:text-2xl text-[#BBBBBB]">Available</p>
               </div>
               <div className="flex phone:gap-2 tablet:gap-10  text-ellipsis">
                  <p className="phone:text-sm tablet:text-lg md:text-xl lg:text-2xl text-[#BBBBBB]">Featured</p>
                  <p className="phone:text-sm tablet:text-lg md:text-xl lg:text-2xl text-[#FAFAFA]">BMW M4 Competition Coupé</p>
               </div>
            </div>
            <div className="flex flex-col justify-between gap-5">
               {/* 1st row */}
               <div className="flex w-full justify-end">
                  <div className="flex gap-2 text-[#BBBBBB]">
                     <p className="text-xl uppercase">Book Reservation</p>
                     <img src='/icons/arrow-up-right.svg' alt='' className='w-7 h-7 my-auto'/>
                  </div>

               </div>
               <hr className="border-t-[1px] border-[#AFAFAF] mb-[2vw]"/>
               {/* 2nd row */}
               <div className="w-full justify-between">
                  <div className="flex justify-between w-full text-[#FAFAFA]">
                     <p className="phone:text-base tablet:text-lg md:text-xl lg:text-2xl">Power</p>
                     <p className="phone:text-base tablet:text-lg md:text-xl lg:text-2xl uppercase">523 HP</p>
                  </div>
                  <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]"/>
               </div>
               {/* 3rd row */}
               <div className="w-full justify-between">
                  <div className="flex justify-between w-full text-[#FAFAFA]">
                     <p className="phone:text-base tablet:text-lg md:text-xl lg:text-2xl">0-60 MPH</p>
                     <p className="phone:text-base tablet:text-lg md:text-xl lg:text-2xl">3.6 Sec</p>
                  </div>
                  <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]"/>
               </div>
               {/* 4th row */}
               <div className="w-full justify-between">
                  <div className="flex justify-between w-full text-[#FAFAFA]">
                     <p className="phone:text-base tablet:text-lg md:text-xl lg:text-2xl">Top Speed</p>
                     <p className="phone:text-base tablet:text-lg md:text-xl lg:text-2xl">159 MPH</p>
                  </div>
                  <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]"/>
               </div>
            </div>

         </div>
      </div>
      <div className='grid tablet:grid-cols-2 phone:gap-[1vh] tablet:gap-[1vw] phone:m-[1vh] tablet:m-[1vw]'>
         <div className='relative'>
            <img src="/cars/720s-spider.webp" alt="" className="phone:h-[70vh] tablet:h-screen w-full mx-auto absolute object-cover opacity-70 -z-10"/>
            <div className="mx-auto flex flex-col justify-between p-[1vw] phone:h-[70vh] tablet:h-screen">
               <div className="flex justify-between">
                  <div className="flex gap-2">
                     <img src='/icons/dot.svg' alt='' className='phone:w-3 phone:h-3 tablet:w-4 tablet:h-4 md:w-5 md:h-5 my-auto'/>
                     <p className="phone:text-sm tablet:text-lg md:text-xl lg:text-2xl text-[#BBBBBB]">Available</p>
                  </div>
                  <div className="flex phone:gap-2 tablet:gap-10">
                     <p className="phone:text-sm tablet:text-lg md:text-xl lg:text-2xl text-[#BBBBBB]">Featured</p>
                     <p className="phone:text-sm tablet:text-lg md:text-xl lg:text-2xl text-[#FAFAFA]">McLaren 720S Spider</p>
                  </div>
               </div>
               <div className="flex flex-col justify-between gap-5">
                  {/* 1st row */}
                  <div className="flex w-full justify-end">
                     <div className="flex gap-2 text-[#BBBBBB]">
                        <p className="text-xl uppercase">Book Reservation</p>
                        <img src='/icons/arrow-up-right.svg' alt='' className='w-7 h-7 my-auto'/>
                     </div>

                  </div>
                  <hr className="border-t-[1px] border-[#AFAFAF] mb-[2vw]"/>
                  {/* 2nd row */}
                  <div className="w-full justify-between">
                     <div className="flex justify-between w-full text-[#FAFAFA]">
                        <p className="phone:text-base tablet:text-lg md:text-xl lg:text-2xl">Power</p>
                        <p className="phone:text-base tablet:text-lg md:text-xl lg:text-2xl uppercase">710 HP</p>
                     </div>
                     <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]"/>
                  </div>
                  {/* 3rd row */}
                  <div className="w-full justify-between">
                     <div className="flex justify-between w-full text-[#FAFAFA]">
                        <p className="phone:text-base tablet:text-lg md:text-xl lg:text-2xl">0-60 MPH</p>
                        <p className="phone:text-base tablet:text-lg md:text-xl lg:text-2xl">2.9 Sec</p>
                     </div>
                     <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]"/>
                  </div>
                  {/* 4th row */}
                  <div className="w-full justify-between">
                     <div className="flex justify-between w-full text-[#FAFAFA]">
                        <p className="phone:text-base tablet:text-lg md:text-xl lg:text-2xl">Top Speed</p>
                        <p className="phone:text-base tablet:text-lg md:text-xl lg:text-2xl">212 MPH</p>
                     </div>
                     <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]"/>
                  </div>
               </div>

            </div>
         </div>
         <div className='relative'>
            <img src="/cars/S5-cabriolet.webp" alt="" className="phone:h-[70vh] tablet:h-screen w-full mx-auto object-cover opacity-70 absolute -z-10"/>
            <div className="mx-auto flex flex-col justify-between p-[1vw] phone:h-[70vh] tablet:h-screen">
               <div className="flex justify-between">
                  <div className="flex gap-2">
                     <img src='/icons/dot.svg' alt='' className='phone:w-3 phone:h-3 tablet:w-4 tablet:h-4 md:w-5 md:h-5 my-auto'/>
                     <p className="phone:text-sm tablet:text-lg md:text-xl lg:text-2xl text-[#BBBBBB]">Available</p>
                  </div>
                  <div className="flex gap-10">
                     <p className="phone:text-sm tablet:text-lg md:text-xl lg:text-2xl text-[#BBBBBB]">Featured</p>
                     <p className="phone:text-sm tablet:text-lg md:text-xl lg:text-2xl text-[#FAFAFA]">Audi S5 Cabriolet</p>
                  </div>
               </div>
               <div className="flex flex-col justify-between gap-5">
                  {/* 1st row */}
                  <div className="flex w-full justify-end">
                     <div className="flex gap-2 text-[#BBBBBB]">
                        <p className="text-xl uppercase">Book Reservation</p>
                        <img src='/icons/arrow-up-right.svg' alt='' className='w-7 h-7 my-auto'/>
                     </div>

                  </div>
                  <hr className="border-t-[1px] border-[#AFAFAF] mb-[2vw]"/>
                  {/* 2nd row */}
                  <div className="w-full justify-between">
                     <div className="flex justify-between w-full text-[#FAFAFA]">
                        <p className="phone:text-base tablet:text-lg md:text-xl lg:text-2xl">Power</p>
                        <p className="phone:text-base tablet:text-lg md:text-xl lg:text-2xl uppercase">349 HP</p>
                     </div>
                     <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]"/>
                  </div>
                  {/* 3rd row */}
                  <div className="w-full justify-between">
                     <div className="flex justify-between w-full text-[#FAFAFA]">
                        <p className="phone:text-base tablet:text-lg md:text-xl lg:text-2xl">0-60 MPH</p>
                        <p className="phone:text-base tablet:text-lg md:text-xl lg:text-2xl">4.7 Sec</p>
                     </div>
                     <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]"/>
                  </div>
                  {/* 4th row */}
                  <div className="w-full justify-between">
                     <div className="flex justify-between w-full text-[#FAFAFA]">
                        <p className="phone:text-base tablet:text-lg md:text-xl lg:text-2xl">Top Speed</p>
                        <p className="phone:text-base tablet:text-lg md:text-xl lg:text-2xl">155 MPH</p>
                     </div>
                     <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]"/>
                  </div>
               </div>

            </div>
         </div>
      </div>
      <div className='flex justify-between phone:w-[95%] tablet:w-[98%] mx-auto phone:mt-[5vh] tablet:mt-[3vw]'>
         <h1 className='text-[#333333] text-[10vw] tablet:uppercase font-semibold tracking-tighter leading-[7vw]'>
            Cars in offer
         </h1>
         <Link to="/the-collection/all-cars" className='phone:text-base tablet:text-lg md:text-xl lg:text-2xl gradient-text animation flex gap-2 mt-auto font-medium tracking-tighter border-white'><p>Check All</p><ArrowUpRight className='text-yellow-700 my-auto'/></Link>
      </div>
      <CarMarquee />
      <p className='phone:my-[5vh] tablet:my-[5vw] text-[#333333] font-semibold phone:text-4xl tablet:text-7xl text-center tracking-tighter'>
         To unlock luxury supercars <br />check our <Link to="/memberships" className='gradient-text hover:saturate-150 animation'>memberships</Link>
      </p>
      <Footer />
    </div>
  )
}

export default TheCollection
