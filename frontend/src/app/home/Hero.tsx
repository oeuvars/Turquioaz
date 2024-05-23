import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Hero: React.FC = () => {
   const leftVariants = {
      hidden: { opacity: 0, x: -100, y: 0 },
      enter: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 1, x: -100, y: 0 },
   };
   const rightVariants = {
      hidden: { opacity: 0, x: 100, y: 0 },
      enter: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, x: 100, y: 0 },
   };
   return (
      <div className='phone:min-h-[70vh] tablet:min-h-[95vh] phone:flex phone:flex-col tablet:grid items-center phone:justify-center tablet:justify-end'>
         <img className="w-screen phone:h-[70vh] tablet:h-full flex object-cover opacity-20 absolute tablet:pt-7" src="/assets/box-pattern.svg" alt="" />
         <AnimatePresence>
            <div className="phone:px-[2vh] md:px-[2vw] saturate-[1.25] animation overflow-hidden">
               <motion.h1
                  variants={leftVariants}
                  initial={leftVariants.hidden}
                  whileInView={leftVariants.enter}
                  transition={{ type: 'spring', stiffness: 50 }}
                  exit={leftVariants.exit}
                  className="font-medium phone:text-center tablet:text-right"
               >
                  <span className="phone:text-[12vh] md:text-[17.5vw] phone:leading-[9vh] md:leading-[14vw] gradient-text tracking-tighter">
                     URBAN
                  </span>
               </motion.h1>
               <motion.h1
                  variants={rightVariants}
                  initial={rightVariants.hidden}
                  whileInView={rightVariants.enter}
                  transition={{ type: 'spring', stiffness: 50 }}
                  exit={rightVariants.exit}
                  className="font-medium phone:text-center tablet:text-right md:mr-[10vw] mt-2"
               >
                  <span className="phone:text-[12vh] phone:mx-auto md:text-[17.5vw] phone:leading-[9vh] md:leading-[14vw] gradient-text tracking-tighter px-2">
                     LUXURY
                  </span>
               </motion.h1>
            </div>
            <div className='grid gap-5'>
               <motion.div
                  variants={leftVariants}
                  initial={leftVariants.hidden}
                  whileInView={leftVariants.enter}
                  transition={{ type: 'spring', stiffness: 50 }}
                  exit={leftVariants.exit}
                  className="flex phone:justify-center tablet:justify-end tablet:mr-[15vw] phone:gap-3 md:gap-[2vw] phone:mt-[5vh] md:mt-[0vw]"
               >
                  <p className="phone:text-lg md:text-2xl text-[#999999]">(1)</p>
                  <p className="phone:text-lg md:text-2xl tracking-tighter text-[#FAFAFA]">
                     Turquioaz Rides — Exclusive membership <br /> only high-end luxury rental service
                  </p>
               </motion.div>
               <motion.div
                  variants={leftVariants}
                  initial={leftVariants.hidden}
                  whileInView={leftVariants.enter}
                  transition={{ type: 'spring', stiffness: 50 }}
                  exit={leftVariants.exit}
                  className="flex gap-2 tablet:gap-[3vw] phone:justify-center tablet:justify-end phone:mt-[3vh] md:mt-[0vw] tablet:mr-[11vw]"
               >
                  <Link to="/" className="flex gap-1 px-5 py-2 rounded">
                     <p className="text-[#999999] hover:text-[#FAFAFA] tablet:uppercase font-medium my-auto animation phone:text-sm tablet:text-xl tracking-tight">
                        View Membership
                     </p>
                     <ArrowUpRight className="my-auto phone:size-5 tablet:size-6 text-[#999999] hover:text-[#FAFAFA]" />
                  </Link>
                  <Link to="/the-collection" className="flex gap-1 px-5 py-2 rounded">
                     <p className="text-[#999999] hover:text-[#FAFAFA] tablet:uppercase font-medium my-auto animation phone:text-sm tablet:text-xl tracking-tight">
                        View The Collection
                     </p>
                     <ArrowUpRight className="my-auto phone:size-5 tablet:size-6 text-[#999999] hover:text-[#FAFAFA]" />
                  </Link>
               </motion.div>
            </div>
         </AnimatePresence>
      </div>
   );
};

export default Hero;
