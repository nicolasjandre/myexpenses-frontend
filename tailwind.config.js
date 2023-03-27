/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      screens: {
        minMd: { min: "801px " },

        xl: { max: "1279px" },

        lg: { max: "1023px" },

        md: { max: "800px" },

        sm: { max: "639px" },

        "2sm": { max: "480px" },

        "3sm": { max: "360px" },
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
      colors: {
        glass: {
          50: "rgba(32, 32, 32, 0.3)",
          100: "rgba(18, 18, 18, 0.55)",
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(90, 90, 90, 0.5)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
      boxShadow: {
        glass: "0 8px 24px 0 rgba(14, 14, 14, 0.6)",
      },
    },
  },
  plugins: [],
};