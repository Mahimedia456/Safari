/** @type {import("tailwindcss").Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        safari: {
          50: "#eefbf4",
          100: "#d7f5e4",
          200: "#b2eacb",
          300: "#7bd9aa",
          400: "#41c584",
          500: "#18a960",
          600: "#0f8d4f",
          700: "#0d7042",
          800: "#0d5937",
          900: "#0b492f",
          950: "#05291b",
        },
      },

      boxShadow: {
        panel:
          "0 1px 2px rgba(15,23,42,0.03), 0 8px 28px rgba(15,23,42,0.05)",
      },
    },
  },

  plugins: [],
};