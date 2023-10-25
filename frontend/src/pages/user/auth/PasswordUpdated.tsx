import { A, useNavigate } from "@solidjs/router"
import { BsArrowRight } from 'solid-icons/bs'
import { Component, onCleanup, createSignal } from "solid-js"

const PasswordUpdated: Component = () => {
   const navigate = useNavigate();
   const [countdown, setCountdown] = createSignal(5);

   const redirectAfterDelay = () => {
      const timerId = setInterval(() => {
         setCountdown((prevCountdown) => {
            if (prevCountdown === 1) {
               clearInterval(timerId);
               navigate("/user/collections");
               return 0;
            } else {
               return prevCountdown - 1;
            }
         });
      }, 1000);
      onCleanup(() => {
         clearInterval(timerId);
      });
   };

   redirectAfterDelay();

   return (
      <div class="my-[7vw] grid">
         <h1 class="text-6xl font-semibold text-center">Your Password has been updated</h1>
         <A href="/user/collections" class="bg-emerald-800 flex justify-center w-[10%] mx-auto py-[0.5vw] rounded-md my-[2vw]">
            Explore
            <BsArrowRight class="w-5 h-5 my-auto ml-2"/>
         </A>
         <p class="text-yellow-50/40 text-center">Redirecting in {countdown()} seconds...</p>
      </div>
   )
}

export default PasswordUpdated
