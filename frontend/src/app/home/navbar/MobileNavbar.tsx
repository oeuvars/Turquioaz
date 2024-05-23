import { AnimatePresence, motion, useAnimation, MotionConfig } from 'framer-motion';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import {  Cog, Flame, Github, Heart, Home, Library, Linkedin, Phone } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export interface Payload {
  email: string,
  role: string,
  name: string,
  iat: number,
  exp: number
}

const MobileNavbar: React.FC = () => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const sidebarControls = useAnimation();
  const [userEmail, setUserEmail] = useState<string>();
  const [active, setActive] = useState(false);

  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuToggled(!isMenuToggled);
    sidebarControls.start(isMenuToggled ? { x: "70%" } : { x: 0 });
    document.body.style.overflow = isMenuToggled ? 'auto' : 'hidden';
  };
  const registerCookie = Cookies.get("RegisterCookie");
   const loginCookie = Cookies.get("LoginCookie")

   useEffect(() => {
      if (registerCookie) {
         const decoded: Payload = jwtDecode(registerCookie);
         setUserEmail(decoded.email)
      }
      if (loginCookie) {
         const decoded: Payload = jwtDecode(loginCookie)
         setUserEmail(decoded.email)
      }
      else {
         setUserEmail("Hi")
      }
   }, [loginCookie, registerCookie])

   const handleSignout = () => {
      Cookies.remove('LoginCookie');
      Cookies.remove("RegisterCookie");
      navigate('/auth/login')
   }

   const VARIANTS = {
      top: {
        open: {
            rotate: ['0deg', '0deg', '45deg'],
            top: ['35%', '50%', '50%'],
        },

        closed: {
            rotate: ['45deg', '0deg', '0deg'],
            top: ['50%', '50%', '35%'],
        },
      },

      middle: {
        open: {
            rotate: ['0deg', '0deg', '-45deg'],
        },

        closed: {
            rotate: ['-45deg', '0deg', '0deg'],
        },
      },

      bottom: {
        open: {
            rotate: ['0deg', '0deg', '45deg'],
            bottom: ['35%', '50%', '50%'],
            left: '50%',
        },

        closed: {
            rotate: ['45deg', '0deg', '0deg'],
            bottom: ['50%', '50%', '35%'],
            left: 'calc(50% + 10px)',
        },
      },
  };
  return (
    <div>
      <p className="font-dm-mono text-center uppercase font-medium my-[1vh]"><span className="text-[#5E5E5E]">Built for supercars</span> - Turquioaz</p>
      <hr className="border-t-[1px] border-[#232323]"/>
      <div className="flex justify-between w-full px-[1.5vh]">
         <Link to="/">
            <img src="/icons/turquioaz.svg" alt="turquioaz" className="w-12 my-auto"/>
         </Link>
         <MotionConfig transition={{ duration: 0.3, ease: 'easeInOut'}}>
            <motion.button initial={false} animate={active ? 'open' : 'closed'} onClick={() => { setActive(prevValue => !prevValue); toggleMenu() }} className="relative h-8 w-8 rounded-full bg-white/0 transition-colors z-50 my-auto">
              <motion.span
                variants={VARIANTS.top}
                className="absolute h-1 w-7 bg-[#333333] rounded-3xl"
                style={{ y: '-50%', left: '50%', x: '-50%', top: '35%' }}
              />
              <motion.span
                variants={VARIANTS.middle}
                className="absolute h-1 w-7 bg-[#333333] rounded-3xl"
                style={{ left: '50%', x: '-50%', top: '52%', y: '-50%' }}
              />
              {active ? null : (
              <motion.span
                variants={VARIANTS.bottom}
                className="absolute h-1 w-4 bg-[#333333] rounded-3xl"
                style={{ x: '-80%', y: '50%', top: '57%', bottom: '35%', left: 'calc(50% + 10px)' }}
              />
            )}
          </motion.button>
        </MotionConfig>
        <AnimatePresence>
          {isMenuToggled && (
            <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={isMenuToggled ? { x: 0, opacity: 1, transition: { ease: 'easeInOut' } } : { x: "100%", opacity: 0, transition: { ease: 'easeInOut' } }}
            exit={{ x: "100%", opacity: 0, transition: { ease: 'easeInOut' } }}
            className="fixed flex flex-col z-40 right-0 bottom-0 h-screen bg-[#101010]/70 w-[100%] backdrop-blur-md">
              <div className="flex flex-col gap-5 mx-auto text-white px-8 mt-[3.3rem] w-full ml-auto">
                <div className='flex gap-3'>
                  <Home className='w-5 h-5 my-auto'/>
                  <Link to="/" className="my-auto text-[#FAFAFA] tracking-tighter text-lg">Home</Link>
                </div>
                <div className='flex gap-3'>
                  <Library className='w-5 h-5 my-auto'/>
                  <Link to="/the-collection/all-cars" className="hover:text-[#FAFAFA] my-auto tracking-tighter text-lg">The collection</Link>
                </div>
                <div className='flex gap-3'>
                  <Flame className='w-5 h-5 my-auto'/>
                  <a href="/404" className="hover:text-[#FAFAFA] my-auto tracking-tighter text-lg">Become A Member</a>
                </div>
                <div className='flex gap-3'>
                  <Heart className='w-5 h-5 my-auto'/>
                  <Link to="/wishlist" className="my-auto text-[#FAFAFA] tracking-tighter text-lg">Wishlist</Link>
                </div>
                <div className='flex gap-3'>
                  <Cog className='w-5 h-5 my-auto'/>
                  <Link to="/settings" className="my-auto text-[#FAFAFA] tracking-tighter text-lg">Settings</Link>
                </div>
                <div className='flex gap-3'>
                  <Phone className='w-5 h-5 my-auto'/>
                  <Link to="/contact-us" className="my-auto text-[#FAFAFA] tracking-tighter text-lg">Contact Us</Link>
                </div>
              </div>
              <div className="p-5 mx-auto justify-between mt-auto w-full mb-10">
                {registerCookie || loginCookie ? (
                  <div className='flex flex-col w-full gap-3 my-5'>
                    <p className='text-[#444444] tracking-tighter text-lg'>hey, <br /><span className='text-3xl text-[#FAFAFA]'>{userEmail}</span></p>
                    <button className='bg-[#222222] rounded px-7 py-2 text-[#FAFAFA] tracking-tighter' onClick={handleSignout}>
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div className='flex w-full gap-3 my-5'>
                    <button className='bg-[#222222] rounded px-7 py-3'>
                      <Link to="/auth/login" className='text-[#FAFAFA] tracking-tighter'>Log In</Link>
                    </button>
                    <button className='bg-[#222222] rounded px-7 py-3'>
                      <Link to="/auth/login"><span className='gradient-text tracking-tighter'>Register</span></Link>
                    </button>
                  </div>
                )}
                <h1 className="my-auto text-[#BBBBBB] text-lg mb-3 tracking-tighter">
                  © 2023 Copyright: Turquioaz
                </h1>
                <div className="flex gap-3">
                  <Link to="https://github.com/oeuvars/Rent-Ride">
                    <Github className='w-6 h-6 my-auto'/>
                  </Link>
                  <Link to="https://www.linkedin.com/in/ritam-s-5143b3222/">
                    <Linkedin className='w-6 h-6 my-auto'/>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MobileNavbar
