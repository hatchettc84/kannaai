export const colors = {
  // Figma-matched palette
  primary: '#4A6741',        // Olive/forest green
  primaryLight: '#5B8C51',   // Lighter green
  background: '#FFFFFF',     // White
  backgroundCream: '#F8F7F4', // Off-white/cream
  surface: '#F2F2F0',        // Light gray surface
  surfaceGreen: '#D4E8CD',   // Light green card bg
  surfaceGreenDark: '#A8C99B', // Darker green gradient
  text: '#1A1A1A',           // Near black
  textSecondary: '#8A8A8A',  // Gray
  terracotta: '#C27B5A',     // Category labels, accents
  gold: '#D4A843',           // Promo/sale text
  coral: '#D4534B',          // Active tab indicator
  white: '#FFFFFF',
  error: '#D4534B',
  // Strain type colors
  sativa: '#5B8C51',
  indica: '#7B5EA7',
  hybrid: '#D4A843',
} as const;

export const strainTypeColor = {
  sativa: colors.sativa,
  indica: colors.indica,
  hybrid: colors.hybrid,
} as const;
