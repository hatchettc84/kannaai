import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../lib/stores/authStore';

export default function AgeGateScreen() {
  const router = useRouter();
  const { verifyAge, user } = useAuthStore();

  const handleConfirm = async () => {
    await verifyAge('2000-01-01');
    router.replace('/(tabs)/home');
  };

  const handleDeny = () => {
    router.back();
  };

  return (
    <View className="flex-1" style={{ backgroundColor: '#4A6741' }}>
      <SafeAreaView className="flex-1 items-center justify-center px-8">
        <View className="w-16 h-16 rounded-full items-center justify-center mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
          <Ionicons name="shield-checkmark" size={32} color="#D4A843" />
        </View>

        <Text className="text-2xl font-bold mb-2 text-center" style={{ color: '#F8F7F4' }}>Quick Verification</Text>
        {user?.name && (
          <Text className="text-sm mb-4" style={{ color: '#D4A843' }}>Welcome, {user.name}!</Text>
        )}
        <Text className="text-sm text-center leading-5 mb-10 max-w-[280px]" style={{ color: 'rgba(248,247,244,0.7)' }}>
          You must be 21 years or older to use KannaAI. Please confirm your age to continue.
        </Text>

        <Pressable
          onPress={handleConfirm}
          className="w-full rounded-2xl py-4 items-center mb-3 border"
          style={{ borderColor: 'rgba(248,247,244,0.3)', backgroundColor: 'rgba(255,255,255,0.1)' }}
        >
          <Text className="font-bold text-base" style={{ color: '#F8F7F4' }}>I Am 21 or Older</Text>
        </Pressable>

        <Pressable
          onPress={handleDeny}
          className="w-full py-4 items-center"
        >
          <Text className="text-sm" style={{ color: 'rgba(248,247,244,0.5)' }}>I Am Under 21</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
