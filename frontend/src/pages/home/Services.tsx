import { A } from "@solidjs/router";
import { ParentComponent } from "solid-js";
import Showcase from "../../components/Showcase";
import Line from "../../components/Line";
import useMediaQuery from "../../hooks/useMediaQuery";

const Services: ParentComponent = () => {
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  return (
    <>
      {isAboveSmallScreens() ? (
        <>
          <div class="w-11/12 flex mx-auto mt-16 justify-between">
            <div class="flex gap-20">
              <h1 class="font-loubag text-5xl flex items-center">SERVICES</h1>
              <p class="font-mabry flex items-center text-xl font-medium">
                / &nbsp; Our area of expertise
              </p>
            </div>

            <A href="/services">
              <button class="border border-yellow-200 px-7 py-3 rounded-full font-mabry-regular text-2xl">
                View All
              </button>
            </A>
          </div>

          <Line />
          <Showcase />
        </>
      ) : (
        <>
          <Line />
          <div class="w-11/12 flex mx-auto mt-3 justify-between">
            <div class="">
              <h1 class="font-loubag text-2xl flex items-center">SERVICES</h1>
              <p class="font-mabry-regular flex items-center text-xs font-medium">
                / &nbsp; Our area of expertise
              </p>
            </div>

            <A href="/services" class="my-auto">
              <button class="border border-yellow-200 text-sm px-4 py-2 rounded-full font-mabry-regular">
                View All
              </button>
            </A>
          </div>

          <Showcase />
        </>
      )}
    </>
  );
};

export default Services;
