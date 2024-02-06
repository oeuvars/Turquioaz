import { Skeleton } from '@/components/ui/skeleton';
import { AllCarCardsProps } from '@/types/AllCarCards';
import { Model } from '@/types/Model';
import { WishlistedCar } from '@/types/WishlistedCar';
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import { Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

   //  const isWishlisted = useSelector((state: RootState) => state.wishlist.isWishlisted)
   //  const dispatch = useDispatch();
   //  useEffect(() => {
   //    console.log(isWishlisted)
   //  }, [isWishlisted])

   const handleAddToWishlistClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
      e.preventDefault();
      await axios.post(`https://combative-ant-scarf.cyclic.app//user/add-to-wishlist/${id}`, {}, { headers });
      const wishlistedCar = async () => {
         const res = await axios.get("https://combative-ant-scarf.cyclic.app//user/wishlisted-cars", { headers });
         setWishlistedModels(res.data.wishlistedCar);
      };
      wishlistedCar();
   };
   const handleDeleteClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
      event.preventDefault();
      await axios.delete(`https://combative-ant-scarf.cyclic.app//user/delete-wishlisted-car/${id}`, { headers });
      const wishlistedCar = async () => {
         const res = await axios.get("https://combative-ant-scarf.cyclic.app//user/wishlisted-cars", { headers });
         setWishlistedModels(res.data.wishlistedCar);
      };
      wishlistedCar();
   };

   useEffect(() => {
      const wishlistedCar = async () => {
         const res = await axios.get("https://combative-ant-scarf.cyclic.app//user/wishlisted-cars", { headers });
         setWishlistedModels(res.data.wishlistedCar);
      };
      wishlistedCar();
   }, [])

   useEffect(() => {
      const getCars = async () => {
         setLoading(true);
         let apiUrl = `https://combative-ant-scarf.cyclic.app//user/inventory?page=${page}&pageSize=4`;
         if (selectedBrand) {
            apiUrl += `&brand=${selectedBrand}`;
         }
         if (selectedAcceleration) {
            apiUrl += `&minacceleration=${selectedAcceleration[0]}&maxacceleration=${selectedAcceleration[1]}`;
         }
         if (selectedPrice) {
            apiUrl += `&minprice=0&maxprice=${selectedPrice[0] * 6500}`
         }
         if (selectedPower) {
            apiUrl += `&minpower=0&maxpower=${selectedPower[0] * 10.5}`
         }
         const response = await axios.get(apiUrl, { headers });
         const result: Model[] = response.data.models;
         const totalModels: number = response.data.totalModels;
         setModels(result);
         setLoading(false);
         let queryParams = `?page=${page}`;
         if (selectedBrand) {
            queryParams += `&brand=${selectedBrand}`;
         }
         if (selectedAcceleration) {
            queryParams += `&minacceleration=${selectedAcceleration[0]}&maxacceleration=${selectedAcceleration[1]}`;
         }
         if (selectedPrice) {
            queryParams += `&minprice=0&maxprice=${selectedPrice[0] * 6500}`
         }
         if (selectedPower) {
            queryParams += `&minpower=0&maxpower=${selectedPower[0] * 10.5}`
         }
         navigate(queryParams, { replace: true });
         onTotalModelsChange(totalModels);
      };
      getCars();
   }, [page, selectedPrice, selectedBrand, selectedPower, selectedAcceleration]);

   return (
      <>
         <div className='grid tablet:grid-cols-2 phone:gap-[1vh] md:gap-[1vw] w-[98%] mx-auto'>
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
                     <Link to={`/the-collection/all-cars/${model.id}`} className='relative rounded-sm overflow-hidden' key={model.id}>
                        <img src={model.imageSource} alt="" className="h-full w-full mx-auto object-cover opacity-70 absolute -z-10" />
                        <div className="mx-auto flex flex-col phone:h-[40vh] md:h-[40vw] justify-between phone:p-[1.5vh] md:p-[1vw]">
                           <div className="flex justify-between">
                              <div className="z-20">
                                 <AnimatePresence>
                                    {wishlistedModels.some((wishlistedModel) => wishlistedModel.carId === model.id) ? (
                                       <div key={model.id} className='absolute'>
                                          {wishlistedModels.map((wishlistedModel) => (wishlistedModel.carId === model.id ? (
                                             <motion.button exit={{ opacity: 0 }} onClick={(event) => handleDeleteClick(event, wishlistedModel.id)} key={wishlistedModel.id}>
                                                <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} src='/icons/filled-star.svg' alt='star' className='my-auto w-6 h-6' />
                                             </motion.button>
                                          ) : null
                                          ))}
                                       </div>
                                    ) : (
                                       (registerCookie || loginCookie ? (
                                          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(event) => handleAddToWishlistClick(event, model.id)} className='absolute'>
                                             <Star className="text-[#BBBBBB] animation hover:text-white w-6 h-6" />
                                          </motion.button>
                                       ) : (
                                          <Link to="/auth/kogin" className='absolute'>
                                             <Star className="text-[#BBBBBB] animation hover:text-white w-6 h-6" />
                                          </Link>
                                       ))

                                    )}
                                 </AnimatePresence>
                              </div>
                              <div className="flex gap-3">
                                 <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight text-[#FAFAFA]">{model.brand}</p>
                                 <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight text-[#BBBBBB]">{model.name}</p>
                              </div>
                           </div>
                           <div className="flex flex-col justify-between gap-2">
                              {/* 1st row */}
                              <div className="w-full justify-between">
                                 <div className="flex justify-between w-full text-[#FAFAFA]">
                                    <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">Power</p>
                                    <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">{model.power} HP</p>
                                 </div>
                                 <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]" />
                              </div>
                              {/* 2nd row */}
                              <div className="w-full justify-between">
                                 <div className="flex justify-between w-full text-[#FAFAFA]">
                                    <p className="phone:text-base tablet:text-lg md:text-xl">0-60 MPH</p>
                                    <p className="phone:text-base tablet:text-lg md:text-xl">{model.acceleration} Sec</p>
                                 </div>
                                 <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]" />
                              </div>
                              {/* 3rd row */}
                              <div className="w-full justify-between">
                                 <div className="flex justify-between w-full text-[#FAFAFA]">
                                    <p className="phone:text-base tablet:text-lg md:text-xl">Top Speed</p>
                                    <p className="phone:text-base tablet:text-lg md:text-xl">{model.topSpeed} MPH</p>
                                 </div>
                                 <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]" />
                              </div>
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
