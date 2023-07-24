import { Component, JSX } from "solid-js";
import passenger from "../assets/svgs/person.svg";
import steering from "../assets/svgs/wheel.svg";
import fuel from "../assets/svgs/fuel-pump.svg";
import { A, Link, useParams } from "@solidjs/router";

interface Model {
  id: string,
  name: string;
  transmission: string;
  fuelType: string;
  seatNumbers: number;
  condition: string;
  price: number;
  rentPrice: number;
}

interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  model: Model;
}

const Card: Component<CardProps> = (props) => {
  const { model, ...restProps } = props;

  return (
    <A href={`/collections/${model.id}`}>
    <div
      {...restProps}
      class="bg-white/10 border border-white/10 rounded-xl font-montserrat min-w-[470px] min-h-[310px] mx-5 px-4 py-3 shadow-lg"
    >
      <div class="flex justify-between">
        <h2 class="text-4xl font-bold font-mabry">{model.name}</h2>
      </div>

      <p class="text-sm font-medium opacity-70 font-mabry-regular">${model.price}</p>

      <img
        src="https://images.unsplash.com/photo-1517994112540-009c47ea476b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60"
        class="w-[450px] h-[200px] object-cover my-3 rounded-md border-2 border-white/10"
      />

      <div class="flex justify-between">
        <div class="flex gap-3 items-center font-mabry-regular mt-auto">
          <div class="flex gap-1">
            <img src={passenger} class="w-5 h-5 my-auto" />
            <p class="text-sm font-medium">{model.seatNumbers}</p>
          </div>
          <div class="flex gap-1">
            <img src={steering} class="w-5 h-5 my-auto" />
            <p class="text-sm font-medium">{model.transmission}</p>
          </div>
          <div class="flex gap-1">
            <img src={fuel} class="w-5 h-5 my-auto" />
            <p class="text-sm font-medium">{model.fuelType}</p>
          </div>
        </div>
        <p class="font-semibold text-4xl">
          ${model.rentPrice}
          <span class="text-base font-normal">/day</span>
        </p>
      </div>
    </div>
    </A>
  );
};

export default Card;
