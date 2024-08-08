import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js",
    "./node_modules/@nextui-org/theme/dist/components/spinner.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "rgb(22 163 74)",
          600: "rgb(21 128 61)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, fit-content)",
      },
    },
  },
  plugins: [
    nextui(),
    function ({ addComponents }: PluginAPI) {
      addComponents({
        ".button": {
          "@apply h-[,45px] bg-primary-500 text-lg text-white py-2 px-4 rounded cursor-pointer text-nowrap":
            {},
        },
      });
    },
  ],
};
export default config;
