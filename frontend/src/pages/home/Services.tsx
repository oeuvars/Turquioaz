import { A } from "@solidjs/router";
import { ParentComponent } from "solid-js";
import Showcase from "../user/components/Showcase";
import Line from "../user/components/Line";
import useMediaQuery from "../../hooks/useMediaQuery";

const Services: ParentComponent = () => {
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <div class="w-11/12 flex mx-auto justify-between">
        <div class="sm:flex gap-[2vw]">
          <h1 class="header-text flex items-center my-auto">SERVICES</h1>
          <p class="flex phone:text-sm tablet:text-base md:text-lg items-center font-medium">
            / &nbsp; Our area of expertise
          </p>
        </div>

        <A href="/services" class="my-auto">
          <button class="border border-yellow-200 px-7 phone:py-2 md:py-3 rounded-full flex justify-center items-center">
            View All
          </button>
        </A>
      </div>
      <Showcase />
    </>
  );
};

export default Services;
