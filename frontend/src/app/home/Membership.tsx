import { ArrowUpRight, ChevronRight } from 'lucide-react'
import React from 'react'

const Membership:React.FC = () => {

   const memberships = [
      {
        price: 1,
        title: 'Clay',
        features: [
          'Enjoy the journey planning feature to organize your trips effortlessly.',
          'Maintain control over your data with our robust privacy settings.',
          'Get a glimpse of your travel insights, including basic spending and time-saving data.',
          'Integrate data from select apps to streamline your travel information.',
          'Access an online copy of your app with all your travel data.'
        ],
        buttonLabel: 'Start Clay'
      },
      {
        price: 12,
        title: 'Steel',
        features: [
          'Create detailed itineraries and customize every aspect of your journey.',
          'Maximize your data security with enhanced privacy settings.',
          'Dive deep into your travel history, from detailed spending and savings breakdowns to time saved.',
          'Integrate data from a wide array of apps and automate your experience.',
          'Access an offline copy of your app with all your travel data.',
          'Enjoy priority assistance from our dedicated support team.'
        ],
        buttonLabel: 'Start Steel'
      },
      {
        price: 29,
        title: 'Onyx',
        features: [
          'Highly customizable itineraries tailored to your preferences and desires.',
          'Ensure the utmost security for your personal data with advanced privacy settings.',
          'In-depth insights, from detailed spending and savings data to time-saving statistics.',
          'Integrate data from a wide array of apps and automate your experience.',
          'Access an offline copy of your app with all your travel data.',
          'Receive personalized assistance and recommendations from a dedicated travel expert.',
          'Unlock exclusive offers, perks, and discounts from our travel partners.'
        ],
        buttonLabel: 'Start Onyx'
      }
    ];

  return (
      <div className=''>
         <h1 className='phone:text-3xl lg:text-6xl font-medium text-center landing-text tracking-tighter py-2 my-10'>Membership that fits your niche.</h1>
         <div className='flex justify-center'>
            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
               <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
               </span>
               <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                  <span>{`Brand New Prices`}</span>
                  <ChevronRight className='w-4 h-4 my-auto'/>
               </div>
               <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
            </button>
         </div>
         <div className='flex phone:gap-2 tablet:gap-5 w-[90%] mx-auto phone:my-5 tablet:my-10'>
            {memberships.map((membership) => (
               <div className='flex flex-col rounded px-[2vw] phone:py-[2.5vh] md:py-[2.5vw] border border-dashed border-[#333333]'>
                  <h2 className='text-6xl text-[#FAFAFA] font-sacramento text-center'>{membership.title}</h2>
                  <h1 className='font-gambarino phone:text-4xl md:text-5xl text-center mt-[2.5vw] text-[#FAFAFA]'>{membership.price}<span className='text-2xl'>.99&nbsp;</span><span className='text-[#303030] text-base font-medium tracking-tighter'>/month</span></h1>
                  <hr className='border-[#333333] border-dashed border-t-[1px] phone:mt-[3vh] md:mt-[3vw] phone:mb-[3vh] md:mb-[2vw]'/>
                  <div className='phone:w-[90%] md:w-full mx-auto grid phone:gap-[1vh] md:gap-[1vw] mb-10'>
                     {membership.features.map((feature, index) => (
                        <div key={index} className='flex gap-2'>
                           <ArrowUpRight />
                           <p className='tracking-tighter phone:text-base md:text-lg text-[#FAFAFA] bottom-0 leading-tight'>{feature}</p>
                        </div>
                     ))}
                  </div>
                  <button className="inline-flex mt-auto h-12 animate-shimmer items-center justify-center rounded border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                     {membership.buttonLabel}
                  </button>
            </div>
            ))}
         </div>
         <div className="flex gap-1 text-[#999999] hover:text-white animation justify-center mt-[1.5vw]">
            <p className="text-xl uppercase font-medium font-roboto-mono tracking-tighter">Apply To Become A Member</p>
            <ArrowUpRight className='my-auto w-6 h-6' />
         </div>
      </div>
  )
}

export default Membership
