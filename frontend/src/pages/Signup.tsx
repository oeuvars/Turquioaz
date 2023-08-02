import { Component, createSignal } from 'solid-js';
import { JSX } from 'solid-js';
import line from "../assets/images/line.svg";
import { A, useNavigate } from '@solidjs/router';
import { supabase } from '../auth/supabaseClient';

interface FormData {
  email: string;
  password: string;
  name: string;
}

const Signup: Component = () => {
  const [formData, setFormData] = createSignal<FormData>({
    email: '',
    password: '',
    name: '',
  });

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp(
      {
        email: formData().email,
        password: formData().password,
        options: {
          data: {
            user_name: formData().name,
          }
        }
      }
    )
    if (data.user) {
      navigate("/")
    }
    else {
      navigate('/signUp')
    }
  };

  return (
    <div class='phone:w-11/12 lg:w-1/4 mx-auto bg-white/10 border border-white/10 py-10 px-5 mt-40 rounded-lg shadow-lg'>
      <h1 class='text-center font-mauline text-emerald-600 text-5xl'>Sign Up</h1>
      <img src={line} class='mt-7 mb-5'/>
      <form onSubmit={handleSubmit}>
        <div class='flex gap-5 w-full mb-3'>
            <label class='font-mabry-regular my-auto'>Email:</label>
            <input
              class='phone:w-3/5 lg:w-[70%] ml-auto rounded-md px-4 py-[8px] bg-white/20 outline-none text-white font-medium font-mabry-regular'
              type="email" name="email" value={formData().email} onInput={handleChange}
              required
            />
        </div>
        <div class='flex my-2 gap-5 mb-3'>
          <label class='font-mabry-regular my-auto'>Name:</label>
          <input
            class='phone:w-3/5 lg:w-[70%] ml-auto rounded-md px-4 py-[8px] bg-white/20 outline-none text-white font-medium font-mabry-regular'
            type="text" name="name" value={formData().name} onInput={handleChange}
            required
          />
        </div>
        <div class='flex my-2 gap-5'>
          <label class='font-mabry-regular my-auto'>Password:</label>
          <input
            class='phone:w-3/5 lg:w-[70%] ml-auto rounded-md px-4 py-[8px] bg-white/20 outline-none text-white font-medium font-mabry-regular'
            type="password" name="password" value={formData().password} onInput={handleChange}
            required
          />
        </div>
        <button type="submit" class='bg-yellow-200 hover:bg-yellow-300 transition duration-500 px-5 py-2 rounded-3xl text-emerald-800 font-bold font-mabry-regular mx-auto flex mt-7'>Sign Up</button>
        <p class='font-mabry-regular text-center text-sm mt-5 font-medium text-emerald-600'>Not Signed Up Yet? <span class='font-mabry underline cursor-pointer'><A href='/login'>Log In</A></span></p>
      </form>
    </div>
  );
}

export default Signup;
