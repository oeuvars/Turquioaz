import React, { useState } from 'react'
import Navbar from '@/app/home/Navbar'
import Footer from '@/app/home/Footer'
import AllCarCards from './AllCarCards'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DesktopFilters from '../filters/DesktopFilters';
import { Link, useSearchParams } from 'react-router-dom';
import useMediaQuery from '@/hooks/useMediaQuery';
import MobileFilters from '../filters/MobileFilters';

interface PaginationButtonProps {
   index: number;
   changePage: (index: number) => void;
   totalPages: number
 }

 const PaginationButton: React.FC<PaginationButtonProps> = ({ index, changePage, totalPages }) => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page');
  const showButton = !currentPage || Math.abs(index + 1 - Number(currentPage)) <= 1;

   return (
     <div key={index}>
       {showButton || index === 0 || index === totalPages - 1 ? (
        <button
          onClick={() => changePage(index + 1)}
          className={`${
            currentPage && +currentPage === index + 1 ? 'bg-[#1F1F1F] text-yellow-600' : 'bg-[#333333]'
          } animation hover:bg-[#1F1F1F] text-[#FAFAFA] w-[40px] h-[40px] rounded-full text-lg`}
        >
          {index + 1}
        </button>
      ) : (
        null
      )}
     </div>
   );
 };

const AllCars: React.FC = () => {
  const [totalModels, setTotalModels] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const pageSize = 4;
  const totalPages = Math.ceil(totalModels / pageSize);

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [selectedPrice, setSelectedPrice] = useState<number[]>([100])
  const [selectedPower, setSelectedPower] = useState<number[]>([100])
  const [selectedAcceleration, setSelectedAcceleration] = useState<number[]>()

  const changePage = (newPage: number) => {
   setPage(newPage);
  };
  const isAboveSmallScreens = useMediaQuery("(min-width: 914px)");
  return (
   <>
      {isAboveSmallScreens ? (
        <Navbar />
      ) : (
        <div>
          <p className="font-dm-mono text-center uppercase font-medium my-[1vh]"><span className="text-[#5E5E5E]">Built for supercars</span> - Turquioaz</p>
          <hr className="border-t-[1px] border-[#232323]"/>
          <div className="flex justify-between w-full px-[1.5vh]">
            <Link to="/">
                <img src="/icons/turquioaz.svg" alt="turquioaz" className="w-12 my-auto"/>
            </Link>
            <MobileFilters
              setPage={setPage}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
              selectedPower={selectedPower}
              setSelectedPower={setSelectedPower}
              selectedAcceleration={selectedAcceleration}
              setSelectedAcceleration={setSelectedAcceleration}
            />
          </div>
        </div>
      )}
      <div className='grid tablet:grid-cols-[1fr_3fr] mt-[3vw] w-[98%] mx-auto gap-[1vw]'>
         {isAboveSmallScreens ? (
          <DesktopFilters
            setPage={setPage}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            selectedPower={selectedPower}
            setSelectedPower={setSelectedPower}
            selectedAcceleration={selectedAcceleration}
            setSelectedAcceleration={setSelectedAcceleration}
          />
         ) : (
          <></>
         )}
         <AllCarCards
            onTotalModelsChange={setTotalModels}
            page={page}
            selectedBrand={selectedBrand}
            selectedPrice={selectedPrice}
            selectedPower={selectedPower}
            selectedAcceleration={selectedAcceleration}
          />
      </div>
      <div className='phone:my-[3vh] lg:my-[3vw] flex gap-3 justify-center'>
        <button className={`bg-[#303030] rounded-full p-2 ${page === 1 ? 'cursor-not-allowed' : ''}`} onClick={() => { if (page !== 1) {setPage(page-1)} }} disabled={page === 1}>
          <ChevronLeft className='text-[#BBBBBB]'/>
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <div key={index} className='my-auto'>
            <PaginationButton key={index} index={index} totalPages={totalPages} changePage={changePage} />
          </div>
        ))}
        <button className={`bg-[#333333] rounded-full p-2 ${page === totalPages ? 'cursor-not-allowed' : ''}`} onClick={() => { if (page+1 <= totalPages) {setPage(page+1)} }} disabled={page === totalPages}>
          <ChevronRight className='text-[#BBBBBB]'/>
        </button>
      </div>
      <Footer />
   </>

  )
}

export default AllCars
