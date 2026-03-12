/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nova-primary': '#3b82f6',
        'nova-secondary': '#8b5cf6',
        'nova-accent': '#ec4899',
        'nova-success': '#10b981',
        'nova-warning': '#f59e0b',
        'nova-danger': '#ef4444',
        'nova-navy': '#1e293b',
        'nova-dark': '#0f172a',
        'nova-light': '#f8fafc',
      },
      backgroundImage: {
        'executive-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'nova-gradient': 'linear-gradient(135deg, var(--nova-primary) 0%, var(--nova-secondary) 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      },
      backdropBlur: {
        'glass': '10px',
        'executive': '20px',
      },
      boxShadow: {
        'executive': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'executive-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.45)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-large': '0 0 40px rgba(59, 130, 246, 0.8)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
