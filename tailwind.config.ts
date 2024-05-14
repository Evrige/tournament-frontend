import type { Config } from "tailwindcss";
const twColors = require('tailwindcss/colors')

const colors = {
  primary: "#b6ff40",
  textColor: "#8899b5",
  accentText: "#e6e7ea",
  bgPrimary: "#101F3C",
  bgSecondary: "#081325",
  shadowColor: "#81e2fc"
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    colors,
    container: {
      center: true
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
