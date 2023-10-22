import { A, useParams } from "@solidjs/router";
import { Component, createEffect } from "solid-js";
import logo from "../../../assets/svgs/navbar/logo.svg";
import axios from "axios";

const Success: Component = () => {
  const { id } = useParams<{ id: string }>();

  createEffect(async () => {
    const token = localStorage.getItem("loginToken");
    const res = await axios.post(
      `http://localhost:4000/user/rent-car/${id}`,
      {
        status: "Rented"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  })

  return (
    <main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <div class="-mt-10">
          <h1 class="font-mauline text-6xl text-emerald-500">Success</h1>
          <h1 class="text-5xl">🎉</h1>
        </div>

        <div class="my-7 mt-24">
          <h1 class="font-mabry-regular text-white lg:text-xl">
            Your Booking has been completed, you will receive an order Invoice
            in your mail.
          </h1>
          <h1 class="font-mabry text-2xl text-emerald-100 mt-10 ">
            Thank you for choosing
          </h1>
          <img src={logo} class="w-52 flex mx-auto mt-3" />
        </div>

        <div class="mt-10 grid gap-2 items-center justify-center gap-x-6">
          <A
            href="/"
            class="rounded-md bg-emerald-700 px-3.5 py-2.5 text-white font-mabry shadow-sm lg:text-xl phone:text-sm"
          >
            Go back home
          </A>
          <a href="#" class="text-sm font-mabry">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
};
export default Success;
