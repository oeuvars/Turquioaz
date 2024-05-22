import Footer from '@/app/home/Footer';
import Navbar from '@/app/home/Navbar';
import { Payload } from '@/app/home/navbar/DesktopNavbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Model, WishlistedCar } from '@/types/DataTypes';

const Wishlist: React.FC = () => {
   const [userName, setUserName] = useState<string>('Guest');

   const [wishlistedCars, setWishlistedCars] = useState<WishlistedCar[]>([]);
   const [wishlistedModels, setWishlistedModels] = useState<Model[]>([]);
   const [loading, setLoading] = useState<boolean>(true)

   const registerCookie = Cookies.get('RegisterCookie');
   const loginCookie = Cookies.get('LoginCookie');
   const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loginCookie || registerCookie}`,
   };
   useEffect(() => {
      if (registerCookie) {
         const decoded: Payload = jwtDecode(registerCookie);
         const firstName = decoded.name.split(' ');
         setUserName(firstName[0]);
      }
   }, [registerCookie]);
   useEffect(() => {
      if (loginCookie) {
         const decoded: Payload = jwtDecode(loginCookie);
         const firstName = decoded.name.split(' ');
         setUserName(firstName[0]);
      }
   }, [loginCookie]);

   useEffect(() => {
      const wishlisted = async () => {
         const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/wishlisted-cars`, { headers },
         );
         const result = response.data.wishlistedCar;
         setWishlistedCars(result);
      };
      wishlisted();
   }, []);

   useEffect(() => {
      setLoading(true)
      const fetchCarDetails = async () => {
         const carDetailsPromises = wishlistedCars.map(async (wishlistedCar: WishlistedCar) => {
            const carRes = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/car/${wishlistedCar.carId}`, { headers });
            return { ...carRes.data, wishlistedCarId: wishlistedCar.id };
         });
         const modelDetails = await Promise.all(carDetailsPromises);
         setWishlistedModels(modelDetails);
      };
      if (wishlistedCars.length > 0) {
         fetchCarDetails();
      }
      setLoading(false)
   }, [wishlistedCars]);

    const handleDeleteClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
      event.preventDefault();
      console.log(id)
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/user/delete-wishlisted-car/${id}`,{headers});
      const wishlisted = async () => {
         const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/wishlisted-cars`, { headers });
         const result = response.data.wishlistedCar;
         setWishlistedCars(result);
       };
       wishlisted();
    };

   return (
      <>
         <Navbar />
         <div className="min-h-screen w-[95%] mx-auto my-[3vw]">
            { loginCookie || registerCookie ? (
               <>
                  <div className="phone:px-[1vh] tablet:px-[1vw] text-right text-[#333333] tracking-tight phone:text-[8vh] tablet:text-[15.5vw] font-medium uppercase">
                     <div>
                        <p className='font-playfair'>the {userName}'s</p>
                     </div>
                     <h1 className='font-playfair lowercase text-9xl tracking-tighter'>Wishlist</h1>
                  </div>
                  { loading ? (
                     <motion.div className="grid tablet:grid-cols-2 gap-5 mt-[5vw]">
                        {Array.from({ length: 4 }).map((_, index) => (
                           <div key={index} className='relative rounded-sm overflow-hidden'>
                              <Skeleton className='rounded mx-auto flex flex-col phone:h-[40vh] md:h-[40vw] justify-between phone:p-[1.5vh] md:p-[1vw]'>
                                 <div className='flex justify-between'>
                                    <Skeleton className='w-6 h-6 my-auto rounded-full' />
                                    <Skeleton className='w-40 h-6 my-auto' />
                                 </div>
                                 <div className='flex flex-col justify-between gap-2'>
                                    {Array.from({length: 3 }).map((_, index) => (
                                       <div className="w-full justify-between" key={index}>
                                          <div className="flex justify-between w-full ">
                                             <Skeleton className='w-44 h-6 my-auto' />
                                             <Skeleton className='w-44 h-6 my-auto' />
                                          </div>
                                          <hr className="border-t-[1px] border-[#303030] border-dashed rounded-full mt-[1vw]" />
                                       </div>
                                    ))}
                                 </div>
                              </Skeleton>
                           </div>
                        ))}
                     </motion.div>
                  ) : (
                     <AnimatePresence>
                        <motion.div className="grid lg:grid-cols-2 gap-5 mt-[5vw]">
                           {wishlistedModels.map((model) => (
                              <Link to={`/the-collection/all-cars/${model.id}`} className="relative rounded-sm overflow-hidden phone:h-[40vh] md:h-[40vw]">
                                 <img src={model.imageSource} alt="" className=" w-full mx-auto object-cover opacity-70 absolute -z-10 phone:h-[40vh] md:h-[40vw]"/>
                                 <div className='mx-auto flex flex-col phone:h-[40vh] md:h-[40vw] justify-between phone:p-[1.5vh] md:p-[1vw] w-full'>
                                    <div className='flex justify-between'>
                                       <button onClick={(e) => handleDeleteClick(e, model.carId)}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FAFAFA" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                                       </button>
                                       <div className="flex gap-3">
                                          <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight text-[#FAFAFA]">{model.brand}</p>
                                          <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight text-[#BBBBBB]">{model.name}</p>
                                       </div>
                                    </div>
                                    <div className='flex flex-col justify-between gap-2'>
                                       {Object.entries({ Power: model.power + ' HP', '0-60 MPH': model.acceleration + ' Sec', 'Top Speed': model.topSpeed + ' MPH' }).map(([label, value]) => (
                                          <div className="w-full justify-between" key={label}>
                                             <div className="flex justify-between w-full text-[#FAFAFA]">
                                                <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">{label}</p>
                                                <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">{value}</p>
                                             </div>
                                             <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]" />
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              </Link>
                           ))}
                        </motion.div>
                     </AnimatePresence>
                  )}
               </>
            ) : (
               <div className='flex flex-col justify-center items-center mt-40 gap-10'>
                  <p className='font-medium text-[#FAFAFA] tracking-tighter leading-none text-5xl'>To access your wishlist, please log in.</p>
                  <Link to='/auth/login' className='px-16 py-2 rounded bg-[#FAFAFA]/90 text-[#1F1F1F] font-semibold tracking-tighter'>Log In</Link>
               </div>
            )}
         </div>
         <Footer />
      </>
   );
};

export default Wishlist;
