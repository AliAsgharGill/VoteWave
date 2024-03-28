/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: {
          800: "#39BCBD",
          900: "#2D9596",
        },
        secondaryColor: {
          800: "#222831",
          900: "#31363F",
        },
        alphaColor: {
          900: "#9AD0C2",
        },
        betaColor: {
          900: "#F1FADA",
        },
      },
    },
  },
  plugins: [],
};
