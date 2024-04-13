/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "8xl": "6rem",
      "9xl": "8rem",
    },
    fontWeight: {
      thin: "100",
      hairline: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      "extra-bold": "800",
      black: "900",
    },
    colors: {
      ...colors,
      primary: {
        "blue-100": "#316395",
        "blue-200": "#1B5693",
        "blue-300": "#005D85",
        "blue-350": "#5076FF",
        "blue-380": "#297DD0",
        "blue-400": "#14203B",
        "blue-600": "#091749",
        "blue-900": "#050B22",
        "blue-transparent": "#050b2270",

        "gray-50": "#F0F6FF",
        "gray-80": "#EFF5FB",
        "gray-100": "#F3F7FA",
        "gray-120": "#EDEDED",
        "gray-150": "#D2DFE5",
        "gray-180": "#D6D6D6",
        "gray-200": "#5F6368",
        "gray-300": "#6B6B6B",
        "gray-400": "#FFFFFF38",
        "gray-500": "#878787",
        "gray-600": "#9A9A9A",
        "gray-700": "#202124",
        "gray-800": "#0D0D0D",
        danger: "rgb(153 27 27)",
        "danger-800": "#B80000",
        "danger-950": "#FF0000",
      },
    },

    textShadow: {
      err: "1px 0 1px rgb(153 27 27)",
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",

      mobile: "320px",
      tablet: "768px",
      laptop: "1024px",

      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
