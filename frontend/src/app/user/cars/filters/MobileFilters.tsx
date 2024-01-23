import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Slider } from "@/components/ui/slider"
import axios from "axios";
import Cookies from "js-cookie";
import { SlidersHorizontal } from "lucide-react"
import { useEffect, useState } from "react";

interface MobileFiltersProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  selectedPrice: number[];
  setSelectedPrice: React.Dispatch<React.SetStateAction<number[]>>;
  selectedBrand: string | null;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>
  selectedPower: number[];
  setSelectedPower: React.Dispatch<React.SetStateAction<number[]>>
  selectedAcceleration: number[] | undefined
  setSelectedAcceleration: React.Dispatch<React.SetStateAction<number[] | undefined>>
}


const MobileFilters: React.FC<MobileFiltersProps> = ({ setPage, selectedBrand ,setSelectedBrand, selectedPrice, setSelectedPrice, selectedPower, setSelectedPower, selectedAcceleration, setSelectedAcceleration }) => {
  const [clicked, setClicked] = useState(false);
  const [allBrands, setAllBrands] = useState<string[]>();
  const registerCookie = Cookies.get("RegisterCookie");
  const loginCookie = Cookies.get("LoginCookie")
  const headers = {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${loginCookie || registerCookie}`
   };

   useEffect(() => {
    const getResponse = async () => {
      const response = await axios.get('https://calm-gold-rabbit-gown.cyclic.app/user/total-cars', {headers})
      const result: string[] = response.data.brands
      const uniqueBrands = [...new Set(result)];
      setAllBrands(uniqueBrands)
    }
    getResponse()
  }, [])
  const handleSliderPrice = (price: number[]) => {
    setSelectedPrice(price);
    setPage(1)
  };

  const handleSliderPower = (power: number[]) => {
    setSelectedPower(power);
    setPage(1)
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button><SlidersHorizontal className="text-[#303030] w-7 h-7 my-auto"/></button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#111111]/50 backdrop-blur-xl pb-[2vh]">
        <div className="mx-auto w-[90%]">
          {/* Brands */}
          <h1 className="text-[#FAFAFA]/80 tracking-tight text-4xl font-medium text-center my-[1.5vh]">Filters</h1>
          <div className="">
            <p className='gtext-lg tracking-tighter'><span className='gradient-text text-lg'>Brand</span></p>
            <div className="flex items-center justify-center z-10">
              <div className="py-4 border-0 rounded-sm" >
                <div className='flex flex-wrap gap-2'>
                  {allBrands?.map((brand) => (
                    <button key={brand} onClick={() => {setSelectedBrand((prevBrand) => (prevBrand === brand ? null : brand)); setPage(1)}} className={`text-[#FAFAFA] text-left text-sm tracking-tight animation hover:bg-[#202020] py-1 px-4 rounded-sm ${ selectedBrand === brand ? 'bg-[#202020]' : 'bg-[#303030]'}`}>
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Price */}
          <div className='mx-auto grid gap-2 rounded py-[1vh]'>
            <p className='text-lg tracking-tighter'><span className='gradient-text text-lg'>Price</span></p>
            <Slider defaultValue={selectedPrice} max={100} step={1} onValueChange={handleSliderPrice} className='m-auto'/>
            <div className='flex text-sm justify-between tracking-tight'>
              <p>0&nbsp;$</p>
              <p>650,000&nbsp;$</p>
            </div>
          </div>
          {/*Tier*/}
          <div className='mx-auto grid gap-2 rounded py-[1vh]'>
            <p className='tracking-tighter'><span className='gradient-text text-lg'>Price</span></p>
            <div className='flex gap-2'>
              <button className='px-4 py-1 rounded-sm text-sm bg-[#333333] text-[#FAFAFA]'>Clay</button>
              <button className='px-4 py-1 rounded-sm text-sm bg-[#333333] text-[#FAFAFA]'>Steel</button>
              <button className='px-4 py-1 rounded-sm text-sm bg-[#333333] text-[#FAFAFA]'>Onyx</button>
            </div>
          </div>
          {/*Power*/}
          <div className='mx-auto grid gap-2 rounded py-[1vh]'>
            <p className='tracking-tighter'><span className='gradient-text text-lg'>HorsePower</span></p>
            <Slider defaultValue={selectedPower} max={100} step={1} onValueChange={handleSliderPower} className='m-auto'/>
            <div className='flex text-sm justify-between tracking-tight'>
              <p>0 HP</p>
              <p>1050 HP</p>
            </div>
          </div>
          {/*Acceleration*/}
          <div className='mx-auto grid gap-2 rounded py-[1vh]'>
            <p className='tracking-tighter'><span className='gradient-text text-lg'>Accleration (0-60 MPH)</span></p>
            <div className='flex gap-2'>
              <button className='px-4 py-1 rounded-sm bg-[#333333] text-[#FAFAFA] text-sm' onClick={()=>{setSelectedAcceleration([0, 2]), setPage(1); setClicked(true);}}>&lt;2s</button>
              <button className='px-4 py-1 rounded-sm bg-[#333333] text-[#FAFAFA] text-sm' onClick={()=>{setSelectedAcceleration([2, 4]), setPage(1); setClicked(true);}}>2-4s</button>
              <button className={`px-4 py-1 rounded-sm bg-[#333333] text-[#FAFAFA] text-sm ${clicked ? 'bg-[#222222]' : 'bg-[#333333]' }`} onClick={()=>{setSelectedAcceleration([4, 7]), setPage(1); setClicked(true);}}>&gt;4s</button>
            </div>
          </div>
          <DrawerFooter className="mt-[2vh]">
            <DrawerClose asChild>
              <button className="bg-[#FAFAFA]/90 py-2 rounded text-[#222222] tracking-tighter font-medium">Close</button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileFilters;
