import { A, useNavigate } from "@solidjs/router"
import { BsArrowRight } from 'solid-icons/bs'
import { Component, onCleanup, createSignal } from "solid-js"
import DownFooter from "../../home/DownFooter";

const PasswordUpdated: Component = () => {
   const navigate = useNavigate();
   const [countdown, setCountdown] = createSignal(5);

   const redirectAfterDelay = () => {
      const timerId = setInterval(() => {
         setCountdown((prevCountdown) => {
            if (prevCountdown === 1) {
               clearInterval(timerId);
               navigate("/user/login");
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
      <div class="my-[7vw] flex flex-col justify-between min-h-screen">
         <div>
            <h1 class="phone:text-3xl tablet:text-4xl lg:text-5xl font-semibold text-center">Your Password has been updated</h1>
            <A href="/user/login" class="bg-emerald-800 flex justify-center phone:w-[50%] tablet:w-[30%] lg:w-[10%] mx-auto py-2 rounded-md my-[2vw] animation">
               Log In
               <BsArrowRight class="w-5 h-5 my-auto ml-2"/>
            </A>
            <p class="text-yellow-50/40 text-center font-didact-gothic">Redirecting in {countdown()} seconds...</p>
         </div>
         <DownFooter />
      </div>
   )
}

export default PasswordUpdated
