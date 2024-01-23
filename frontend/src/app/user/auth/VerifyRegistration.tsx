import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import Navbar from "@/app/home/Navbar";
import Footer from "@/app/home/Footer";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";

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
  const { toast } = useToast()

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const oneTimePass = otp.join("")
    try {
      const response = await axios.post("http://localhost:4000/user/verify-registration", {email, oneTimePass})
      const result: Result = response.data
       if (result.success === true) {
        navigate(-2);
       } else {
         toast({
          title: "Hi",
          description: result.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
       }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-[60%] mx-auto my-[7vw]">
        <div className="flex flex-col">
          <h1 className="text-5xl gardient-text tracking-tight text-center">Hey,</h1>
          <h1 className="gradient-text text-5xl font-medium leading-relaxed text-center tracking-tight">
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
              className={`w-20 px-5 py-5 text-[#FAFAFA] rounded block bg-[#333333] appearance-none text-center text-lg`}
            />
          ))}
        </motion.div>
        <Toaster />
        <button
          onClick={handleClick}
          className={`flex bg-[#333333] text-[#FAFAFA] px-6 py-3 rounded-lg text-lg mt-7 w-[50%] mx-auto justify-center ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          <p className="text-center text-[#FAFAFA]">{loading ? "Verifying..." : "Verify"}</p>
        </button>
      </div>
      <Footer />
    </>
  );
};

export default VerifyRegistation;
