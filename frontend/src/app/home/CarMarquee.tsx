import axios from "axios";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Model } from "../user/cars/inventory/AllCarCards";
import { Link } from "react-router-dom";

const CarMarquee: React.FC = () => {
   const [cars, setCars] = useState<Model[]>([])
   useEffect(() => {
      const featuredCars = async () => {
         const response = await axios.get("https://calm-gold-rabbit-gown.cyclic.app/user/featured-cars")
         const result: Model[] = response.data.models
         setCars(result)
      }
      featuredCars();
   }, [])
   return (
      <Marquee>
         <div className="flex mt-[2.5vh]">
            {cars.map((car) => (
               <Link to={`/the-collection/all-cars/${car.id}`} className="mx-2 tracking-tight my-[2vw]" key={car.id}>
                  <div className="flex gap-1 mb-2">
                     <img src='/icons/dot.svg' alt='' className='w-3 h-3 my-auto'/>
                     <p className="phone:text-xl md:text-2xl tracking-tight text-[#BBBBBB]">Available</p>
                  </div>
                  <img src={car.imageSource} className="phone:w-[45vh] phone:h-[40vh] tablet:w-[35vw] tablet:h-[25vw] object-cover opacity-70"/>
                  <div className="flex flex-col gap-2 mt-2">
                     <div className="flex w-full justify-between">
                        <p className="phone:text-xl md:text-2xl tracking-tight text-[#FAFAFA]">{car.brand}</p>
                        <p className="phone:text-xl md:text-2xl tracking-tight text-[#BBBBBB]">{car.name}</p>
                     </div>
                     <hr className="border-t-[1px] border-[#303030]"/>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                     <div className="flex w-full justify-between">
                        <p className="phone:text-xl md:text-2xl tracking-tight text-[#BBBBBB]">{car.power} HP</p>
                        <div className="flex gap-1">
                           <p className="phone:text-lg md:text-xl tracking-tight text-[#999999] uppercase font-medium">Book Resevation</p>
                           <img src='/icons/arrow-up-right.svg' alt='' className='w-4 h-4 my-auto'/>
                        </div>
                     </div>
                     <hr className="border-t-[1px] border-[#303030]"/>
                  </div>
               </Link>
            ))}
         </div>
      </Marquee>
   )
}

export default CarMarquee;
