/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  presets: [],
  corePlugins: {
    preflight: false,
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../packages/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{html,js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    borderRadius: {
      none: '0PX',
      sm: '2PX',
      DEFAULT: '4PX',
      md: '6PX',
      lg: '8PX',
      xl: '12PX',
      '2xl': '16PX',
      '3xl': '24PX',
      full: '9999PX',
    },
    fontSize: {
      xs: ['12PX', { lineHeight: '16PX' }],
      sm: ['14PX', { lineHeight: '20PX' }],
      base: ['16PX', { lineHeight: '24PX' }],
      lg: ['18.PX', { lineHeight: '28PX' }],
      xl: ['20PX', { lineHeight: '28PX' }],
      '2xl': ['24PX', { lineHeight: '32PX' }],
      '3xl': ['30PX', { lineHeight: '36PX' }],
      '4xl': ['36PX', { lineHeight: '40PX' }],
      '5xl': ['48x', { lineHeight: '1' }],
      '6xl': ['60PX', { lineHeight: '1' }],
      '7xl': ['72PX', { lineHeight: '1' }],
      '8xl': ['96PX', { lineHeight: '1' }],
      '9xl': ['128PX', { lineHeight: '1' }],
    },
    spacing: {
      px: '1PX',
      0: '0',
      0.5: '2PX',
      1: '4PX',
      1.5: '6PX',
      2: '8PX',
      2.5: '10PX',
      3: '12PX',
      3.5: '14PX',
      4: '16PX',
      5: '20PX',
      6: '24PX',
      7: '28PX',
      8: '32PX',
      9: '36PX',
      10: '40PX',
      11: '44PX',
      12: '48PX',
      14: '56PX',
      16: '64PX',
      20: '80PX',
      24: '96PX',
      28: '112PX',
      32: '128PX',
      36: '144PX',
      40: '160PX',
      44: '176PX',
      48: '192PX',
      52: '208PX',
      56: '224PX',
      60: '240PX',
      64: '256PX',
      72: '288PX',
      80: '320PX',
      96: '384PX',
    },
    extend: {
      lineHeight: {
        3: '12PX',
        4: '16PX',
        5: '20PX',
        6: '24PX',
        7: '28PX',
        8: '32PX',
        9: '36PX',
        10: '40PX',
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary-hsl) / <alpha-value>)',
          200: 'hsl(var(--primary-hue) var(--primary-s) 80% / <alpha-value>)',
          300: 'hsl(var(--primary-hue) var(--primary-s) 70% / <alpha-value>)',
          400: 'hsl(var(--primary-hue) var(--primary-s) 60% / <alpha-value>)',
          500: 'hsl(var(--primary-hue) var(--primary-s) 50% / <alpha-value>)',
          600: 'hsl(var(--primary-hue) var(--primary-s) 40% / <alpha-value>)',
          700: 'hsl(var(--primary-hue) var(--primary-s) 30% / <alpha-value>)',
          800: 'hsl(var(--primary-hue) var(--primary-s) 20% / <alpha-value>)',
          900: 'hsl(var(--primary-hue) var(--primary-s) 15% / <alpha-value>)',
        },
        bg: {
          DEFAULT: 'hsl(var(--bg-default) / <alpha-value>)',
          soft: 'hsl(var(--bg-soft) / <alpha-value>)',
          mute: 'hsl(var(--bg-mute) / <alpha-value>)',
          deep: 'hsl(var(--bg-deep) / <alpha-value>)',
        },
        text: {
          DEFAULT: 'hsl(var(--text-default) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'hsl(var(--border-default) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
}
