import { useNavigate } from "@solidjs/router";
import axios from "axios";
import { Component, createSignal } from "solid-js";
import toast, { Toaster } from "solid-toast";
import DownFooter from "../../home/DownFooter";

const ForgotPassword: Component = () => {
   const [user,setUser] = createSignal({
      email : "",
    })
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const [isSubmitting, setIsSubmitting] = createSignal<boolean>(false);
    const navigate = useNavigate();
    const handleClick = async (e: Event) => {
      e.preventDefault();

      if (!emailRegex.test(user().email)) {
         toast.error("Please Enter a valid Email Address", {
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
        return;
      }

      try {
        setIsSubmitting(true);
        const res = await axios.post('https://rent-ride.onrender.com/user/forgotPassword', user());
        navigate('/user/please-verify');
        toast.success("Verification mail sent.", {
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
         toast.error("Something went wrong", {
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
        setIsSubmitting(false);
      }
    }

   return (
      <div class="min-h-screen flex flex-col justify-between my-5">
         <div class="phone:my-[10vh] tablet:my-[10vw] lg:my-[7vw] phone:w-[90%] tablet:w-[60%] lg:w-[40%] mx-auto grid gap-[2vw]">
            <p class="phone:text-3xl tablet:text-4xl lg:text-5xl text-center">Please Enter Your Email:</p>
            <input
               type="email"
               id="email"
               name="email"
               class="w-full px-4 py-2 border-2 border-white/20 rounded-md focus:outline-none bg-white/10 focus:border-white/10 transition duration-500 text-white/70 text-xl font-medium mt-5 font-didact-gothic"
               onChange={(e) => setUser({ ...user(), email: e.target.value })}
            />
            <Toaster
              position="top-center"
            />
            <button class={`phone:w-[60%] tablet:w-[40%] lg:w-[20%] py-2 rounded-md text-xl font-medium mt-4 mx-auto ${
               isSubmitting()
                  ? 'bg-neutext-gray-700 font-medium/10 cursor-not-allowed border border-black/10'
                  : 'bg-emerald-900 font-medium hover:shadow-lg animation'
               }`}
               onClick={handleClick}
               disabled={isSubmitting()}
            >
            {isSubmitting() ? 'Sending...' : 'Send'}
            </button>
         </div>
         <DownFooter />
      </div>
   )
}

export default ForgotPassword
