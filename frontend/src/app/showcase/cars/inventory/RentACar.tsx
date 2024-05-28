import Navbar from '@/app/home/Navbar';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Footer from '@/app/home/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Model } from '@/types/DataTypes';
import { Button } from "@nextui-org/button"
import { Image } from '@nextui-org/image';
import { showToast } from '@/helpers/showToats';
import { headers } from '@/utils/authHeader';
import DatePickerPopover from '@/components/global/date-picker-popover';
import { useDatePicker } from '@/hooks/useDatePicker';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';

const RentACar: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const [model, setModel] = useState<Model>();

   const today = new Date()
   const tomorrow = new Date();
   tomorrow.setDate(tomorrow.getDate() + 1);
   const { date: startDate, setDate: setStartDate } = useDatePicker(today);
   const { date: endDate, setDate: setEndDate } = useDatePicker(tomorrow);
   const [days, setDays] = useState<number>();

   const [loading, setLoading] = useState<boolean>(true);
   const navigate = useNavigate()

   const { createCheckoutSession, loadingSession } = useStripeCheckout();

   useEffect(() => {
      const getCar = async () => {
         setLoading(true);
         const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/user/car/${id}`,
            { headers },
         );
         const result: Model = response.data.model;
         setModel(result);
         setLoading(false);
      };
      getCar();
   }, [id]);

   useEffect(() => {
      if (startDate && endDate) {
         const utc1 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
         const utc2 = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
         const diffDays = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
         setDays(diffDays);
      } else {
         setDays(0);
      }
   }, [startDate, endDate]);

   const handleClick = () => {
      if(model && days && startDate && endDate) {
         createCheckoutSession(model, days, startDate, endDate, navigate, showToast);
      }
   };
   const carDetails = [
      { label: "Power", value: `${model?.power} HP` },
      { label: "0-60 MPH", value: `${model?.acceleration} Sec` },
      { label: "Top Speed", value: `${model?.topSpeed} MPH` },
      { label: "Price", value: `${model?.price}$` },
    ];

   return (
      <>
         <Navbar />
         <div className="grid md:grid-cols-2 phone:w-[95%] md:w-[98%] mx-auto gap-5 my-[1.5vw]">
            <>
               {loading ? (
                  <Skeleton className='h-[95vh]'/>
               ) : (
                  <div className='opacity-70 flex h-full phone:h-[45vh] xs:h-[50vh] s:h-[55vh] tablet:[65vh] md:h-[95vh]'>
                     <Image src={model?.imageSource} alt="" className="mx-auto object-cover -z-10 rounded-sm h-full w-screen" loading='lazy'/>
                  </div>
               )}
            </>
            <div className="flex flex-col justify-between h-full">
               <>
                  {loading ? (
                     <div className='flex flex-col gap-2'>
                        <Skeleton className='h-[4.8vw]'/>
                        <Skeleton className='h-[4.8vw]'/>
                     </div>
                  ) : (
                     <h1 className="text-[#333333] phone:text-2xl md:text-7xl tracking-tighter font-medium">
                        {model?.brand} <br />
                        <span className="gradient-text phone:text-4xl md:text-6xl px-2">{model?.name}</span>
                     </h1>
                  )}
               </>
               <div className="flex flex-col w-full justify-between gap-2 bg-black phone:my-[1.5vh] md:my-[1.5vw] rounded-sm">
                  {loading ? (
                     <>
                        {Array.from({length: 4 }).map((_, index) => (
                           <div className="w-full justify-between" key={index}>
                              <div className="flex justify-between w-full ">
                                 <Skeleton className='w-44 h-8 my-auto' />
                                 <Skeleton className='w-44 h-8 my-auto' />
                              </div>
                              <hr className="border-t-[1px] border-[#303030] border-dashed rounded-full mt-2" />
                           </div>
                        ))}
                     </>
                  ) : (
                     <>
                        {carDetails.map((detail, index) => (
                           <div key={index} className="w-full justify-between">
                              <div className="flex justify-between text-[#FAFAFA]">
                              <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">
                                 {detail.label}
                              </p>
                              <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">
                                 {detail.value}
                              </p>
                              </div>
                              <hr className="border-t-[1px] border-[#303030] border-dashed mt-[1vw]" />
                           </div>
                        ))}
                     </>
                  )}
               </div>
               <div className='flex flex-col gap-7'>
                  <div className="grid md:grid-cols-2 phone:gap-3 md:gap-5">
                     <DatePickerPopover
                        label="Start Date"
                        date={startDate}
                        onDateChange={setStartDate}
                     />
                     <DatePickerPopover
                        label="End Date"
                        date={endDate}
                        onDateChange={setEndDate}
                     />
                  </div>
                  <div className="border border-dashed border-[#555555] rounded p-4 flex justify-between">
                     <h1 className="phone:text-3xl md:text-5xl font-medium tracking-tighter text-[#333333] my-auto">
                        Total Cost:
                     </h1>
                     {loading ? (
                        <Skeleton className='h-16 w-52'/>
                     ) : (
                        <h1 className="phone:text-3xl md:text-5xl font-medium tracking-tight gradient-text">
                           {model?.rent! * days!}$
                        </h1>
                     )}
                  </div>
                  <Button
                     onClick={handleClick}
                     disabled={loadingSession}
                     className="w-full bg-[#111111] hover:shadow-md animation phone:my-[2vh] tablet:my-0 rounded mt-auto"
                  >
                     <span className="gradient-text tracking-tight text-xl">
                        {loadingSession ? <div className='flex gap-3 justify-center items-center'><Loader2 className='rotate w-6 h-6 my-auto text-[#555555]'/><span className='text-[#555555] tracking-tight'>Checking out...</span></div> : 'Checkout'}
                     </span>
                  </Button>
               </div>
            </div>
         </div>
         <div className='phone:mt-7 lg:mt-0'>
            <Footer />
         </div>
      </>
   );
};

export default RentACar;
