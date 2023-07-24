import { A } from "@solidjs/router";
import { Component, Show, createEffect, createSignal } from "solid-js";
import "./underline.css";
import logo from "../assets/svgs/logo.svg";
import cart from "../assets/svgs/add-to-cart.svg";
import profileimage from "../assets/svgs/profile-square.svg";
import { IoClose } from "solid-icons/io";
import { supabase } from "../auth/supabaseClient";
import { User } from "@supabase/supabase-js";
import arrow from "../assets/svgs/upper-right-arrow.svg";
import { useNavigate } from "@solidjs/router";
import wish from "../assets/svgs/wishlist.svg";

const Navbar: Component = () => {
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
      .select("full_name, id")
  }, []);

  return (
    <div class="flex gap-52 justify-center py-4 bg-white/10 px-5 items-center mx-auto sticky top-0 z-40 backdrop-blur-md">
      <A href="/">
        <img src={logo} class="w-52" />
      </A>

      <div class="flex gap-10 -ml-10 font-mabry-regular">
        <div class="flex gap-1">
          <div>
            <A href="/info" class="">
              About
            </A>
            <hr class="style-two" />
          </div>
          <img src={arrow} class="h-7 w-7" />
        </div>
        <div class="flex gap-1">
          <div>
            <A href="/collections" class="">
              Car Collections
            </A>
            <hr class="style-two" />
          </div>
          <img src={arrow} class="h-7 w-7" />
        </div>
        <div class="flex gap-1">
          <div>
            <A href="/search" class="">
              Search
            </A>
            <hr class="style-two" />
          </div>
          <img src={arrow} class="h-7 w-7" />
        </div>
      </div>

      <div class="flex gap-5">
        <button onClick={toggleDropdown}>
          <img src={profileimage} class="w-9 h-9" />
        </button>
        <A href="/wishlist">
          <img src={wish} class="w-10 h-10"/>
        </A>
        <Show when={isDropdownOpen()}>
          <div class="flex absolute mt-16 bg-white/10 backdrop-blur-sm w-32 rounded-md shadow-md h-10 overflow-scroll scroll z-20 border-white/10 border">
            <div class=" cursor-pointer">
              <button onClick={handleClick} class="font-mabry-regular text-white h-full my-auto p-2 z-40 cursor-pointer">
                Log Out
              </button>
            </div>
            <div class="flex pl-[100px] fixed z-10 mt-[7px]">
              <IoClose
                class="text-white w-6 h-6 cursor-pointer"
                onClick={closeDropdown}
              />
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default Navbar;
