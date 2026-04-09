import { Platform, View, Text } from 'react-native';
import { Image } from 'expo-image';

interface CannabisLeafProps {
  size?: number;
  color?: string;
}

// SVG cannabis leaf as a data URI — works on both web and native via expo-image
function buildLeafSvg(color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" fill="${color}">
    <path d="M50 8 C52 14 54 22 53 30 C58 22 68 14 74 10 C72 18 64 30 58 38 C64 36 74 36 80 38 C72 42 60 46 52 50 C58 54 70 58 78 56 C72 62 58 62 52 58 C56 66 64 76 70 82 C62 78 54 68 50 60 C46 68 38 78 30 82 C36 76 44 66 48 58 C42 62 28 62 22 56 C30 58 42 54 48 50 C40 46 28 42 20 38 C26 36 36 36 42 38 C36 30 28 18 26 10 C32 14 42 22 47 30 C46 22 48 14 50 8Z"/>
    <rect x="48" y="55" width="4" height="40" rx="2"/>
    <path d="M42 85 C42 85 46 75 50 70 C54 75 58 85 58 85 C54 82 46 82 42 85Z"/>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function CannabisLeaf({ size = 32, color = '#4A6741' }: CannabisLeafProps) {
  return (
    <Image
      source={{ uri: buildLeafSvg(color) }}
      style={{ width: size, height: size }}
      contentFit="contain"
    />
  );
}
