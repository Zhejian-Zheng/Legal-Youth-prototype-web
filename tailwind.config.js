module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1976d2',
          light: '#63a4ff',
          dark: '#004ba0',
        },
        accent: {
          DEFAULT: '#dc004e',
          light: '#ff5c8d',
          dark: '#9a0036',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

