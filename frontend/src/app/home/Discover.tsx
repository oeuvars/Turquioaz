import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Discover: React.FC = () => {
   return (
      <div className="relative phone:my-[10vh] lg:my-[5vw] phone:h-[60vh] lg:h-[80vh]">
         <video
            autoPlay
            loop
            className="object-cover w-full h-full -z-10 blur-xl absolute opacity-40"
         >
            <source src="/videos/footer.mp4" />
         </video>
         <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="phone:h-[60vh] lg:h-[80vh] flex flex-col gap-2 justify-center items-center"
         >
            <div className="flex gap-2">
               <img
                  src="/icons/turquioaz.svg"
                  alt=""
                  className="phone:w-12 phone:h-12 lg:w-20 lg:h-20"
               />
               <h1 className="landing-text font-semibold phone:text-3xl lg:text-5xl tracking-tighter my-auto">
                  Turquioaz
               </h1>
            </div>
            <h1 className="phone:text-4xl lg:text-6xl tracking-tighter font-medium text-center">
               Open your doors to the <br /> world of exotic cars.
            </h1>
            <button className="relative inline-flex mt-5 overflow-hidden rounded p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
               <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
               <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded bg-slate-950 phone:px-9 lg:px-12 phone:py-2 lg:py-3 text-sm font-medium text-white backdrop-blur-3xl">
                  <Link to="/the-collection/all-cars">
                     Explore
                  </Link>
               </span>
            </button>
         </motion.div>
      </div>
   );
};

export default Discover;
