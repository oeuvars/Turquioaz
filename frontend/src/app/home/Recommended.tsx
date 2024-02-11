import axios from "axios";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Model } from "@/types/Model";
import { ArrowUpRight } from "lucide-react";

const Recommended: React.FC = () => {
   const [cars, setCars] = useState<Model[]>([])
   const [loading, setLaoding] = useState<boolean>(true)
   useEffect(() => {
      const featuredCars = async () => {
         setLaoding(true)
         const response = await axios.get("https://combative-ant-scarf.cyclic.app/user/featured-cars")
         const result: Model[] = response.data.models
         setCars(result)
         setLaoding(false)
      }
      featuredCars();
   }, [])
   return (
      <Marquee>
         <div className="flex mt-[2.5vh]">
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
                        <img src={car.imageSource} className="phone:w-[45vh] phone:h-[40vh] tablet:w-[35vw] tablet:h-[25vw] object-cover opacity-70 rounded" />
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
   )
}

export default Recommended;
