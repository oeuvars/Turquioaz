/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        suntage: ["Suntage", "serif"],
        helvetica: ["Helvetica", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        chloe: ["Chloe", "serif"],
        draper: ["Draper", "serif"],
        quiny: ["Quiny", "serif"],
        mauline: ["Mauline", "sans-serif"],
        mabry: ["Mabry", "serif"],
        loubag: ["Loubag", "serif"],
        "mabry-regular": ["Mabry-Regular", "sans-serif"],
        "mabry-light": ["Mabry-Light", "sans-serif"]
      },
    },
    screens: {
      phone: "360px",
      xs: "480px",
      sm: "768px",
      tablet: "914px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
