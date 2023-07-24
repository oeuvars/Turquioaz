import { Component } from "solid-js";
import cover from "../assets/images/RidenRent.svg"

const Info: Component = () => {
    return (
        <div class="mt-20 pb-10">
            <div class="flex justify-center gap-28 relative w-11/12 mx-auto bg-white -z-20 p-5 bg-opacity-20 rounded-xl">
                <div class="relative">
                    <h1 class="text-[15rem] font-mauline text-orange-500">Ride</h1>
                    <h1 class="text-[13rem] font-mauline text-orange-500 -mt-44 text-center italic">n</h1>
                    <h1 class="text-[13rem] font-mauline text-orange-500 -mt-44">Rent</h1>
                    <p class="font-montserrat font-semibold text-xl text-center -mt-12 opacity-90">Anurag & Ritam</p>
                </div>
                <div class="flex flex-wrap gap-5">
                    <img src={cover} class="w-[800px] -z-10 rounded-xl"/>

                </div>

            </div>

        </div>
    );
}

export default Info;
