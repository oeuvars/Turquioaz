import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Featured: React.FC = () => {
   return (
      <motion.div
         className="my-[2.5vw] overflow-hidden"
         initial={{ opacity: 0, scale: 0.5 }}
         whileInView={{ opacity: 1, scale: 1 }}
         transition={{ duration: 1, ease: "easeInOut" }}
         viewport={{ once: true }}
      >
         <Link to="/the-collection/all-cars/9">
            <img
               src="/images/g63suv.webp"
               alt=""
               className="phone:h-[40vh] tablet:h-screen w-full px-[1vw] mx-auto object-cover opacity-70 absolute -z-10"
               loading='lazy'
            />
            <div className="w-[95%] mx-auto flex flex-col phone:h-[40vh] tablet:h-screen justify-between py-[1vw]">
               <div className="flex justify-between">
                  <div className="flex gap-2">
                     <img
                        src="/icons/dot.svg"
                        alt=""
                        className="phone:w-2 phone:h-2 tablet:w-4 tablet:h-4 md:w-5 md:h-5 my-auto"
                     />
                     <p className="phone:text-sm tablet:text-base md:text-xl lg:text-2xl tracking-tight text-[#BBBBBB]">
                        Available
                     </p>
                  </div>
                  <div className="flex phone:gap-2 tablet:gap-5">
                     <p className="phone:text-sm tablet:text-base md:text-xl lg:text-2xl tracking-tight gradient-text">
                        Featured
                     </p>
                     <p className="phone:text-sm tablet:text-base md:text-xl lg:text-2xl tracking-tighter text-[#FAFAFA]">
                        Mercedes Benz AMG G63
                     </p>
                  </div>
               </div>
               <div className="flex flex-col justify-between phone:gap-1 md:gap-5">
                  {/* 1st row */}
                  <div className="flex w-full justify-end">
                     <div className="flex gap-2 text-[#BBBBBB]">
                        <p className="phone:text-lg md:text-xl tracking-tight uppercase">
                           Book Reservation
                        </p>
                        <img
                           src="/icons/arrow-up-right.svg"
                           alt=""
                           className="phone:w-4 phone:h-4 tablet:w-5 tablet:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 my-auto"
                        />
                     </div>
                  </div>
                  <hr className="border-t-[1px] border-[#303030] mb-[2vw]" />
                  {/* 2nd row */}
                  <div className="w-full justify-between">
                     <div className="flex justify-between w-full text-[#FAFAFA]">
                        <p className="phone:text-lg md:text-xl lg:text-2xl tracking-tight">Power</p>
                        <p className="phone:text-lg md:text-xl lg:text-2xl tracking-tight uppercase">
                           577 HP
                        </p>
                     </div>
                     <hr className="border-t-[1px] border-[#303030] mt-[1vw]" />
                  </div>
                  {/* 3rd row */}
                  <div className="w-full justify-between">
                     <div className="flex justify-between w-full text-[#FAFAFA]">
                        <p className="phone:text-lg md:text-xl lg:text-2xl tracking-tight">
                           0-60 MPH
                        </p>
                        <p className="phone:text-lg md:text-xl lg:text-2xl tracking-tight">
                           4.5 Sec
                        </p>
                     </div>
                     <hr className="border-t-[1px] border-[#303030] mt-[1vw]" />
                  </div>
                  {/* 4th row */}
                  <div className="w-full justify-between">
                     <div className="flex justify-between w-full text-[#FAFAFA]">
                        <p className="phone:text-lg md:text-xl lg:text-2xl tracking-tight">
                           Top Speed
                        </p>
                        <p className="phone:text-lg md:text-xl lg:text-2xl tracking-tight">
                           155 MPH
                        </p>
                     </div>
                     <hr className="border-t-[1px] border-[#303030] mt-[1vw]" />
                  </div>
               </div>
            </div>
         </Link>
      </motion.div>
   );
};

export default Featured;
