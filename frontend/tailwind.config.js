/** @type {import('tailwindcss').Config} */
export const content = [
   './pages/**/*.{ts,tsx}',
   './components/**/*.{ts,tsx}',
   './app/**/*.{ts,tsx}',
   './src/**/*.{ts,tsx}',
   './node_modules/@nextui-org/theme/dist/components/(accordion|button|image|ripple|spinner).js',
];
export const prefix = '';
export const theme = {
   extend: {
      keyframes: {
         shimmer: {
            '0%, 90%, 100%': {
               'background-position': 'calc(-100% - var(--shimmer-width)) 0',
            },
            '30%, 60%': {
               'background-position': 'calc(100% + var(--shimmer-width)) 0',
            },
         },
         'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(--radix-accordion-content-height)' },
         },
         'accordion-up': {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: '0' },
         },
      },
      animation: {
         shimmer: 'shimmer 8s linear infinite',
      },
      fontFamily: {
         'dm-mono': ['DM Mono', 'monospace'],
         'roboto-mono': ['Roboto Mono', 'monospace'],
         playfair: ['Playfair Display', 'serif'],
         'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
      animation: {
         'accordion-down': 'accordion-down 0.2s ease-out',
         'accordion-up': 'accordion-up 0.2s ease-out',
      },
   },
   screens: {
      phone: '360px',
      xs: '480px',
      s: '624px',
      sm: '768px',
      tablet: '914px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
   },
};
export const plugins = [require('tailwindcss-animate')];
