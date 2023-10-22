import { Component, JSX, createEffect, createSignal } from "solid-js";
import passenger from "../assets/svgs/collections/person.svg";
import steering from "../assets/svgs/card/wheel.svg";
import fuel from "../assets/svgs/collections/gas-station.svg";
import { A, useParams } from "@solidjs/router";
import toast, { Toaster } from "solid-toast";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from 'solid-icons/ai'

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

interface WishlistedCar {
  id: number;
  carId: number;
  wishlistedbyId: number
}

const Card: Component<CardProps> = (props) => {
  const { model, ...restProps } = props;
  const [models, setModels] = createSignal<WishlistedCar[]>([])
  const id = model.id;
  const [message, setMessage] = createSignal("")
  const [liked, setLiked] = createSignal()

  const toggledLikeButton = () => {
    setLiked(!liked());
  }

  const wishlistedCar = async () => {
    const token = localStorage.getItem("loginToken");
    const res = await axios.get("http://localhost:4000/user/wishlistedCar", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setModels(res.data.wishlistedCar);
  };
  wishlistedCar()

  const handleAddToWishlistClick = async (e: MouseEvent) => {
    e.preventDefault();
    createEffect(async () => {
      const token = localStorage.getItem("loginToken");
      const res = await axios.post(
        `http://localhost:4000/user/wishlist/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        await wishlistedCar()
        toast.success("Added to wishlist", {
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
        toast.error("Could not remove from wishlist", {
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
    })
  };
  const handleDeleteClick = async (event: Event, id: number) => {
    event.preventDefault();
    const token = localStorage.getItem("loginToken");
    const res = await axios.delete(
        `http://localhost:4000/user/wishlistedCar/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res) {
      await wishlistedCar();
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
    <A href={`/user/model/${model.id}`}>
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
          {models().some((item) => item.carId === Number(id)) ? (
            <>
              {models().map((item) => (
                item.carId === Number(id) ? (
                  <button onClick={(event) => handleDeleteClick(event, item.id)}>
                    <AiFillHeart class="h-8 w-8 text-red-600" />
                  </button>
                ) : null
              ))}
            </>
          ) : (
            <button onClick={handleAddToWishlistClick}>
              <AiOutlineHeart class="h-8 w-8 hover:text-red-600 animation" />
            </button>
          )}
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
