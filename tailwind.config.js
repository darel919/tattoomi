/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,vue,ts}", "./nuxt.config.{js,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        hero: "#FBBF13",
      },
      fontFamily: {
        sans: [
          "Roboto",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
        ],
        grift: ["Grift"],
      },
    },
  },
};
