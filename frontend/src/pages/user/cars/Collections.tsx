import { Component, createSignal, createEffect, Show } from "solid-js";
import Card from "../components/Card";
import useMediaQuery from "../../../hooks/useMediaQuery";
import seats from "../../../assets/svgs/collections/person.svg";
import transmission from "../../../assets/svgs/collections/manual-transmission.png";
import fuel from "../../../assets/svgs/collections/gas-station.svg";
import condition from "../../../assets/svgs/collections/tools.svg";
import { IoClose } from "solid-icons/io";
import Navbar from "../components/Navbar";
import axios from "axios";
import { BsChevronLeft, BsChevronRight } from "solid-icons/bs";
import { AiOutlineRedo } from 'solid-icons/ai'

const Collections: Component = () => {
  const [models, setModels] = createSignal([])

  const [loading, setLoading] = createSignal(false)
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  const [currentPage, setCurrentPage] = createSignal(1);
  const [selectedTransmission, setSelectedTransmission] = createSignal("Any");
  const [selectedFuel, setSelectedFuel] = createSignal("Any");
  const [selectedSeats, setSelectedSeats] = createSignal(2);
  const [selectedCondition, setSelectedCondition] = createSignal("All");
  const [totalPages, setTotalPages] = createSignal(0);
  const cardsPerPage = 4;

  const [isDropdownOpen, setIsDropdownOpen] = createSignal(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = createSignal(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = createSignal(false);
  const [isDropdownOpen4, setIsDropdownOpen4] = createSignal(false);

  const loginToken = localStorage.getItem("loginToken");
  const signupToken = localStorage.getItem("signupToken");

  if(loginToken || signupToken) {

  }

  createEffect(async () => {
    const token = localStorage.getItem("loginToken");
    const res = await axios.get(
      "https://rent-n-ride-ts-production.up.railway.app/user/inventory",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setModels(res.data.models);
    const totalCards = models().length
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    setTotalPages(totalPages);
  })

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen());
  };
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2());
  };
  const closeDropdown2 = () => {
    setIsDropdownOpen2(false);
  };

  const toggleDropdown3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3());
  };
  const closeDropdown3 = () => {
    setIsDropdownOpen3(false);
  };

  const toggleDropdown4 = () => {
    setIsDropdownOpen4(!isDropdownOpen4());
  };
  const closeDropdown4 = () => {
    setIsDropdownOpen4(false);
  };

  createEffect(() => {
    setLoading(true)
    const startIndex = (currentPage() - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    const filteredModels = models().filter((model) => {
      const transmissionMatch = selectedTransmission() === "Any" || (model as any).transmission === selectedTransmission();
      const fuelMatch = selectedFuel() === "Any" || (model as any).fuelType === selectedFuel();
      const seatsMatch = selectedSeats() === 2 || (model as any).seatNumbers === selectedSeats();
      const conditionMatch = selectedCondition() === "All" || (model as any).condition === selectedCondition();

      return transmissionMatch && fuelMatch && seatsMatch && conditionMatch;
    });

    const currentCards = filteredModels.slice(startIndex, endIndex);
    setCurrentCards(currentCards || []);
    const totalCards = filteredModels.length;
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    setTotalPages(totalPages);
    setLoading(false)
  });

  const resetFilters = () => {
    setSelectedTransmission("Any");
    setSelectedFuel("Any");
    setSelectedSeats(2);
    setSelectedCondition("All");
    setCurrentPage(1);
  };

  const [currentCards, setCurrentCards] = createSignal(models().slice(0, cardsPerPage));

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages()));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const getPageNumbers = () => {
    const pageRange = 2;
    let start = Math.max(1, currentPage() - pageRange);
    let end = Math.min(totalPages(), currentPage() + pageRange);

    if (currentPage() - start < pageRange) {
      end = Math.min(end + pageRange - (currentPage() - start), totalPages());
    }
    if (end - currentPage() < pageRange) {
      start = Math.max(start - (pageRange - (end - currentPage())), 1);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };
  return (
    <>
    <Navbar />
      {isAboveSmallScreens() ? (
        <div class="font-didact-gothic">
          <div class="mx-auto mt-[4vw] flex w-11/12 justify-between phone:gap-5 lg:gap-9">
            <div class="bg-white/10 border border-white/10 rounded-xl py-10 px-5 shadow-lg">
              <div class="flex justify-between mx-auto">
                <h1 class="font-medium text-xl">Filters</h1>
                <div class="flex gap-1">
                <AiOutlineRedo class="w-6 h-6 my-auto"/>

                  <button
                    onClick={resetFilters}
                    class="font-mabry font-medium text-yellow-500 text-lg"
                  >
                    Reset All
                  </button>
                </div>
              </div>

              <hr class="my-[1.5vw] bg-yellow-50/70 border-0 h-[0.1vw] rounded-full"/>

              <div class="mx-auto">
                <h1 class="font-medium">Transmission Type</h1>
                <div class="gap-3 flex mt-3">
                  <button
                    class={`rounded-full px-3 py-1 bg-yellow-100 text-black font-medium ${
                      selectedTransmission() === "Any" ? "bg-yellow-500" : ""
                    }`}
                    onClick={() => setSelectedTransmission("Any")}
                  >
                    Any
                  </button>
                  <button
                    class={`rounded-full px-3 py-1 bg-yellow-100 text-black font-medium ${
                      selectedTransmission() === "Manual" ? "bg-yellow-500" : ""
                    }`}
                    onClick={() => setSelectedTransmission("Manual")}
                  >
                    Manual
                  </button>
                  <button
                    class={`rounded-full px-3 py-1 bg-yellow-100 text-black font-medium ${
                      selectedTransmission() === "Automatic"
                        ? "bg-yellow-500"
                        : ""
                    }`}
                    onClick={() => setSelectedTransmission("Automatic")}
                  >
                    Automatic
                  </button>
                </div>
              </div>

              <hr class="my-[1.5vw] bg-yellow-50/70 border-0 h-[0.1vw] rounded-full"/>

              <div class="mx-auto overflow-clip">
                <h1 class="font-medium">Fuel Type</h1>
                <div class="gap-3 flex mt-3 flex-wrap">
                  <button
                    class={`rounded-full px-3 py-1 bg-yellow-100 text-black font-medium ${
                      selectedFuel() === "Any" ? "bg-yellow-500" : ""
                    }`}
                    onClick={() => setSelectedFuel("Any")}
                  >
                    Any
                  </button>
                  <button
                    class={`rounded-full px-3 py-1 bg-yellow-100 text-black font-medium ${
                      selectedFuel() === "Petrol" ? "bg-yellow-500" : ""
                    }`}
                    onClick={() => setSelectedFuel("Petrol")}
                  >
                    Petrol
                  </button>
                  <button
                    class={`rounded-full px-3 py-1 bg-yellow-100 text-black font-medium ${
                      selectedFuel() === "Diesel" ? "bg-yellow-500" : ""
                    }`}
                    onClick={() => setSelectedFuel("Diesel")}
                  >
                    Diesel
                  </button>
                  <button
                    class={`rounded-full px-3 py-1 bg-yellow-100 text-black font-medium ${
                      selectedFuel() === "Electric" ? "bg-yellow-500" : ""
                    }`}
                    onClick={() => setSelectedFuel("Electric")}
                  >
                    Electric
                  </button>
                  <button
                    class={`rounded-full px-3 py-1 bg-yellow-100 text-black font-medium ${
                      selectedFuel() === "Hybrid" ? "bg-yellow-500" : ""
                    }`}
                    onClick={() => setSelectedFuel("Hybrid")}
                  >
                    Hybrid
                  </button>
                </div>
              </div>

              <hr class="my-[1.5vw] bg-yellow-50/70 border-0 h-[0.1vw] rounded-full"/>

              <div class="mx-auto overflow-clip">
                <h1 class="font-medium">Seat</h1>
                <div class="gap-3 flex mt-3 flex-wrap">
                  <button
                    class={`rounded-full px-3 py-1 bg-yellow-100 text-black font-medium ${
                      selectedSeats() === 2 ? "bg-yellow-500" : ""
                    }`}
                    onClick={() => setSelectedSeats(2)}
                  >
                    2 Seater
                  </button>
                  <button
                    class={`rounded-full px-3 py-1 bg-yellow-100 text-black font-medium ${
                      selectedSeats() === 4 ? "bg-yellow-500" : ""
                    }`}
                    onClick={() => setSelectedSeats(4)}
                  >
                    4 Seater
                  </button>
                  <button
                    class={`rounded-full px-3 py-1 bg-yellow-100 text-black font-medium ${
                      selectedSeats() === 5 ? "bg-yellow-500" : ""
                    }`}
                    onClick={() => setSelectedSeats(5)}
                  >
                    5 Seater
                  </button>
                  <button
                    class={`rounded-full px-3 py-1 bg-yellow-100 text-black font-medium ${
                      selectedSeats() === 7 ? "bg-yellow-500" : ""
                    }`}
                    onClick={() => setSelectedSeats(7)}
                  >
                    7 Seater
                  </button>
                </div>
              </div>

              <hr class="my-[1.5vw] bg-yellow-50/70 border-0 h-[0.1vw] rounded-full"/>

              <div class="mx-auto overflow-clip">
                <h1 class="font-medium">Veichle Condition</h1>
                <div class="gap-3 flex mt-3">
                  <button
                    class={`rounded-full px-3 py-1 bg-yellow-100 text-black font-medium ${
                      selectedCondition() === "All" ? "bg-yellow-500" : ""
                    }`}
                    onClick={() => setSelectedCondition("All")}
                  >
                    All
                  </button>
                  <button
                    class={`rounded-full px-3 py-1 bg-yellow-100 text-black font-medium ${
                      selectedCondition() === "New" ? "bg-yellow-500" : ""
                    }`}
                    onClick={() => setSelectedCondition("New")}
                  >
                    Brand New
                  </button>
                  <button
                    class={`rounded-full px-3 py-1 bg-yellow-100 text-black font-medium ${
                      selectedCondition() === "Used" ? "bg-yellow-500" : ""
                    }`}
                    onClick={() => setSelectedCondition("Used")}
                  >
                    Used
                  </button>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 phone:gap-5 lg:gap-9 justify-center">
              {currentCards()
                .filter(
                  (model) =>
                    (selectedTransmission() === "Any" ||
                      (model as any).transmission === selectedTransmission()) &&
                    (selectedFuel() === "Any" ||
                      (model as any).fuelType === selectedFuel()) &&
                    (selectedSeats() === 2 ||
                      (model as any).seatNumbers === selectedSeats()) &&
                    (selectedCondition() === "All" ||
                      (model as any).condition === selectedCondition())
                )
                .map((model) => (
                  <Card model={model} />
                ))}
            </div>
          </div>
          <div class="flex justify-center gap-2 transition duration-500 mx-auto my-[2vw] w-full">
            <button
              class=""
              disabled={currentPage() === 1}
              onClick={handlePreviousPage}
            >
              <BsChevronLeft class="min-w-[40px] min-h-[40px] bg-emerald-900/30 rounded-full p-[0.5vw]"/>
            </button>
            <div class="">
              {getPageNumbers().map((page) => (
                <button
                  class={`mx-1 min-w-[40px] min-h-[40px] text-lg rounded-full font-medium transition duration-500 ${
                    currentPage() === page
                      ? "bg-emerald-900 text-white"
                      : "bg-yellow-50/20"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              class=""
              disabled={currentPage() === totalPages()}
              onClick={handleNextPage}
            >
              <BsChevronRight class="min-w-[40px] min-h-[40px] bg-emerald-900/30 rounded-full p-[0.5vw]"/>
            </button>
          </div>
        </div>
      ) : (
        <div class="font-mabry-regular mb-7 overflow-x-hidden">
          <div class="mx-auto mt-5 w-[88%]">
            <div class="w-full bg-white/10 border border-white/10 rounded-xl py-3 my-5 shadow-lg mx-auto">
              <div class="flex justify-between">
                <div class="flex mx-auto">
                  <button class="font-medium" onClick={() => {
                      toggleDropdown();
                      closeDropdown2();
                      closeDropdown3();
                      closeDropdown4();
                    }}>
                    <img src={transmission} class="w-6 h-6 mx-auto mt-1" />
                    <h1 class="text-white text-sm -mb-1">{selectedTransmission()}</h1>
                  </button>
                  <div class="absolute flex mt-[8vh] -ml-[3vh]">
                    <Show when={isDropdownOpen()}>
                      <div class="flex absolute bg-white/10 rounded-md w-[13vh] shadow-md scroll z-20 my-1 border-white/10 border backdrop-blur-sm">
                        <div class="">
                          <button
                            class={`pt-1 px-2 text-white font-mabry-regular font-medium ${
                              selectedTransmission() === "Any"
                                ? "font-bold"
                                : ""
                            }`}
                            onClick={() => setSelectedTransmission("Any") && closeDropdown()}
                          >
                            Any
                          </button>
                          <button
                            class={`pt-1 px-2 text-white font-mabry-regular font-medium ${
                              selectedTransmission() === "Manual"
                                ? "font-bold"
                                : ""
                            }`}
                            onClick={() => setSelectedTransmission("Manual") && closeDropdown()}
                          >
                            Manual
                          </button>
                          <button
                            class={`pt-1 px-2 text-white font-mabry-regular font-medium ${
                              selectedTransmission() === "Automatic"
                                ? "font-bold"
                                : ""
                            }`}
                            onClick={() => setSelectedTransmission("Automatic") && closeDropdown()}
                          >
                            Automatic
                          </button>
                        </div>
                        <IoClose
                          class="text-white w-5 h-5 cursor-pointer m-[0.5vh] sticky top-0"
                          onClick={closeDropdown}
                        />
                      </div>
                    </Show>
                  </div>
                </div>

                <div class="flex mx-auto">
                  <button class="font-medium" onClick={() => {
                      toggleDropdown2();
                      closeDropdown();
                      closeDropdown3();
                      closeDropdown4();
                    }}>
                    <img src={fuel} class="w-8 h-8 mx-auto" />
                    <h1 class="text-white text-sm">{selectedFuel()}</h1>
                  </button>
                  <div class="absolute mt-[8vh] -ml-[3vh] flex-wrap">
                    <Show when={isDropdownOpen2()}>
                      <div class="flex absolute backdrop-blur-sm bg-white/10 w-[12vh] h-[12vh] rounded-md shadow-md overflow-scroll scroll z-20 my-1 border-white/10 border">
                        <div class="flex-col">
                          <button
                            class={`pt-1 px-2 text-white font-mabry-regular font-medium ${
                              selectedFuel() === "Any" ? "font-bold" : ""
                            }`}
                            onClick={() => setSelectedFuel("Any") && closeDropdown2()}
                          >
                            Any
                          </button>
                          <button
                            class={`pt-1 px-2 text-white font-mabry-regular font-medium ${
                              selectedFuel() === "Petrol" ? "font-bold" : ""
                            }`}
                            onClick={() => setSelectedFuel("Petrol") && closeDropdown2()}
                          >
                            Petrol
                          </button>
                          <button
                            class={`pt-1 px-2 text-white font-mabry-regular font-medium ${
                              selectedFuel() === "Diesel" ? "font-bold" : ""
                            }`}
                            onClick={() => setSelectedFuel("Diesel") && closeDropdown2()}
                          >
                            Diesel
                          </button>
                          <button
                            class={`pt-1 px-2 text-white font-mabry-regular font-medium ${
                              selectedFuel() === "Electric" ? "font-bold" : ""
                            }`}
                            onClick={() => setSelectedFuel("Electric") && closeDropdown2()}
                          >
                            Electric
                          </button>
                          <button
                            class={`pt-1 px-2 text-white font-mabry-regular font-medium ${
                              selectedFuel() === "Hybrid" ? "font-bold" : ""
                            }`}
                            onClick={() => setSelectedFuel("Hybrid") && closeDropdown2()}
                          >
                            Hybrid
                          </button>
                        </div>
                        <IoClose
                          class="text-white w-5 h-5 cursor-pointer m-[0.5vh] sticky top-0"
                          onClick={closeDropdown2}
                        />
                      </div>
                    </Show>
                  </div>
                </div>

                <div class="flex mx-auto">
                  <button class="font-medium" onClick={() => {
                      toggleDropdown3();
                      closeDropdown();
                      closeDropdown2();
                      closeDropdown4();
                    }}>
                    <img src={seats} class="w-8 h-8 mx-auto" />
                    <h1 class="text-white text-sm">{selectedSeats()}</h1>
                  </button>
                  <div class="absolute mt-[8vh] -ml-[3vh] flex-wrap">
                    <Show when={isDropdownOpen3()}>
                      <div class="flex absolute backdrop-blur-sm bg-white/10 w-[13vh] rounded-md shadow-md h-24 overflow-scroll scroll z-20 my-1 border-white/10 border">
                        <div class="flex-col">
                          <button
                            class={`pt-1 px-2 text-white font-mabry-regular font-medium ${
                              selectedSeats() === 2 ? "font-bold" : ""
                            }`}
                            onClick={() => setSelectedSeats(2) && closeDropdown3()}
                          >
                            2 Seater
                          </button>
                          <button
                            class={`pt-1 px-2 text-white font-mabry-regular font-medium ${
                              selectedSeats() === 4 ? "font-bold" : ""
                            }`}
                            onClick={() => setSelectedSeats(4) && closeDropdown3()}
                          >
                            4 Seater
                          </button>
                          <button
                            class={`pt-1 px-2 text-white font-mabry-regular font-medium ${
                              selectedSeats() === 5 ? "font-bold" : ""
                            }`}
                            onClick={() => setSelectedSeats(5) && closeDropdown3()}
                          >
                            5 Seater
                          </button>
                          <button
                            class={`pt-1 px-2 text-white font-mabry-regular font-medium ${
                              selectedSeats() === 7 ? "font-bold" : ""
                            }`}
                            onClick={() => setSelectedSeats(7) && closeDropdown3()}
                          >
                            7 Seater
                          </button>
                        </div>
                        <IoClose
                          class="text-white w-5 h-5 cursor-pointer m-[0.5vh] sticky top-0"
                          onClick={closeDropdown3}
                        />
                      </div>
                    </Show>
                  </div>
                </div>

                <div class="flex mx-auto">
                  <button class="font-medium" onClick={() => {
                      toggleDropdown4();
                      closeDropdown();
                      closeDropdown2();
                      closeDropdown3();
                    }}>
                    <img src={condition} class="w-8 h-8" />
                    <h1 class="text-white text-sm">{selectedCondition()}</h1>
                  </button>
                  <div class="absolute mt-[8vh] -ml-[4vh] flex-wrap">
                    <Show when={isDropdownOpen4()}>
                      <div class="flex absolute backdrop-blur-sm bg-white/10 w-[11vh] rounded-md shadow-md overflow-scroll scroll z-20 my-1 border-white/10 border">
                        <div class="flex-col">
                          <button
                            class={`pt-1 px-2 text-white font-mabry-regular font-medium ${
                              selectedCondition() === "All" ? "font-bold" : ""
                            }`}
                            onClick={() => setSelectedCondition("All") && closeDropdown4()}
                          >
                            All
                          </button>
                          <button
                            class={`pt-1 px-2 text-white font-mabry-regular font-medium ${
                              selectedCondition() === "New" ? "font-bold" : ""
                            }`}
                            onClick={() => setSelectedCondition("New") && closeDropdown4()}
                          >
                            New
                          </button>
                          <button
                            class={`pt-1 px-2 text-white font-mabry-regular font-medium ${
                              selectedCondition() === "Used" ? "font-bold" : ""
                            }`}
                            onClick={() => setSelectedCondition("Used") && closeDropdown4()}
                          >
                            Used
                          </button>
                        </div>
                        <IoClose
                          class="text-white w-5 h-5 cursor-pointer m-[0.5vh] sticky top-0"
                          onClick={closeDropdown4}
                        />
                      </div>
                    </Show>
                  </div>
                </div>
              </div>
            </div>
            <h1 class="my-5 text-[3.5rem] font-bold font-mauline text-center text-emerald-600">Collections</h1>
            <div class="flex flex-wrap justify-center gap-y-2">
              {currentCards()
                .filter(
                  (model) =>
                    (selectedTransmission() === "Any" ||
                      (model as any).transmission === selectedTransmission()) &&
                    (selectedFuel() === "Any" ||
                      (model as any).fuelType === selectedFuel()) &&
                    (selectedSeats() === 2 ||
                      (model as any).seatNumbers === selectedSeats()) &&
                    (selectedCondition() === "All" ||
                      (model as any).condition === selectedCondition())
                )
                .map((model) => (
                  <Card model={model} />
                ))}
            </div>
            <div class="flex justify-center transition duration-500 mx-auto w-full">
              <button
                class="mx-2 min-w-[30px] min-h-[30px] rounded-full font-medium transition duration-500 mt-7 bg-green-900"
                disabled={currentPage() === 1}
                onClick={handlePreviousPage}
              >
                &lt;
              </button>
              {getPageNumbers().map((page) => (
                <button
                  class={`mx-2 min-w-[30px] min-h-[30px] rounded-full font-medium transition duration-500 mt-7 ${
                    currentPage() === page
                      ? "bg-emerald-900 text-white"
                      : "bg-yellow-50/20"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                class="mx-2 min-w-[30px] min-h-[30px] rounded-full font-medium transition duration-500 mt-7 bg-green-900"
                disabled={currentPage() === totalPages()}
                onClick={handleNextPage}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Collections;
