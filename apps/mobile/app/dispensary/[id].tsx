import { View, Text, ScrollView, Pressable, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { mockDispensaries, mockStrains } from '../../lib/mock/strains';

export default function DispensaryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispensary = mockDispensaries.find((d) => d.id === id);

  if (!dispensary) {
    return (
      <SafeAreaView className="flex-1 bg-kanna-bg items-center justify-center">
        <Text className="text-white">Dispensary not found</Text>
      </SafeAreaView>
    );
  }

  const handleNavigate = () => {
    const { latitude, longitude, name } = dispensary;
    const url = Platform.select({
      ios: `maps:0,0?q=${encodeURIComponent(name)}@${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${encodeURIComponent(name)})`,
      default: `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
    });
    if (url) Linking.openURL(url);
  };

  const handleCall = () => {
    if (dispensary.phone) {
      Linking.openURL(`tel:${dispensary.phone}`);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-kanna-bg">
      {/* Header */}
      <View className="flex-row items-center px-5 py-3">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#ffffff" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
        {/* Name & Verified badge */}
        <View className="flex-row items-center gap-2 mb-1">
          <Text className="text-white font-bold text-3xl">{dispensary.name}</Text>
          {dispensary.isVerified && (
            <Ionicons name="checkmark-circle" size={24} color="#2ecc71" />
          )}
        </View>

        {/* Address */}
        <Text className="text-kanna-text-secondary text-sm mb-1">
          {dispensary.address}, {dispensary.city}, {dispensary.state} {dispensary.zipCode}
        </Text>
        {dispensary.distance && (
          <Text className="text-kanna-green text-sm font-semibold mb-6">
            {dispensary.distance} miles away
          </Text>
        )}

        {/* Action buttons */}
        <View className="flex-row gap-3 mb-6">
          <Pressable
            onPress={handleNavigate}
            className="flex-1 bg-kanna-green rounded-2xl py-4 flex-row items-center justify-center gap-2"
          >
            <Ionicons name="navigate" size={20} color="#0a0a1a" />
            <Text className="text-kanna-bg font-bold text-sm">Take Me There</Text>
          </Pressable>
          {dispensary.phone && (
            <Pressable
              onPress={handleCall}
              className="bg-kanna-surface rounded-2xl py-4 px-6 flex-row items-center justify-center gap-2"
            >
              <Ionicons name="call" size={20} color="#2ecc71" />
            </Pressable>
          )}
        </View>

        {/* Hours */}
        {dispensary.hours && (
          <View className="mb-6">
            <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
              Hours
            </Text>
            <View className="bg-kanna-surface rounded-2xl p-4">
              {Object.entries(dispensary.hours).map(([day, hours]) => (
                <View key={day} className="flex-row justify-between py-1.5">
                  <Text className="text-kanna-text-secondary text-sm capitalize">{day}</Text>
                  <Text className="text-white text-sm">{hours}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Available Strains */}
        <View className="mb-6">
          <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            Available Strains
          </Text>
          <View className="bg-kanna-surface rounded-2xl overflow-hidden">
            {dispensary.inventory.filter((inv) => inv.inStock).map((inv, idx) => {
              const strain = mockStrains.find((s) => s.id === inv.strainId);
              if (!strain) return null;
              return (
                <Pressable
                  key={inv.id}
                  onPress={() => router.push(`/strain/${strain.id}`)}
                  className={`flex-row items-center justify-between px-4 py-4 ${
                    idx < dispensary.inventory.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <View>
                    <Text className="text-white font-semibold text-sm">{strain.name}</Text>
                    <Text className="text-kanna-text-secondary text-xs capitalize">{strain.type}</Text>
                  </View>
                  <View className="items-end">
                    {inv.priceEighth && (
                      <Text className="text-white font-bold text-sm">${inv.priceEighth}/8th</Text>
                    )}
                    <View className="flex-row items-center gap-1 mt-0.5">
                      <View className="w-1.5 h-1.5 rounded-full bg-kanna-green" />
                      <Text className="text-kanna-green text-xs">In stock</Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
