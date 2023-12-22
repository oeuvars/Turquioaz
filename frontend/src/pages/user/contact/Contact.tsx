import { Component, createSignal } from "solid-js";
import Navbar from "../components/Navbar";
import DownFooter from "../../home/DownFooter";

const Contact: Component = () => {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [message, setMessage] = createSignal("");

  const handleEmailClick = () => {
    const subject = `Message from ${name()}`;
    const body = `Email: ${email()}\n\nMessage: ${message()}`;
    const mailtoURL = `mailto:www.anuragniall@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoURL;
  };

  return (
    <>
      <Navbar />
      <div class="lg:w-2/3 phone:w-5/6 mx-auto">
        <h1 class="font-mabry lg:text-4xl phone:text-2xl phone:text-center lg:text-justify text-emerald-500 my-7 lg:w-1/2">
          Love to Know About Your Queries,

          Get In Touch👋
        </h1>

        <div class="flex w-full justify-between">
          <div class="flex flex-col phone:gap-7 lg:gap-10 my-auto bg-white/10 border border-white/10 px-5 py-5 rounded-lg lg:mt-0 phone:mt-10">
            <div class="gap-5 w-full">
              <label class="font-mabry-regular my-auto text-emerald-100">Your Name</label>
              <input
                class="w-full px-5 py-[15px] bg-white/20 outline-none rounded-lg text-white font-medium font-mabry-regular mt-2"
                type="text"
                value={name()}
                onInput={(e) => setName(e.target.value)}
              />
            </div>
            <div class="gap-5 w-full">
              <label class="font-mabry-regular my-auto text-emerald-100">Your Email</label>
              <input
                class="w-full px-5 py-[15px] bg-white/20 outline-none rounded-lg text-white font-medium font-mabry-regular mt-2"
                type="email"
                value={email()}
                onInput={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="gap-5 w-full">
              <label class="font-mabry-regular my-auto text-emerald-100">Your Message</label>
              <textarea
                class="w-full px-5 py-[15px] bg-white/20 outline-none rounded-lg text-white font-medium font-mabry-regular mt-2"
                value={message()}
                onInput={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <button
          class="bg-emerald-700 phone:px-5 lg:px-20 py-3 rounded-lg mt-16 mb-5 shadow-lg font-mabry-regular font-medium text-emerald-100 flex phone:mx-auto lg:mx-0"
          onClick={handleEmailClick}
        >
          Compose Email
        </button>
      </div>
      <DownFooter />
    </>
  );
};

export default Contact;
