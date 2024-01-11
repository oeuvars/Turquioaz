import { Component, createSignal, createEffect, Show } from "solid-js";
import { HiOutlineChevronDown } from "solid-icons/hi";
import { IoClose } from "solid-icons/io";
import brand from "../../../assets/svgs/search/brand.png";
import model from "../../../assets/svgs/search/car.svg";
import carBrands from "../collections/Brand";
import carModels from "../collections/CarModels";
import { useTopFilterContext } from "../../../utils/TopFilterContext";
import CarSpecifications from "../collections/CarSpecifications";
import Card from "../components/Card";
import useMediaQuery from "../../../hooks/useMediaQuery";
import axios from "axios";
import DownFooter from "../../home/DownFooter";

const Search: Component = () => {
  const [models, setModels] = createSignal([])

  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  const [isDropdownOpen, setIsDropdownOpen] = createSignal(false);
  const [openModelDropdown, setOpenModelDropdown] = createSignal(false);
  const [selectedBrandModels, setSelectedBrandModels] = createSignal<string[]>(
    []
  );
  const { selectedBrand, setSelectedBrand, selectedModel, setSelectedModel } = useTopFilterContext();

  createEffect(async () => {
    const loginToken = localStorage.getItem("loginToken");
    const signupToken = localStorage.getItem("signupToken");
    const res = await axios.get(
      "https://rent-ride.onrender.com/user/",
      {
        headers: {
          Authorization: `Bearer ${loginToken || signupToken}`,
        },
      }
    );
  setModels(res.data.models);
  console.log(models())
  })
  console.log(models())

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen());
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleModelDropdown = () => {
    setOpenModelDropdown(!openModelDropdown());
  };

  const closeModelDropdown = () => {
    setOpenModelDropdown(false);
  };


  const handleBrandSelection = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel("Any");
    setIsDropdownOpen(false);
  };

  const handleModelSelection = (model: string) => {
    setSelectedModel(model);
    setOpenModelDropdown(false);
  };

  createEffect(() => {
    const brandModels =
      carModels.find((carModel) => carModel.brand === selectedBrand())
        ?.models || [];
    setSelectedBrandModels(brandModels);
  });

  return (
    <>
      {isAboveSmallScreens() ? (
        <div class="w-[98%] mx-auto">
          <div class="flex justify-between mt-10">
            <div class="flex py-3 px-5 items-center rounded-lg gap-10 bg-white/10 border border-white/10 shadow-lg backdrop-blur-md mx-auto">
              <div class="flex gap-[3vw]">
                <div class="w-4/5 font-mabry-regular font-medium">
                  <p class="text-xs text-yellow-200/50">Car Brand</p>
                  <h1>{selectedBrand()}</h1>
                </div>
                <HiOutlineChevronDown
                  class="my-auto mx-auto text-white/50 w-7 h-7 cursor-pointer"
                  onClick={toggleDropdown}
                />
                <Show when={isDropdownOpen()}>
                  <div class="absolute flex mt-16 bg-white/10 rounded-md shadow-md h-[10vw] overflow-scroll scroll z-20 my-1 border-white/10 border backdrop-blur-md">
                    <div>
                       {carBrands.map((brand, index) => (
                        <div class="">
                          <button
                            class={`pt-[0.2vw] px-2 text-white text-lg font-mabry-regular font-medium ${
                              brand === selectedBrand() ? "font-bold" : ""
                            }`}
                            onClick={() => handleBrandSelection(brand)}
                          >
                            {brand}
                          </button>
                        </div>
                      ))}
                    </div>
                    <IoClose
                      class="text-white w-7 h-7 cursor-pointer m-2"
                      onClick={closeDropdown}
                    />
                  </div>
                </Show>
              </div>
              <div class="flex gap-[3vw]">
                <div class="w-4/5 font-mabry-regular text-sm font-medium">
                  <p class="text-xs text-yellow-200/50">Car Model</p>
                  <h1>{selectedModel()}</h1>
                </div>
                <HiOutlineChevronDown
                  class="my-auto mx-auto text-white/50 w-7 h-7 cursor-pointer"
                  onClick={toggleModelDropdown}
                />
                <Show when={openModelDropdown()}>
                  <div class="absolute mt-16 bg-white/10 border border-white/10 w-44 rounded-md shadow-md h-40 overflow-scroll scroll">
                    <div class="flex pl-[148px] fixed z-10 pt-[6px]">
                      <IoClose
                        class="text-black/50 w-6 h-6 cursor-pointer"
                        onClick={closeModelDropdown}
                      />
                    </div>
                    {selectedBrandModels().map((model, index) => (
                      <div>
                        <button
                          class={`pt-2 px-2 text-white font-mabry-regular font-medium ${
                            model === selectedModel() ? "font-bold" : ""
                          }`}
                          onClick={() => handleModelSelection(model)}
                        >
                          {model}
                        </button>
                      </div>
                    ))}
                  </div>
                </Show>
              </div>
            </div>
          </div>
          <div class="">
            <h2 class="my-5 text-[6rem] font-bold font-mauline text-center text-emerald-600">
              Results
            </h2>
            <div class="grid grid-cols-3 gap-y-7">
              {selectedBrand() && (
                <Show when={CarSpecifications.length > 0}>
                  {CarSpecifications.map((carSpecs) => {
                    if (carSpecs.brand === selectedBrand()) {
                      return carSpecs.models.map((model) => {
                        if (
                          selectedModel() === "Any" ||
                          model.name === selectedModel()
                        ) {
                          return (
                            <div class="">
                              <Card model={model} />
                            </div>
                          );
                        }
                        return null;
                      });
                    }
                    return null;
                  })}
                </Show>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div class="w-[98%] mx-auto">
          <div class="flex justify-between mt-7">
            <div class="flex py-3 px-5 items-center rounded-lg gap-5 bg-white/10 border border-white/10 shadow-lg backdrop-blur-md mx-auto">
              <div class="flex min-w-[80px]">
                <button class="flex-col mx-auto" onClick={toggleDropdown}>
                  <img src={brand} alt="" class="w-7 h-7 mx-auto" />
                  <h1 class="font-mabry-regular text-white text-sm">
                    {selectedBrand()}
                  </h1>
                </button>
                <Show when={isDropdownOpen()}>
                  <div class="flex absolute mt-[4.2rem] -ml-5 bg-white/10 w-32 rounded-md shadow-md h-28 overflow-scroll scroll z-20 my-1 border-white/10 border backdrop-blur-sm">
                    <div>
                      {carBrands.map((brand, index) => (
                        <div>
                          <button
                            class={`pt-1 px-2 text-white font-mabry-regular font-medium text-left ${
                              brand === selectedBrand() ? "font-bold" : ""
                            }`}
                            onClick={() => handleBrandSelection(brand)}
                          >
                            {brand}
                          </button>
                        </div>
                      ))}
                    </div>
                    <IoClose
                      class="text-white w-6 h-6 cursor-pointer -ml-7 sticky top-0"
                      onClick={closeDropdown}
                    />
                  </div>
                </Show>
              </div>
              <div class="flex min-w-[80px]">
                <button class="flex-col mx-auto" onClick={toggleModelDropdown}>
                  <img src={model} class="w-7 h-7 mx-auto" />
                  <h1 class="font-mabry-regular text-white text-sm">
                    {selectedModel()}
                  </h1>
                </button>
                <Show when={openModelDropdown()}>
                  <div class="flex absolute mt-[4.2rem] bg-white/10 border border-white/10 w-28 rounded-md shadow-md h-28 overflow-scroll scroll backdrop-blur-sm -ml-3">
                    <div>
                      {selectedBrandModels().map((model, index) => (
                        <div>
                          <button
                            class={`pt-2 px-2 text-white font-mabry-regular font-medium text-left ${
                              model === selectedModel() ? "font-bold" : ""
                            }`}
                            onClick={() => handleModelSelection(model)}
                          >
                            {model}
                          </button>
                        </div>
                      ))}
                    </div>
                    <IoClose
                      class="text-black/50 w-6 h-6 cursor-pointer sticky top-0"
                      onClick={closeModelDropdown}
                    />
                  </div>
                </Show>
              </div>
            </div>
          </div>
          <div class="">
            <h2 class="my-5 text-[3.5rem] font-bold font-mauline text-center text-emerald-600">
              Results
            </h2>
            <div class="flex flex-wrap justify-center gap-y-2">
              {selectedBrand() && (
                <Show when={CarSpecifications.length > 0}>
                  {CarSpecifications.map((carSpecs) => {
                    if (carSpecs.brand === selectedBrand()) {
                      return carSpecs.models.map((model) => {
                        if (
                          selectedModel() === "Any" ||
                          model.name === selectedModel()
                        ) {
                          return (
                            <div class="">
                              <Card model={model} />
                            </div>
                          );
                        }
                        return null;
                      });
                    }
                    return null;
                  })}
                </Show>
              )}
            </div>
          </div>
        </div>
      )}
      <DownFooter />
    </>
  );
};

export default Search;
