
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220 20% 95%)',
        accent: 'hsl(180 80% 50%)',
        primary: 'hsl(220 89% 55%)',
        surface: 'hsl(220 20% 100%)',
        foreground: 'hsl(220 20% 10%)',
        muted: 'hsl(220 10% 60%)',
      },
      spacing: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(220,20%,10%,0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'fade-out': 'fadeOut 200ms ease-in-out',
        'slide-up': 'slideUp 200ms ease-in-out',
      },
      fontWeight: {
        'display': '700',
        'body': '500',
      },
      fontSize: {
        'display': ['1.875rem', { lineHeight: '2.25rem' }],
        'body': ['1rem', { lineHeight: '1.5rem' }],
      },
    },
  },
  plugins: [],
}
