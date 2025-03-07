import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import Navbar from "@/app/home/Navbar";
import Footer from "@/app/home/Footer";
import { showToast } from "@/helpers/showToats";

interface Result {
  success: boolean;
  message: string
}
interface Payload {
  email: string;
  exp: number;
  iat: number
}

const VerifyRegistation: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate()
  const otpBoxReference = useRef<(HTMLInputElement | null)[]>(new Array(3).fill(null));

  useEffect(() => {
    const cookie = Cookies.get("RegisterCookie");
    if (cookie) {
      const payload: Payload = jwtDecode(cookie);
      setEmail(payload.email)
    }
    else {
      navigate("/auth/register")
    }
  }, [])
  function handleChange(value: string, index: number) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < 3) {
      otpBoxReference.current[index + 1]!.focus();
    }
  }

  function handleBackspaceAndEnter(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      otpBoxReference.current[index - 1]!.focus();
    }
    if (e.key === "Enter" && e.currentTarget.value && index < 3) {
      otpBoxReference.current[index + 1]!.focus();
    }
  }

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const oneTimePass = otp.join("")
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/verify-registration`, {email, oneTimePass})
      const result: Result = response.data
       if (result.success === true) {
        navigate(-2);
       } else {
        showToast("Incorrect passcode", false)
       }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="phone:w-[90%] tablet:w-[60%] mx-auto phone:my-[7vh] tablet:my-[7vw]">
        <div className="flex flex-col">
          <h1 className="phone:text-3xl tablet:text-5xl gardient-text tracking-tight text-center">Hey,</h1>
          <h1 className="gradient-text phone:text-3xl tablet:text-5xl font-medium leading-relaxed text-center tracking-tight">
            Please verify your email.
          </h1>
        </div>
        <motion.div className="flex justify-center space-x-3 mt-7">
          {otp.map((digit, index) => (
            <input
              key={index}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
              ref={(reference) => (otpBoxReference.current[index] = reference)}
              className={`phone:w-16 phone:h-16 tablet:w-20 tablet:h-20 px-5 py-5 text-[#FAFAFA] rounded block bg-[#303030] appearance-none text-center text-lg`}
            />
          ))}
        </motion.div>
        <button
          onClick={handleClick}
          className={`flex bg-[#202020] text-[#FAFAFA] px-6 py-3 rounded text-lg mt-7 w-[50%] mx-auto justify-center ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          <p className="text-center text-[#FAFAFA]">{loading ? "Verifying..." : "Verify"}</p>
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyRegistation;
