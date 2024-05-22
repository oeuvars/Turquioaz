import { ArrowUpRight, Cog, LibrarySquare, Phone } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerFooter,
   DrawerTrigger,
} from '@/components/ui/drawer';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export interface Payload {
   email: string;
   role: string;
   name: string;
   iat: number;
   exp: number;
}

const DesktopNavbar: React.FC = () => {
   const [userEmail, setUserEmail] = useState<string>();
   const [userName, setUserName] = useState<string>();
   const navigate = useNavigate();
   const registerCookie = Cookies.get('RegisterCookie');
   const loginCookie = Cookies.get('LoginCookie');

   useEffect(() => {
      if (registerCookie) {
         const decoded: Payload = jwtDecode(registerCookie);
         setUserEmail(decoded.email);
         setUserName(decoded.name);
      }
      if (loginCookie) {
         const decoded: Payload = jwtDecode(loginCookie);
         setUserEmail(decoded.email);
         setUserName(decoded.name);
      } else {
         setUserEmail('');
         setUserName('Guest');
      }
   }, [loginCookie, registerCookie]);

   const handleLogout = () => {
      Cookies.remove('LoginCookie');
      Cookies.remove('RegisterCookie');
      navigate('/auth/login');
   };

   return (
      <div>
         <p className="font-dm-mono text-center uppercase font-medium my-[0.5vw]">
            <span className="text-[#5E5E5E]">Built for supercars</span> - Turquioaz
         </p>
         <hr className="border-t-[1px] border-[#232323]" />
         <div className="flex justify-between w-full px-[1vw]">
            <div className="flex justify-between gap-[5vw]">
               <Link to="/">
                  <img src="/icons/turquioaz.svg" alt="turquioaz" className="w-12 my-auto" />
               </Link>
               <Link
                  to="/the-collection/all-cars"
                  className="font-dm-mono text-[#999999] hover:text-[#FAFAFA] uppercase font-medium my-auto animation z-20"
               >
                  The collection
               </Link>
               <Link
                  to="#membership"
                  className="font-dm-mono text-[#999999] hover:text-[#FAFAFA] uppercase font-medium my-auto animation z-20"
               >
                  Become A Member
               </Link>
            </div>
            <div className="flex justify-between gap-[5vw]">
               <Drawer>
                  <DrawerTrigger asChild className="my-auto">
                     <button className="flex gap-2 font-dm-mono text-[#999999] hover:text-[#FAFAFA] uppercase font-medium my-auto animation z-20">
                        <span className="uppercase">Account</span>
                     </button>
                  </DrawerTrigger>
                  <DrawerContent className="bg-[#111111]/50 backdrop-blur-xl pb-[2vh]">
                     <div className="mx-auto w-[90%]">
                        <p className="font-playfair text-white text-4xl">
                           hi,{' '}
                           <span className="text-xl font-space-grotesk text-[#FAFAFA] tracking-tighter">
                              {userName}
                           </span>
                        </p>
                        <Link to="/wishlist" className="w-full flex justify-between mt-[2vw]">
                           <div className="flex gap-3">
                              <LibrarySquare className="w-5 h-5 my-auto text-[#FAFAFA]" />
                              <p className="text-2xl tracking-tighter text-[#FAFAFA]">Wishlist</p>
                           </div>
                           <ArrowUpRight className="text-[#FAFAFA]" />
                        </Link>
                        <hr className="border-t-[1px] border-[#303030] mt-2" />
                        <Link to="/settings" className="w-full flex justify-between mt-[2vw]">
                           <div className="flex gap-3">
                              <Cog className="w-5 h-5 my-auto text-[#FAFAFA]" />
                              <p className="text-2xl tracking-tighter text-[#FAFAFA]">Settings</p>
                           </div>
                           <ArrowUpRight className="text-[#FAFAFA]" />
                        </Link>
                        <hr className="border-t-[1px] border-[#303030] mt-2" />
                        <Link to="/contact-us" className="w-full flex justify-between mt-[2vw]">
                           <div className="flex gap-3">
                              <Phone className="w-5 h-5 my-auto text-[#FAFAFA]" />
                              <p className="text-2xl tracking-tighter text-[#FAFAFA]">Contact</p>
                           </div>
                           <ArrowUpRight className="text-[#FAFAFA]" />
                        </Link>
                        <hr className="border-t-[1px] border-[#303030] mt-2" />
                        <DrawerFooter className="mt-10">
                           <DrawerClose asChild>
                              {registerCookie || loginCookie ? (
                                 <button
                                    onClick={handleLogout}
                                    className="bg-[#FAFAFA]/70 py-2 rounded text-[#222222] tracking-tighter font-medium"
                                 >
                                    Log out
                                 </button>
                              ) : (
                                 <Link
                                    to="/auth/login"
                                    className="bg-[#FAFAFA]/70 py-2 rounded text-[#222222] tracking-tighter font-medium text-center"
                                 >
                                    Log In
                                 </Link>
                              )}
                           </DrawerClose>
                           <p className="text-center text-neutral-500 tracking-tighter">
                              {userEmail}
                           </p>
                        </DrawerFooter>
                     </div>
                  </DrawerContent>
               </Drawer>
               <Link
                  to="/auth/register"
                  className="font-dm-mono text-[#999999] hover:text-[#FAFAFA] uppercase font-medium my-auto animation z-20"
               >
                  Turquioaz Rides
               </Link>
               <Link to="/download" className="flex gap-1 z-20">
                  <p className="font-dm-mono gradient-text uppercase font-medium my-auto animation">
                     Download The App
                  </p>
                  <ArrowUpRight className="my-auto text-yellow-700" />
               </Link>
            </div>
         </div>
      </div>
   );
};

export default DesktopNavbar;
