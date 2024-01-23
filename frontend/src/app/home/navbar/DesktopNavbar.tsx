import { ArrowUpRight, ChevronDownIcon, Clover, Cog, LogOut } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useAnimation } from "framer-motion"
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export interface Payload {
   email: string,
   role: string,
   name: string,
   iat: number,
   exp: number
}

const DesktopNavbar:React.FC = () => {
   const [isServicesHovered, setIsServicesHovered] = useState<boolean>(false);
   const controls = useAnimation();
   const arrowControls = useAnimation();
   const [userEmail, setUserEmail] = useState<string>()
   const [userName, setUserName] = useState<string>()

   const registerCookie = Cookies.get("RegisterCookie");
   const loginCookie = Cookies.get("LoginCookie")

   useEffect(() => {
      if (registerCookie) {
         const decoded: Payload = jwtDecode(registerCookie);
         setUserEmail(decoded.email)
         setUserName(decoded.name)
      }
      if (loginCookie) {
         const decoded: Payload = jwtDecode(loginCookie)
         setUserEmail(decoded.email)
         setUserName(decoded.name)
      }
      else {
         setUserEmail("Hi")
         setUserName("Guest")
      }
   }, [loginCookie, registerCookie])

   const handleServicesHover = (isHovered: boolean) => {
      setIsServicesHovered(isHovered);

      if (isHovered) {
        controls.start({ opacity: 1, y: 0 });
        arrowControls.start({ rotate: 180 });
      } else {
        controls.start({ opacity: 0, y: -10 });
        arrowControls.start({ rotate: 0 });
      }
    };

    const handleLogout = () => {

    }

  return (
    <div>
      <p className="font-dm-mono text-center uppercase font-medium my-[0.5vw]"><span className="text-[#5E5E5E]">Built for supercars</span> - Turquioaz</p>
      <hr className="border-t-[1px] border-[#232323]"/>
      <div className="flex justify-between w-full px-[1vw]">
         <div className="flex justify-between gap-[5vw]">
            <Link to="/">
               <img src="/icons/turquioaz.svg" alt="turquioaz" className="w-12 my-auto"/>
            </Link>
            <Link to="/the-collection" className="font-dm-mono text-[#999999] hover:text-[#FAFAFA] uppercase font-medium my-auto animation z-20">The collection</Link>
            <Link to="#membership" className="font-dm-mono text-[#999999] hover:text-[#FAFAFA] uppercase font-medium my-auto animation z-20">Become A Member</Link>
         </div>
         <div className="flex justify-between gap-[5vw]">
            <div className={`relative my-auto z-20 text-[#999999]`} onMouseEnter={() => handleServicesHover(true)} onMouseLeave={() => handleServicesHover(false)}>
               <button className="flex items-center font-dm-mono uppercase font-medium my-auto animation z-20">
                  <span className="mr-2">Account</span>
                  <motion.span
                     initial={{ rotate: 0 }}
                     animate={arrowControls}
                     className="h-5 w-5 text-white my-auto"
                  >
                     <ChevronDownIcon className={`h-5 w-5 my-auto text-[#999999]`} />
                  </motion.span>
               </button>

               <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={controls}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute grid px-5 tracking-tight gap-3 py-5 -left-[3.5vw] backdrop-blur bg-[#111111]/50 rounded shadow-xl phone:text-base lg:text-lg ${
                     isServicesHovered ? "block" : "hidden"
                  }`}
               >
                  <div className='flex'>
                     <div className='border border-r rounded-full'></div>
                     <div>
                        <h1 className='text-[#FAFAFA]'>{userEmail}</h1>
                        <h1 className='text-[#FAFAFA]'>{userName}</h1>
                     </div>
                  </div>
                  <hr />
                  <Link to="/wishlist" className='flex w-full gap-2'>
                     <Clover className='my-auto h-5 w-5'/>
                     <h1>Wishlist</h1>
                  </Link>
                  <Link to="/settings" className='flex w-full gap-2'>
                     <Cog className='my-auto h-5 w-5'/>
                     <h1>Settings</h1>
                  </Link>
                  <div onClick={handleLogout} className='flex w-full gap-2'>
                     <LogOut className='my-auto h-5 w-5'/>
                     <h1>Logout</h1>
                  </div>
               </motion.div>
            </div>
            <Link to="/auth/register" className="font-dm-mono text-[#999999] hover:text-[#FAFAFA] uppercase font-medium my-auto animation z-20">Turquioaz Rides</Link>
            <Link to="/download" className="flex gap-1 z-20">
               <p className="font-dm-mono gradient-text uppercase font-medium my-auto animation">Download The App</p>
               <ArrowUpRight className='my-auto text-yellow-700'/>
            </Link>
         </div>
      </div>
    </div>
  )
}

export default DesktopNavbar
