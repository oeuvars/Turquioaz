import { Component, Show, createSignal } from "solid-js";
import "./underline.css";
import logo from "../../../assets/svgs/navbar/rentnridewhite.svg";
import { CgProfile } from 'solid-icons/cg'
import arrow from "../../../assets/svgs/navbar/upper-right-arrow.svg";
import logout from "../../../assets/svgs/navbar/logout.svg";
import cross from "../../../assets/svgs/navbar/cross.svg";
import { A, useNavigate } from "@solidjs/router";
import useMediaQuery from "../../../hooks/useMediaQuery";

const Navbar: Component = () => {
  const isAboveSmallScreens = useMediaQuery("(min-width: 914px)");
  const [isDropdownOpen, setIsDropdownOpen] = createSignal(false);

  const loginToken = localStorage.getItem("loginToken")
  const signupToken = localStorage.getItem("signupToken")

  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen());
  };
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleClick = async (e: Event) => {
    localStorage.removeItem("loginToken")
    navigate("/user/login")
  };

  return (
    <div class="flex justify-between phone:py-3 lg:py-4 bg-white/10 lg:px-16 md:px-12 tablet:px-10 sm:px-7 phone:px-5 items-center mx-auto sticky top-0 z-40 backdrop-blur-md">
      <A href="/" class="flex phone:gap-2 lg:gap-3">
        <img src={logo} class="lg:w-52 md:w-48 tablet:w-44 phone:w-40" />
      </A>

      {isAboveSmallScreens() ? (
        <div class="flex gap-10">
          <div class="flex gap-1">
            <div>
              <A href="/info" class="text-lg">
                About
              </A>
              <hr class="style-two" />
            </div>
            <img src={arrow} class="h-7 w-7" />
          </div>
          <div class="flex gap-1">
            <div>
              <A href="/user/collections" class="text-lg">
                Car Collections
              </A>
              <hr class="style-two" />
            </div>
            <img src={arrow} class="h-7 w-7" />
          </div>
          <div class="flex gap-1">
            <div>
              <A href="/user/wishlist" class="text-lg">
                Wishlist
              </A>
              <hr class="style-two" />
            </div>
            <img src={arrow} class="h-7 w-7" />
          </div>
        </div>
      ) : (
        <></>
      )}

      <div class="flex gap-5">
        <button onClick={toggleDropdown}>
          <CgProfile class="w-9 h-9 my-auto hover:text-yellow-200 animation"/>
        </button>
        {loginToken || signupToken ? (
          <A href="/user/collections" class="rounded-md bg-emerald-800 phone:px-5 lg:px-7 py-2 font-medium phone:text-sm tablet:text-base lg:text-lg hover:bg-emerald-900 animation">
            Explore
          </A>
        ) : (
          <A href="/user/login" class="rounded-md bg-emerald-800 phone:px-5 lg:px-7 py-2 font-medium phone:text-sm tablet:text-base lg:text-lg hover:bg-emerald-900 animation">
            Log In
          </A>
        )}
        <Show when={isDropdownOpen()}>
          <div class="flex justify-between phone:mt-[10vh] tablet:mt-[5.5vw] lg:mt-[4.5vw] phone:gap-[2vh] tablet:gap-[0.7vh] lg:gap-[1vw] py-[0.3vw] absolute bg-white/10 backdrop-blur-xl rounded-md shadow-md overflow-scroll scroll border-white/10 border">
            <div class="flex">
              <button
                onClick={handleClick}
                class="font-mabry-regular text-white hover:text-gray-200 animation p-2 z-40 cursor-pointer"
              >
                Log Out
              </button>
              <button onClick={handleClick}>
                <img src={logout} class="w-7 h-7 my-auto" />
              </button>
            </div>
            <button onClick={closeDropdown}>
              <img src={cross} class="w-6 h-6 mr-2" />
            </button>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default Navbar;
