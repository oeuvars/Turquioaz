import "solid-slider/slider.css";
import { Slider, SliderProvider, createSlider } from "solid-slider";
import { autoplay } from "solid-slider/plugins/autoplay";
import car1 from "../../../assets/images/cars/car1.jpg";
import car2 from "../../../assets/images/cars/car2.jpg";
import car3 from "../../../assets/images/cars/car3.jpg";
import car4 from "../../../assets/images/cars/car4.jpg";
import car5 from "../../../assets/images/cars/car5.jpg";
import type { Component } from "solid-js";
import { A } from "@solidjs/router";
import "./underline.css";
import useMediaQuery from "../../../hooks/useMediaQuery";

const carData = [
  {
    title: "Performance Tuning",
    image: car1,
  },
  {
    title: "Paint jobs",
    image: car2,
  },
  {
    title: "Disinfectant Services",
    image: car3,
  },
  {
    title: "Oil Change",
    image: car4,
  },
  {
    title: "Exhaust Treatment",
    image: car5,
  },
];

const Showcase: Component = () => {
  const options = { duration: 1000 };
  const [slider] = createSlider(
    { loop: true },
    autoplay(2000, {
      pauseOnDrag: true,
    })
  );
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  slider
  return (
    <div class="">
      <div use:slider>
        {carData.map((car, index) => (
          <div class="cursor-pointer relative content__item">
            <A href="/" class="link link--dia absolute px-3 py-1 italic phone:text-[3.5vh] xs:text-[4.5vh] s:text-[5.5vh] sm:text-[10vw] tablet:text-[10vw] md:text-[9vw] lg:text-[10vw]">
              {car.title}
            </A>
            <img
              src={car.image}
              alt="car"
              class="py-5 rounded-sm filter blur-sm -z-10 phone:h-[30vh] xs:h-[35vh] s:h-[40vh] sm:h-[50vw] tablet:h-[51vw] md:h-[50vw] lg:h-[43vw] w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showcase;
