import { Image } from 'expo-image';

interface CannabisLeafProps {
  size?: number;
  color?: string;
}

// Cannabis leaf PNG hosted on the API domain
// To update: replace apps/api/public/cannabis-leaf.png and push
const LEAF_URL = 'https://kannaai.vercel.app/cannabis-leaf.png';

// Fallback SVG for when the image hasn't been uploaded yet
function buildFallbackSvg(color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" fill="${color}">
    <path d="M100 5 C96 25 93 40 95 55 C88 40 75 22 65 12 C70 30 82 50 90 62 C80 56 62 48 50 45 C60 52 78 60 90 68 C78 66 58 62 45 64 C58 68 78 72 92 74 L92 78 C78 76 58 76 45 80 C60 82 80 80 92 78 C80 84 62 92 50 100 C64 96 82 86 92 80 C84 92 72 108 62 120 C74 110 86 96 94 84 C92 98 88 118 86 132 C92 118 96 100 98 86 C100 100 104 118 114 132 C112 118 108 98 102 86 C106 96 118 110 130 120 C120 108 108 92 100 80 C110 86 128 96 142 100 C130 92 112 84 100 78 C112 80 132 82 148 80 C134 76 114 76 100 78 L100 74 C114 72 134 68 148 64 C134 62 114 66 102 68 C114 60 132 52 142 45 C130 48 112 56 102 62 C110 50 122 30 128 12 C118 22 104 40 98 55 C100 40 96 25 100 5Z"/>
    <path d="M96 78 C96 78 95 110 94 140 C93 165 94 185 97 200 C98 205 100 210 100 210 C100 210 102 205 103 200 C106 185 107 165 106 140 C105 110 104 78 104 78Z"/>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function CannabisLeaf({ size = 32, color }: CannabisLeafProps) {
  // If no color specified, use the full-color PNG
  if (!color) {
    return (
      <Image
        source={{ uri: LEAF_URL }}
        style={{ width: size, height: size }}
        contentFit="contain"
        placeholder={{ blurhash: 'L5H2EC=PM+yV0g-mq.wG9c010J}I' }}
      />
    );
  }

  // If color specified (e.g. white for dark backgrounds), use SVG
  return (
    <Image
      source={{ uri: buildFallbackSvg(color) }}
      style={{ width: size, height: size }}
      contentFit="contain"
    />
  );
}
