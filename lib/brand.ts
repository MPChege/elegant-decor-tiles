/**
 * Brand System Configuration
 * Defines typography, colors, shadows, gradients for Elegant Tiles & Décor Centre
 */

export const brand = {
  // Typography System
  typography: {
    heading: {
      font: 'var(--font-playfair)',
      weights: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    body: {
      font: 'var(--font-inter)',
      weights: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem',  // 72px
    },
  },

  // Color Palette - Burgundy & Cream Theme
  colors: {
    light: {
      background: 'hsl(35, 25%, 94%)',      // Warm cream/beige
      foreground: 'hsl(350, 50%, 28%)',     // Deep burgundy
      primary: 'hsl(352, 68%, 50%)',        // Vibrant red/burgundy
      secondary: 'hsl(350, 45%, 35%)',      // Rich dark burgundy
      accent: 'hsl(355, 65%, 55%)',         // Bright accent red
      muted: 'hsl(30, 20%, 88%)',           // Soft beige
      card: 'hsl(0, 0%, 100%)',             // Pure white
      border: 'hsl(30, 15%, 85%)',
    },
    dark: {
      background: 'hsl(350, 30%, 12%)',     // Deep burgundy black
      foreground: 'hsl(35, 25%, 94%)',      // Warm cream
      primary: 'hsl(352, 68%, 50%)',        // Vibrant red (maintained)
      secondary: 'hsl(350, 45%, 35%)',      // Rich dark burgundy
      accent: 'hsl(355, 65%, 55%)',         // Bright accent red
      muted: 'hsl(350, 20%, 20%)',          // Dark muted
      card: 'hsl(350, 25%, 15%)',           // Dark card
      border: 'hsl(350, 20%, 25%)',
    },
  },

  // Luxury Shadow System
  shadows: {
    'luxury-glow': '0 0 40px rgba(220, 38, 38, 0.3)',
    'luxury-sm': '0 2px 10px rgba(220, 38, 38, 0.1)',
    'luxury-md': '0 4px 20px rgba(220, 38, 38, 0.15)',
    'luxury-lg': '0 8px 40px rgba(220, 38, 38, 0.2)',
    'luxury-xl': '0 12px 60px rgba(220, 38, 38, 0.25)',
    'inner-glow': 'inset 0 0 20px rgba(220, 38, 38, 0.1)',
  },

  // Gradient System
  gradients: {
    'luxury': 'linear-gradient(135deg, hsl(352, 68%, 50%) 0%, hsl(350, 45%, 35%) 100%)',
    'burgundy-depth': 'linear-gradient(180deg, hsl(350, 30%, 12%) 0%, hsl(350, 25%, 8%) 100%)',
    'cream-glow': 'linear-gradient(180deg, hsl(35, 25%, 94%) 0%, hsl(30, 20%, 88%) 100%)',
    'radial-luxury': 'radial-gradient(circle at 50% 50%, hsl(352, 68%, 50%) 0%, hsl(350, 45%, 35%) 100%)',
    'ambient': 'linear-gradient(120deg, hsl(352, 68%, 50%, 0.05) 0%, transparent 100%)',
  },

  // Spacing System
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '1rem',     // 16px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    xl: '3rem',     // 48px
    '2xl': '4rem',  // 64px
    '3xl': '6rem',  // 96px
    '4xl': '8rem',  // 128px
  },

  // Border Radius
  radius: {
    sm: '0.25rem',  // 4px
    md: '0.5rem',   // 8px
    lg: '0.75rem',  // 12px
    xl: '1rem',     // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },

  // Animation Timing
  animation: {
    duration: {
      fast: '150ms',
      base: '300ms',
      slow: '500ms',
      slower: '800ms',
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      luxury: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  // Glassmorphism Effects
  glass: {
    light: {
      background: 'rgba(255, 255, 255, 0.7)',
      backdrop: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
    },
    dark: {
      background: 'rgba(20, 10, 15, 0.7)',
      backdrop: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
  },
} as const

export type Brand = typeof brand

