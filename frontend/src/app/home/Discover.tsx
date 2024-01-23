import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Discover:React.FC = () => {
  return (
    <div className='my-[5vw]'>
      <img src='/images/home/artura-collection.webp' alt='' className='-z-10 tablet:absolute'/>
      <Link to='/the-collection/all-cars' className='flex gap-1 phone:mt-[2.5vh] tablet:mt-0 p-[1vw] phone:justify-center mx-auto tablet:justify-end phone:w-[70%] tablet:w-full phone:bg-[#111111] tablet:bg-transparent px-5 py-2 rounded  hover:text-white animation tablet:h-[75vh]'>
         <p className='tablet:uppercase tablet:font-medium phone:text-sm lg:text-xl my-auto'><span className='gradient-text'>View the entire collection</span></p>
         <ArrowUpRight className='my-auto phone:w-6 phone:h-6 tablet:w-7 tablet:h-7 text-yellow-700'/>
      </Link>
    </div>
  )
}

export default Discover
