import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLocationStore } from '../../lib/stores/locationStore';

export default function LocationPermissionScreen() {
  const router = useRouter();
  const { requestPermission, getCurrentLocation } = useLocationStore();
  const [isRequesting, setIsRequesting] = useState(false);

  const handleEnableLocation = async () => {
    setIsRequesting(true);
    try {
      const granted = await requestPermission();
      if (granted) {
        await getCurrentLocation();
      }
      router.replace('/(tabs)/chat');
    } catch {
      router.replace('/(tabs)/chat');
    } finally {
      setIsRequesting(false);
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)/chat');
  };

  return (
    <SafeAreaView className="flex-1 bg-kanna-bg">
      <View className="flex-1 items-center justify-center px-8">
        <View className="w-24 h-24 rounded-full bg-kanna-green/20 items-center justify-center mb-6">
          <Ionicons name="location" size={48} color="#2ecc71" />
        </View>

        <Text className="text-white font-bold text-2xl mb-3 text-center">
          Find Dispensaries{'\n'}Near You
        </Text>
        <Text className="text-kanna-text-secondary text-center text-sm leading-5 mb-10 max-w-[300px]">
          Enable location access so Kanna can find dispensaries nearby, show real distances, and give you directions.
        </Text>

        <Pressable
          onPress={handleEnableLocation}
          disabled={isRequesting}
          className={`w-full rounded-2xl py-4 flex-row items-center justify-center gap-2 mb-3 ${
            isRequesting ? 'bg-kanna-surface' : 'bg-kanna-green'
          }`}
        >
          <Ionicons name="navigate" size={20} color={isRequesting ? '#8a8aa3' : '#0a0a1a'} />
          <Text className={`font-bold text-base ${
            isRequesting ? 'text-kanna-text-secondary' : 'text-kanna-bg'
          }`}>
            {isRequesting ? 'Getting Location...' : 'Enable Location'}
          </Text>
        </Pressable>

        <Pressable onPress={handleSkip} className="w-full rounded-2xl py-4 items-center">
          <Text className="text-kanna-text-secondary font-semibold text-sm">Skip for Now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
