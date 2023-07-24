import { Component, useContext, For } from "solid-js";
import line from "../assets/images/line.svg";

const Cart: Component = () => {

  return (
    <div class="flex w-5/6 mx-auto py-10 justify-between">
      <div class="w-3/5">
        <h1 class="font-bold text-7xl font-mauline text-emerald-500 uppercase mb-8">Shopping Cart</h1>
        <hr class="mb-8 rounded-full text-gray-500"/>
        <div class="flex justify-between px-10 py-8 bg-white/10 border border-white/10 rounded-md shadow-lg font-mabry-regular">
          <div class="flex flex-col gap-2">
            <h1 class="font-light uppercase">
              Shipping Address
            </h1>
            <h1 class="font-medium text-sm">Barasat</h1>
          </div>
          <button class="bg-yellow-50/50 rounded-md px-5 py-2 font-semibold text-white font-mabry-regular">
            Change
          </button>
        </div>
        <h1 class="font-mabry-regular bg-white/10 border border-white/10 text-white px-2 py-5 mt-7 rounded-md shadow-lg text-center">
          Payment Method
        </h1>
        <div class="bg-white/10 border border-white/10 rounded-md shadow-lg mt-10 px-10 py-5">
          <div class="flex gap-7">
            <svg
              fill="#ffffff"
              stroke-width="0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              class="w-7 h-7 opacity-90"
            >
              <path d="M64 32C28.7 32 0 60.7 0 96v32h576V96c0-35.3-28.7-64-64-64H64zm512 192H0v192c0 35.3 28.7 64 64 64h448c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16h-64c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16h128c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z"></path>
            </svg>
            <h1 class="font-mabry-regular font-medium flex my-auto text-lg">
              Debit/ Credit Card
            </h1>
          </div>
          <h1 class="font-mabry-regular mt-7">Enter Card Number*</h1>
          <input
            type="number"
            class="w-full rounded-md outline-none bg-white/30 py-3 mt-4 text-white font-mabry-regular px-4"
          />
        </div>
      </div>
      <div class="w-[28%] bg-white/10 border border-white/10 px-3 py-5 rounded-md shadow-lg mt-10">
        <h1 class="font-mabry-regular text-xl pb-3 text-center font-medium">
          Your Order
        </h1>
        <img src={line} />
      </div>
    </div>
  );
};

export default Cart;
