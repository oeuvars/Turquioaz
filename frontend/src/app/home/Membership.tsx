import { ArrowUpRight, ChevronRight } from 'lucide-react';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Membership: React.FC = () => {
   const leftVariants = {
      hidden: { opacity: 0, x: -250, y: 0 },
      enter: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 1, x: -250, y: 0 },
   };
   const centerVariants = {
      hidden: { opacity: 0, x: 0, y: 150 },
      enter: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 1, x: 0, y: 150 },
   };
   const rightVariants = {
      hidden: { opacity: 0, x: 250, y: 0 },
      enter: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, x: 250, y: 0 },
   };
   const memberships = [
      {
        price: 1,
        title: 'Clay',
        features: [
          'Effortlessly plan road trips in high-quality exotic, luxury, and sports cars.',
          'Maintain control over your exclusive car rental data with robust privacy settings.',
          'Get insights into your premium car rental activities, including basic spending and time-saving data.',
          'Integrate data from select luxury car rental apps to streamline your information.',
          'Access an online copy of your app with all your exclusive car rental data.',
        ],
        buttonLabel: 'Start Clay',
        varients: leftVariants,
      },
      {
        price: 12,
        title: 'Steel',
        features: [
          'Create detailed itineraries for high-quality exotic, luxury, and sports car rentals.',
          'Maximize your data security with enhanced privacy settings for premium car rental activities.',
          'Dive deep into your premium car rental history, from detailed spending and savings breakdowns to time saved.',
          'Integrate data from a wide array of luxury car rental apps and automate your premium car rental experience.',
          'Access an offline copy of your app with all your premium car rental data.',
          'Enjoy priority assistance from our dedicated support team for luxury car rental queries.',
        ],
        buttonLabel: 'Start Steel',
        varients: centerVariants,
      },
      {
        price: 29,
        title: 'Onyx',
        features: [
          'Enjoy highly customizable itineraries for high-quality exotic, luxury, and sports car rentals tailored to your preferences and desires.',
          'Ensure the utmost security for your personal premium car rental data with advanced privacy settings.',
          'Gain in-depth insights into your luxury car rental activities, from detailed spending and savings data to time-saving statistics.',
          'Integrate data from a wide array of premium car rental apps and automate your luxury car rental experience.',
          'Access an offline copy of your app with all your premium car rental data.',
          'Receive personalized assistance and recommendations from a dedicated luxury car rental expert.',
          'Unlock exclusive offers, perks, and discounts from our premium car rental partners.',
        ],
        buttonLabel: 'Start Onyx',
        varients: rightVariants,
      },
    ];


   return (
      <div className="overflow-hidden">
         <h1 className="phone:text-3xl lg:text-6xl font-medium text-center landing-text tracking-tighter py-2 phone:my-5 lg:my-10 phone:w-[80%] mx-auto text-wrap">
            Membership that fits your niche.
         </h1>
         <div className="flex justify-center">
            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
               <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
               </span>
               <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                  <span>{`Brand New Prices`}</span>
                  <ChevronRight className="w-4 h-4 my-auto" />
               </div>
               <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
            </button>
         </div>
         <AnimatePresence>
            <motion.div className="grid tablet:grid-cols-3 phone:gap-2 tablet:gap-5 phone:w-[95%] md:w-[90%] mx-auto phone:my-5 tablet:my-10">
               {memberships.map(membership => (
                  <motion.div
                     initial={membership.varients.hidden}
                     whileInView={membership.varients.enter}
                     transition={{ type: 'spring', stiffness: 50 }}
                     className="flex flex-col rounded px-[2vw] phone:py-[2.5vh] md:py-[2.5vw] border border-dashed border-[#333333]"
                  >
                     <div className="text-6xl font-space-grotesk tracking-tighter font-medium text-center py-3">
                        <span className="gradient-text px-1">{membership.title}</span>
                     </div>
                     <div className="font-gambarino phone:text-4xl md:text-5xl text-center mt-[2.5vw] text-[#FAFAFA]">
                        {membership.price}
                        <span className="text-2xl">.99&nbsp;</span>
                        <span className="text-[#303030] text-base font-medium tracking-tighter">
                           /month
                        </span>
                     </div>
                     <hr className="border-[#333333] border-dashed border-t-[1px] phone:mt-[3vh] md:mt-[3vw] phone:mb-[3vh] md:mb-[2vw]" />
                     <div className="phone:w-[90%] md:w-full mx-auto grid phone:gap-[1vh] md:gap-[1vw] mb-10">
                        {membership.features.map((feature, index) => (
                           <div key={index} className="flex gap-2">
                              <img src="/icons/check-circle.svg" alt="" className="w-6 h-6 mt-1" />
                              <p className="tracking-tighter phone:text-base md:text-lg text-[#FAFAFA] bottom-0">
                                 {feature}
                              </p>
                           </div>
                        ))}
                     </div>
                     <button className="rounded-md border border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none mt-auto">
                        {membership.buttonLabel}
                     </button>
                  </motion.div>
               ))}
            </motion.div>
         </AnimatePresence>

         <div className="flex gap-1 text-[#999999] hover:text-white animation justify-center mt-[1.5vw]">
            <p className="text-xl uppercase font-medium font-roboto-mono tracking-tighter">
               Apply To Become A Member
            </p>
            <ArrowUpRight className="my-auto w-6 h-6" />
         </div>
      </div>
   );
};

export default Membership;
