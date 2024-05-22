import { Image } from '@nextui-org/image';
import { FC } from 'react';
import Navbar from '../home/Navbar';
import { Button } from '@nextui-org/button';
import { Link } from 'react-router-dom';
import Footer from '../home/Footer';

const NotFound: FC = () => {
   return (
      <div className="min-h-screen flex flex-col justify-between">
         <Navbar />
         <img className="w-screen phone:h-[50vh] tablet:h-full flex object-cover opacity-50" src="/assets/box-pattern.svg" alt="" />
         <div className="flex flex-col justify-center items-center phone:my-[15vh] lg:my-[10vw] z-20 absolute w-full">
            <Image src="/assets/dinosaur.svg" alt="" className="phone:w-12 lg:w-20" />
            <div className="flex gap-2 mt-8">
               <h1 className="font-bold phone:text-6xl lg:text-9xl text-neutral-50">4</h1>
               <div className='my-auto'>
                  <Image src="/assets/0.svg" className="phone:w-12 phone:h-12 lg:w-24 lg:h-24 my-auto" />
               </div>
               <h1 className="font-bold phone:text-6xl lg:text-9xl text-neutral-50">4</h1>
            </div>
            <p className="font-medium phone:text-sm lg:text-lg mt-5 tracking-tighter">Maybe you are in the wrong ride...</p>
            <Button radius='sm' className="bg-black mt-5 text-medium border border-neutral-500 px-7 py-5 rounded-sm phone:text-sm tablet:text-base text-neutral-300">
               <Link to="/">Head to Homepage</Link>
            </Button>
         </div>
         <Footer />
      </div>
   );
};

export default NotFound;
