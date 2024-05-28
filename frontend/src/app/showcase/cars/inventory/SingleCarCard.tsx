import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '@/app/home/Navbar';
import Marquee from 'react-fast-marquee';
import { ArrowUpRight } from 'lucide-react';
import Footer from '@/app/home/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Model } from '@/types/DataTypes';
import { headers } from '@/utils/authHeader';

const SingleCarCard: React.FC = () => {
   const [model, setModel] = useState<Model>();
   const [loading, setLoading] = useState<boolean>(true);
   const { id } = useParams<{ id: string }>();
   useEffect(() => {
      const getCar = async () => {
         setLoading(true);
         const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/user/car/${id}`,
            { headers },
         );
         const result: Model = response.data.model;
         setModel(result);
         setLoading(false);
      };
      getCar();
   }, []);

   const carDetails = [
      {label: `${model?.brand}`, value: `${model?.name}`},
      { label: "Power", value: `${model?.power} HP` },
      { label: "0-60 MPH", value: `${model?.acceleration} Sec` },
      { label: "Top Speed", value: `${model?.topSpeed} MPH` },
      { label: "Price", value: `${model?.price}$` },
    ];

   return (
      <>
         <Navbar />
         {loading ? (
            <>
               <Skeleton className="h-60" />
               <div className="my-[2vw] md:h-[95vh]">
                  <Skeleton className="w-full px-[5vw] mx-auto object-cover md:absolute phone:h-[45vh] md:h-[95vh] -z-10" />
                  <div className="flex phone:ml-0 md:ml-auto phone:w-full md:w-[35vw] phone:m-[1vh] md:m-[1vw]">
                     <div className="flex flex-col w-full justify-between gap-2 bg-black phone:p-[0vh] md:p-[1.5vw] phone:m-[1.5vh] md:m-[1vw] z-10 rounded-sm">
                        <div className="flex flex-col justify-between gap-5">
                           {Array.from({ length: 6 }).map((_, index) => (
                              <div className="w-full justify-between" key={index}>
                                 <div className="flex justify-between w-full">
                                    <Skeleton className="w-44 h-6 my-auto" />
                                    <Skeleton className="w-44 h-6 my-auto" />
                                 </div>
                                 <hr className="border-t-[1px] border-[#303030] border-dashed rounded-full mt-[1vw]" />
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </>
         ) : (
            <div className="phone:mt-[1.5vh] md:my-[1vw]">
               <Marquee
                  className="phone:text-[13vh] md:text-[17vw] phone:leading-[10vh] md:leading-[13vw] uppercase font-medium tracking-tight overflow-y-hidden"
                  speed={70}
               >
                  <span className="text-[#303030]">{model?.brand}&nbsp;</span>{' '}
                  <span className="text-[#BBBBBB]">{model?.name}&nbsp;</span>
               </Marquee>
               <div className="my-[2vw] md:h-[95vh]">
                  <img
                     src={model?.imageSource}
                     alt={model?.name}
                     className="w-full px-[1vw] mx-auto object-cover md:absolute phone:h-[65vh] md:h-[95vh] -z-10 opacity-70"
                     loading='lazy'
                  />
                  <div className="flex phone:ml-0 md:ml-auto phone:w-full md:w-[35vw] phone:m-[1vh] md:m-[1vw]">
                     <div className="flex flex-col w-full justify-between gap-2 bg-black phone:p-[0vh] md:p-[1.5vw] phone:m-[1.5vh] md:m-[1vw] z-10 rounded-sm">
                        {carDetails.map((detail, index) => (
                           <div key={index} className="w-full justify-between">
                              <div className="flex justify-between text-[#FAFAFA]">
                                 <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">
                                    {detail.label}
                                 </p>
                                 <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">
                                    {detail.value}
                                 </p>
                              </div>
                              <hr className="border-t-[1px] border-[#303030] border-dashed mt-[1vw]" />
                           </div>
                        ))}
                        <div className="w-full justify-between mt-[1vw]">
                           <Link to={`/the-collection/all-cars/rent-car/${model?.id}`} className="flex justify-between w-full text-[#FAFAFA]">
                              <div className="tracking-tight gradient-text flex">
                                 <span className="text-2xl tracking-tight my-auto font-medium">
                                    Rent Now
                                 </span>
                                 <ArrowUpRight className="my-auto text-yellow-700" />
                              </div>
                              <p className="text-2xl gradient-text font-medium">{model?.rent}$</p>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
         <div className='phone:mt-7 lg:mt-0'>
            <Footer />
         </div>
      </>
   );
};

export default SingleCarCard;
