import { A } from "@solidjs/router";
import { ParentComponent } from "solid-js";
import Showcase from "../../components/Showcase";
import Line from "../../components/Line";

const Services: ParentComponent = () => {
  return (
    <>
      <div class="w-11/12 flex mx-auto mt-16 justify-between">
        <div class="flex gap-20">
          <h1 class="font-loubag text-5xl flex items-center">SERVICES</h1>
          <p class="font-mabry flex items-center text-xs uppercase font-medium">
            / &nbsp; Our area of expertise
          </p>
        </div>

        <A href="/services">
          <button class="border border-yellow-200 px-7 py-3 rounded-full font-mabry font-medium">
            View All
          </button>
        </A>
      </div>

      <Line />
      <Showcase />
    </>
  );
};

export default Services;
