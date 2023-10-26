import { A, useNavigate } from "@solidjs/router";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Component, createEffect, createSignal } from "solid-js";
import image from "../../../assets/images/cars/bigModel.jpg";
import Navbar from "../components/Navbar";

interface Rentedcar {
   carId: number
   endDate: string
   id: number
   rentedtoId: number
   startDate: number
   status: boolean
}

interface Model {
   id: string;
  name: string;
  transmission: string;
  fuelType: string;
  seatNumbers: number;
  condition: string;
  price: number;
  rentPrice: number;
}

 interface ExtendedModel extends Model {
   startDate: string;
   endDate: string;
   model: Model
 }

const Rentedcars: Component = () => {
   const [data, setData] = createSignal<Rentedcar[]>([]);
   const [models, setModels] = createSignal<ExtendedModel[]>([]);
   const [name, setName] = createSignal<string>("");
   const navigate = useNavigate();

   createEffect(async () => {
      const token = localStorage.getItem("loginToken");
      if (token) {
        const result = jwtDecode(token) as { name: string };
        const userName = result.name;
        setName(userName);
      } else {
        navigate("/login");
      }
      try {
        const res = await axios.get(`https://rent-n-ride-ts-production.up.railway.app/user/rentedCars`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data.rentedCars);
        const carDetailsPromises = data()!.map(async (item: Rentedcar) => {
          const carRes = await axios.get(
            `https://rent-n-ride-ts-production.up.railway.app/user/car/${item.carId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          return {
            ...carRes.data,
            startDate: item.startDate,
            endDate: item.endDate,
          };
        });
        const carDetails = await Promise.all(carDetailsPromises);
        setModels(carDetails);
        console.log(models())
      } catch (error) {
        console.error("Error:", error);
      }
    });

    return (
      <>
         <Navbar />
         <div class="phone:mt-[3vh] lg:mt-[3vw] w-[90%] mx-auto">
            <p class="phone:text-2xl tablet:text-3xl lg:text-4xl font-semibold text-emerald-600">{name()}'s Cars,</p>
            <div class="phone:gap-[2vh] lg:gap-[1.5vw] flex flex-col phone:mt-[3vh] lg:mt-[3vw]">
               {models().length > 0 ? (
                  models().map((item: ExtendedModel) => {
                     const startDate = new Date(item.startDate);
                     const endDate = new Date(item.endDate);
                     const formattedStartDate = startDate.toLocaleDateString("en-GB");
                     const formattedEndDate = endDate.toLocaleDateString("en-GB");

                     const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
                     const differenceInDays: number = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

                     return (
                        <A href={`/user/model/${item.model.id}`} class="bg-white/5 border border-white/0 hover:border-white/50 animation flex rounded-md justify-between font-medium phone:p-[1vh] lg:p-[1vw] shadow-xl">
                           <div class="lg:flex phone:gap-[1vh] lg:gap-[1vw]">
                              <img
                                 src={image}
                                 class="object-cover phone:w-[15vh] phone:h-[15vh] lg:w-[10vw] lg:h-[10vw] rounded-md my-auto"
                              />
                              <div class="flex flex-col justify-between">
                                 <p class="phone:text-xl tablet:text-2xl lg:text-3xl text-yellow-50 lg:font-semibold">Model: {item.model.name}</p>
                                 <div class="grid phone:gap-[1.75vh] lg:gap-[0.75vw] phone:mt-[1.5vh] lg:mt-0">
                                    <div class="lg:flex phone:gap-[1.5vh] lg:gap-[0.5vw]">
                                       <p class="phone:text-sm tablet:text-base lg:text-lg text-emerald-50 bg-emerald-700/30 px-[1vw] py-[0.3vw] rounded-md m-auto text-center">{formattedStartDate}</p>
                                       <p class="my-auto text-lg text-emerald-50 text-center">To</p>
                                       <p class="phone:text-sm tablet:text-base lg:text-lg text-lg text-emerald-50 bg-emerald-700/30 px-[1vw] py-[0.3vw] rounded-md m-auto text-center">{formattedEndDate}</p>
                                    </div>
                                    <p class="phone:text-lg tablet:text-xl lg:text-2xl phone:font-medium lg:font-semibold">Price: ${item.model.rentPrice}{" "}/day</p>
                                 </div>
                              </div>
                           </div>
                           <div class="flex flex-col justify-between">
                              <p class="phone:text-2xl tablet:text-3xl lg:text-4xl lg:font-semibold text-center">Total:{" "}${item.model.rentPrice*differenceInDays}</p>
                              <div class="flex flex-col gap-[0.5vw]">
                                 <button class="px-5 py-[0.5vw] bg-emerald-800/40 hover:bg-emerald-800/50 animation rounded-md">
                                    <A href={`/user/model/${item.model.id}`}>Rebook</A>
                                 </button>
                                 <button class="px-5 py-[0.5vw] border border-emerald-800/40 hover:border-emerald-800/50 animation rounded-md">Download PDF</button>
                              </div>
                           </div>
                        </A>
                     );
                  })
               ) : (
                  <p>Loading...</p>
            )}
            </div>
      </div>
      </>
    );

 };

 export default Rentedcars;
