import Footer from '@/app/home/Footer'
import Navbar from '@/app/home/Navbar'
import { Payload } from '@/app/home/navbar/DesktopNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Model } from '../cars/inventory/AllCarCards'
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'

interface WishlistedCar {
   id: number;
   carId: number;
   wishlistedbyId: number
 }

const Wishlist: React.FC = () => {
   const [userName, setUserName] = useState<string>("Guest");

   const [wishlistedCars, setWishlistedCars] = useState<WishlistedCar[]>([])
   const [wishlistedModels, setWishlistedModels] = useState<Model[]>([])

   const registerCookie = Cookies.get("RegisterCookie");
   const loginCookie = Cookies.get("LoginCookie");
   const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loginCookie || registerCookie}`
    };
   useEffect(() => {
      if (registerCookie) {
         const decoded: Payload = jwtDecode(registerCookie)
         const firstName = decoded.name.split(" ")
         setUserName(firstName[0])
      }
   }, [registerCookie])
   useEffect(() => {
      if (loginCookie) {
         const decoded: Payload = jwtDecode(loginCookie)
         const firstName = decoded.name.split(" ")
         setUserName(firstName[0])
      }
   }, [loginCookie])

   // const DELETE_BTN_WIDTH = 70
   // const MESSAGE_DELETE_ANIMATION = { height: 0, opacity: 0 }
   // const MESSAGE_DELETE_TRANSITION = {opacity: {transition: {duration: 0}}}

   useEffect(() => {
      const wishlisted = async () => {
        const response = await axios.get("https://calm-gold-rabbit-gown.cyclic.app/user/wishlisted-cars", { headers });
        const result = response.data.wishlistedCar;
        setWishlistedCars(result);
      };
      wishlisted();
    }, []);

    useEffect(() => {
      const fetchCarDetails = async () => {
        const carDetailsPromises = wishlistedCars.map(async (wishlistedCar: WishlistedCar) => {
          const carRes = await axios.get(`https://calm-gold-rabbit-gown.cyclic.app/user/car/${wishlistedCar.carId}`, { headers });
          return { ...carRes.data, wishlistedCarId: wishlistedCar.id };
        });
        const modelDetails = await Promise.all(carDetailsPromises);
        setWishlistedModels(modelDetails);
        console.log("Updated wishlistedModels:", modelDetails);
      };
      if (wishlistedCars.length > 0) {
        fetchCarDetails();
      }
    }, [wishlistedCars]);

   //  const handleDragEnd = async (info: any, id: number) => {
   //    const dragDistance = info.point.x
   //    if (dragDistance < -DELETE_BTN_WIDTH) {
   //       await axios.delete(`https://calm-gold-rabbit-gown.cyclic.app/user/delete-wishlisted-car/${id}`,{headers});
   //       const wishlisted = async () => {
   //          const response = await axios.get("https://calm-gold-rabbit-gown.cyclic.app/user/wishlisted-cars", { headers });
   //          const result = response.data.wishlistedCar;
   //          setWishlistedCars(result);
   //        };
   //        wishlisted();
   //    }
   //  }

   //  const handleDeleteClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
   //    event.preventDefault();
   //    await axios.delete(`https://calm-gold-rabbit-gown.cyclic.app/user/delete-wishlisted-car/${id}`,{headers});
   //    const wishlisted = async () => {
   //       const response = await axios.get("https://calm-gold-rabbit-gown.cyclic.app/user/wishlisted-cars", { headers });
   //       const result = response.data.wishlistedCar;
   //       setWishlistedCars(result);
   //     };
   //     wishlisted();
   //  };

  return (
    <>
      <Navbar />
      <div className='min-h-screen w-[98%] mx-auto my-[3vw]'>
         <h1 className='phone:px-[1vh] tablet:px-[1vw] text-right text-[#333333] phone:text-[8vh] tablet:text-[15.5vw] font-medium tracking-tighter uppercase leading-none'><span className='lowercase text-9xl'>the</span> {userName} Wishlist</h1>
         <AnimatePresence>
            <motion.div className='grid grid-cols-2 gap-5'>
               {wishlistedModels.map((wishlistedModel: any) => (
                  <Link to={`/the-collection/all-cars/${wishlistedModel.model.id}`} className='relative rounded-sm overflow-hidden'>
                     <img src={wishlistedModel.model.imageSource} alt="" className="h-full w-full mx-auto object-cover opacity-70 absolute -z-10"/>
                     <div className="mx-auto flex flex-col phone:h-[40vh] md:h-[40vw] justify-between phone:p-[1.5vh] md:p-[1vw]">
                        <div className="flex justify-between">
                           <div className="flex gap-3">
                              <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight text-[#FAFAFA]">{wishlistedModel.model.brand}</p>
                              <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight text-[#BBBBBB]">{wishlistedModel.model.name}</p>
                           </div>
                        </div>
                        <div className="flex flex-col justify-between gap-2">
                           <div className="w-full justify-between">
                              <div className="flex justify-between w-full text-[#FAFAFA]">
                                 <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">Power</p>
                                 <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">{wishlistedModel.model.power} HP</p>
                              </div>
                              <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]"/>
                           </div>
                           <div className="w-full justify-between">
                              <div className="flex justify-between w-full text-[#FAFAFA]">
                                 <p className="phone:text-base tablet:text-lg md:text-xl">0-60 MPH</p>
                                 <p className="phone:text-base tablet:text-lg md:text-xl">{wishlistedModel.model.acceleration} Sec</p>
                              </div>
                              <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]"/>
                           </div>
                           <div className="w-full justify-between">
                              <div className="flex justify-between w-full text-[#FAFAFA]">
                                 <p className="phone:text-base tablet:text-lg md:text-xl">Top Speed</p>
                                 <p className="phone:text-base tablet:text-lg md:text-xl">{wishlistedModel.model.topSpeed} MPH</p>
                              </div>
                              <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]"/>
                           </div>
                        </div>
                     </div>
                  </Link>
               ))}
            </motion.div>
         </AnimatePresence>
      </div>
      <Footer />
    </>
  )
}

export default Wishlist
