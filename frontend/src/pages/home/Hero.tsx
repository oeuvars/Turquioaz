import { Component } from "solid-js";
import cover from "../../assets/images/cover/cover2.webp";
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
            <p class="flex font-mabry-regular text-right items-center relative ml-auto pt-5 text-xl">
              Welcome to the world of luxury cars.
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
            <img
              src={mercedes}
              class="w-[10rem] absolute justify-center flex"
            />
          </div>
          <img
            src={cover}
            alt="car"
            class="w-11/12 flex mx-auto rounded-md mt-10"
          />
          <p class="font-mabry-regular text-sm text-center pt-5 mx-auto">
            Welcome to the world of luxury cars.
          </p>
        </div>
      )}
    </div>
  );
};
export default Hero;
