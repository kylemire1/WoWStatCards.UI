/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
