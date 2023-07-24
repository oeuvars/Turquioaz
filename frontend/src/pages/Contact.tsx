import { Component, createSignal } from "solid-js";

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
    <div class="w-2/3 mx-auto">
      <h1 class="font-mauline text-5xl text-emerald-500 text-left my-16">
        Love to Know About Your Queries,
        <br />
        Get In Touch👋
      </h1>

      <div class="flex w-full justify-between">
        <div class="flex flex-col gap-20 my-auto">
          <div class="gap-5 w-full">
            <label class="font-montserrat font-semibold my-auto uppercase text-emerald-100">Your Name</label>
            <input
              class="w-full px-5 py-[15px] bg-white/20 outline-none rounded-lg text-white font-medium font-montserrat mt-2"
              type="text"
              value={name()}
              onInput={(e) => setName(e.target.value)}
            />
          </div>
          <div class="gap-5 w-full">
            <label class="font-montserrat font-semibold my-auto uppercase text-emerald-100">Your Email</label>
            <input
              class="w-full px-5 py-[15px] bg-white/20 outline-none rounded-lg text-white font-medium font-montserrat mt-2"
              type="email"
              value={email()}
              onInput={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="gap-5 w-full">
            <label class="font-montserrat font-semibold my-auto text-emerald-100">Your Message</label>
            <textarea
              class="w-full px-5 py-[15px] bg-white/20 outline-none rounded-lg text-white font-medium font-montserrat mt-2"
              value={message()}
              onInput={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
        </div>
        <p class="font-mauline text-[10rem] text-center my-auto ciao">CIAO!</p>
      </div>
      <button
        class="bg-emerald-700 px-5 py-3 rounded-sm mt-16 mb-5 shadow-lg font-montserrat font-medium text-emerald-100"
        onClick={handleEmailClick}
      >
        Compose Email
      </button>
    </div>
  );
};

export default Contact;
