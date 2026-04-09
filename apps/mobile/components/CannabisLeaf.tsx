import { Text } from 'react-native';

interface CannabisLeafProps {
  size?: number;
}

export function CannabisLeaf({ size = 32 }: CannabisLeafProps) {
  return <Text style={{ fontSize: size * 0.7 }}>🌿</Text>;
}
