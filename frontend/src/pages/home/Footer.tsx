import { Component } from "solid-js";
import benz from "../../assets/images/cars/Benz.jpg";
import Line from "../../components/Line";
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
        <div class="pb-7 mt-10">
          <div class="relative">
            <h1 class="text-[20rem] font-mauline leading-none text-center bg-gradient-to-r from-yellow-200 to-amber-800 bg-clip-text text-transparent">
              MERCEDES BENZ 1952
            </h1>
          </div>
          <img
            src={benz}
            class="relative -mt-[40rem] h-[650px] flex mx-auto opacity-20 w-full filter blur-sm"
          />

          <div class="w-11/12 flex mx-auto justify-between mt-20">
            <div class="flex gap-20">
              <h1 class="font-loubag uppercase text-5xl flex items-center">
                Contact
              </h1>
              <p class="font-mabry flex items-center font-medium">
                / &nbsp; Let's talk about your new car
              </p>
            </div>

            <A href="/contact">
              <button class="border border-yellow-200 px-7 py-3 rounded-full font-mabry font-medium">
                Let's Talk
              </button>
            </A>
          </div>
          <Line />
          <div class="w-11/12 mx-auto flex justify-between">
            <p class="font-mabry">&copy;Copyright 2023</p>

            <div class="flex gap-5">
              <p class="font-mabry opacity-30">Privacy Policy</p>
              <hr class="w-[2px] h-[20px] rounded-full bg-yellow-300 flex my-auto opacity-20" />
              <p class="font-mabry opacity-30">Terms of Condition</p>
            </div>

            <div class="flex gap-3">
              <BsTwitter class="w-7 h-7 cursor-pointer" />
              <BsInstagram class="w-7 h-7 cursor-pointer" />
              <BsFacebook class="w-7 h-7 cursor-pointer" />
              <BsGithub class="w-7 h-7 cursor-pointer" />
            </div>
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
            <h1 class="text-[5rem] font-mauline leading-none text-center bg-gradient-to-r from-yellow-200 to-amber-800 bg-clip-text text-transparent">
              MERCEDES BENZ 1952
            </h1>
          </div>
          <img
            src={benz}
            class="relative flex mx-auto opacity-20 w-full -mt-40 filter blur-sm"
          />

          <Line />
          <div class="w-11/12 mx-auto">
            <div class="flex gap-5">
              <p class="font-montserrat text-center opacity-30 text-xs">
                &copy;
                <span class="ml-1 font-mabry-regular text-xs">Copyright 2023</span>
              </p>
              <hr class="w-[2px] h-[20px] rounded-full bg-yellow-300 flex my-auto opacity-20" />
              <p class="font-mabry opacity-30 text-center text-xs">Privacy Policy</p>
              <hr class="w-[2px] h-[20px] rounded-full bg-yellow-300 flex my-auto opacity-20" />
              <p class="font-mabry opacity-30 text-center text-xs">
                Terms of Condition
              </p>
            </div>

            <div class="flex gap-3 justify-center mt-7">
              <BsTwitter class="w-7 h-7 cursor-pointer opacity-50" />
              <BsInstagram class="w-7 h-7 cursor-pointer opacity-50" />
              <BsFacebook class="w-7 h-7 cursor-pointer opacity-50" />
              <BsGithub class="w-7 h-7 cursor-pointer opacity-50" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
