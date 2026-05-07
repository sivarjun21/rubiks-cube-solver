import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cube: {
          white: "#ffffff",
          red: "#d32f2f",
          green: "#2e7d32",
          blue: "#1976d2",
          yellow: "#fbc02d",
          orange: "#f57c00",
        },
      },
    },
  },
  plugins: [],
};

export default config;