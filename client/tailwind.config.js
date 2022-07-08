module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "735px",
      // => @media (min-width: 768px) { ... }

      lg: "820px",
      // => @media (min-width: 1024px) { ... }

      xl: "1000px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
