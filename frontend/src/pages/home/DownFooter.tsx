import { Component } from "solid-js";
import Line from "../user/components/Line";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "solid-icons/bs";

const DownFooter: Component = () => {
  return (
   <>
      <Line />
      <div class="w-11/12 mx-auto my-[1vw]">
         <div class="font-montserrat flex gap-5 justify-center">
            <p class="text-center opacity-30 text-xs">
               &copy;
               <span class="ml-1 text-xs">Copyright 2023</span>
            </p>
            <hr class="w-[2px] h-[20px] rounded-full bg-yellow-300 flex my-auto opacity-20" />
            <p class="opacity-30 text-center text-xs">Privacy Policy</p>
            <hr class="w-[2px] h-[20px] rounded-full bg-yellow-300 flex my-auto opacity-20" />
            <p class="opacity-30 text-center text-xs">Terms of Condition</p>
         </div>

         <div class="flex gap-3 justify-center mt-7">
            <BsTwitter class="w-7 h-7 cursor-pointer opacity-50" />
            <BsInstagram class="w-7 h-7 cursor-pointer opacity-50" />
            <BsFacebook class="w-7 h-7 cursor-pointer opacity-50" />
            <BsGithub class="w-7 h-7 cursor-pointer opacity-50" />
         </div>
      </div>
   </>
  )
};

export default DownFooter;
