import { A } from "@solidjs/router";
import { ParentComponent, Show, createSignal } from "solid-js";
import Line from "../user/components/Line";
import "../user/components/underline.css";

interface Stat {
  title: string,
  value: string,
  description: string
}

const Shop: ParentComponent = () => {
  const statsData = [
    {
      title: "Service Centers",
      value: "360+",
      description: "We have already completed 100+ service centers around the globe",
    },
    {
      title: "International Rewards",
      value: "20+",
      description: "We have achieved 20+ international rewards for our collection and services",
    },
    {
      title: "Company Revenue",
      value: "$34K+",
      description: "We have already turned over 34K dollars for our company",
    },
  ];

  return (
    <>
      <div class="w-11/12 flex mx-auto phone:mt-[3.5vh] xs:mt-[2vh] sm:mt-[2.5vw] tablet:mt-[3vw] lg:mt-[3.5vw] justify-between">
        <div class="tablet:flex gap-[2vw]">
          <h1 class="header-text flex items-center uppercase">Collections</h1>
          <p class="font-mabry flex items-center font-medium phone:text-sm tablet:text-base md:text-lg">
            / &nbsp; Welcome to Luxury Garage
          </p>
        </div>
        <A href="/user/collections" class="my-auto">
          <button class="border border-yellow-200 px-7 phone:py-2 tablet:py-3 rounded-full font-mabry font-medium">
            View All
          </button>
        </A>
      </div>
      <Line />
      <div class="justify-between w-11/12 mx-auto sm:flex phone:grid my-[2vw] gap-5">
          {statsData.map((stat) => (
            <StatBlock title={stat.title} value={stat.value} description={stat.description} />
          ))}
      </div>
      <Line />
    </>
  );
};

function StatBlock(props: Stat) {
  return (
    <div class="bg-white/5 phone:py-5 lg:py-10 px-3 gap-5 rounded-lg">
      <h1 class="font-loubag text-5xl gradient-text text-center">{props.value}</h1>
      <h1 class="font-loubag text-3xl mb-5 gradient-text text-center">{props.title}</h1>
      <p class="text-center font-garamond phone:text-base tablet:text-lg md:text-xl">{props.description}</p>
    </div>
  );
}

export default Shop;
