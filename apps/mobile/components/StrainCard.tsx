import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import type { Strain } from '@kannaai/shared';

const typeColors = {
  sativa: { bg: '#E8F5E3', text: '#5B8C51', label: 'Sativa' },
  indica: { bg: '#EDE5F5', text: '#7B5EA7', label: 'Indica' },
  hybrid: { bg: '#FFF3DC', text: '#D4A843', label: 'Hybrid' },
};

export function StrainCard({ strain }: { strain: Strain }) {
  const router = useRouter();
  const typeStyle = typeColors[strain.type];

  return (
    <Pressable
      onPress={() => router.push(`/strain/${strain.id}`)}
      className="rounded-2xl p-4 mb-2"
      style={{ backgroundColor: '#D4E8CD' }}
    >
      <View className="flex-row items-center justify-between mb-2">
        <Text className="font-bold text-sm flex-1" style={{ color: '#1A1A1A' }}>{strain.name}</Text>
        <View className="px-3 py-1 rounded-full" style={{ backgroundColor: typeStyle.bg }}>
          <Text className="text-xs font-semibold" style={{ color: typeStyle.text }}>{typeStyle.label}</Text>
        </View>
      </View>

      <View className="flex-row items-center gap-3 mb-2">
        {strain.thcMax != null && (
          <Text className="text-xs" style={{ color: '#4A6741' }}>THC: {strain.thcMin}–{strain.thcMax}%</Text>
        )}
        {strain.cbdMax != null && strain.cbdMax > 1 && (
          <Text className="text-xs font-semibold" style={{ color: '#4A6741' }}>CBD: {strain.cbdMin}–{strain.cbdMax}%</Text>
        )}
      </View>

      <View className="flex-row flex-wrap gap-1.5">
        {strain.effects.slice(0, 4).map((effect) => (
          <View key={effect} className="px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(74,103,65,0.15)' }}>
            <Text className="text-xs" style={{ color: '#4A6741' }}>{effect}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}
