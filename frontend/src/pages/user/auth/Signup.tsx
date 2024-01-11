import { Component, createEffect, createSignal } from 'solid-js';
import sideImg from "../../../assets/images/auth/signup.jpg"
import { A, useNavigate } from '@solidjs/router';
import { Toaster, toast } from 'solid-toast';
import axios from 'axios';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { FaSolidAngleLeft } from 'solid-icons/fa'
import { FiEye, FiEyeOff } from 'solid-icons/fi'

const Signup: Component = () => {
  const [user,setUser] = createSignal({
      email : "",
      password : "",
      name: ""
    })
    const [isLoggingIn, setIsLoggingIn] = createSignal<boolean>(false);
    const [showPassword, setShowPassword] = createSignal<boolean>(false);

    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword());
    }
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");

  createEffect(() => {
    console.log(user())
  })

  const handleClick = async (e: Event) => {
    e.preventDefault();
    console.log(user())
    try {
      setIsLoggingIn(true);
      const res = await axios.post('https://rent-ride.onrender.com/user/register', user())
      const token = res.data.token;
      localStorage.setItem('signupToken', token);
      navigate('/user/verify')
      toast.success("You are logged in!", {
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
     } catch (err) {
      console.log(err)
      toast.error("Please check your credentials", {
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
     } finally {
      setIsLoggingIn(false);
     }
  };

  return (
    <div class="min-h-screen grid lg:grid-cols-[1fr_2fr] landing-bg">
      {isAboveSmallScreens() ? (
        <A href="/" class='relative'>
          <FaSolidAngleLeft  class='absolute w-10 h-10 text-white hover:text-gray-700 font-medium transition duration-300 m-5'/>
          <img src={sideImg} alt='' class='max-h-screen'/>
        </A>
      ) : (
        <></>
      )}
      <div class="p-8 shadow-lg rounded-xl phone:w-[90%] lg:w-[50%] m-auto bg-white/10">
        <h1 class="text-4xl py-2 text-white mb-4 text-center">Sign Up</h1>
          <div class='mb-2'>
          <label class="block text-lg text-yellow-100 font-didact-gothic">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              class="font-didact-gothic w-full px-4 py-2 border-2 border-white/20 rounded-md focus:outline-none bg-white/10 focus:border-white/10 transition duration-500 text-white/70 text-lg font-medium"
              onChange={(e) => setUser({ ...user(), email: e.target.value })}
            />
          </div>
          <div class='mb-2'>
          <label class="font-didact-gothic block text-lg text-yellow-100 font-medium">Name</label>
            <input
              type="email"
              id="email"
              name="email"
              class="font-didact-gothic w-full px-4 py-2 border-2 border-white/20 rounded-md focus:outline-none bg-white/10 focus:border-white/10 transition duration-500 text-white/70 text-lg font-medium"
              onChange={(e) => setUser({ ...user(), name: e.target.value })}
            />
          </div>
          <label class="font-didact-gothic block text-lg text-yellow-100 font-medium">Password</label>
          <div class="flex">
            <input
              type={showPassword() ? 'text' : 'password'}
              id="password"
              name="password"
              class="font-didact-gothic w-full px-4 py-2 border-2 border-white/20 rounded-md focus:outline-none bg-white/10 focus:border-white/10 transition duration-500 text-white/70 text-lg font-medium"
              onChange={(e) => setUser({ ...user(), password: e.target.value })}
            />
            <button
                onClick={togglePasswordVisibility}
                class='text-white bg-transparent border-0 outline-none focus:outline-none cursor-pointer -ml-10 animation'
            >
                {showPassword() ? (<FiEyeOff class='w-6 h-6 text-neutral-300'/>) : (<FiEye class='w-6 h-6 text-neutral-300'/>)}
            </button>
          </div>
          <A href="/auth/reset-password" class='underline text-yellow-50/50 font-didact-gothic text-sm'>Forgot Your Password?</A>
          <Toaster
              position="top-center"
            />
          <button
            class={`w-full py-2 rounded-md text-xl font-medium mt-4 ${
               isLoggingIn()
                 ? 'bg-neutext-gray-700 font-medium/10 cursor-not-allowed border border-black/10'
                 : 'bg-emerald-800 text-yellow-100 font-medium hover:shadow-lg animation'
             }`}
             onClick={handleClick}
             disabled={isLoggingIn()}
          >
            {isLoggingIn() ? 'Signing Up...' : 'Sign Up'}
          </button>
        <A href="/user/login" class='underline text-gray-400 font-didact-gothic flex justify-center items-center mt-2 text-center'>Already have an account? Log In</A>
      </div>
    </div>
  );
};

export default Signup;
