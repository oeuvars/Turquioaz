import { A } from "@solidjs/router";
import car1 from "../../../assets/images/cars/car1.jpg";
import car2 from "../../../assets/images/cars/car2.jpg";
import car3 from "../../../assets/images/cars/car3.jpg";
import car4 from "../../../assets/images/cars/car4.jpg";
import car5 from "../../../assets/images/cars/car5.jpg";
import { Component, createSignal, onCleanup } from "solid-js";

interface CarDataItem {
  title: string;
  image: string;
}

const carData: CarDataItem[] = [
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
  const [currentIndex, setCurrentIndex] = createSignal<number>(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carData.length);
  };

  const previousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carData.length) % carData.length);
  };

  let autoplayInterval: NodeJS.Timeout;
  onCleanup(() => clearInterval(autoplayInterval));

  const startAutoplay = () => {
    autoplayInterval = setInterval(() => nextSlide(), 2000);
  };

  startAutoplay();

  return (
    <div class="relative overflow-hidden">
      <div class="flex transition-transform transform" style={`transform: translateX(-${100 * currentIndex()}%); transition: transform 0.5s ease-in-out;`}>
        {carData.map((car, index) => (
          <div class="w-screen flex-shrink-0 relative">
            <img src={car.image} alt="car" class="-z-10 py-5 rounded-sm filter blur-sm phone:h-[30vh] xs:h-[35vh] s:h-[40vh] sm:h-[50vw] tablet:h-[51vw] md:h-[50vw] lg:h-[43vw] w-full object-cover" />
            <A href="/user/services" class="absolute inset-0 flex items-center justify-center link link--dia z-10 px-3 py-1 italic phone:text-[3.5vh] xs:text-[4.5vh] s:text-[5.5vh] sm:text-[10vw] tablet:text-[10vw] md:text-[9vw] lg:text-[10vw] font-rubintek">{car.title}</A>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Showcase;
