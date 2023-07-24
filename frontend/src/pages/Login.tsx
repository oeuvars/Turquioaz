import { Component, createEffect, createSignal, JSX } from "solid-js";
import line from "../assets/images/line.svg";
import { A, useNavigate } from "@solidjs/router";
import { supabase } from "../auth/supabaseClient";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = createSignal<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData().email,
      password: formData().password,
    });
    if (!data.session?.user) {
      return alert("Wrong Password");
    } else {
      navigate("/");
    }
  };

  return (
    <div class="w-1/4 mx-auto bg-white/10 border border-white/10 py-10 px-5 mt-40 rounded-lg shadow-lg filter backdrop-blur-sm">
      <h1 class="text-center font-loubag text-emerald-600 text-5xl">Login</h1>
      <img src={line} class="mt-7 mb-5" />
      <form>
        <div class="flex gap-5 w-full mb-5">
          <label class="font-mabry-regular my-auto">Email:</label>
          <input
            class="w-[70%] ml-auto rounded-md px-4 py-[8px] bg-white/20 outline-none text-white font-medium font-mabry-regular"
            type="email"
            name="email"
            value={formData().email}
            onInput={handleChange}
            required
          />
        </div>
        <div class="flex my-2 gap-5">
          <label class="font-mabry-regular my-auto">Password:</label>
          <input
            class="w-[70%] ml-auto rounded-md px-4 py-[8px] bg-white/20 outline-none text-white font-medium font-mabry-regular"
            type="password"
            name="password"
            value={formData().password}
            onInput={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          class="bg-yellow-200 hover:bg-yellow-300 transition duration-500 px-5 py-2 rounded-3xl text-emerald-800 font-bold font-mabry-regular mx-auto flex mt-7"
          onClick={handleSubmit}
        >
          LogIn
        </button>
        <div class="flex gap-3 justify-center">
          <p class="font-mabry-regular text-center mt-5 font-medium text-emerald-600">
            Not Signed Up Yet?{" "}
          </p>
          <span class="underline cursor-pointer font-mabry text-emerald-700 mt-auto">
            <A href="/signup">Sign Up</A>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
