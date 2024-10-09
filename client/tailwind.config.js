/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        base: ["AktivGrotesk", "sans-serif"],
        sfpro: ["SFpro", "sans-serif"],
      },
      colors: {
        yellow: "#FCD902",
        lightbg: "#EEEEEA",
        darkbg: "#2B2B2B",
      },
    },
  },
  plugins: [],
};
