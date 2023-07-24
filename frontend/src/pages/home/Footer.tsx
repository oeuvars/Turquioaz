import { Component } from "solid-js";
import benz from "../../assets/images/cars/Benz.jpg";
import Line from "../../components/Line";
import { A } from "@solidjs/router";
import { BsTwitter } from "solid-icons/bs";
import { BsInstagram } from "solid-icons/bs";
import { BsFacebook } from "solid-icons/bs";
import { BsGithub } from 'solid-icons/bs'

const Footer: Component = () => {
  return (
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
          <h1 class="font-loubag uppercase text-5xl flex items-center">Contact</h1>
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
          <BsTwitter class="w-7 h-7 cursor-pointer"/>
          <BsInstagram class="w-7 h-7 cursor-pointer"/>
          <BsFacebook class="w-7 h-7 cursor-pointer"/>
          <BsGithub class="w-7 h-7 cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};

export default Footer;
