import { Component, JSX, createEffect } from "solid-js";
import passenger from "../assets/svgs/collections/person.svg";
import steering from "../assets/svgs/card/wheel.svg";
import fuel from "../assets/svgs/collections/gas-station.svg";
import love from "../assets/svgs/card/heart.svg";
import { A } from "@solidjs/router";
import { supabase } from "../auth/supabaseClient";
import toast, { Toaster } from "solid-toast";

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
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error: insertError } = await supabase
        .from("wishlist")
        .insert({
          cardId: model.id,
          userId: user!.id,
          name: model.name,
          transmission: model.transmission,
          fuelType: model.fuelType,
          seatNumbers: model.seatNumbers,
          condition: model.condition,
          price: model.price,
          rentPrice: model.rentPrice,
        });

      if (insertError) {
        throw insertError;
      }
      toast.success('Item added to wishlist successfully!', {
        className: 'custom-toast',
        iconTheme: {
          primary: '#F2EEC0',
          secondary: '#1f2937'
        }
      })
    } catch (error: any) {
      console.error("Error adding item to wishlist:", error.message);
    }
  };

  return (
    <A href={`/model/${model.id}`}>
      <div
        {...restProps}
        class="bg-white/10 border border-white/10 rounded-xl font-montserrat lg:min-w-[470px] lg:min-h-[310px] phone:min-w-[330px] phone:min-h-[220px] mx-5 px-4 py-3 shadow-lg"
      >
        <div class="flex justify-between">
          <div class="flex-col justify-between">
            <h2 class="text-4xl font-bold font-mabry">{model.name}</h2>
            <p class="text-sm font-medium opacity-70 font-mabry-regular">
              ${model.price}
            </p>
          </div>

          <button onClick={handleAddToWishlistClick}>
            <img src={love} class="w-8 h-8" />
          </button>
          <Toaster position="bottom-center" gutter={16} />
        </div>

        <img
          src="https://images.unsplash.com/photo-1517994112540-009c47ea476b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60"
          class="w-[450px] h-[200px] object-cover my-3 rounded-md border-2 border-white/10"
        />

        <div class="flex justify-between">
          <div class="lg:flex gap-3 items-center font-mabry-regular mt-auto">
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
          <p class="font-semibold text-4xl my-auto">
            ${model.rentPrice}
            <span class="text-base font-normal">/day</span>
          </p>
        </div>
      </div>
    </A>
  );
};

export default Card;
