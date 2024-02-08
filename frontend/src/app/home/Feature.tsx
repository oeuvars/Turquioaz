import React from 'react';
import { motion } from 'framer-motion';
const Feature: React.FC = () => {
   return (
      <div className="mx-auto phone:mt-[2.5vh] tablet:mt-[2vw] tablet:h-screen relative justify-center flex">
         <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="mx-[2vw] flex flex-col gap-3 justify-center items-center phone:h-[70vh] tablet:h-screen"
         >
            <h1 className=" phone:text-4xl tablet:text-5xl md:text-8xl font-medium tracking-tighter landing-text text-center">
               Ride To The Future
            </h1>
            <p className="text-[#BBBBBB] phone:text-sm md:text-2xl tracking-tighter text-center">
               Book a private Chauffeur with any <br /> reservation — Members only.
            </p>
         </motion.div>
         <img
            src="/images/feature.jpg"
            alt=""
            className="phone:h-[70vh] tablet:h-screen w-full mx-auto object-cover opacity-60 absolute -z-10"
         />
      </div>
   );
};

export default Feature;
