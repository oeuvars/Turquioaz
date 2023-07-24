import { Component } from "solid-js";
import cover from "../../assets/images/cover/cover2.jpg";
import mercedes from "../../assets/svgs/merc.svg";

const Hero: Component = () => {
  return (
    <div class="">
      <div class="justify-between w-11/12 flex mx-auto relative">
        <img src={mercedes} class="w-[30rem] absolute" />
        <p class="flex font-mabry w-[20%] text-right items-center relative ml-auto pt-5">
          We know how to make our customers love us by our high quality products
          with affordable prices.
        </p>
      </div>
      <img src={cover} alt="car" class="w-11/12 flex mx-auto rounded-md mt-2" />
    </div>
  );
};
export default Hero;
