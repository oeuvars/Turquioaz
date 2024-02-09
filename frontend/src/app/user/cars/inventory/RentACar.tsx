import Navbar from '@/app/home/Navbar';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import Footer from '@/app/home/Footer';
import toast, { Toaster } from "react-hot-toast";
import Stripe from 'stripe';
import { Model } from '@/types/Model';
import { Skeleton } from '@/components/ui/skeleton';

const RentACar: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const [model, setModel] = useState<Model>();
   const [startDate, setStartDate] = useState<Date>(new Date());
   const tomorrow = new Date();
   tomorrow.setDate(tomorrow.getDate() + 1);
   const [endDate, setEndDate] = useState<Date>(tomorrow);
   const [days, setDays] = useState<number>();
   const [loading, setLoading] = useState<boolean>(true);
   const navigate = useNavigate()

   const registerCookie = Cookies.get('RegisterCookie');
   const loginCookie = Cookies.get('LoginCookie');
   const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loginCookie || registerCookie}`,
   };
   useEffect(() => {
      const getCar = async () => {
         setLoading(true);
         const response = await axios.get(
            `http://localhost:4000/user/car/${id}`,
            { headers },
         );
         const result: Model = response.data.model;
         setModel(result);
         setLoading(false);
      };
      getCar();
   }, []);

   useEffect(() => {
      const utc1 = Date.UTC(startDate!.getFullYear(), startDate!.getMonth(), startDate!.getDate());
      const utc2 = Date.UTC(endDate!.getFullYear(), endDate!.getMonth(), endDate!.getDate());
      const diffDays = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
      setDays(diffDays);
   }, [startDate, endDate]);

   const Key = import.meta.env.VITE_STRIPE_SECRET_KEY;
   const stripe = new Stripe(Key, {
      apiVersion: '2023-10-16',
   });
   const handleClick = async () => {
      if (days! <= 0) {
         toast.error("How is it even possible?", {
         style: {
            border: "2px solid rgba(255, 255, 255, 0.1)",
            padding: "10px",
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            fontSize: '1rem',
            minWidth: "10em",
            letterSpacing: "-0.05em"
         },
         iconTheme: {
            primary: "#000",
            secondary: "#fff",
         },
         });
      }
      else {
         if (!loginCookie || !registerCookie) {
            navigate('/auth/login')
         }
         else {
            const session = await stripe.checkout.sessions.create({
               payment_method_types: ['card'],

               line_items: [
                  {
                     price_data: {
                        currency: 'usd',
                        product_data: {
                           name: model!.name,
                        },
                        unit_amount: model!.rent * 100,
                     },
                     quantity: days,
                  },
               ],
               shipping_address_collection: {
                  allowed_countries: ['US'],
               },
               mode: 'payment',
               success_url: `${origin}/order-confirmation?success=true&id=${model?.id}`,
            });
            if (session.url) {
               window.location.href = session.url;
            }
            const response = await axios.post(
               `http://localhost:4000//user/rent-car/${id}`,
               {
                  startDate: startDate.toISOString().split('T')[0],
                  endDate: endDate.toISOString().split('T')[0],
                  status: false,
               },
               { headers },
            );
            const idToken = response.data.token;
            localStorage.setItem('idToken', idToken);
         }
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
         <div className="grid tablet:grid-cols-2 phone:w-[95%] md:w-[98%] mx-auto gap-5 my-[1.5vw]">
            {loading ? (
               <Skeleton className='h-[97vh]'/>
            ) : (
               <img src={model?.imageSource} alt="" className="w-full mx-auto object-cover phone:h-[45vh] md:h-[95vh] -z-10 opacity-70 rounded-sm" loading='lazy'/>
            )}
            <div className="flex flex-col justify-between">
               <>
                  {loading ? (
                     <div className='flex flex-col gap-2'>
                        <Skeleton className='h-[4.8vw]'/>
                        <Skeleton className='h-[4.8vw]'/>
                     </div>
                  ) : (
                     <h1 className="text-[#333333] phone:text-2xl md:text-7xl tracking-tighter font-medium">
                        {model?.brand} <br />
                        <span className="gradient-text phone:text-4xl md:text-6xl">{model?.name}</span>
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
               <div className="grid md:grid-cols-2 phone:gap-3 md:gap-5">
                  <div className="border border-dashed border-[#555555] rounded p-4 flex flex-col gap-2 justify-between w-full">
                     <h1 className="text-[#333333] font-semibold phone:text-2xl md:text-5xl tracking-tighter text-left">
                        Start Date
                     </h1>
                     <Popover>
                        <PopoverTrigger asChild>
                           <button className="bg-[#222222] w-full rounded flex px-5 py-3 tracking-tight outline-none text-[#FAFAFA]">
                              <CalendarIcon className="mr-2 my-auto h-5 w-5 text-[#BBBBBB]" />
                              {startDate ? (
                                 format(startDate, 'PPP')
                              ) : (
                                 <span className="text-[#FAFAFA] tracking-tighter">
                                    Pick a date
                                 </span>
                              )}
                           </button>
                        </PopoverTrigger>
                        <PopoverContent
                           className="w-auto p-0 backdrop-blur-md rounded-2xl z-10"
                           align="center"
                        >
                           <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={(date: Date | undefined) => {
                                 if (date) {
                                    setStartDate(date);
                                 }
                              }}
                              initialFocus
                              className="w-auto backdrop-blur-md rounded z-20 p-5 text-[#FAFAFA] bg-white/10"
                           />
                        </PopoverContent>
                     </Popover>
                  </div>
                  <div className="border border-dashed border-[#555555] rounded p-4 flex flex-col gap-2 justify-between w-full">
                     <h1 className="text-[#333333] font-semibold phone:text-2xl md:text-5xl tracking-tighter">
                        End Date
                     </h1>
                     <Popover>
                        <PopoverTrigger asChild>
                           <button className="bg-[#222222] w-full rounded flex px-5 py-3 tracking-tight outline-none text-[#FAFAFA]">
                              <CalendarIcon className="mr-2 my-auto h-5 w-5 text-[#BBBBBB]" />
                              {endDate ? (
                                 format(endDate, 'PPP')
                              ) : (
                                 <span className="text-[#FAFAFA] tracking-tighter text-lg">
                                    Pick a date
                                 </span>
                              )}
                           </button>
                        </PopoverTrigger>
                        <PopoverContent
                           className="w-auto p-0 backdrop-blur-md rounded-2xl z-10"
                           align="center"
                        >
                           <Calendar
                              mode="single"
                              selected={endDate}
                              onSelect={(date: Date | undefined) => {
                                 if (date) {
                                    setEndDate(date);
                                 }
                              }}
                              initialFocus
                              className="w-auto backdrop-blur-md rounded z-20 p-5 text-[#FAFAFA] bg-white/10"
                           />
                        </PopoverContent>
                     </Popover>
                  </div>
               </div>
               <div className="border border-dashed border-[#555555] rounded p-4 flex justify-between mt-5">
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
               <Toaster
                  position="top-right"
               />
               <button
                  onClick={handleClick}
                  className="w-full bg-[#111111] hover:shadow-md animation phone:my-[2vh] py-3 rounded"
               >
                  <span className="gradient-text font-medium tracking-tight text-xl">
                     Checkout
                  </span>
               </button>
            </div>
         </div>
         <Footer />
      </>
   );
};

export default RentACar;
