import React, { useState } from 'react'
import Navbar from '@/app/home/Navbar'
import Footer from '@/app/home/Footer'
import AllCarCards from './AllCarCards'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DesktopFilters from '../filters/DesktopFilters';
import { Link, useSearchParams } from 'react-router-dom';
import useMediaQuery from '@/hooks/useMediaQuery';
import MobileFilters from '../filters/MobileFilters';

const AllCars: React.FC = () => {
  const [totalModels, setTotalModels] = useState<number>(0);

  const pageSize = 4;
  const totalPages = Math.ceil(totalModels / pageSize);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page');
  const [page, setPage] = useState<number>(Number(currentPage));

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [selectedPrice, setSelectedPrice] = useState<number[]>([100])
  const [selectedPower, setSelectedPower] = useState<number[]>([100])
  const [selectedAcceleration, setSelectedAcceleration] = useState<number[]>()


  const changePage = (newPage: number) => {
   setPage(newPage);
   setSearchParams({ ...searchParams, page: newPage.toString() });
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
        <button className={`mr-1 ${page === 1 ? 'cursor-not-allowed' : ''}`} onClick={() => { if (page !== 1) {setPage(page-1)} }} disabled={page === 1}>
          <ChevronLeft className='text-[#FAFAFA] w-7 h-7'/>
        </button>
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          const isMiddleButton = currentPage && +currentPage === pageNumber;
          const isInRange = Math.abs(page - pageNumber) <= 2;
          if (isMiddleButton || isInRange) {
            return (
              <button key={index} onClick={() => changePage(pageNumber)} className={`${isMiddleButton ? 'bg-[#1F1F1F] text-yellow-600' : 'bg-[#282828]'} animation hover:bg-[#1F1F1F] text-[#FAFAFA] w-[40px] h-[40px] rounded-full text-lg`}>
                {pageNumber}
              </button>
            );
          }
          return null;
        })}
        <button className={`ml-1 ${page === totalPages ? 'cursor-not-allowed' : ''}`} onClick={() => { if (page+1 <= totalPages) {setPage(page+1)} }} disabled={page === totalPages}>
          <ChevronRight className='text-[#FAFAFA] w-7 h-7'/>
        </button>
      </div>
      <Footer />
   </>

  )
}

export default AllCars
