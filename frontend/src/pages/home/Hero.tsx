import { Component } from "solid-js";
import cover from "../../assets/images/cover/cover2.webp";
import mercedes from "../../assets/svgs/hero/merc.svg";
import useMediaQuery from "../../hooks/useMediaQuery";
import Line from "../user/components/Line";

const Hero: Component = () => {
  const isAboveSmallScreens = useMediaQuery("(min-width: 918px)");
  return (
    <div class="">
      {isAboveSmallScreens() ? (
        <>
          <div class="justify-between w-11/12 flex mx-auto relative">
            <img src={mercedes} class="sm:w-[32vw] tablet:w-[28vw] md:w-[32vw] lg:w-[32vw] absolute" />
            <p class="flex text-lg font-garamond items-center relative my-2 ml-auto sm:w-1/3 md:w-1/4 lg:w-1/4 text-justify">
              Discover opulence and performance. Navigate our exquisite
              selection of luxury cars, where elegance meets innovation and
              power.
            </p>
          </div>
          <img
            src={cover}
            alt="car"
            class="w-11/12 flex mx-auto rounded-md"
          />
        </>
      ) : (
        <div class="">
          <div class="justify-between w-11/12 flex mx-auto">
            <img
              src={mercedes}
              class="phone:w-[13rem] absolute justify-center flex"
            />
          </div>
          <img
            src={cover}
            alt="car"
            class="w-11/12 flex mx-auto rounded-md mt-10"
          />
          <p class="font-garamond text-center pt-5 mx-auto w-4/5">
            Discover opulence and performance. Navigate our exquisite selection
            of luxury cars, where elegance meets innovation and power.
          </p>
        </div>
      )}
      <Line />
    </div>
  );
};
export default Hero;
