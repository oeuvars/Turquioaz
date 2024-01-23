import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Model } from './AllCarCards';
import { Link, useParams } from 'react-router-dom';
import Navbar from '@/app/home/Navbar';
import Marquee from 'react-fast-marquee';
import { ArrowUpRight } from 'lucide-react';
import Footer from '@/app/home/Footer';

const SingleCarCard: React.FC = () => {
   const registerCookie = Cookies.get("RegisterCookie");
   const loginCookie = Cookies.get("LoginCookie");
   const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loginCookie || registerCookie}`
    };
   const [model, setModel] = useState<Model>();
   const { id } = useParams<{ id: string }>();
   useEffect(() => {
      const getCar = async () => {
        const response = await axios.get(`https://calm-gold-rabbit-gown.cyclic.app/user/car/${id}`, {headers});
        const result: Model = response.data.model;
        setModel(result)
    }
    getCar()
   }, [])

  return (
    <>
      <Navbar />
      <div className='phone:mt-[1.5vh] md:my-[1vw]'>
        <Marquee className='phone:text-[13vh] md:text-[17vw] phone:leading-[10vh] md:leading-[13vw] uppercase font-medium tracking-tight overflow-y-hidden' speed={70}>
          <span className='text-[#303030]'>{model?.brand}&nbsp;</span> <span className='text-[#BBBBBB]'>{model?.name}&nbsp;</span>
        </Marquee>
        <div className='my-[2vw] md:h-[95vh]'>
          <img src={model?.imageSource} alt='' className='w-full px-[1vw] mx-auto object-cover md:absolute phone:h-[45vh] md:h-[95vh] -z-10 opacity-70'/>
          <div className='flex phone:ml-0 md:ml-auto phone:w-full md:w-[35vw] phone:m-[1vh] md:m-[1vw]'>
            <div className="flex flex-col w-full justify-between gap-2 bg-black phone:p-[0vh] md:p-[1.5vw] phone:m-[1.5vh] md:m-[1vw] z-10 rounded-sm">
              {/* 1st row */}
              <div className="w-full justify-between">
                <div className="flex justify-between w-[] text-[#FAFAFA]">
                    <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">{model?.brand}</p>
                    <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">{model?.name}</p>
                </div>
                <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]"/>
              </div>
              {/* 2nd row */}
              <div className="w-full justify-between">
                <div className="flex justify-between w-[] text-[#FAFAFA]">
                    <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">Power</p>
                    <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">{model?.power} HP</p>
                </div>
                <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]"/>
              </div>
              {/* 3rd row */}
              <div className="w-full justify-between">
                <div className="flex justify-between w-full text-[#FAFAFA]">
                    <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">0-60 MPH</p>
                    <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">{model?.acceleration} Sec</p>
                </div>
                <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]"/>
              </div>
              {/* 4th row */}
              <div className="w-full justify-between">
                <div className="flex justify-between w-full text-[#FAFAFA]">
                    <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">Top Speed</p>
                    <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">{model?.topSpeed} MPH</p>
                </div>
                <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]"/>
              </div>
              {/* 5th row */}
              <div className="w-full justify-between">
                <div className="flex justify-between w-full text-[#FAFAFA]">
                    <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">Price</p>
                    <p className="phone:text-base tablet:text-lg md:text-xl tracking-tight">{model?.price}$</p>
                </div>
                <hr className="border-t-[1px] border-[#AFAFAF] mt-[1vw]"/>
              </div>
              {/* 6th row */}
              <div className="w-full justify-between mt-[1vw]">
                <Link to={`/the-collection/all-cars/rent-car/${model?.id}`} className="flex justify-between w-full text-[#FAFAFA]">
                    <div className="phone:text-base tablet:text-lg md:text-xl tracking-tight gradient-text flex">
                      <span className='phone:text-base tablet:text-lg md:text-xl tracking-tight my-auto'>Rent Now</span>
                      <ArrowUpRight className='my-auto text-yellow-700'/>
                    </div>
                    <p className="text-2xl gradient-text font-medium">{model?.rent}$</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SingleCarCard
