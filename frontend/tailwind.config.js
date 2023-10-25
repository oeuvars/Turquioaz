/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "doran-regular": ["Doran-Regular", "serif"],
        "doran-medium": ["Doran-Medium", "serif"],
        "doran-bold": ["Doran-Bold", "serif"],
        "klimaks-regular": ["Klimaks-Regular", "serif"],
        "klimaks-bold": ["Klimaks-Bold", "serif"],
        "montserrat": ["Montserrat", "sans-serif"]
      },
    },
    screens: {
      phone: "360px",
      xs: "480px",
      s: "624px",
      sm: "768px",
      tablet: "914px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
