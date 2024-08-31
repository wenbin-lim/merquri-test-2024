/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6C40B5",
          dark: "#28114C"
        },
        input: {
          DEFAULT: "rgba(255, 255, 255, 0.2)",
          dark: "rgba(26, 26, 26, 0.5)"
        },
        "input-label": {
          DEFAULT: "rgba(0, 0, 0, 0.4)",
          dark: "rgba(255, 255, 255, 0.4)"
        }
      }
    },
  },
  plugins: [],
}

