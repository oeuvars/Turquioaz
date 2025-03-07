import React, { MouseEvent, useState } from 'react';
import Cookies from 'js-cookie';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '@/app/home/Navbar';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Footer from '@/app/home/Footer';
import { showToast } from '@/helpers/showToats';

type Result = {
   exists: boolean;
   success: boolean;
   message: string;
   token: string | null
}

const Login = () => {
    const variants = {
      hidden: { opacity: 0, x: 0, y: 200 },
      enter: { opacity: 1, x: 0, y: 0},
    }
   const [user, setUser] = useState({
      email : "",
      password : ""
    })
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    }
    const navigate = useNavigate()
    const handleUserLogin = async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (user.email && user.password && !loading) {
         setLoading(true);
         console.log(user)
         const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/login`, user);
         const result: Result = response.data;
         if (result.success === true) {
            Cookies.set('LoginCookie', result.token! , { expires: 7 })
            navigate(-1)
            setLoading(false)
         }
         else {
            if (result.exists === true) {
               showToast("Incorrect password", false)
               setLoading(false)
            } else {
               showToast("User doesn't exist", false)
               setLoading(false)
            }
         }
      }
    };
  return (
      <div className='min-h-screen flex flex-col justify-between'>
         <Navbar />
         <div className='m-auto phone:w-[90%] tablet:w-[70%] md:w-[50%] flex flex-col justify-center phone:mt-[9vh] tablet:mt-[5vw]'>
            <motion.div className='flex flex-col gap-1' variants={variants} initial="hidden" animate="enter" transition={{ ease: "easeOut", duration: 1 }}>
               <div>
                  <p className='text-[#333333] phone:text-2xl md:text-4xl font-semibold tracking-tighter'>Login</p>
                  <span className='phone:text-4xl md:text-6xl font-semibold gradient-text tracking-tight'>Welcome Back!</span>
               </div>
            </motion.div>
            <div className='mx-auto flex flex-col phone:gap-2 md:gap-3 w-full mt-5'>
               <motion.input
                  variants={variants} initial="hidden" animate="enter" transition={{ ease: "easeOut", duration: 1.3 }}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 phone:py-3 md:py-4 text-[#FAFAFA] bg-[#141414] outline-none font-medium text-lg tracking-tight rounded"
                  placeholder='Email'
                  value={user.email}
                  required
                  onChange={(e)=>{setUser({...user,email:e.target.value})}}
               />
               <motion.div className='flex' variants={variants} initial="hidden" animate="enter" transition={{ ease: "easeOut", duration: 1.45 }}>
                  <input
                     type={showPassword ? 'text' : 'password'}
                     id="password"
                     name="password"
                     placeholder='Password'
                     value={user.password}
                     className="w-full px-3 phone:py-3 md:py-4 text-[#FAFAFA] bg-[#141414] outline-none font-medium text-lg tracking-tight rounded"
                     required
                     onChange={(e)=>{setUser({...user,password:e.target.value})}}
                  />
                  <button
                     onClick={togglePasswordVisibility}
                     className='text-[#333333] font-medium bg-transparent border-0 outline-none focus:outline-none cursor-pointer phone:-ml-[5vh] md:-ml-[2.5vw]'
                  >
                     {showPassword ? (<Eye className='w-6 h-6'/>) : (<EyeOff className='w-6 h-6'/>)}
                  </button>
               </motion.div>
            </div>
            <motion.button
               variants={variants} initial="hidden" animate="enter" transition={{ ease: "easeOut", duration: 1.6 }}
               onClick={handleUserLogin}
               className={`bg-[#1f1f1f] phone:my-[2vh] tablet:mt-[2vw] text-[#FAFAFA] px-6 phone:py-2 md:py-3 rounded font-satoshi-medium text-lg tracking-tight ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
               disabled={loading}
            >
               {loading ? <div className='flex gap-3 justify-center items-center'><Loader2 className='rotate w-6 h-6 my-auto text-[#555555]'/><span className='text-[#555555] font-medium tracking-tight text-xl'>Logging In...</span></div> : 'Log In'}
            </motion.button>
            <motion.div variants={variants} initial="hidden" animate="enter" transition={{ ease: "easeOut", duration: 1.75 }} className=''>
               <Link to="/auth/forgot-password" className='text-[#80796B] font-satoshi-medium text-sm hover:underline animation'>
                  Forgot Password?
               </Link>
            </motion.div>
            <motion.div variants={variants} initial="hidden" animate="enter" transition={{ ease: "easeOut", duration: 2 }} className='flex justify-center phone:my-[2vh] tablet:my-[1vw] phone:mb-0 tablet:mb-[5vw]'>
               <Link to="/auth/register" className='py-2 px-7 bg-[#131313] rounded text-sm text-[#FAFAFA] animation font-medium text-center'>
                  Don't have an account? <span className="gradient-text">Register</span>
               </Link>
            </motion.div>
         </div>
         <Footer />
      </div>
  )
}

export default Login
