import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E6D6F2",
        secondary: "#F8E8EE",
        accent: "#7A5C9E",
        background: "#FFF9FB",
        textSoft: "#6F517D",
        borderSoft: "#DCCBE8",
        roseSoft: "#F4DDE7",
      },
      fontFamily: {
        heading: ["var(--font-playfair)"],
        body: ["var(--font-inter)"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(122, 92, 158, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;