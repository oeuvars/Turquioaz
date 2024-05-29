import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Slider } from "@/components/ui/slider"
import { FiltersProps } from '@/types/Filters'
import { Button } from '@nextui-org/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const DesktopFilters: React.FC<FiltersProps> = ({ setPage, selectedBrand ,setSelectedBrand, selectedPrice, setSelectedPrice, selectedPower, setSelectedPower, setSelectedAcceleration }) => {
  const [allBrands, setAllBrands] = useState<string[]>();
  //@ts-ignore
  const [clicked, setClicked] = useState(false);

  const registerCookie = Cookies.get("RegisterCookie");
  const loginCookie = Cookies.get("LoginCookie")
  const headers = {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${loginCookie || registerCookie}`
   };

  useEffect(() => {
    const getResponse = async () => {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/total-cars`, {headers})
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
    <div className='bg-[#333333]/20 py-[1vw] rounded-sm overflow-hidden'>
      <span className='text-4xl text-[#333333] font-medium flex justify-center font-roboto-mono tracking-tighter uppercase'>Filters</span>
      <div className="flex items-center justify-center mt-[2vw] z-10">
        <Accordion type="single" collapsible className='w-[95%] rounded bg-[#111111]/95'>
          <AccordionItem value='1' className='border-none'>
            <AccordionTrigger className='px-[1.75vw]'>
              <div className='flex justify-between'>
                <p className='text-lg tracking-tight'><span className='gradient-text text-lg font-medium'>Brand</span></p>
                <div className={`${selectedBrand ? '' : 'bg-[#222222] my-[1vw]'} justify-start rounded-sm cursor-pointer`}>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="backdrop-blur-md border-0 rounded-sm">
              <div className='grid'>
                {allBrands?.map((brand) => (
                  <div className='text-left w-full px-1.5'>
                    <Button key={brand} onClick={() => {setSelectedBrand(brand), setPage(1)}} className={`${selectedBrand === brand ? 'bg-[#111111]' : ''} text-[#fff] text-left text-lg tracking-tight hover:bg-[#111111] rounded mr-auto px-[1.5vw] w-full`}>
                      <h1 className='text-left flex mr-auto text-base'>{brand}</h1>
                    </Button>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className='w-[95%] mx-auto grid gap-2 rounded bg-[#111111]/95 py-[2vw] px-[1.5vw] mt-[1vw]'>
        <p className='text-lg tracking-tight'><span className='gradient-text text-lg font-medium'>Price</span></p>
        <Slider defaultValue={selectedPrice} max={100} step={1} onValueChange={handleSliderPrice} className='m-auto'/>
        <div className='flex text-sm justify-between tracking-tight'>
          <p>0&nbsp;$</p>
          <p>650,000&nbsp;$</p>
        </div>
      </div>
      <div className='w-[95%] mx-auto grid gap-2 rounded bg-[#111111]/95 p-[1.5vw] mt-[1vw]'>
        <p className='text-lg tracking-tight'><span className='gradient-text text-lg font-medium'>Tier</span></p>
        <div className='flex flex-wrap gap-2'>
          <Button className='px-5 py-2 bg-[#111111] text-[#FAFAFA] rounded'>Clay</Button>
          <Button className='px-5 py-2 rounded bg-[#111111] text-[#FAFAFA]'>Steel</Button>
          <Button className='px-5 py-2 rounded bg-[#111111] text-[#FAFAFA]'>Onyx</Button>
        </div>
      </div>
      <div className='w-[95%] mx-auto grid gap-2 rounded bg-[#111111]/95 py-[2vw] px-[1.5vw] mt-[1vw]'>
        <p className='text-lg tracking-tight'><span className='gradient-text text-lg font-medium'>HorsePower</span></p>
        <Slider defaultValue={selectedPower} max={100} step={1} onValueChange={handleSliderPower} className='m-auto'/>
        <div className='flex text-sm justify-between tracking-tight'>
          <p>0 HP</p>
          <p>1050 HP</p>
        </div>
      </div>
      <div className='w-[95%] mx-auto grid gap-2 rounded bg-[#111111]/95 p-[1.5vw] mt-[1vw]'>
        <p className='text-lg tracking-tight'><span className='gradient-text text-lg font-medium'>Accleration (0-60 MPH)</span></p>
        <div className='flex flex-wrap gap-2'>
          <Button className={`px-5 py-2 rounded bg-[#111111] text-[#FAFAFA]`} onClick={()=>{setSelectedAcceleration([0, 2]), setPage(1); setClicked(true);}}>&lt;2s</Button>
          <Button className={`px-5 py-2 rounded bg-[#111111] text-[#FAFAFA]`} onClick={()=>{setSelectedAcceleration([2, 4]), setPage(1); setClicked(true);}}>2-4s</Button>
          <Button className={`px-5 py-2 rounded bg-[#111111] text-[#FAFAFA]`} onClick={()=>{setSelectedAcceleration([4, 7]), setPage(1); setClicked(true);}}>&gt;4s</Button>
        </div>
      </div>
    </div>
  )
}

export default DesktopFilters
