import { Component } from "solid-js";
import cover from "../../assets/images/cover/cover2.jpg";
import mercedes from "../../assets/svgs/merc.svg";
import useMediaQuery from "../../hooks/useMediaQuery";

const Hero: Component = () => {
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  return (
    <div class="">
      {isAboveSmallScreens() ? (
        <>
          <div class="justify-between w-11/12 flex mx-auto relative">
            <img src={mercedes} class="w-[30rem] absolute" />
            <p class="flex font-mabry-regular w-[20%] text-right items-center relative ml-auto pt-5">
              We know how to make our customers love us by our high quality
              products with affordable prices.
            </p>
          </div>
          <img
            src={cover}
            alt="car"
            class="w-11/12 flex mx-auto rounded-md mt-2"
          />
        </>
      ) : (
        <div class="">
          <div class="justify-between w-11/12 flex mx-auto">
            <img src={mercedes} class="w-[10rem] absolute justify-center flex" />
          </div>
          <img
            src={cover}
            alt="car"
            class="w-11/12 flex mx-auto rounded-md mt-10"
          />
          <p class="flex font-mabry-regular text-sm text-center items-center relative ml-auto pt-5 w-4/5 mx-auto">
              We know how to make our customers love us by our high quality
              products with affordable prices.
            </p>
        </div>
      )}
    </div>
  );
};
export default Hero;
