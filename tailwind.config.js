/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#12A8C5",
          50: "#E6F9FC",
          100: "#CCF3F9",
          200: "#99E7F3",
          300: "#66DBED",
          400: "#33CFE7",
          500: "#12A8C5",
          600: "#0E8BA1",
          700: "#0A6E7D",
          800: "#075159",
          900: "#033435",
        },
      },
    },
  },
  plugins: [],
};
