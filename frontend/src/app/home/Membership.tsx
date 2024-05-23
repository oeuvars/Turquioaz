import { ArrowRightIcon, ArrowUpRight } from 'lucide-react';
import TextShimmer from "@/components/ui/animated-shiny-text";
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
      <section id='membership' className="overflow-hidden phone:mt-0 lg:mt-20">
         <h1 className="phone:text-3xl lg:text-6xl font-semibold text-center landing-text tracking-tighter py-2 phone:my-5 lg:my-5 phone:w-[80%] mx-auto text-wrap">
            Memberships that fits your niche.
         </h1>
         <div className="z-10 flex items-center justify-center">
            <div
            className={cn(
               "group rounded-full border border-black/5 bg-neutral-100 text-base transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
            )}
            >
            <TextShimmer className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
               <span className='gradient-text tracking-tight font-medium phone:text-sm tablet:text-base'>✨ Exclusive Memberships</span>
               <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 text-amber-800" />
            </TextShimmer>
            </div>
         </div>
         <AnimatePresence>
            <motion.div className="grid tablet:grid-cols-3 phone:gap-2 tablet:gap-5 phone:w-[95%] md:w-[90%] mx-auto phone:my-5 tablet:my-10">
               {memberships.map(membership => (
                  <motion.div
                     initial={membership.varients.hidden}
                     whileInView={membership.varients.enter}
                     transition={{ type: 'spring', stiffness: 50 }}
                     viewport={{ once: true }}
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
      </section>
   );
};

export default Membership;
