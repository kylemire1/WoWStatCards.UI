/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'light-image': "url('/images/light-bg.jpg')",
      },
      width: {
        'render-wrapper': '265%',
      },
      maxWidth: {
        auto: 'auto',
      },
      tanslate: {
        'render-wrapper': '-30%',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
