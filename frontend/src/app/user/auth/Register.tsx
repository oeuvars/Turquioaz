import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { motion } from "framer-motion";
import Navbar from '@/app/home/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import { ToastAction } from '@/components/ui/toast';
import Footer from '@/app/home/Footer';

interface Result {
   success: boolean;
   message: string;
   token: string | null
}

const Register = () => {
   const [user, setUser] = useState({
      name: "",
      email : "",
      password : ""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    }
    const variants = {
      hidden: { opacity: 0, x: 0, y: 200 },
      enter: { opacity: 1, x: 0, y: 0},
      exit: {opacity: 0, x: 0, y: -200}
    }
    const { toast } = useToast()
    const navigate = useNavigate()
    const handleAddUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (user.email && user.name && user.password && !loading) {
         setLoading(true);
         const response = await axios.post("http://localhost:4000/user/register", user)
         const result: Result = response.data
         if (result.success === false ) {
            toast({
               title: "Hi",
               description: result.message,
               action: <ToastAction altText="Try again">Try again</ToastAction>,
             })
         } else {
            Cookies.set('RegisterCookie', result.token! , { expires: 7 })
            console.log(result.token)
            setLoading(false);
            navigate("/auth/verify-registration");
         }
      }
    };
  return (
      <div className='min-h-screen flex flex-col justify-between'>
         <Navbar />
         <div className='m-auto phone:w-[90%] tablet:w-[70%] md:w-[50%] flex flex-col justify-center phone:mt-[5vh] tablet:mt-[5vw]'>
            <motion.div className='flex flex-col gap-1 mt-[4vw]' variants={variants} initial="hidden" animate="enter" transition={{ ease: "easeOut", duration: 1 }}>
               <div>
                  <p className='text-[#333333] phone:text-2xl md:text-4xl font-semibold tracking-tighter'>Register</p>
                  <span className='phone:text-4xl md:text-6xl font-semibold gradient-text tracking-tight'>Welcome Turquioaz!</span>
               </div>
               <div className='flex gap-3 justify-center bg-[#1f1f1f] phone:py-2 tablet:py-3 px-5 rounded mt-[1.5vw]'>
                  <img src='/icons/google.svg' alt="" className='w-6 h-6 my-auto'/>
                  <Link to="/login/github" className='font-medium tracking-tighter text-[#AFAFAF] text-lg'>Continue with Google</Link>
               </div>
            </motion.div>
            <div className='mx-auto flex flex-col phone:gap-2 tablet:gap-5 w-full phone:my-[2.5vh] tablet:my-0'>
               <motion.input
                  variants={variants} initial="hidden" animate="enter" transition={{ ease: "easeOut", duration: 1.3 }}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 phone:py-3 tablet:py-4 text-[#FAFAFA] bg-[#141414] outline-none font-medium text-lg tracking-tight rounded"
                  placeholder='Email'
                  value={user.email}
                  required
                  onChange={(e)=>{setUser({...user,email:e.target.value})}}
               />
               <motion.input
                  variants={variants} initial="hidden" animate="enter" transition={{ ease: "easeOut", duration: 1.45 }}
                  type="name"
                  id="name"
                  name="name"
                  placeholder='Name'
                  value={user.name}
                  className="w-full px-3 phone:py-3 tablet:py-4 text-[#FAFAFA] bg-[#141414] outline-none font-medium text-lg tracking-tight rounded"
                  required
                  onChange={(e)=>{setUser({...user,name:e.target.value})}}
               />
               <motion.div className='flex' variants={variants} initial="hidden" animate="enter" transition={{ ease: "easeOut", duration: 1.6 }}>
                  <input
                     type={showPassword ? 'text' : 'password'}
                     id="password"
                     name="password"
                     placeholder='Password'
                     value={user.password}
                     className="w-full px-3 phone:py-3 tablet:py-4 text-[#FAFAFA] bg-[#141414] outline-none font-medium text-lg tracking-tight rounded"
                     required
                     onChange={(e)=>{setUser({...user,password:e.target.value})}}
                  />
                  <button
                     onClick={togglePasswordVisibility}
                     className='text-[#333333] font-medium bg-transparent border-0 outline-none focus:outline-none cursor-pointer phone:-ml-[5vh] tablet:-ml-[2.5vw]'
                  >
                     {showPassword ? (<Eye className='w-7 h-7 my-auto'/>) : (<EyeOff className='w-7 h-7 my-auto'/>)}
                  </button>
               </motion.div>
            </div>
            <Toaster />
            <motion.button
               variants={variants} initial="hidden" animate="enter" transition={{ ease: "easeOut", duration: 1.75 }}
               onClick={handleAddUser}
               className={`bg-[#1f1f1f] text-[#FAFAFA] px-6 phone:py-2 tablet:py-3 rounded font-satoshi-medium text-lg tracking-tight ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
               disabled={loading}
            >
               {loading ? 'Signing Up...' : 'Sign Up'}
            </motion.button>
            <motion.div variants={variants} initial="hidden" animate="enter" transition={{ ease: "easeOut", duration: 2 }} className='flex justify-center mt-2 mb-[5vw]'>
               <Link to="/auth/login" className='py-2 px-7 bg-[#131313] hover:bg-[#151515] rounded text-sm text-[#FAFAFA] animation font-medium text-center'>
                  Already an account? <span className="gradient-text">Login</span>
               </Link>
            </motion.div>
         </div>
         <Footer />
      </div>
  )
}

export default Register
