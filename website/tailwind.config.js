/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../packages/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    borderRadius: {
      none: '0px',
      sm: '2px',
      DEFAULT: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px',
      '2xl': '16px',
      '3xl': '24px',
      full: '9999px',
    },
    fontSize: {
      xs: ['12px', { lineHeight: '16px' }],
      sm: ['14px', { lineHeight: '20px' }],
      base: ['16px', { lineHeight: '24px' }],
      lg: ['18.px', { lineHeight: '28px' }],
      xl: ['20px', { lineHeight: '28px' }],
      '2xl': ['24px', { lineHeight: '32px' }],
      '3xl': ['30px', { lineHeight: '36px' }],
      '4xl': ['36px', { lineHeight: '40px' }],
      '5xl': ['48x', { lineHeight: '1' }],
      '6xl': ['60px', { lineHeight: '1' }],
      '7xl': ['72px', { lineHeight: '1' }],
      '8xl': ['96px', { lineHeight: '1' }],
      '9xl': ['128px', { lineHeight: '1' }],
    },
    spacing: {
      px: '1px',
      0: '0',
      0.5: '2px',
      1: '4px',
      1.5: '6px',
      2: '8px',
      2.5: '10px',
      3: '12px',
      3.5: '14px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      14: '56px',
      16: '64px',
      20: '80px',
      24: '96px',
      28: '112px',
      32: '128px',
      36: '144px',
      40: '160px',
      44: '176px',
      48: '192px',
      52: '208px',
      56: '224px',
      60: '240px',
      64: '256px',
      72: '288px',
      80: '320px',
      96: '384px',
    },
    extend: {
      lineHeight: {
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
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
        background: {
          DEFAULT: 'hsl(var(--bg-hsl) / <alpha-value>)',
          soft: 'hsl(var(--bg-hue) var(--bg-s) var(--bg-soft-l) / <alpha-value>)',
          mute: 'hsl(var(--bg-hue) var(--bg-s) var(--bg-mute-l) / <alpha-value>)',
        },
        foreground: {
          DEFAULT: 'hsl(var(--fg-hsl) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
}
