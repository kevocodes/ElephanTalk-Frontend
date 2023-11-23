/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'light-login': "url('/src/assets/login/login-light-background.webp')",
        'dark-login': "url('/src/assets/login/login-dark-background.webp')",

      }
    },
    minHeight: {
      '1/4': '20%',
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      oswald: ["Oswald", "sans-serif"],
    },
    screens: {
      xs: "425px",
      ...defaultTheme.screens,
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#11181C",
            primary: {
              50: "#effbfc",
              100: "#d6f4f7",
              200: "#b2eaef",
              300: "#7dd8e3",
              400: "#33b9cb",
              500: "#25a2b5",
              600: "#228398",
              700: "#226a7c",
              800: "#235767",
              900: "#224a57",
              950: "#11303b",
              DEFAULT: "#25a2b5",
              foreground: "#ffffff",
            },
            focus: "#228398",
          },
        },
        dark: {
          colors: {
            background: "#111111",
            foreground: "#ECEDEE",
            primary: {
              50: "#effbfc",
              100: "#d6f4f7",
              200: "#b2eaef",
              300: "#7dd8e3",
              400: "#33b9cb",
              500: "#25a2b5",
              600: "#228398",
              700: "#226a7c",
              800: "#235767",
              900: "#224a57",
              950: "#11303b",
              DEFAULT: "#25a2b5",
              foreground: "#ECEDEE",
            },
            focus: "#228398",
          },
        },
      },
    }),
  ],
};
