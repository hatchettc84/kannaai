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

  return (
    <View className="rounded-2xl p-4 mb-2" style={{ backgroundColor: '#F8F7F4', borderWidth: 1, borderColor: '#F2F2F0' }}>
      <View className="flex-row items-start justify-between mb-1">
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="font-bold text-sm" style={{ color: '#1A1A1A' }}>{dispensary.name}</Text>
            {dispensary.isVerified && (
              <Ionicons name="checkmark-circle" size={14} color="#5B8C51" />
            )}
          </View>
          <Text className="text-xs mt-0.5" style={{ color: '#8A8A8A' }}>
            {dispensary.distance ? `${dispensary.distance} mi` : ''} · {dispensary.address}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={handleNavigate}
        className="rounded-xl py-3 mt-3 flex-row items-center justify-center gap-2"
        style={{ backgroundColor: '#4A6741' }}
      >
        <Ionicons name="navigate" size={16} color="#FFFFFF" />
        <Text className="font-bold text-sm" style={{ color: '#FFFFFF' }}>Take Me There</Text>
      </Pressable>
    </View>
  );
}
