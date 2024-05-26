import axios from "axios";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRightIcon, ArrowUpRight } from "lucide-react";
import { Model } from "@/types/DataTypes";
import { Image } from "@nextui-org/image";
import TextShimmer from "@/components/ui/animated-shiny-text";
import { cn } from "@/lib/utils";

const Recommended: React.FC = () => {
   const [cars, setCars] = useState<Model[]>([])
   const [loading, setLaoding] = useState<boolean>(true)
   useEffect(() => {
      const featuredCars = async () => {
         setLaoding(true)
         const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/featured-cars`)
         setCars(response.data.models)
         setLaoding(false)
      }
      featuredCars();
   }, [])
   return (
      <>
         <div className="z-10 flex items-center justify-center mt-10 phone:mb-5">
            <div
            className={cn(
               "group rounded-full border text-base transition-all ease-in hover:cursor-pointer border-white/5 bg-neutral-900 hover:bg-neutral-800",
            )}
            >
            <TextShimmer className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
               <span className='gradient-text tracking-tight font-medium phone:text-sm tablet:text-base'>✨ Exclusive Cars</span>
               <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 text-amber-800" />
            </TextShimmer>
            </div>
         </div>
         <Marquee>
            <div className="flex">
               {loading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                     <Skeleton className="mx-2 tracking-tight my-[2vw] border-dashed p-4 border-[#303030] border rounded" key={index}>
                        <Skeleton className="w-40 h-7 rounded mb-4"/>
                        <Skeleton className="phone:w-[45vh] phone:h-[40vh] tablet:w-[35vw] tablet:h-[25vw] object-cover opacity-70" />
                        <div className="flex flex-col gap-2 mt-3">
                           <div className="flex w-full justify-between">
                              <Skeleton className="w-40 h-7 rounded"/>
                              <Skeleton className="w-40 h-7 rounded"/>
                           </div>
                           <hr className="border-t-[1px] border-[#303030] border-dashed" />
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                           <div className="flex w-full justify-between">
                              <Skeleton className="w-40 h-7 rounded"/>
                              <Skeleton className="w-40 h-7 rounded"/>
                           </div>
                        </div>
                     </Skeleton>
                  ))
               ) : (
                  <>
                     {cars.map((car) => (
                        <Link to={`/the-collection/all-cars/${car.id}`} className="mx-2 tracking-tight my-[2vw] border-dashed p-4 border-[#303030] border rounded" key={car.id}>
                           <div className="flex gap-1 mb-2">
                              <img src='/icons/dot.svg' alt='' className='w-3 h-3 my-auto' />
                              <p className="phone:text-xl md:text-2xl tracking-tight text-[#BBBBBB]">Available</p>
                           </div>
                           <div className="opacity-70">
                              <Image src={car.imageSource} className="phone:w-[45vh] phone:h-[40vh] tablet:w-[35vw] tablet:h-[25vw] object-cover opacity-70 rounded" />
                           </div>
                           <div className="flex flex-col gap-2 mt-2">
                              <div className="flex w-full justify-between">
                                 <p className="phone:text-lg md:text-2xl tracking-tight text-[#FAFAFA]">{car.brand}</p>
                                 <p className="phone:text-lg md:text-2xl tracking-tight text-[#BBBBBB]">{car.name}</p>
                              </div>
                              <hr className="border-t-[1px] border-[#303030] border-dashed" />
                           </div>
                           <div className="flex flex-col gap-2 mt-2">
                              <div className="flex w-full justify-between">
                                 <p className="phone:text-lg md:text-2xl tracking-tight text-[#BBBBBB]">{car.power} HP</p>
                                 <div className="flex gap-1">
                                    <p className="phone:text-sm my-auto md:text-xl tracking-tight gradient-text uppercase font-medium">Book Resevation</p>
                                    <ArrowUpRight className='w-5 h-5 my-auto text-amber-800' />
                                 </div>
                              </div>
                           </div>
                        </Link>
                     ))}
                  </>
               )}
            </div>
         </Marquee>
      </>
   )
}

export default Recommended;
