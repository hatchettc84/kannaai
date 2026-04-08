import { View, Text, Pressable, Linking, Platform } from 'react-native';
import type { DispensaryWithInventory } from '@kannaai/shared';
import { Ionicons } from '@expo/vector-icons';

export function DispensaryCard({ dispensary }: { dispensary: DispensaryWithInventory }) {
  const handleNavigate = () => {
    const { latitude, longitude, name } = dispensary;
    const url = Platform.select({
      ios: `maps:0,0?q=${encodeURIComponent(name)}@${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${encodeURIComponent(name)})`,
      default: `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
    });
    if (url) Linking.openURL(url);
  };

  const lowestPrice = dispensary.inventory
    .filter((inv) => inv.inStock && inv.priceEighth)
    .sort((a, b) => (a.priceEighth ?? 999) - (b.priceEighth ?? 999))[0];

  return (
    <View className="bg-kanna-surface-light rounded-2xl p-4 mb-2 border border-white/5">
      <View className="flex-row items-start justify-between mb-1">
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="text-white font-bold text-base">{dispensary.name}</Text>
            {dispensary.isVerified && (
              <Ionicons name="checkmark-circle" size={16} color="#2ecc71" />
            )}
          </View>
          <Text className="text-kanna-text-secondary text-xs mt-0.5">
            {dispensary.distance ? `${dispensary.distance} mi` : ''} · {dispensary.address}
          </Text>
        </View>
      </View>

      {lowestPrice && (
        <Text className="text-kanna-text-secondary text-xs mt-1">
          Starting at ${lowestPrice.priceEighth}/8th
        </Text>
      )}

      {dispensary.inventory.filter((i) => i.inStock).length > 0 && (
        <View className="flex-row items-center gap-1 mt-1">
          <View className="w-2 h-2 rounded-full bg-kanna-green" />
          <Text className="text-kanna-green text-xs">
            {dispensary.inventory.filter((i) => i.inStock).length} strains in stock
          </Text>
        </View>
      )}

      <Pressable
        onPress={handleNavigate}
        className="bg-kanna-green rounded-xl py-3 mt-3 flex-row items-center justify-center gap-2"
      >
        <Ionicons name="navigate" size={18} color="#0a0a1a" />
        <Text className="text-kanna-bg font-bold text-sm">Take Me There</Text>
      </Pressable>
    </View>
  );
}
