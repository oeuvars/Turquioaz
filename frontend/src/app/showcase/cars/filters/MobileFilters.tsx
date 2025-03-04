import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/components/ui/drawer';
import { Slider } from '@/components/ui/slider';
import { FiltersProps } from '@/types/Filters';
import { Button } from '@nextui-org/button';
import axios from 'axios';
import Cookies from 'js-cookie';
import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';

const MobileFilters: React.FC<FiltersProps> = ({
   setPage,
   selectedBrand,
   setSelectedBrand,
   selectedPrice,
   setSelectedPrice,
   selectedPower,
   setSelectedPower,
   setSelectedAcceleration,
}) => {
   const [clicked, setClicked] = useState(false);
   const [allBrands, setAllBrands] = useState<string[]>();
   const registerCookie = Cookies.get('RegisterCookie');
   const loginCookie = Cookies.get('LoginCookie');
   const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loginCookie || registerCookie}`,
   };

   useEffect(() => {
      const getResponse = async () => {
         const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/total-cars`, { headers });
         const result: string[] = response.data.brands;
         const uniqueBrands = [...new Set(result)];
         setAllBrands(uniqueBrands);
      };
      getResponse();
   }, []);
   const handleSliderPrice = (price: number[]) => {
      setSelectedPrice(price);
      setPage(1);
   };

   const handleSliderPower = (power: number[]) => {
      setSelectedPower(power);
      setPage(1);
   };
   return (
      <Drawer>
         <DrawerTrigger asChild>
            <button>
               <SlidersHorizontal className="text-[#303030] w-7 h-7 my-auto" />
            </button>
         </DrawerTrigger>
         <DrawerContent className="bg-[#111111]/50 backdrop-blur-xl pb-[2vh]">
            <div className="mx-auto w-[90%]">
               {/* Brands */}
               <h1 className="text-[#FAFAFA]/80 tracking-tighter text-4xl font-medium text-center my-[1.5vh] font-roboto-mono">
                  Filters
               </h1>
               <div className="">
                  <p className='text-lg tracking-tight'><span className='gradient-text text-lg font-medium'>Brand</span></p>
                  <div className="flex items-center justify-center z-10">
                     <div className="py-4 border-0 rounded-sm">
                        <div className="flex flex-wrap gap-2">
                           {allBrands?.map(brand => (
                              <Button
                                 key={brand}
                                 size='sm'
                                 onClick={() => {
                                    setSelectedBrand(prevBrand =>
                                       prevBrand === brand ? null : brand,
                                    );
                                    setPage(1);
                                 }}
                                 className={`text-[#FAFAFA] text-left text-sm tracking-tight animation hover:bg-[#202020] rounded px-4 ${
                                    selectedBrand === brand ? 'bg-[#111111]' : 'bg-[#222222]'
                                 }`}
                              >
                                 {brand}
                              </Button>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
               {/* Price */}
               <div className="mx-auto grid gap-2 rounded py-[1vh] z-20">
                  <p className='text-lg tracking-tight'><span className='gradient-text text-lg font-medium'>Price</span></p>
                  <Slider
                     defaultValue={selectedPrice}
                     max={100}
                     step={1}
                     onValueChange={handleSliderPrice}
                     className="m-auto"
                  />
                  <div className="flex text-sm justify-between tracking-tight">
                     <p>0&nbsp;$</p>
                     <p>650,000&nbsp;$</p>
                  </div>
               </div>
               {/*Tier*/}
               <div className="mx-auto grid gap-2 rounded py-[1vh]">
                  <p className="tracking-tighter">
                     <span className="gradient-text text-lg font-medium">Tier</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                     <Button size='sm' className="px-4 py-1 rounded text-sm bg-[#333333] text-[#FAFAFA]" >
                        Clay
                     </Button>
                     <Button size='sm' className="px-4 py-1 rounded text-sm bg-[#333333] text-[#FAFAFA]">
                        Steel
                     </Button>
                     <Button size='sm' className="px-4 py-1 rounded text-sm bg-[#333333] text-[#FAFAFA]">
                        Onyx
                     </Button>
                  </div>
               </div>
               {/*Power*/}
               <div className="mx-auto grid gap-2 rounded py-[1vh] z-20">
                  <p className="tracking-tighter">
                     <span className="gradient-text text-lg font-medium">HorsePower</span>
                  </p>
                  <Slider
                     defaultValue={selectedPower}
                     max={100}
                     step={1}
                     onValueChange={handleSliderPower}
                     className="m-auto"
                  />
                  <div className="flex text-sm justify-between tracking-tight">
                     <p>0 HP</p>
                     <p>1050 HP</p>
                  </div>
               </div>
               {/*Acceleration*/}
               <div className="mx-auto grid gap-2 rounded py-[1vh]">
                  <p className="tracking-tighter">
                     <span className="gradient-text text-lg font-medium">Accleration (0-60 MPH)</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                     <Button
                        className="px-4 py-1 rounded bg-[#333333] text-[#FAFAFA] text-sm"
                        size='sm'
                        onClick={() => {
                           setSelectedAcceleration([0, 2]), setPage(1);
                           setClicked(true);
                        }}
                     >
                        &lt;2s
                     </Button>
                     <Button
                        className="px-4 py-1 rounded bg-[#333333] text-[#FAFAFA] text-sm"
                        size='sm'
                        onClick={() => {
                           setSelectedAcceleration([2, 4]), setPage(1);
                           setClicked(true);
                        }}
                     >
                        2-4s
                     </Button>
                     <Button
                        className={`px-4 py-1 rounded bg-[#333333] text-[#FAFAFA] text-sm ${
                           clicked ? 'bg-[#222222]' : 'bg-[#333333]'
                        }`}
                        size='sm'
                        onClick={() => {
                           setSelectedAcceleration([4, 7]), setPage(1);
                           setClicked(true);
                        }}
                     >
                        &gt;4s
                     </Button>
                  </div>
               </div>
               <DrawerFooter className="mt-[2vh]">
                  <DrawerClose asChild>
                     <button className="bg-[#FAFAFA]/90 py-2 rounded text-[#222222] tracking-tighter font-medium">
                        Close
                     </button>
                  </DrawerClose>
               </DrawerFooter>
            </div>
         </DrawerContent>
      </Drawer>
   );
};

export default MobileFilters;
