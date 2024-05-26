import Footer from '@/app/home/Footer';
import Navbar from '@/app/home/Navbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion} from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { WishlistedCar } from '@/types/DataTypes';
import { headers, loginCookie, registerCookie } from '@/utils/authHeader';
import { Image } from '@nextui-org/image';
import DesktopFilters from '../cars/filters/DesktopFilters';
import useMediaQuery from '@/hooks/useMediaQuery';
import MobileFilters from '../cars/filters/MobileFilters';
import { showToast } from '@/helpers/showToats';

const Wishlist: React.FC = () => {
   const [wishlistedCars, setWishlistedCars] = useState<WishlistedCar[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [totalModels, setTotalModels] = useState<number>(0);
   const pageSize = 4;
   const totalPages = Math.ceil(totalModels / pageSize);
   const [searchParams, setSearchParams] = useSearchParams();
   const currentPage = searchParams.get('page');
   const [page, setPage] = useState<number>(Number(currentPage) || 1);

   const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
   const [selectedPrice, setSelectedPrice] = useState<number[]>([100])
   const [selectedPower, setSelectedPower] = useState<number[]>([100])
   const [selectedAcceleration, setSelectedAcceleration] = useState<number[]>()

   useEffect(() => {
      const wishlisted = async () => {
         const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/get-wishlist`, { headers });
         if (response.data.success === true) {
            setWishlistedCars(response.data.wishlist);
            setTotalModels(response.data.wishlist.length)
            setLoading(false)
         } else {
            setWishlistedCars([]);
         }
      };
      wishlisted();
   }, []);

   const handleDeleteClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
      event.preventDefault();
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/user/delete-from-wishlist/${id}`,{headers});
      const wishlisted = async () => {
         const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/get-wishlist`, { headers });
         if (response.data.success === true) {
            setWishlistedCars(response.data.wishlist);
            setTotalModels(response.data.wishlist.length)
            showToast("Deleted from wishlist", true)
            setLoading(false)
         } else {
            setWishlistedCars([]);
            showToast("Try again later", false)
         }
      };
      wishlisted();
   };
   const isAboveSmallScreens = useMediaQuery("(min-width: 914px)");
   return (
      <div className='min-h-screen flex flex-col justify-between'>
         {isAboveSmallScreens ? (
            <Navbar />
         ) : (
            <div>
               <p className="font-dm-mono text-center uppercase font-medium my-[1vh]"><span className="text-[#5E5E5E]">Built for supercars</span> - Turquioaz</p>
               <hr className="border-t-[1px] border-[#232323]"/>
               <div className="flex justify-between w-full px-[1.5vh]">
                  <Link to="/">
                     <img src="/icons/turquioaz.svg" alt="turquioaz" className="w-12 my-auto"/>
                  </Link>
                     <MobileFilters
                     setPage={setPage}
                     selectedBrand={selectedBrand}
                     setSelectedBrand={setSelectedBrand}
                     selectedPrice={selectedPrice}
                     setSelectedPrice={setSelectedPrice}
                     selectedPower={selectedPower}
                     setSelectedPower={setSelectedPower}
                     selectedAcceleration={selectedAcceleration}
                     setSelectedAcceleration={setSelectedAcceleration}
                  />
               </div>
            </div>
         )}
         <div className='phone:h-[30vh] tablet:h-[37vh] overflow-hidden relative mb-auto'>
            <img className="w-screen flex object-cover opacity-50 h-full" src="/assets/box-pattern.svg" alt="" />
            <h1 className='w-full flex justify-center phone:text-3xl sm:text-5xl tablet:6xl lg:text-7xl absolute phone:-mt-[20vh] tablet:-mt-[18vh] lg:-mt-[20vh] tracking-tighter font-semibold saturate-[1.1]'>
               <span className='gradient-text'>The Turquioaz wishlist</span>
            </h1>
         </div>
         <div className="w-[98%] mx-auto grid tablet:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr] phone:-mt-10 tablet:mt-5 gap-3.5">
            <div className=''>
               {isAboveSmallScreens ? (
                  <DesktopFilters
                     setPage={setPage}
                     selectedBrand={selectedBrand}
                     setSelectedBrand={setSelectedBrand}
                     selectedPrice={selectedPrice}
                     setSelectedPrice={setSelectedPrice}
                     selectedPower={selectedPower}
                     setSelectedPower={setSelectedPower}
                     selectedAcceleration={selectedAcceleration}
                     setSelectedAcceleration={setSelectedAcceleration}
                  />
               ) : (
                  <></>
               )}
            </div>
            { loginCookie || registerCookie ? (
               <>
                  { loading ? (
                     <div className="grid md:grid-cols-2 gap-3.5">
                        {Array.from({ length: 4 }).map((_, index) => (
                           <div key={index} className='relative rounded-sm overflow-hidden'>
                              <Skeleton className='rounded mx-auto flex flex-col phone:h-[40vh] xs:h-[50vh] s:h-[55vh] sm:h-[60vh] md:h-[40vw] justify-between phone:p-[1.5vh] md:p-[1vw]'>
                                 <div className='flex justify-between'>
                                    <Skeleton className='w-6 h-6 my-auto rounded-full' />
                                    <Skeleton className='w-40 h-6 my-auto' />
                                 </div>
                                 <div className='flex flex-col justify-between gap-2'>
                                    {Array.from({length: 3 }).map((_, index) => (
                                       <div className="w-full flex flex-col gap-2 justify-between" key={index}>
                                          <div className="flex justify-between w-full">
                                             <Skeleton className='w-44 h-6 my-auto' />
                                             <Skeleton className='w-44 h-6 my-auto' />
                                          </div>
                                          <hr className="border-t-[1px] border-[#303030] border-dashed rounded-full" />
                                       </div>
                                    ))}
                                 </div>
                              </Skeleton>
                           </div>
                        ))}
                     </div>
                  ) : (
                     <div>
                        {wishlistedCars.length > 0 ? (
                           <div className="grid md:grid-cols-2 gap-3.5">
                              {wishlistedCars.map((wishlist) => (
                                 <Link key={wishlist.id} to={`/the-collection/all-cars/${wishlist.carId}`} className="relative rounded-sm overflow-hidden flex flex-col justify-between">
                                    <div className='opacity-80'>
                                       <Image src={wishlist.car.imageSource} alt="" className="w-screen mx-auto object-cover opacity-80 phone:h-[40vh] xs:h-[50vh] s:h-[55vh] sm:h-[60vh] md:h-[40vw]" loading='lazy'/>
                                    </div>
                                    <div className='mx-auto flex flex-col phone:h-[40vh] xs:h-[50vh] s:h-[55vh] sm:h-[60vh] md:h-[40vw] justify-between w-full absolute z-10'>
                                       <div className='flex justify-between phone:p-[1.5vh] md:p-[1vw]'>
                                          <button onClick={(e) => handleDeleteClick(e, wishlist.id)}>
                                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FAFAFA" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                                          </button>
                                          <div className="flex gap-3 font-medium">
                                             <p className="phone:text-sm tablet:text-base lg:text-lg tracking-tight text-[#FAFAFA]">{wishlist.car.brand}</p>
                                             <p className="phone:text-sm tablet:text-base lg:text-lg tracking-tight text-[#BBBBBB]">{wishlist.car.name}</p>
                                          </div>
                                       </div>
                                       <div className='flex flex-col justify-between gap-2 phone:p-[1.5vh] md:p-[1vw] font-medium'>
                                          {Object.entries({ Power: wishlist.car.power + ' HP', '0-60 MPH': wishlist.car.acceleration + ' Sec', 'Top Speed': wishlist.car.topSpeed + ' MPH' }).map(([label, value]) => (
                                             <div className="w-full flex flex-col gap-2 justify-between" key={label}>
                                                <div className="flex justify-between w-full text-[#FAFAFA]">
                                                   <p className="phone:text-sm tablet:text-base lg:text-lg tracking-tight">{label}</p>
                                                   <p className="phone:text-sm tablet:text-base lg:text-lg tracking-tight">{value}</p>
                                                </div>
                                                <hr className="border-t-[1px] border-[#AFAFAF]" />
                                             </div>
                                          ))}
                                       </div>
                                    </div>
                                 </Link>
                              ))}
                           </div>
                        ) : (
                           <div className='w-full justify-center h-full items-center flex'>
                              <h1 className='phone:text-2xl lg:text-6xl font-medium tracking-tighter'>Nothing to show :/</h1>
                           </div>
                        )}
                     </div>
                  )}
               </>
            ) : (
               <div className='flex flex-col justify-center items-center mt-40 gap-10'>
                  <p className='font-medium text-[#FAFAFA] tracking-tighter leading-none text-5xl'>To access your wishlist, please log in.</p>
                  <Link to='/auth/login' className='px-16 py-2 rounded bg-[#FAFAFA]/90 text-[#1F1F1F] font-semibold tracking-tighter'>Log In</Link>
               </div>
            )}
         </div>
         <div className='mt-12'>
            <Footer />
         </div>
      </div>
   );
};

export default Wishlist;
