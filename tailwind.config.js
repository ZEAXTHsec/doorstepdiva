/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        petal:       '#FDF0F0',
        'petal-dark':'#F5E0E0',
        rose:        '#8B3A52',
        'rose-light':'#C4768A',
        mauve:       '#B07080',
        blush:       '#EFCCD4',
        stone:       '#3D2B2B',
        'stone-light':'#7A5C5C',
        gold:        '#C8974A',
        cream:       '#FBF7F4',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        poppins:  ['var(--font-poppins)',  'sans-serif'],
      },
    },
  },
  plugins: [],
}
