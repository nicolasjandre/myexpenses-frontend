/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/tailwind-datepicker-react/dist/**/*.js"],
  darkMode: 'class',
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
        // width
        minMdw: { min: "650px " },

        xxlw: { max: "1654px " },

        xlw: { max: "1279px" },

        lgw: { max: "1023px" },

        mdw: { max: "874px" },

        smw: { max: "650px" },

        "2smw": { max: "480px" },

        "3smw": { max: "360px" },

        //height
        xlh: { raw: "(max-height: 1279px)" },

        lgh: { raw: "(max-height: 1023px)" },

        mdh: { raw: "(max-height: 730px)" },

        smh: { raw: "(max-height: 639px)" },

        "2smh": { raw: "(max-height: 490px)" },

        "3smh": { raw: "(max-height: 360px)" },
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
        black_bg: {
          50: "#30314A",
          100: "#30313A",
          500: "#171821",
        },
        isActive: {
          50: "#4fdfd8",
          100: "#98dfd8",
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(90, 90, 90, 0.5)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 24px 0 rgba(14, 14, 14, 0.6)",
      },
    },
  },
  plugins: [],
};
