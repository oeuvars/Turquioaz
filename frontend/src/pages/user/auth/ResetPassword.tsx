import { A, useNavigate, useParams } from "@solidjs/router";
import axios from "axios";
import { FiEye, FiEyeOff } from "solid-icons/fi";
import { createSignal } from "solid-js";
import toast from "solid-toast";

function ConfirmPasswordPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [passwordMatch, setPasswordMatch] = createSignal(true);
  const [showPassword, setShowPassword] = createSignal(false);
  const [inputError, setInputError] = createSignal(false);
  const { id, token } = useParams<{ id: string; token: string }>();

  function handlePasswordChange(event: Event) {
    setPassword((event.target as HTMLInputElement).value);
    setPasswordMatch((event.target as HTMLInputElement).value === confirmPassword());
  }

  function handleConfirmPasswordChange(event: Event) {
    setConfirmPassword((event.target as HTMLInputElement).value);
    setPasswordMatch((event.target as HTMLInputElement).value === password());
  }

  const handleClick = async () => {
    if (password() === "" || confirmPassword() === "") {
      setInputError(true);
      return;
    }
    if (password() === confirmPassword()) {
      setIsSubmitting(true);
      try {
        await axios.post(`http://localhost:4000/user/resetPassword/${id}/${token}`, {
          password: password(),
          confirmPassword: confirmPassword(),
        });
        toast.success("Password updated successfully", {
          style: {
            border: "2px solid rgba(255, 255, 255, 0.1)",
            padding: "10px",
            color: "#fff",
            "background-color": "rgba(0, 0, 0, 0.1)",
            "backdrop-filter": "blur(10px)",
            "font-size": "1.1em",
            "min-width": "10em",
          },
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },
        });
        setIsSubmitting(false);
        navigate('/user/password-updated');
      } catch (error) {
        toast.error("Internal error", {
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
        setIsSubmitting(false);
      }
    } else {
      toast.error("Passwords do not match.", {
        style: {
          border: "2px solid rgba(255, 255, 255, 0.1)",
          padding: "10px",
          color: "#fff",
          "background-color": "rgba(0, 0, 0, 0.1)",
          "backdrop-filter": "blur(10px)",
          "font-size": "1.1em",
          "min-width": "10em",
        },
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      });
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword());
  };

  return (
    <div class="phone:w-[90%] sm:w-[80%] target:w-[70%] md:w-[60%] lg:w-[50%] mx-auto mt-[7vw]">
      <h1 class="text-center phone:text-3xl tablet:text-4xl lg:text-5xl">Reset Your Password</h1>
      <div class="flex flex-col gap-[1vw]">
        <div class="phone:mt-[3vh] tablet:mt-[4vw] lg:mt-[3vw]">
          <h1>Enter Your Password: </h1>
          <div class="flex">
            <input
              type={showPassword() ? "text" : "password"}
              id="password"
              name="password"
              class={`w-full px-4 py-2 border-2 border-white/20 rounded-md focus:outline-none bg-white/10 focus:border-white/10 transition duration-500 text-white/70 text-lg font-medium ${
                inputError() && password() === "" ? 'border-red-600' : ''
              }`}
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
              class={`w-full px-4 py-2 border-2 border-white/20 rounded-md focus:outline-none bg-white/10 focus:border-white/10 transition duration-500 text-white/70 text-lg font-medium ${
                inputError() && confirmPassword() === "" ? 'border-red-600' : ''
              }`}
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
        {inputError() && <p class="text-red-600">Please enter a password.</p>}
        {!passwordMatch() && <p class="text-red-600">Passwords do not match.</p>}
        <button
          class={`w-[20%] py-2 rounded-md font-medium mx-auto ${
            isSubmitting()
              ? 'bg-neutext-gray-700 font-medium/10 cursor-not-allowed border border-black/10'
              : 'bg-emerald-900 font-medium hover:bg-emerald-950 animation'
          }`}
          onClick={handleClick}
          disabled={isSubmitting()}
        >
          {isSubmitting() ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}

export default ConfirmPasswordPage;
