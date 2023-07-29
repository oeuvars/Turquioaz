import { Component, JSX, createEffect } from "solid-js";
import passenger from "../assets/svgs/person.svg";
import steering from "../assets/svgs/wheel.svg";
import fuel from "../assets/svgs/fuel-pump.svg";
import love from "../assets/svgs/love.svg";
import { A, Link, useParams } from "@solidjs/router";
import { supabase } from "../auth/supabaseClient";

interface Model {
  id: string;
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

    const handleAddToWishlistClick = async (e: MouseEvent) => {
      e.preventDefault();
      try {
        const { data: { user } } = await supabase.auth.getUser();

        const { data, error: insertError } = await supabase
          .from("wishlist")
          .insert({ cardId: model.id, userId: user!.id });

        if (insertError) {
          throw insertError;
        }

        console.log("Item added to wishlist successfully!");
      } catch (error: any) {
        console.error("Error adding item to wishlist:", error.message);
      }
    };

  return (
    <A href={`/model/${model.id}`}>
      <div
        {...restProps}
        class="bg-white/10 border border-white/10 rounded-xl font-montserrat min-w-[470px] min-h-[310px] mx-5 px-4 py-3 shadow-lg"
      >
        <div class="flex justify-between">
          <div class="flex-col justify-between">
            <h2 class="text-4xl font-bold font-mabry">{model.name}</h2>
            <p class="text-sm font-medium opacity-70 font-mabry-regular">${model.price}</p>
          </div>

          <button onClick={handleAddToWishlistClick}>

              <img src={love} class="w-8 h-8" />

          </button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1517994112540-009c47ea476b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60"
          class="w-[450px] h-[200px] object-cover my-3 rounded-md border-2 border-white/10"
        />

        <div class="flex justify-between">
          <div class="flex gap-3 items-center font-mabry-regular mt-auto">
            <div class="flex gap-1">
              <img src={passenger} class="w-6 h-6 my-auto" />
              <p class="font-medium">{model.seatNumbers}</p>
            </div>
            <div class="flex gap-1">
              <img src={steering} class="w-6 h-6 my-auto" />
              <p class="font-medium">{model.transmission}</p>
            </div>
            <div class="flex gap-1">
              <img src={fuel} class="w-6 h-6 my-auto" />
              <p class="font-medium">{model.fuelType}</p>
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
