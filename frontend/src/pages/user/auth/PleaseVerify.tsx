import { Component } from "solid-js";
import DownFooter from "../../home/DownFooter";
import { A } from "@solidjs/router";
import { BsArrowBarLeft, BsArrowRight, BsArrowRightShort } from "solid-icons/bs";


const PleaseVerify: Component = () => {
   return (
      <div class="flex flex-col justify-between min-h-screen my-5">
         <div class="phone:w-[90%] tablet:w-[75%] lg:w-[60%] mx-auto text-center mt-[7vw] font-semibold flex flex-col gap-5">
            <p class="phone:text-2xl tablet:text-4xl lg:text-5xl">Please Head Over to Gmail and Click on the confirmation mail.</p>
            <A href="https://mail.google.com/mail/u/0/#inbox" class="px-5 py-2 bg-emerald-900 rounded-md flex mx-auto gap-1">
               <p>Gmail</p>
               <BsArrowRightShort class="w-6 h-6 my-auto"/>
            </A>
         </div>
         <DownFooter />
      </div>

   )
}

export default PleaseVerify
