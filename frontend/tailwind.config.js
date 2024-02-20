module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Red Rose"', 'sans-serif'],
      },
      colors: {
        'dark-blue': '#000',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'form-bg': 'rgba(255, 255, 255, 0.5)', // Slightly transparent form background
      }),
    },
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  // Rest of the config...
};
