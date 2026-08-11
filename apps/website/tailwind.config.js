/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "Arial", "sans-serif"],
        display: ["Manrope", "Arial", "sans-serif"],
      },

      colors: {
        safari: {
          black: "#080808",
          ink: "#111111",
          white: "#ffffff",

          green: {
            DEFAULT: "#087A46",
            dark: "#045E35",
            light: "#DFF3E8",
          },

          cream: "#F3F0E8",
          stone: "#E5E2DA",
          muted: "#74746E",
        },
      },
    },
  },

  plugins: [],
};