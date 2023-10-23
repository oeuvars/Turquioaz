import "solid-slider/slider.css";
import { Slider, createSlider } from "solid-slider";
import type { Component } from "solid-js";
import car1 from "../../../assets/images/cars/car1.jpg";
import car2 from "../../../assets/images/cars/car2.jpg";
import car3 from "../../../assets/images/cars/car3.jpg";
import car4 from "../../../assets/images/cars/car4.jpg";
import car5 from "../../../assets/images/cars/car5.jpg";
import left from "../../../assets/svgs/slider/back.png";
import right from "../../../assets/svgs/slider/next.png";
import { A } from "@solidjs/router";
import "./underline.css";
import useMediaQuery from "../../../hooks/useMediaQuery";

const Showcase: Component = () => {
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  const [slider, { next, prev }] = createSlider();
  slider;
  return (
    <div class="mt-10">
      {isAboveSmallScreens() ? (
        <>
          <div use:slider class="h-[600px]">
            <div class="cursor-pointer relative content__item">
              <A href="/" class="link link--dia absolute px-3 py-1">
                PERFORMANCE TUNING
              </A>
              <img
                src={car1}
                alt="car"
                class="py-5 rounded-sm -mt-12 filter blur-sm -z-10"
              />
            </div>
            <div class="cursor-pointer relative content__item">
              <A href="/" class="link link--dia absolute px-3 py-1 uppercase">
                Paint jobs
              </A>
              <img
                src={car2}
                alt="car"
                class="py-5 rounded-sm -mt-12 filter blur-sm -z-10"
              />
            </div>
            <div class="cursor-pointer relative content__item">
              <A href="/" class="link link--dia absolute px-3 py-1 uppercase">
                Disinfectant Services
              </A>
              <img
                src={car3}
                alt="car"
                class="py-5 rounded-sm -mt-12 filter blur-sm -z-10"
              />
            </div>
            <div class="cursor-pointer relative content__item">
              <A href="/" class="link link--dia absolute px-3 py-1 uppercase">
                Oil Change
              </A>
              <img
                src={car4}
                alt="car"
                class="py-5 rounded-sm -mt-12 filter blur-sm -z-10"
              />
            </div>
            <div class="cursor-pointer relative content__item">
              <A href="/" class="link link--dia absolute px-3 py-1 uppercase">
                Exhaust Treatment
              </A>
              <img
                src={car5}
                alt="car"
                class="py-5 rounded-sm -mt-12 filter blur-sm -z-10"
              />
            </div>
          </div>
          <div class="flex mx-auto justify-center my-5 -mt-20">
            <button
              onClick={prev}
              class="rounded-full bg-opacity-10 backdrop-blur-md mx-1"
            >
              <img src={left} class="w-16 h-16"/>
            </button>
            <button
              onClick={next}
              class="rounded-full bg-opacity-10 backdrop-blur-md mx-1"
            >
              <img src={right} class="w-16 h-16"/>
            </button>
          </div>
        </>
      ) : (
        <div class="mb-3">
          <div use:slider class="h-[200px] -mt-7">
            <div class="relative cursor-pointer">
              <A href="/" class="px-3 py-1 font-mauline text-4xl opacity-70 absolute flex justify-center items-center w-full h-full">
                PERFORMANCE TUNING
              </A>
              <img
                src={car1}
                alt="car"
                class="py-5 rounded-sm absolute -z-10 filter blur-sm h-[200px] w-full object-cover"
              />
            </div>
            <div class="relative cursor-pointer">
              <A href="/" class="px-3 py-1 font-mauline text-4xl opacity-70 absolute flex justify-center items-center w-full h-full uppercase">
                Paint jobs
              </A>
              <img
                src={car2}
                alt="car"
                class="py-5 rounded-sm absolute filter blur-sm -z-10 h-[200px] w-full object-cover"
              />
            </div>
            <div class="relative cursor-pointer">
              <A href="/" class="px-3 py-1 font-mauline text-[2.1rem] opacity-70 absolute flex justify-center items-center w-full h-full uppercase">
                Disinfectant Services
              </A>
              <img
                src={car3}
                alt="car"
                class="py-5 rounded-sm absolute -z-10 filter blur h-[200px] w-full object-cover"
              />
            </div>
            <div class="relative cursor-pointer">
              <A href="/" class="px-3 py-1 font-mauline text-4xl opacity-70 absolute flex justify-center items-center w-full h-full uppercase">
                Oil Change
              </A>
              <img
                src={car4}
                alt="car"
                class="py-5 rounded-sm absolute filter blur-sm -z-10 h-[200px] w-full object-cover"
              />
            </div>
            <div class="relative cursor-pointer">
              <A href="/" class="px-3 py-1 font-mauline text-4xl opacity-70 absolute flex justify-center items-center w-full h-full uppercase">
                Exhaust Treatment
              </A>
              <img
                src={car5}
                alt="car"
                class="py-5 rounded-sm absolute filter blur-sm -z-10 h-[200px] w-full object-cover"
              />
            </div>
          </div>
          <div class="flex mx-auto justify-center -mt-[3.5rem]">
            <button
              onClick={prev}
              class="rounded-full bg-opacity-25 backdrop-blur-sm mx-1"
            >
              <img src={left} class="w-7 h-7"/>
            </button>
            <button
              onClick={next}
              class="rounded-full bg-opacity-25 backdrop-blur-sm mx-1"
            >
              <img src={right} class="w-7 h-7"/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Showcase;
