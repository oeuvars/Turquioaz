import React, { useEffect, useState } from 'react'
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import axios from 'axios'
import Cookies from 'js-cookie'
import { Slider } from "@/components/ui/slider"
import { X } from 'lucide-react'
import { FiltersProps } from '@/types/Filters'

const DesktopFilters: React.FC<FiltersProps> = ({ setPage, selectedBrand ,setSelectedBrand, selectedPrice, setSelectedPrice, selectedPower, setSelectedPower, setSelectedAcceleration }) => {
  const [open, setOpen] = useState(false);
  const [allBrands, setAllBrands] = useState<string[]>();
  const [clicked, setClicked] = useState(false);

  const registerCookie = Cookies.get("RegisterCookie");
  const loginCookie = Cookies.get("LoginCookie")
  const headers = {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${loginCookie || registerCookie}`
   };

  useEffect(() => {
    const getResponse = async () => {
      const response = await axios.get('https://combative-ant-scarf.cyclic.app//user/total-cars', {headers})
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
    <div className='bg-[#999999]/10 py-[1vw] rounded-sm overflow-hidden'>
      <span className='text-5xl tracking-tighter text-[#333333] font-medium flex justify-center'>Filters</span>
      <div className="flex items-center justify-center mt-[2vw] z-10">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className='flex justify-between w-[95%] rounded bg-[#222222]/50 px-[1.5vw]'>
              <p className='text-lg gradient-text my-auto uppercase'>Brand</p>
              <div className={`${selectedBrand ? '' : 'bg-[#222222] my-[1vw] px-7 py-2'} justify-start rounded-sm cursor-pointer`}>
                {selectedBrand ? (
                  <div className='flex gap-2'>
                    <p className='text-[#FAFAFA] text-lg bg-[#222222] my-[1vw] px-7 py-2 rounded-sm'>
                      {selectedBrand}
                    </p>
                    <button onClick={() => {setSelectedBrand(null); setOpen(false); setPage(1)}}>
                      <X />
                    </button>
                  </div>
                ) : (
                  <button className='text-[#FAFAFA] text-lg'>All</button>
                )}
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="py-4 bg-black/20 backdrop-blur-md border-0 rounded-sm" side="bottom" align="center">
            <div className='flex flex-col'>
              {allBrands?.map((brand) => (
                <button key={brand} onClick={() => {setSelectedBrand(brand); setOpen(false), setPage(1)}} className='text-[#FAFAFA] text-left text-lg tracking-tight hover:bg-[#333333] py-1 px-4 rounded'>
                  {brand}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className='w-[95%] mx-auto grid gap-2 rounded bg-[#222222]/50 py-[2vw] px-[1.5vw] mt-[1vw]'>
        <p className='text-lg tracking-tight'><span className='gradient-text text-lg'>Price</span></p>
        <Slider defaultValue={selectedPrice} max={100} step={1} onValueChange={handleSliderPrice} className='m-auto'/>
        <div className='flex text-sm justify-between tracking-tight'>
          <p>0&nbsp;$</p>
          <p>650,000&nbsp;$</p>
        </div>
      </div>
      <div className='w-[95%] mx-auto grid gap-2 rounded bg-[#222222]/50 p-[1.5vw] mt-[1vw]'>
        <p className='text-lg tracking-tight'><span className='gradient-text text-lg'>Tier</span></p>
        <div className='flex gap-2'>
          <button className='px-5 py-2 rounded-sm bg-[#333333] text-[#FAFAFA]'>Clay</button>
          <button className='px-5 py-2 rounded-sm bg-[#333333] text-[#FAFAFA]'>Steel</button>
          <button className='px-5 py-2 rounded-sm bg-[#333333] text-[#FAFAFA]'>Onyx</button>
        </div>
      </div>
      <div className='w-[95%] mx-auto grid gap-2 rounded bg-[#222222]/50 py-[2vw] px-[1.5vw] mt-[1vw]'>
        <p className='text-lg tracking-tight'><span className='gradient-text text-lg'>HorsePower</span></p>
        <Slider defaultValue={selectedPower} max={100} step={1} onValueChange={handleSliderPower} className='m-auto'/>
        <div className='flex text-sm justify-between tracking-tight'>
          <p>0 HP</p>
          <p>1050 HP</p>
        </div>
      </div>
      <div className='w-[95%] mx-auto grid gap-2 rounded bg-[#222222]/50 p-[1.5vw] mt-[1vw]'>
        <p className='text-lg tracking-tight'><span className='gradient-text text-lg'>Accleration (0-60 MPH)</span></p>
        <div className='flex gap-2'>
          <button className='px-5 py-2 rounded-sm bg-[#333333] text-[#FAFAFA]' onClick={()=>{setSelectedAcceleration([0, 2]), setPage(1); setClicked(true);}}>&lt;2s</button>
          <button className='px-5 py-2 rounded-sm bg-[#333333] text-[#FAFAFA]' onClick={()=>{setSelectedAcceleration([2, 4]), setPage(1); setClicked(true);}}>2-4s</button>
          <button className={`px-5 py-2 rounded-sm bg-[#333333] text-[#FAFAFA] ${clicked ? 'bg-[#222222]' : 'bg-[#333333]' }`} onClick={()=>{setSelectedAcceleration([4, 7]), setPage(1); setClicked(true);}}>&gt;4s</button>
        </div>
      </div>
    </div>
  )
}

export default DesktopFilters
