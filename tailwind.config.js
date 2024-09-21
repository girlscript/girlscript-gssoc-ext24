module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      serif: ["Rubik", "ui-sans-serif"],
      sans: ["Fira Code", "monospace"],
    },
    extend: {
      colors: {
        primary_orange: {
          0: "#FF7A19",
        },
        darkmode_gray: {
          0: "#303030",
        },
        code_of_conduct:{
          0: "#464646",
          1: "#FF6900",
        },
        facebook:{
          0: "#1877F2",
        },
        linkedin:{
          0: "#00A0DC",
        },
        twitter:{
          0: "#1DA1F2",
        },
        youtube:{
          0: "#FF0000",
        },
        leaderboardbg:{
          0:"#FFECDE",
        }
      },
      screens: {
        "3xl": "1600px",
      },
      maxWidth: {
        '1': '29rem',
      }
    },
  },
  plugins: [],
};
