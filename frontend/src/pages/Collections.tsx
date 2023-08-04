import { Component, createSignal, createEffect, Show } from "solid-js";
import Card from "../components/Card";
import CarSpecifications from "../collections/CarSpecifications";
import linedivider from "../assets/images/line.svg";
import useMediaQuery from "../hooks/useMediaQuery";
import seats from "../assets/svgs/collections/person.svg";
import transmission from "../assets/svgs/collections/manual-transmission.png";
import fuel from "../assets/svgs/collections/gas-station.svg";
import condition from "../assets/svgs/collections/tools.svg";
import { IoClose } from "solid-icons/io";

const Collections: Component = () => {
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  const [currentPage, setCurrentPage] = createSignal(1);
  const [selectedTransmission, setSelectedTransmission] = createSignal("Any");
  const [selectedFuel, setSelectedFuel] = createSignal("Any");
  const [selectedSeats, setSelectedSeats] = createSignal(2);
  const [selectedCondition, setSelectedCondition] = createSignal("All");
  const cardsPerPage = 4;
  const totalCards = CarSpecifications.flatMap((brand) => brand.models).length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const [isDropdownOpen, setIsDropdownOpen] = createSignal(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = createSignal(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = createSignal(false);
  const [isDropdownOpen4, setIsDropdownOpen4] = createSignal(false);

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
    const startIndex = (currentPage() - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const currentCards = CarSpecifications.flatMap(
      (brand) => brand.models
    ).slice(startIndex, endIndex);
    setCurrentCards(currentCards);
  });
  createEffect(() => {
    const startIndex = (currentPage() - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    const filteredCars = CarSpecifications.flatMap((brand) =>
      brand.models.filter(
        (model) =>
          selectedTransmission() === "Any" ||
          model.transmission === selectedTransmission()
      )
    );
    const currentCards = filteredCars.slice(startIndex, endIndex);

    setCurrentCards(currentCards);
  });
  createEffect(() => {
    const startIndex = (currentPage() - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    const filteredCars = CarSpecifications.flatMap((brand) =>
      brand.models.filter(
        (model) => selectedFuel() === "Any" || model.fuelType === selectedFuel()
      )
    );
    const currentCards = filteredCars.slice(startIndex, endIndex);

    setCurrentCards(currentCards);
  });
  createEffect(() => {
    const startIndex = (currentPage() - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    const filteredCars = CarSpecifications.flatMap((brand) =>
      brand.models.filter(
        (model) =>
          selectedSeats() === 2 || model.seatNumbers === selectedSeats()
      )
    );
    const currentCards = filteredCars.slice(startIndex, endIndex);

    setCurrentCards(currentCards);
  });
  createEffect(() => {
    const startIndex = (currentPage() - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    const filteredCars = CarSpecifications.flatMap((brand) =>
      brand.models.filter(
        (model) =>
          selectedCondition() === "All" ||
          model.condition === selectedCondition()
      )
    );
    const currentCards = filteredCars.slice(startIndex, endIndex);

    setCurrentCards(currentCards);
  });
  createEffect(() => {
    const startIndex = (currentPage() - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    const filteredCars = CarSpecifications.flatMap((brand) =>
      brand.models.filter((model) => {
        const transmissionMatch =
          selectedTransmission() === "Any" ||
          model.transmission === selectedTransmission();
        const fuelMatch =
          selectedFuel() === "Any" || model.fuelType === selectedFuel();
        const seatsMatch =
          selectedSeats() === 2 || model.seatNumbers === selectedSeats();
        const conditionMatch =
          selectedCondition() === "All" ||
          model.condition === selectedCondition();
        return transmissionMatch && fuelMatch && seatsMatch && conditionMatch;
      })
    );

    const currentCards = filteredCars.slice(startIndex, endIndex);
    setCurrentCards(currentCards || []);
  });
  const resetFilters = () => {
    setSelectedTransmission("Any");
    setSelectedFuel("Any");
    setSelectedSeats(2);
    setSelectedCondition("All");
    setCurrentPage(1);
  };

  const [currentCards, setCurrentCards] = createSignal(
    CarSpecifications.flatMap((brand) => brand.models).slice(0, cardsPerPage)
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const getPageNumbers = () => {
    const pageRange = 2; // Number of page numbers to display on each side of the current page
    let start = Math.max(1, currentPage() - pageRange);
    let end = Math.min(totalPages, currentPage() + pageRange);

    if (currentPage() - start < pageRange) {
      end = Math.min(end + pageRange - (currentPage() - start), totalPages);
    }
    if (end - currentPage() < pageRange) {
      start = Math.max(start - (pageRange - (end - currentPage())), 1);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };
  return (
    <>
      {isAboveSmallScreens() ? (
        <div class="font-mabry-regular mb-7">
          <div class="mx-auto mt-16 flex w-11/12">
            <div class="w-80 bg-white/10 border border-white/10 rounded-xl py-10 px-5 shadow-lg">
              <div class="flex justify-between w-72 mx-auto">
                <h1 class="font-medium text-lg">Filters</h1>
                <div class="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 text-yellow-500 my-auto"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>

                  <button
                    onClick={resetFilters}
                    class="font-mabry font-medium text-yellow-500 text-lg"
                  >
                    Reset All
                  </button>
                </div>
              </div>

              <img src={linedivider} class="py-5" />

              <div class="w-72 mx-auto text-sm">
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

              <img src={linedivider} class="py-5" />

              <div class="max-w-[288px] mx-auto text-sm overflow-clip">
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

              <img src={linedivider} class="py-5" />

              <div class="w-72 mx-auto text-sm">
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

              <img src={linedivider} class="py-5" />

              <div class="w-72 mx-auto text-sm">
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
            <div class="flex flex-wrap justify-center gap-y-9">
              {currentCards()
                .filter(
                  (model) =>
                    (selectedTransmission() === "Any" ||
                      model.transmission === selectedTransmission()) &&
                    (selectedFuel() === "Any" ||
                      model.fuelType === selectedFuel()) &&
                    (selectedSeats() === 2 ||
                      model.seatNumbers === selectedSeats()) &&
                    (selectedCondition() === "All" ||
                      model.condition === selectedCondition())
                )
                .map((model) => (
                  <Card model={model} />
                ))}
            </div>
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
              disabled={currentPage() === totalPages}
              onClick={handleNextPage}
            >
              &gt;
            </button>
          </div>
        </div>
      ) : (
        <div class="font-mabry-regular mb-7 overflow-x-hidden">
          <div class="mx-auto mt-5 w-11/12">
            <div class="w-full bg-white/10 border border-white/10 rounded-xl py-3 my-5 shadow-lg mx-auto">
              <div class="flex justify-between">
                <div class="flex mx-auto">
                  <button class="font-medium" onClick={() => toggleDropdown()}>
                    <img src={transmission} class="w-6 h-6 mx-auto mt-1" />
                    <h1 class="text-white font-sm -mb-1">{selectedTransmission()}</h1>
                  </button>
                  <div class="gap-3 flex mt-3">
                    <Show when={isDropdownOpen()}>
                      <div class="flex absolute mt-[3.5rem] -ml-[3.3rem] bg-white/10 w-24 rounded-md shadow-md h-24 scroll z-20 my-1 border-white/10 border backdrop-blur-sm">
                        <div class="flex-col">
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
                          class="text-white w-6 h-6 cursor-pointer -ml-7 mt-1"
                          onClick={closeDropdown}
                        />
                      </div>
                    </Show>
                  </div>
                </div>

                <div class="flex mx-auto">
                  <button class="font-medium" onClick={toggleDropdown2}>
                    <img src={fuel} class="w-8 h-8 mx-auto" />
                    <h1 class="text-white text-sm">{selectedFuel()}</h1>
                  </button>
                  <div class="gap-3 flex mt-3 flex-wrap">
                    <Show when={isDropdownOpen2()}>
                      <div class="flex absolute mt-[3.5rem] -ml-[3.5rem] backdrop-blur-sm bg-white/10 w-24 rounded-md shadow-md h-24 overflow-scroll scroll z-20 my-1 border-white/10 border">
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
                          class="text-white w-6 h-6 cursor-pointer mt-1 -ml-7 sticky top-0"
                          onClick={closeDropdown2}
                        />
                      </div>
                    </Show>
                  </div>
                </div>

                <div class="flex mx-auto">
                  <button class="font-medium" onClick={toggleDropdown3}>
                    <img src={seats} class="w-8 h-8 mx-auto" />
                    <h1 class="text-white text-sm">{selectedSeats()}</h1>
                  </button>
                  <div class="gap-3 flex mt-3 flex-wrap">
                    <Show when={isDropdownOpen3()}>
                      <div class="flex absolute mt-[3.5rem] -ml-[3.5rem] backdrop-blur-sm bg-white/10 w-28 rounded-md shadow-md h-24 overflow-scroll scroll z-20 my-1 border-white/10 border">
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
                          class="text-white w-6 h-6 cursor-pointer mt-1 -ml-7 sticky top-0"
                          onClick={closeDropdown3}
                        />
                      </div>
                    </Show>
                  </div>
                </div>

                <div class="flex mx-auto">
                  <button class="font-medium" onClick={toggleDropdown4}>
                    <img src={condition} class="w-8 h-8" />
                    <h1 class="text-white text-sm">{selectedCondition()}</h1>
                  </button>
                  <div class="gap-3 flex mt-3 flex-wrap">
                    <Show when={isDropdownOpen4()}>
                      <div class="flex absolute mt-[3.5rem] -ml-[3.5rem] backdrop-blur-sm bg-white/10 w-20 rounded-md shadow-md h-24 overflow-scroll scroll z-20 my-1 border-white/10 border">
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
                          class="text-white w-6 h-6 cursor-pointer mt-1 -ml-7 sticky top-0"
                          onClick={closeDropdown4}
                        />
                      </div>
                    </Show>
                  </div>
                </div>
              </div>
            </div>
            <h1 class="font-mauline text-4xl text-emerald-600 font-semibold text-center mb-7 py-2">Collections</h1>
            <div class="flex flex-wrap justify-center gap-y-2">
              {currentCards()
                .filter(
                  (model) =>
                    (selectedTransmission() === "Any" ||
                      model.transmission === selectedTransmission()) &&
                    (selectedFuel() === "Any" ||
                      model.fuelType === selectedFuel()) &&
                    (selectedSeats() === 2 ||
                      model.seatNumbers === selectedSeats()) &&
                    (selectedCondition() === "All" ||
                      model.condition === selectedCondition())
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
                disabled={currentPage() === totalPages}
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
