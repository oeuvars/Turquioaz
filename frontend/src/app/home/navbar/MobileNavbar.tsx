import {  Menu } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const MobileNavbar: React.FC = () => {
  return (
    <div>
      <p className="font-dm-mono text-center uppercase font-medium my-[1vh]"><span className="text-[#5E5E5E]">Built for supercars</span> - Turquioaz</p>
      <hr className="border-t-[1px] border-[#232323]"/>
      <div className="flex justify-between w-full px-[1.5vh]">
         <Link to="/">
            <img src="/icons/turquioaz.svg" alt="turquioaz" className="w-12 my-auto"/>
         </Link>
         <button>
            <Menu className='w-8 h-8 text-[#303030]'/>
         </button>
      </div>
    </div>
  )
}

export default MobileNavbar
