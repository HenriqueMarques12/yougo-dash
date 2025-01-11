import flowbite from "flowbite-react/tailwind";
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/service/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        'hogfish': ['Hogfish']
      },
      container: {
        center: true,
        padding:"15px"
      },
      colors: {
        accent: "#F3C82E",
        secondary: "#5E0065",
        fontDark: "#000",
        fontLight: "#fff",
        success: "#4BB543",
        warning: "#eed202",
        error: "#FF9494"
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}
export default config
