import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import type { Strain } from '@kannaai/shared';

const typeColors = {
  sativa: { bg: 'bg-kanna-sativa/20', text: 'text-kanna-sativa', label: 'Sativa' },
  indica: { bg: 'bg-kanna-indica/20', text: 'text-kanna-indica', label: 'Indica' },
  hybrid: { bg: 'bg-kanna-hybrid/20', text: 'text-kanna-hybrid', label: 'Hybrid' },
};

const tierBadge = {
  classic: { label: 'Classic', color: 'text-kanna-hybrid' },
  popular: { label: 'Popular', color: 'text-kanna-green' },
  trending: { label: 'Trending', color: 'text-kanna-accent' },
};

export function StrainCard({ strain, compact }: { strain: Strain; compact?: boolean }) {
  const router = useRouter();
  const typeStyle = typeColors[strain.type];
  const tier = strain.tier ? tierBadge[strain.tier] : null;

  return (
    <Pressable
      onPress={() => router.push(`/strain/${strain.id}`)}
      className="bg-kanna-surface-light rounded-2xl p-4 mb-2 border border-white/5"
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-2 flex-1">
          <Text className="text-white font-bold text-base">{strain.name}</Text>
          {tier && (
            <Text className={`${tier.color} text-[10px] font-semibold`}>{tier.label}</Text>
          )}
        </View>
        <View className={`${typeStyle.bg} px-3 py-1 rounded-full`}>
          <Text className={`${typeStyle.text} text-xs font-semibold`}>{typeStyle.label}</Text>
        </View>
      </View>

      <View className="flex-row items-center gap-3 mb-3">
        {strain.thcMax != null && (
          <Text className="text-kanna-text-secondary text-xs">
            THC: {strain.thcMin}–{strain.thcMax}%
          </Text>
        )}
        {strain.cbdMax != null && strain.cbdMax > 1 && (
          <Text className="text-kanna-green text-xs font-semibold">
            CBD: {strain.cbdMin}–{strain.cbdMax}%
          </Text>
        )}
      </View>

      {!compact && (
        <View className="flex-row flex-wrap gap-1.5">
          {strain.effects.slice(0, 4).map((effect) => (
            <View key={effect} className="bg-kanna-green/10 px-2.5 py-1 rounded-full">
              <Text className="text-kanna-green text-xs">{effect}</Text>
            </View>
          ))}
        </View>
      )}

      {!compact && strain.medical && strain.medical.length > 0 && (
        <View className="flex-row flex-wrap gap-1.5 mt-2">
          {strain.medical.slice(0, 3).map((use) => (
            <View key={use} className="bg-kanna-accent/10 px-2.5 py-1 rounded-full">
              <Text className="text-kanna-accent text-[10px]">{use}</Text>
            </View>
          ))}
        </View>
      )}
    </Pressable>
  );
}
