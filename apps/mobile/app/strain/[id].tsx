import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { mockStrains } from '../../lib/mock/strains';
import { useChatStore } from '../../lib/stores/chatStore';

const typeColors = {
  sativa: { bg: 'bg-kanna-sativa/20', text: 'text-kanna-sativa', label: 'Sativa' },
  indica: { bg: 'bg-kanna-indica/20', text: 'text-kanna-indica', label: 'Indica' },
  hybrid: { bg: 'bg-kanna-hybrid/20', text: 'text-kanna-hybrid', label: 'Hybrid' },
};

export default function StrainDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const sendMessage = useChatStore((s) => s.sendMessage);
  const strain = mockStrains.find((s) => s.id === id);

  if (!strain) {
    return (
      <SafeAreaView className="flex-1 bg-kanna-bg items-center justify-center">
        <Text className="text-white">Strain not found</Text>
      </SafeAreaView>
    );
  }

  const typeStyle = typeColors[strain.type];

  return (
    <SafeAreaView className="flex-1 bg-kanna-bg">
      {/* Header */}
      <View className="flex-row items-center px-5 py-3">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#ffffff" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
        {/* Name & Type */}
        <View className="flex-row items-center gap-3 mb-2">
          <Text className="text-white font-bold text-3xl flex-1">{strain.name}</Text>
          <View className={`${typeStyle.bg} px-4 py-1.5 rounded-full`}>
            <Text className={`${typeStyle.text} text-sm font-semibold`}>{typeStyle.label}</Text>
          </View>
        </View>

        {/* THC/CBD */}
        <View className="flex-row gap-4 mb-6">
          {strain.thcMax && (
            <View className="bg-kanna-surface rounded-xl px-4 py-3">
              <Text className="text-kanna-text-secondary text-xs">THC</Text>
              <Text className="text-white font-bold text-lg">{strain.thcMin}–{strain.thcMax}%</Text>
            </View>
          )}
          {strain.cbdMax && (
            <View className="bg-kanna-surface rounded-xl px-4 py-3">
              <Text className="text-kanna-text-secondary text-xs">CBD</Text>
              <Text className="text-white font-bold text-lg">{strain.cbdMin}–{strain.cbdMax}%</Text>
            </View>
          )}
        </View>

        {/* Description */}
        {strain.description && (
          <View className="mb-6">
            <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-2">
              About
            </Text>
            <Text className="text-white text-sm leading-5">{strain.description}</Text>
          </View>
        )}

        {/* Effects */}
        <View className="mb-6">
          <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            Effects
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {strain.effects.map((effect) => (
              <View key={effect} className="bg-kanna-green/10 px-3 py-2 rounded-full">
                <Text className="text-kanna-green text-sm">{effect}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Flavors */}
        <View className="mb-6">
          <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            Flavors
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {strain.flavors.map((flavor) => (
              <View key={flavor} className="bg-kanna-accent/10 px-3 py-2 rounded-full">
                <Text className="text-kanna-accent text-sm">{flavor}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Terpenes */}
        <View className="mb-6">
          <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            Terpenes
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {strain.terpenes.map((terpene) => (
              <View key={terpene} className="bg-kanna-hybrid/10 px-3 py-2 rounded-full">
                <Text className="text-kanna-hybrid text-sm">{terpene}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Medical Uses */}
        {strain.medical && strain.medical.length > 0 && (
          <View className="mb-8">
            <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
              May Help With
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {strain.medical.map((use) => (
                <View key={use} className="bg-kanna-accent/10 px-3 py-2 rounded-full">
                  <Text className="text-kanna-accent text-sm">{use}</Text>
                </View>
              ))}
            </View>
            <Text className="text-kanna-text-secondary text-[10px] mt-2 italic">
              Not medical advice — consult your doctor for medical conditions.
            </Text>
          </View>
        )}

        {/* Ask Kanna */}
        <Pressable
          onPress={() => {
            sendMessage(`Tell me more about ${strain.name} — what should I expect?`);
            router.replace('/(tabs)/chat');
          }}
          className="bg-kanna-surface rounded-2xl py-4 flex-row items-center justify-center gap-2 mb-3 border border-kanna-green/30"
        >
          <Text className="text-lg">🌿</Text>
          <Text className="text-kanna-green font-bold text-base">Ask Kanna About This</Text>
        </Pressable>

        {/* Find Nearby CTA */}
        <Pressable
          onPress={() => {
            sendMessage(`Find dispensaries near me that carry ${strain.name}`);
            router.replace('/(tabs)/chat');
          }}
          className="bg-kanna-green rounded-2xl py-4 flex-row items-center justify-center gap-2"
        >
          <Ionicons name="location" size={20} color="#0a0a1a" />
          <Text className="text-kanna-bg font-bold text-base">Find Nearby</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
