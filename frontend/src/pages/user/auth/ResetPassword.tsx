import { useNavigate, useParams } from "@solidjs/router";
import axios from "axios";
import { FiEye, FiEyeOff } from "solid-icons/fi";
import { createSignal } from "solid-js";
import toast from "solid-toast";

function ConfirmPasswordPage() {
   const navigate = useNavigate();
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [passwordMatch, setPasswordMatch] = createSignal(true);
  const [showPassword, setShowPassword] = createSignal<boolean>(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword());
  };
  const { id, token } = useParams<{ id: string; token: string }>();

  function handlePasswordChange(event: Event) {
    setPassword((event.target as HTMLInputElement).value);
    setPasswordMatch((event.target as HTMLInputElement).value === confirmPassword());
  }

  function handleConfirmPasswordChange(event: Event) {
    setConfirmPassword((event.target as HTMLInputElement).value);
    setPasswordMatch((event.target as HTMLInputElement).value === password());
  }

  async function handleClick() {
    if (password() === confirmPassword()) {
      await axios.post(`https://rent-n-ride-ts-production.up.railway.app/user/resetPassword/${id}/${token}`, {
         password: password(),
         confirmPassword: confirmPassword(),
       });
        navigate('/user/please-verify');
        toast.success("Password updated successfully", {
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
      console.log("Passwords do not match.");
    }
  }

  return (
    <div class="w-[50%] mx-auto mt-[7vw]">
      <h1 class="text-center text-5xl">Reset Your Password</h1>
      <div class="flex flex-col gap-[1vw]">
        <div>
          <h1>Enter Your Password: </h1>
          <div class="flex">
            <input
              type={showPassword() ? "text" : "password"}
              id="password"
              name="password"
              class="w-full px-4 py-2 border-2 border-white/20 rounded-md focus:outline-none bg-white/10 focus:border-white/10 transition duration-500 text-white/70 text-lg font-medium"
              value={password()}
              onInput={handlePasswordChange}
            />
            <button
              onClick={togglePasswordVisibility}
              class="text-white bg-transparent border-0 outline-none focus:outline-none cursor-pointer -ml-10 animation"
            >
              {showPassword() ? (
                <FiEye class="w-6 h-6 text-neutral-300" />
              ) : (
                <FiEyeOff class="w-6 h-6 text-neutral-300" />
              )}
            </button>
          </div>
        </div>
        <div>
          <h1>Confirm Your Password: </h1>
          <div class="flex">
            <input
              type={showPassword() ? "text" : "password"}
              id="password"
              name="password"
              class="w-full px-4 py-2 border-2 border-white/20 rounded-md focus:outline-none bg-white/10 focus:border-white/10 transition duration-500 text-white/70 text-lg font-medium"
              value={confirmPassword()}
              onInput={handleConfirmPasswordChange}
            />
            <button
              onClick={togglePasswordVisibility}
              class="text-white bg-transparent border-0 outline-none focus:outline-none cursor-pointer -ml-10 animation"
            >
              {showPassword() ? (
                <FiEye class="w-6 h-6 text-neutral-300" />
              ) : (
                <FiEyeOff class="w-6 h-6 text-neutral-300" />
              )}
            </button>
          </div>
        </div>
        {!passwordMatch() && <p class="text-red-600">Passwords do not match.</p>}
        <button
          class="bg-emerald-700/40 px-5 py-2 rounded-md w-[20%] mx-auto"
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ConfirmPasswordPage;
