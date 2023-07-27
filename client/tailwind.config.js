/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2B7EFB",
        body: "#212529",
        secondary: "#6C757D",
      },
    },
  },
  plugins: [],
};
