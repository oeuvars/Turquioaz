import Footer from '@/app/home/Footer';
import Navbar from '@/app/home/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Success: React.FC = () => {
   const idToken = localStorage.getItem("idToken")
   const decoded = jwtDecode(idToken!) as { id: string };
   const id = decoded.id;

   const registerCookie = Cookies.get("RegisterCookie");
   const loginCookie = Cookies.get("LoginCookie");
   const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loginCookie || registerCookie}`
    };
    useEffect (() => {
      const updateStatus = async () => {
         await axios.put(`http://localhost:4000/user/statusCheck/${id}`,{status: true},{headers});
      }
      updateStatus()
    }, [])

  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <Navbar />
      <div className='flex flex-col justify-center items-center text-6xl tracking-tighter'>
         <p><span className='gradient-text font-medium'>Hey,</span></p>
         <br />
         <p className='text-[#FAFAFA] mt-2'>Your Payment is sucessful.</p>
      </div>
      <Link to="/" className="rounded-md bg-[#151515] w-[10%] py-2 px-5 shadow-sm lg:text-xl phone:text-sm mx-auto">
         <span className='gradient-text tracking-tighter'>Return home</span>
      </Link>
      <Footer />
    </div>
  )
}

export default Success
