import { Component, createEffect, createSignal } from "solid-js";
import { A, useParams } from "@solidjs/router";
import CarSpecifications from "../collections/CarSpecifications";
import image from "../assets/images/rosario-gianni-2qQ2uVKjZsI-unsplash.jpg";
import Stripe from "stripe";
import { useNavigate } from "@solidjs/router";

const Model = () => {
  const navigate = useNavigate();
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

  const handleClick = async () => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: selectedModel!.name,
            },
            unit_amount: selectedModel!.rentPrice * 100,
          },
          quantity: selectedDay(),
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      mode: "payment",
      success_url: `${origin}`,
    });

    if (session.url) {
      window.location.href = session.url;
    } else {
      console.error("Error creating Stripe Checkout session: Session URL is null.");
    }
  };

  return (
    <div class="lg:flex m-auto phone:w-11/12 lg:w-3/5 bg-white/10 p-5 rounded-lg mt-16 gap-10 border-2 border-white/10 phone:text-center lg:text-left">
      <img
        src={image}
        class="h-60 w-96 object-cover my-auto rounded-md filter text-opacity-90"
      />
      <div class="flex flex-col gap-3 mr-auto font-mabry-light mt-5 text-white">
        <p class="font-loubag phone:text-3xl lg:text-5xl uppercase">{selectedModel?.name}</p>
        <p class="phone:text-2xl lg:text-3xl mt-2">
          Price: &nbsp;<span class="font-mabry">${selectedModel?.price}</span>
        </p>
        <p class="mt-2 phone:text-base lg:text-lg">
          {selectedModel?.fuelType} &nbsp; | &nbsp; {selectedModel?.seatNumbers}{" "}
          &nbsp; Seater &nbsp; | &nbsp; {selectedModel?.transmission}
        </p>
        <p class="text-lg mt-auto">
          Days: <span class="font-mabry">&nbsp; {selectedDay()}</span>
        </p>
        <div class="flex gap-x-2 mt-1 phone:mx-auto lg:mx-0">
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
          class="lg:px-32 phone:px-5 py-2 bg-emerald-700 my-2 rounded-md font-mabry-regular text-lg"
          onClick={handleClick}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Model;
