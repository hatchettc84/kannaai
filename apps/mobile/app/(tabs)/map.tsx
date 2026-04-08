import { View, Text, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { WebMap } from '../../components/WebMap';
import { mockDispensaries } from '../../lib/mock/strains';
import { useLocationStore } from '../../lib/stores/locationStore';

export default function MapScreen() {
  const { latitude, longitude, city, permissionStatus, requestPermission, getCurrentLocation } = useLocationStore();

  const centerLat = latitude || 34.0522;
  const centerLng = longitude || -118.2437;
  const locationLabel = city || (latitude ? 'Your Location' : 'Los Angeles, CA');

  const handleEnableLocation = async () => {
    const granted = await requestPermission();
    if (granted) {
      await getCurrentLocation();
    }
  };

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView className="flex-1 bg-kanna-bg" edges={['top']}>
        <View className="px-5 pt-3 pb-2 flex-row items-center justify-between">
          <Text className="text-white font-bold text-2xl">Nearby Dispensaries</Text>
          <Pressable onPress={handleEnableLocation} className="flex-row items-center gap-1">
            <Ionicons name="location" size={14} color="#2ecc71" />
            <Text className="text-kanna-green text-xs font-semibold">{locationLabel}</Text>
          </Pressable>
        </View>

        {permissionStatus === 'denied' && (
          <Pressable
            onPress={handleEnableLocation}
            className="mx-5 mb-2 bg-kanna-surface rounded-xl px-4 py-3 flex-row items-center gap-2"
          >
            <Ionicons name="navigate" size={16} color="#f39c12" />
            <Text className="text-kanna-warning text-xs flex-1">
              Enable location for accurate distances
            </Text>
            <Ionicons name="chevron-forward" size={14} color="#8a8aa3" />
          </Pressable>
        )}

        <View className="flex-1">
          <WebMap
            dispensaries={mockDispensaries}
            centerLat={centerLat}
            centerLng={centerLng}
          />
        </View>
      </SafeAreaView>
    );
  }

  // Native fallback
  return (
    <SafeAreaView className="flex-1 bg-kanna-bg" edges={['top']}>
      <View className="px-5 pt-3 pb-4">
        <Text className="text-white font-bold text-2xl">Dispensary Map</Text>
      </View>
      <View className="flex-1 items-center justify-center px-8">
        <View className="bg-kanna-surface rounded-3xl p-8 items-center w-full">
          <Ionicons name="map-outline" size={64} color="#2ecc71" />
          <Text className="text-white font-bold text-lg mt-4 text-center">Map Coming Soon</Text>
          <Text className="text-kanna-text-secondary text-sm text-center mt-2 leading-5">
            Interactive dispensary map will be available in the next update.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
