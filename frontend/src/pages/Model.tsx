import { Component, createEffect, createSignal } from "solid-js";
import { A, useParams } from "@solidjs/router";
import CarSpecifications from "../collections/CarSpecifications";
import image from "../assets/images/rosario-gianni-2qQ2uVKjZsI-unsplash.jpg";
import Stripe from "stripe";

const Model: Component = () => {
  const calculateRentPrice = (
    rentPrice: number,
    numberOfDays: number
  ): number => {
    return rentPrice * numberOfDays;
  };

  const params = useParams();
  const selectedBrand = CarSpecifications.find((brand) =>
    brand.models.some((model) => model.id === params.slug)
  );

  const selectedModel = selectedBrand!.models.find(
    (model) => model.id === params.slug
  );
  const days: number[] = [1, 2, 3, 7];
  const [selectedDay, setSelectedDay] = createSignal<number>(days[0]);

  const Key = import.meta.env.VITE_STRIPE_SECRET_KEY;
  const stripe = new Stripe(Key, {
    apiVersion: "2022-11-15",
  });

  const createCheckoutSession = async () => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: selectedModel!.name,
              },
              unit_amount: selectedModel!.rentPrice * 100,
            },
            quantity: selectedDay(),
          },
        ],
        shipping_address_collection: {
          allowed_countries: ["IN"],
        },
        mode: "payment",
        billing_address_collection: "auto",
        success_url: `${origin}/success`,
        cancel_url: `${origin}/collections`,
      });

      if (session.url) {
        window.location.href = session.url;
      } else {
        console.error(
          "Error creating Stripe Checkout session: Session URL is null."
        );
      }
    } catch (error) {
      console.error("Error creating Stripe Checkout session:", error);
    }
  };

  return (
    <div class="flex m-auto w-3/5 bg-white/10 p-5 rounded-lg mt-16 gap-10 border-2 border-white/10">
      <img
        src={image}
        class="h-[500px] object-cover my-auto rounded-md filter text-opacity-90"
      />
      <div class="flex flex-col gap-3 mr-auto font-mabry-light mt-5 text-white">
        <p class="font-loubag text-5xl uppercase">{selectedModel?.name}</p>
        <p class="text-3xl mt-2">
          Price: &nbsp;<span class="font-mabry">${selectedModel?.price}</span>
        </p>
        <p class="mt-2 text-lg">
          {selectedModel?.fuelType} &nbsp; | &nbsp; {selectedModel?.seatNumbers}{" "}
          &nbsp; Seater &nbsp; | &nbsp; {selectedModel?.transmission}
        </p>
        <p class="text-lg mt-auto">
          Days: <span class="font-mabry">&nbsp; {selectedDay()}</span>
        </p>
        <div class="flex gap-x-2 mt-1">
          {days.map((day) => (
            <button
              class={`font-mabry text-lg px-4 py-1 ${
                selectedDay() === day
                  ? "bg-gray-200 text-black rounded-md"
                  : "rounded-md border-2 border-gray-900 text-yellow-50"
              }`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
        <p class="font-mabry text-3xl mt-1">
          <span class="font-mabry-light">Total: &nbsp;</span>$
          {calculateRentPrice(selectedModel?.rentPrice || 0, selectedDay())}
        </p>
        <button
          class="px-32 py-2 bg-emerald-700 my-2 rounded-md font-mabry-regular text-lg"
          onClick={createCheckoutSession}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Model;
