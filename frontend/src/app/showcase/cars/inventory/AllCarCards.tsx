import { Skeleton } from '@/components/ui/skeleton';
import { AllCarCardsProps } from '@/types/AllCarCards';
import { Model, WishlistedCar } from '@/types/DataTypes';
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Image } from '@nextui-org/image';

const AllCarCards: React.FC<AllCarCardsProps> = ({ onTotalModelsChange, page, selectedPrice, selectedBrand, selectedPower, selectedAcceleration }) => {
   const registerCookie = Cookies.get("RegisterCookie");
   const loginCookie = Cookies.get("LoginCookie")
   const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loginCookie || registerCookie}`
   };
   const [models, setModels] = useState<Model[]>([])
   const [wishlistedModels, setWishlistedModels] = useState<WishlistedCar[]>([])
   const [loading, setLoading] = useState<boolean>(true);
   const navigate = useNavigate();

   const handleAddToWishlistClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
      e.preventDefault();
      if (loginCookie || registerCookie) {
         await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/add-to-wishlist/${id}`, {}, { headers });
         const wishlistedCar = async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/wishlisted-cars`, { headers });
            setWishlistedModels(res.data.wishlistedCar);
         };
         wishlistedCar();
      } else {
         navigate('/auth/login')
      }
   };
   const handleDeleteClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
      event.preventDefault();
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/user/delete-wishlisted-car/${id}`, { headers });
      const wishlistedCar = async () => {
         const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/wishlisted-cars`, { headers });
         setWishlistedModels(res.data.wishlistedCar);
      };
      wishlistedCar();
   };

   useEffect(() => {
      const wishlistedCar = async () => {
         const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/wishlisted-cars`, { headers });
         setWishlistedModels(res.data.wishlistedCar);
      };
      wishlistedCar();
   }, [])

   useEffect(() => {
      const getCars = async () => {
         setLoading(true);

         let apiUrl = `${import.meta.env.VITE_SERVER_URL}/user/inventory?page=${page}&pageSize=4`;
         apiUrl += selectedBrand ? `&brand=${selectedBrand}` : '';
         apiUrl += selectedAcceleration ? `&minacceleration=${selectedAcceleration[0]}&maxacceleration=${selectedAcceleration[1]}` : '';
         apiUrl += selectedPrice ? `&minprice=0&maxprice=${selectedPrice[0] * 6500}` : '';
         apiUrl += selectedPower ? `&minpower=0&maxpower=${selectedPower[0] * 10.5}` : '';

         const response = await axios.get(apiUrl);
         const result: Model[] = response.data.models;
         const totalModels: number = response.data.totalModels;

         setModels(result);
         setLoading(false);

         let queryParams = `?page=${page}`;
         queryParams += selectedBrand ? `&brand=${selectedBrand}` : '';
         queryParams += selectedAcceleration ? `&minacceleration=${selectedAcceleration[0]}&maxacceleration=${selectedAcceleration[1]}` : '';
         queryParams += selectedPrice ? `&minprice=0&maxprice=${selectedPrice[0] * 6500}` : '';
         queryParams += selectedPower ? `&minpower=0&maxpower=${selectedPower[0] * 10.5}` : '';
         navigate(queryParams, { replace: true });
         onTotalModelsChange(totalModels);
      };
      getCars();
   }, [page, selectedPrice, selectedBrand, selectedPower, selectedAcceleration]);

   return (
      <>
         <div className='grid md:grid-cols-2 phone:gap-[1vh] md:gap-[1vw] w-[98%] mx-auto'>
            {loading ? (
               Array.from({ length: 4 }).map((_, index) => (
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
               ))
            ) : (
               <>
                  {models.map((model: Model) => (
                     <Link to={`/the-collection/all-cars/${model.id}`} className='relative rounded-sm overflow-hidden flex flex-col justify-between' key={model.id}>
                        <Image src={model.imageSource} alt="" className="w-screen mx-auto object-cover opacity-70 phone:h-[40vh] xs:h-[50vh] s:h-[55vh] sm:h-[60vh] md:h-[40vw]" loading='lazy'/>
                        <div className="mx-auto flex flex-col phone:h-[40vh] xs:h-[50vh] s:h-[55vh] sm:h-[60vh] md:h-[40vw] justify-between w-full absolute z-10">
                           <div className="flex justify-between phone:p-[1.5vh] md:p-[1vw]">
                              <div className="z-20">
                                 <AnimatePresence>
                                    {wishlistedModels.some((wishlistedModel) => wishlistedModel.carId === model.id) ? (
                                       <div key={model.id} className='absolute'>
                                          {wishlistedModels.map((wishlistedModel) => (wishlistedModel.carId === model.id ? (
                                             <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(event) => handleDeleteClick(event, wishlistedModel.id)} key={wishlistedModel.id}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FAFAFA" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                                             </motion.button>
                                          ) : null
                                          ))}
                                       </div>
                                    ) : (
                                       <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(event) => handleAddToWishlistClick(event, model.id)} className='absolute'>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                                       </motion.button>
                                    )}
                                 </AnimatePresence>
                              </div>
                              <div className="flex gap-3 font-medium">
                                 <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight text-[#FAFAFA]">{model.brand}</p>
                                 <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight text-[#BBBBBB]">{model.name}</p>
                              </div>
                           </div>
                           <div className="flex flex-col justify-between gap-2 phone:p-[1.5vh] md:p-[1vw] font-medium">
                              {Object.entries({ Power: model.power + ' HP', '0-60 MPH': model.acceleration + ' Sec', 'Top Speed': model.topSpeed + ' MPH' }).map(([label, value]) => (
                                 <div className="w-full flex flex-col gap-2 justify-between" key={label}>
                                    <div className="flex justify-between w-full text-[#FAFAFA]">
                                       <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">{label}</p>
                                       <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">{value}</p>
                                    </div>
                                    <hr className="border-t-[1px] border-[#AFAFAF]" />
                                 </div>
                              ))}
                           </div>
                        </div>
                     </Link>
                  ))}
               </>
            )}
         </div>
      </>

   )
}

export default AllCarCards
