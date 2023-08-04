import { A } from "@solidjs/router";
import { Component, Show, createEffect, createSignal } from "solid-js";
import "./underline.css";
import logo from "../assets/svgs/navbar/logo.svg";
import profileimage from "../assets/svgs/navbar/customer.png";
import Home from "../assets/svgs/navbar/home.svg";
import { supabase } from "../auth/supabaseClient";
import { User } from "@supabase/supabase-js";
import arrow from "../assets/svgs/navbar/upper-right-arrow.svg";
import logout from "../assets/svgs/navbar/logout.svg";
import cross from "../assets/svgs/navbar/cross.svg";
import { useNavigate } from "@solidjs/router";
import wish from "../assets/svgs/navbar/wish-list.png";
import useMediaQuery from "../hooks/useMediaQuery";

const Navbar: Component = () => {
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  const [name, setName] = createSignal<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = createSignal(false);
  const [profile, setProfile] = createSignal<any[]>([]);

  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen());
  };
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleClick = async (e: Event) => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      navigate("/login");
    }
  };
  createEffect(async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, id");
  }, []);

  return (
    <div class="flex lg:gap-52 justify-between py-4 bg-white/10 lg:px-16 phone:px-5 items-center mx-auto sticky top-0 z-40 backdrop-blur-md">
      <A href="/" class="flex phone:gap-2 lg:gap-3">
        <img src={Home} class="phone:w-7 phone:h-7 lg:w-12 lg:h-12 my-auto" />
        <img src={logo} class="lg:w-52 phone:w-32 phone:-mb-[3px] lg:-mb-[6px]" />
      </A>

      {isAboveSmallScreens() ? (
        <div class="flex gap-10 -ml-10 font-mabry-regular">
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
              <A href="/collections" class="text-lg">
                Car Collections
              </A>
              <hr class="style-two" />
            </div>
            <img src={arrow} class="h-7 w-7" />
          </div>
          <div class="flex gap-1">
            <div>
              <A href="/search" class="text-lg">
                Search
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
          <img src={profileimage} class="lg:w-11 lg:h-11 phone:w-7 phone:h-7" />
        </button>
        <A href="/wishlist">
          <img src={wish} class="lg:w-11 lg:h-11 phone:w-7 phone:h-7" />
        </A>
        <Show when={isDropdownOpen()}>
          <div class="flex justify-between absolute phone:-ml-20 lg:-ml-10 lg:mt-20 phone:mt-[3.3rem] bg-white/10 backdrop-blur-sm w-40 rounded-md shadow-md phone:h-12 lg:h-16 overflow-scroll scroll border-white/10 border">
            <div class="flex">
              <button
                onClick={handleClick}
                class="font-mabry-regular text-white p-2 z-40 cursor-pointer"
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
