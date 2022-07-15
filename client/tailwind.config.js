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
    extend: {
      colors: {
        border: "#dbdbdb",
        background: "#fafafa",
        light: "#efefef",
      },
      zIndex: {
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        100: 100,
      },
    },
  },
  plugins: [],
};
