import { createEffect, createSignal } from "solid-js";
import { A, useParams } from "@solidjs/router";
import bigModel from "../../../assets/images/cars/bigModel.jpg";
import phoneModel from "../../../assets/images/cars/phoneModel.jpg";
import Stripe from "stripe";
import axios from "axios";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "solid-toast";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { FaSolidAngleLeft } from "solid-icons/fa";
import DownFooter from "../../home/DownFooter";

const Model = () => {
  const [model, setModel] = createSignal<any>([])
  const { id } = useParams<{ id: string }>();
  const [startDate, setStartDate] = createSignal(new Date());
  const [endDate, setEndDate] = createSignal(new Date());
  const [totalDays, setTotalDays] = createSignal<number>(1)

  createEffect(async () => {
    const token = localStorage.getItem("loginToken");
    const res = await axios.get(
      `http://localhost:4000/user/car/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setModel(res.data.model);
  })

  const handleRent = async () => {
    const loginToken = localStorage.getItem("loginToken");
    const signupToken = localStorage.getItem("signupToken");
    const res = await axios.post(
      `http://localhost:4000/user/rent-car/${id}`,
      {
        startDate: startDate().toISOString().split('T')[0],
        endDate: endDate().toISOString().split('T')[0],
        status: false
      },
      {
        headers: {
          Authorization: `Bearer ${loginToken || signupToken}`,
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
  const isAboveSmallScreens = useMediaQuery("(min-width: 914px)");
  return (
    <>
      <Navbar />
      <div class="m-auto phone:flex phone:flex-col tablet:grid tablet:grid-cols-2 phone:gap-[5vh] tablet:gap-[2vw] phone:w-[95%] tablet:w-full">
        {isAboveSmallScreens() ? (
          <div>
            <FaSolidAngleLeft  class='absolute w-10 h-10 text-white hover:text-gray-100 font-medium transition duration-300 m-5 cursor-pointer'/>
            <img
              src={bigModel}
              class="object-cover max-h-screen my-auto w-full"
            />
          </div>
        ) : (
          <img
            src={phoneModel}
            class="object-cover mt-3 rounded-sm my-auto"
          />
        )}
        <div class="flex flex-col my-auto justify-center m-[1vw]">
          <div class="phone:mb-[0.5vh] lg:mb-[0.5vw]">
            <p class="flex text-emerald-700 mt-auto font-dm-sans font-medium">
              Model:
            </p>
            <p class="text-yellow-50 font-rubintek phone:text-5xl lg:text-7xl">{model().name}</p>
          </div>
          <div>
            <p class="flex text-emerald-700 mt-auto font-dm-sans font-medium">
              Price:
            </p>
            <p class="phone:text-3xl lg:text-4xl text-yellow-50 font-dm-sans font-semibold">
              ${model().price}
            </p>
          </div>
          <p class="phone:text-base lg:text-base font-dm-sans font-medium phone:mt-[2vh] lg:mt-[2vw] text-yellow-50">
            {model().fuelType} &nbsp; | &nbsp; {model().seatNumbers}
            &nbsp; Seater &nbsp; | &nbsp; {model().transmission}
          </p>
          <div class="flex gap-5 text-base font-dm-sans font-medium phone:my-[1.5vh] lg:my-[1.5vw]">
            <input
              type="date"
              id="datePicker"
              value={startDate().toISOString().split("T")[0]}
              onInput={(e) => setStartDate(new Date(e.target.value))}
              class="border border-gray-300/20 rounded-md p-2 text-white bg-white/10 focus:outline-none"
            />
            <h1 class="my-auto font-dm-sans font-medium tablet:text-base text-yellow-50">To</h1>
            <input
              type="date"
              id="datePicker"
              value={endDate().toISOString().split("T")[0]}
              onInput={(e) => setEndDate(new Date(e.target.value))}
              class="border border-gray-300/20 rounded-md p-2 text-white bg-white/10 focus:outline-none"
            />
          </div>
          <div class="flex flex-col phone:gap-[2vh] lg:gap-[1vw]">
            <p class="text-white text-5xl font-rethink-sans">
              ${model().rentPrice}/day
            </p>
            <div>
              <p class="text-base text-emerald-700 font-dm-sans font-medium">Total Cost:</p>
              <p class="text-yellow-50 font-dm-sans font-medium text-4xl">${Number(model().rentPrice)*totalDays()}</p>
            </div>
            <Toaster position="bottom-center" gutter={16} />
            <div onClick={handleRent}>
              <button onClick={handleClick} class="bg-emerald-700 rounded-sm text-lg py-2 phone:w-full tablet:w-[50%] text-yellow-50">
                <p class="text-center font-dm-sans">Rent It</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
