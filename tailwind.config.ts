import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primarygreen: "#132A13",
      secondarygreen: "#6A994E",

      white: "#FFFFFF",
      gray1: "#E4E6EB",
      gray2: "#B0B3B8",
      gray3: "#3A3B3C",
      gray4: "#323335",

      darkgray: "#3A3F47",
      textblack: "#181818",

      background: "#18191A",
      backgroundlight: "#242526",
      
      black: "#000000",
    },
  },
  plugins: [],
}
export default config
