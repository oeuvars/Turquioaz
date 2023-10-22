import { Component, createEffect, createSignal } from "solid-js";
import passenger from "../../../assets/svgs/collections/person.svg";
import steering from "../../../assets/svgs/card/wheel.svg";
import fuel from "../../../assets/svgs/collections/gas-station.svg";
import { A, useNavigate } from "@solidjs/router";
import left from "../../../assets/svgs/slider/back.png";
import right from "../../../assets/svgs/slider/next.png";
import useMediaQuery from "../../../hooks/useMediaQuery";
import loading from "../../../assets/images/loading.gif";
import toast, { Toaster } from "solid-toast";
import axios from "axios";
import { BsTrash3 } from "solid-icons/bs";
import Navbar from "../../../components/Navbar";
import jwtDecode from "jwt-decode";

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

interface WishlistedCar {
  id: number;
  carId: number;
  wishlistedbyId: number
}

const Wishlist: Component = () => {
  const [models, setModels] = createSignal<WishlistedCar[]>([])
  const [name, setName] = createSignal("")
  const [modelInfo, setModelInfo] = createSignal<Model[]>([])
  const [currentPage, setCurrentPage] = createSignal(1);
  const [message, setMessage] = createSignal("")
  const cardsPerPage = 6;

  const navigate = useNavigate();
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");

  const [isLoading, setIsLoading] = createSignal(false);

  const refetchData = async () => {
    const token = localStorage.getItem("loginToken");
    if (token) {
      const result = jwtDecode(token) as { name: string };
      const userName  = result.name
      setName(userName)
    } else {
      navigate("/login")
    }
    const res = await axios.get("http://localhost:4000/user/wishlistedCar", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setModels(res.data.wishlistedCar);

    const carDetailsPromises = models().map(async (item: WishlistedCar) => {
      const carRes = await axios.get(
        `http://localhost:4000/user/car/${item.carId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      return { ...carRes.data, wishlistedCarId: item.id };
    });
    const carDetails = await Promise.all(carDetailsPromises);
    console.log(carDetails);
    setModelInfo(carDetails)
  };

  refetchData();

  const deleteCard = async (event: Event, id: number) => {
    event.preventDefault();
    const token = localStorage.getItem("loginToken");
    console.log(id)
    const res = await axios.delete(
        `http://localhost:4000/user/wishlistedCar/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res) {
      await refetchData();
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
    <>
      <Navbar />
      {isLoading() ? (
        <div class="flex h-screen items-center justify-center">
          <img src={loading} class="phone:w-20 phone:h-20 lg:w-40 lg:h-40" />
        </div>
      ) : (
        <>
          {isAboveSmallScreens() ? (
            <div class="my-5">
              <div class="font-mauline my-10 justify-between w-[90%] mx-auto flex">
                <div>
                  <p class="text-4xl font-semibold text-emerald-600">{name()}'s Wishlist,</p>
                  <p class="text-6xl font-semibold text-emerald-600"></p>
                </div>
              </div>
              <div class="flex justify-center flex-wrap">
                {modelInfo()
                  .slice(
                    (currentPage() - 1) * cardsPerPage,
                    currentPage() * cardsPerPage
                  )
                  .map((entry: any, index: number) => (
                    <A href={`/user/model/${entry.model.id}`}>
                      <div class="bg-white/10 border border-white/10 rounded-xl font-montserrat min-w-[470px] min-h-[310px] mx-2 px-4 py-3 shadow-lg my-2">
                        <div class="flex justify-between">
                          <div class="flex-col justify-between">
                            <h2 class="text-4xl font-mabry">{entry.model.name}</h2>
                            <p class="text-base font-medium opacity-70 font-mabry-regular">
                              ${entry.model.price}
                            </p>
                          </div>
                          <button onClick={(event) => deleteCard(event, entry.wishlistedCarId)}>
                            <BsTrash3 class="w-7 h-7"/>
                          </button>
                          <Toaster position="bottom-center" gutter={8} />
                        </div>

                        <img
                          src="https://images.unsplash.com/photo-1517994112540-009c47ea476b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60"
                          class="w-[450px] h-[200px] object-cover my-3 rounded-md border-2 border-white/10"
                        />
                        <div class="flex justify-between">
                          <div class="flex gap-3 items-center font-mabry-regular mt-auto">
                            <div class="flex gap-1">
                              <img src={passenger} class="w-6 h-6 my-auto" />
                              <p class="font-medium">
                                {entry.model.seatNumbers}
                              </p>
                            </div>
                            <div class="flex gap-1">
                              <img src={steering} class="w-6 h-6 my-auto" />
                              <p class="font-medium">
                                {entry.model.transmission}
                              </p>
                            </div>
                            <div class="flex gap-1">
                              <img src={fuel} class="w-6 h-6 my-auto" />
                              <p class="font-medium">{entry.model.fuelType}</p>
                            </div>
                          </div>
                          <p class="font-semibold text-4xl">
                            ${entry.model.rentPrice}
                            <span class="text-base font-normal">
                              &nbsp;/ Day
                            </span>
                          </p>
                        </div>
                      </div>
                    </A>
                  ))}
              </div>
              <div class="flex justify-center mt-5">
                <button
                    disabled={currentPage() === 1}
                    onClick={() => setCurrentPage(currentPage() - 1)}
                    class=""
                  >
                    <img src={left} class="w-12 h-12" />
                  </button>
                  <button
                    disabled={
                      currentPage() === Math.ceil(modelInfo().length / cardsPerPage)
                    }
                    onClick={() => setCurrentPage(currentPage() + 1)}
                    class=""
                  >
                    <img src={right} class="w-12 h-12" />
                  </button>
              </div>
            </div>
          ) : (
            <div class="my-5">
              <div class="font-mauline text-emerald-600 text-6xl text-center my-10">
                Your Wishlist
              </div>
              <div class="flex justify-center flex-wrap">
                {modelInfo()
                  .slice(
                    (currentPage() - 1) * cardsPerPage,
                    currentPage() * cardsPerPage
                  )
                  .map((entry: any, index: number) => (
                    <A href={`/user/model/${entry.model.id}`}>
                      <div class="bg-white/10 border border-white/10 rounded-xl font-montserrat mx-2 px-4 py-3 shadow-lg my-2">
                        <div class="flex justify-between">
                          <div class="flex-col justify-between">
                            <h2 class="text-4xl font-mabry">{entry.model.name}</h2>
                            <p class="text-base font-medium opacity-70 font-mabry-regular">
                              ${entry.model.price}
                            </p>
                          </div>
                          <button onClick={(event) => deleteCard(event, entry.wishlistedCarId)}>
                            <BsTrash3 class="w-7 h-7"/>
                          </button>
                          <Toaster position="bottom-center" gutter={8} />
                        </div>

                        <img
                          src="https://images.unsplash.com/photo-1517994112540-009c47ea476b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60"
                          class="w-[450px] h-[200px] object-cover my-3 rounded-md border-2 border-white/10"
                        />
                        <div class="flex justify-between">
                          <div class="flex gap-3 items-center font-mabry-regular mt-auto">
                            <div class="flex gap-1">
                              <img src={passenger} class="w-6 h-6 my-auto" />
                              <p class="font-medium">
                                {entry.model.seatNumbers}
                              </p>
                            </div>
                            <div class="flex gap-1">
                              <img src={steering} class="w-6 h-6 my-auto" />
                              <p class="font-medium">
                                {entry.model.transmission}
                              </p>
                            </div>
                            <div class="flex gap-1">
                              <img src={fuel} class="w-6 h-6 my-auto" />
                              <p class="font-medium">{entry.model.fuelType}</p>
                            </div>
                          </div>
                          <p class="font-semibold text-4xl">
                            ${entry.model.rentPrice}
                            <span class="text-base font-normal">
                              &nbsp;/ Day
                            </span>
                          </p>
                        </div>
                      </div>
                    </A>
                  ))}
              </div>
              <div class="flex justify-center mt-5">

              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Wishlist;
