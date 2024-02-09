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
            <h1 className=" phone:text-5xl md:text-8xl font-medium tracking-tighter landing-text text-center mt-0">
               Ride To The Future
            </h1>
            <p className="text-[#BBBBBB] phone:text-sm md:text-2xl tracking-tighter text-center">
               Experience the next gen EV technlogy, V8, V10 and V12s <br /> with the most advaned cars manufacturers can offer.
            </p>
         </motion.div>
         <img
            src="/images/texture-overlay.png"
            alt=""
            className="phone:h-[70vh] tablet:h-screen w-full mx-auto object-cover opacity-50 absolute -z-10"
         />
      </div>
   );
};

export default Feature;
