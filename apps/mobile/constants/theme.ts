export const colors = {
  primary: '#2ecc71',
  primaryDark: '#27ae60',
  background: '#0a0a1a',
  surface: '#1a1a2e',
  surfaceLight: '#252540',
  text: '#ffffff',
  textSecondary: '#8a8aa3',
  accent: '#9b59b6',
  warning: '#f39c12',
  error: '#e74c3c',
  sativa: '#2ecc71',
  indica: '#9b59b6',
  hybrid: '#f39c12',
} as const;

export const strainTypeColor = {
  sativa: colors.sativa,
  indica: colors.indica,
  hybrid: colors.hybrid,
} as const;
