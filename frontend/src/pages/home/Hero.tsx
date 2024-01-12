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
          <p class="text-center pt-5 mx-auto w-4/5">
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
