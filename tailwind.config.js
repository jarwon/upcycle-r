const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["'Inter', sans-serif"],
        spline: ["'Spline Sans Mono', monospace"],
        playfairDisplay: ["'Playfair Display', serif"],
      },
      colors: {
        beige: {
          400: "#dcc9b680",
          900: "#dcc9b6",
        },
        green: {
          50: "#e3eae2",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
