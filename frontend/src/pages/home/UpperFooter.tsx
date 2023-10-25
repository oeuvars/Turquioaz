import { Component } from "solid-js";
import benz from "../../assets/images/cars/Benz.jpg";
import Line from "../user/components/Line";
import { A } from "@solidjs/router";
import { BsTwitter } from "solid-icons/bs";
import { BsInstagram } from "solid-icons/bs";
import { BsFacebook } from "solid-icons/bs";
import { BsGithub } from "solid-icons/bs";
import useMediaQuery from "../../hooks/useMediaQuery";

const Footer: Component = () => {
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  return (
    <>
      {isAboveSmallScreens() ? (
        <div class="mt-[3vw]">
          <div class="relative">
            <h1 class="absolute sm:text-[15vw] tablet:text-[15vw] md:text-[16vw] lg:text-[17vw] font-doran-medium sm:mt-[9vw] tablet:mt-[9vw] md:mt-[8vw] lg:mt-[6.5vw] leading-none text-center gradient-text">
              MERCEDES BENZ 1952
            </h1>
          </div>
          <img
            src={benz}
            class="flex mx-auto opacity-20 w-full filter blur-sm"
          />
          <Line />
          <div class="w-11/12 flex mx-auto justify-between">
            <div class="flex gap-[2vw]">
              <h1 class="font-loubag uppercase header-text flex items-center my-auto">
                Contact
              </h1>
              <p class="font-mabry flex items-center font-medium phone:text-sm tablet:text-base md:text-lg">
                / &nbsp; Let's talk about your new car
              </p>
            </div>
            <A href="/contact" class="my-auto">
              <button class="border border-yellow-200 px-7 py-3 rounded-full font-mabry font-medium">
                Let's Talk
              </button>
            </A>
          </div>
        </div>
      ) : (
        <div class="pb-7 mt-3">
          <div class="w-11/12 flex mx-auto justify-between mb-5">
            <div class="">
              <h1 class="font-loubag uppercase text-2xl flex items-center">
                Contact
              </h1>
              <p class="font-mabry-regular flex items-center font-medium text-xs">
                / &nbsp; Let's talk about your new car
              </p>
            </div>

            <A href="/contact" class="my-auto">
              <button class="border text-sm border-yellow-200 px-4 py-2 rounded-full font-mabry-regular">
                Let's Talk
              </button>
            </A>
          </div>
          <div class="relative">
            <h1 class="absolute phone:text-[7vh] xs:text-[9vh] s:text-[10vh] font-mauline leading-none text-center gradient-text phone:mt-[3vh] xs:mt-[6vh] s:mt-[8.5vh]">
              MERCEDES BENZ 1952
            </h1>
          </div>
          <img
            src={benz}
            class="flex mx-auto opacity-20 w-full filter blur-sm"
          />
        </div>
      )}
    </>
  );
};

export default Footer;
