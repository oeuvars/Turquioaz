import { Component, JSX, createEffect, createSignal } from "solid-js";
import passenger from "../../../assets/svgs/collections/person.svg";
import steering from "../../../assets/svgs/card/wheel.svg";
import fuel from "../../../assets/svgs/collections/gas-station.svg";
import { A } from "@solidjs/router";
import toast, { Toaster } from "solid-toast";
import axios from "axios";
import { BsTrash3 } from 'solid-icons/bs'

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

const AdminCard: Component<CardProps> = (props) => {
  const { model, ...restProps } = props;
  const [message, setMessage] = createSignal("")

  const handleDeleteClick = async (event: Event, id: number) => {
    event.preventDefault();
    const token = localStorage.getItem("loginToken");
    const res = await axios.delete(
        `https://rent-n-ride-ts-production.up.railway.app/admin/inventory/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res) {
      setMessage(res.data.message)
      toast.success(message(), {
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
      toast.success("Could not add to wishlist", {
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
    }
  };
  return (
    <A href={`/admin/inventory/${model.id}`}>
      <div
        {...restProps}
        class="bg-white/10 border border-white/10 rounded-xl font-montserrat mx-auto px-4 py-3 shadow-lg"
      >
        <div class="flex justify-between">
          <div class="flex-col justify-between">
            <h2 class="text-4xl font-bold font-mabry">{model.name}</h2>
            <p class="text-sm font-medium opacity-70 font-mabry-regular">
              ${model.price}
            </p>
          </div>
          <button onClick={(event) => handleDeleteClick(event, Number(model.id))}>
            <BsTrash3 class="h-8 w-8 text-red-700/80 hover:text-red-700/90 animation" />
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

export default AdminCard;
