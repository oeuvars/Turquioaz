import { createSignal, createEffect, Component, createComputed } from "solid-js";
import jwtDecode from "jwt-decode";
import toast, { Toaster } from "solid-toast";
import { useNavigate } from "@solidjs/router";
import axios from "axios";

const VerifyToRegister: Component = () => {
  const [otp, setOtp] = createSignal<string[]>(["", "", "", ""]);
  const [oneTimePass, setOneTimePass] = createSignal<number>();
  const [loading, setLoading] = createSignal(false);
  const [email, setEmail] = createSignal<string>("");
  const navigate = useNavigate();

  const handleOtpChange = ( e: any, index: number ) => {
   const newOtp = [...otp()];
   newOtp[index] = e.target.value;
   if (e.target.value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
   }
   setOtp(newOtp);
   setOneTimePass(Number(otp().join("")))
 };

  createEffect(() => {
    const token = localStorage.getItem("signupToken")
    if (token) {
      const result = jwtDecode(token) as { email: string };
      setEmail(result.email)
    } else {
      navigate('/user/signup')
    }
  })
  const handleClick = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("otps", oneTimePass())
      const result = await axios.post('http://localhost:4000/user/verify', {email: email(), oneTimePass: oneTimePass()})
      console.log(result)
       if (result) {
         navigate('/user/collections')
         toast.success("You are Verified!", {
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
       } else {
         console.error('Verification failed');
         toast.error("Please put the correct OTP.", {
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
       }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col justify-between min-h-screen w-[60%] mx-auto mt-[7vw]">
      <div class="">
        <div class="flex flex-col phone:gap-2 lg:gap-3">
          <h1 class="text-5xl font-dynalight text-[#80796B]">Hey,</h1>
          <h1 class="font-gambarino text-[#1E1B13] text-5xl">
            Please verify your email.
          </h1>
        </div>

        <div class="flex justify-center space-x-3 mt-10">
          {otp().map((digit: string, index: number) => (
            <input
              type="text"
              id={`otp-input-${index}`}
              class="w-16 h-16 text-center bg-[#FFFAF1] border-2 border-[#F1E9DF] text-[#1E1B13] outline-none font-satoshi-medium lower-card-shadow rounded-lg text-xl"
              value={digit}
              maxLength={1}
              onChange={(e) => handleOtpChange(e, index)}
            />
          ))}
        </div>
        <Toaster/>
        <button
          onClick={handleClick}
          class={`flex bg-[#F99052] text-white px-6 py-2 rounded-lg border-2 font-satoshi-medium text-lg border-[#F1E9DF] hover:lower-card-shadow mt-10 w-[50%] mx-auto justify-center ${
            loading() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading()}
        >
          <p class="text-center">{loading() ? "Verifying..." : "Verify"}</p>
        </button>
      </div>
    </div>
  );
};

export default VerifyToRegister;
