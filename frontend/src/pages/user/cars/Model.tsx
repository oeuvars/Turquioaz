import { createEffect, createSignal } from "solid-js";
import { A, useParams } from "@solidjs/router";
import image from "../../../assets/images/cars/Model.jpg";
import Stripe from "stripe";
import axios from "axios";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "solid-toast";

const Model = () => {
  const [model, setModel] = createSignal<any>([])
  const { id } = useParams<{ id: string }>();
  const [startDate, setStartDate] = createSignal(new Date());
  const [endDate, setEndDate] = createSignal(new Date());
  const [totalDays, setTotalDays] = createSignal<number>(1)

  createEffect(async () => {
    const token = localStorage.getItem("loginToken");
    const res = await axios.get(
      `https://rent-n-ride-ts-production.up.railway.app/user/car/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setModel(res.data.model);
  })

  const handleRent = async () => {
    const token = localStorage.getItem("loginToken");
    const res = await axios.post(
      `https://rent-n-ride-ts-production.up.railway.app/user/rent-car/${id}`,
      {
        startDate: startDate().toISOString().split('T')[0],
        endDate: endDate().toISOString().split('T')[0],
        status: false
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const idToken = res.data.token;
    localStorage.setItem('idToken', idToken);
  }

  createEffect(() => {
    const utc1 = Date.UTC(startDate().getFullYear(), startDate().getMonth(), startDate().getDate());
    const utc2 = Date.UTC(endDate().getFullYear(), endDate().getMonth(), endDate().getDate());
    const diffDays = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
    setTotalDays(diffDays);
  });

  const Key = import.meta.env.VITE_STRIPE_SECRET_KEY;
  const stripe = new Stripe(Key, {
    apiVersion: "2022-11-15",
  });

  const handleClick = async () => {
    const utc1 = Date.UTC(startDate().getFullYear(), startDate().getMonth(), startDate().getDate());
    const utc2 = Date.UTC(endDate().getFullYear(), endDate().getMonth(), endDate().getDate());
    const diffDays = Math.floor((utc2-utc1) / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) {
      toast.error("Please select proper dates", {
        style: {
          border: "2px solid rgba(255, 255, 255, 0.1)",
          padding: "10px",
          color: "#fff",
          "background-color": "rgba(0, 0, 0, 0.1)",
          "backdrop-filter": "blur(10px)",
          "font-size": '1.1em',
          "min-width": "10em",
        },
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      });
    } else {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: model().name,
              },
              unit_amount: model().rentPrice * 100,
            },
            quantity: diffDays,
          },
        ],
        shipping_address_collection: {
          allowed_countries: ["US"],
        },
        mode: "payment",
        success_url: `${origin}/user/success/${id}`,
      });

      if (session.url) {
        window.location.href = session.url;
      }
    }
  };

  return (
    <>
      <Navbar />
      <div class="m-auto tablet:grid tablet:grid-cols-2 gap-[1vw] rounded-lg">
        <img
          src={image}
          class="object-cover max-h-screen my-auto"
        />
        <div class="flex flex-col gap-[1.5vw] font-mabry-light text-white my-auto justify-center m-[1vw]">
          <p class="font-loubag phone:text-3xl lg:text-7xl">{model().name}</p>
          <p class="phone:text-2xl lg:text-4xl">
            Price: &nbsp;<span class="font-mabry">${model().price}</span>
          </p>
          <p class="phone:text-base lg:text-xl">
            {model().fuelType} &nbsp; | &nbsp; {model().seatNumbers}
            &nbsp; Seater &nbsp; | &nbsp; {model().transmission}
          </p>
          <div class="flex gap-5 text-lg">
            <input
              type="date"
              id="datePicker"
              value={startDate().toISOString().split("T")[0]}
              onInput={(e) => setStartDate(new Date(e.target.value))}
              class="border border-gray-300/20 rounded-md p-2 text-white bg-white/10 focus:outline-none"
            />
            <h1 class="my-auto">to</h1>
            <input
              type="date"
              id="datePicker"
              value={endDate().toISOString().split("T")[0]}
              onInput={(e) => setEndDate(new Date(e.target.value))}
              class="border border-gray-300/20 rounded-md p-2 text-white bg-white/10 focus:outline-none"
            />
          </div>
          <div class="flex flex-col gap-[1vw]">
            <p class="font-mabry text-3xl">
              <span class="font-mabry-light"></span>$
              {model().rentPrice}/day &#215; {totalDays()} days
            </p>
            <Toaster position="bottom-center" gutter={16} />
            <div onClick={handleRent}>
              <button onClick={handleClick} class="bg-emerald-700 rounded-md text-lg py-2 px-5">
                <p class="text-center">Rent It</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
