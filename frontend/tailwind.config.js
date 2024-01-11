/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "rubintek": ["Rubintek", "sans-serif"],
        "doran": ["Doran", "serif"],
        "satoshi-regular": ["Satoshi-Regular", "sans-serif"],
        "satoshi-medium": ["Satoshi-Medium", "sans-serif"],
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
