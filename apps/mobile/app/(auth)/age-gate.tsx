import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../lib/stores/authStore';

export default function AgeGateScreen() {
  const router = useRouter();
  const { verifyAge, user } = useAuthStore();

  const handleConfirm = async () => {
    // Quick verify — store as age-verified without DOB
    await verifyAge('2000-01-01'); // Placeholder DOB for 21+ confirmation
    router.replace('/(tabs)/chat');
  };

  const handleDeny = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-kanna-bg">
      <View className="flex-1 items-center justify-center px-8">
        <View className="w-20 h-20 rounded-full bg-kanna-warning/20 items-center justify-center mb-6">
          <Ionicons name="shield-checkmark" size={40} color="#f39c12" />
        </View>

        <Text className="text-white font-bold text-2xl mb-2 text-center">Quick Verification</Text>
        {user?.name && (
          <Text className="text-kanna-green text-sm mb-4">Welcome, {user.name}!</Text>
        )}
        <Text className="text-kanna-text-secondary text-center text-sm leading-5 mb-10 max-w-[280px]">
          You must be 21 years or older to use KannaAI. Please confirm your age to continue.
        </Text>

        <Pressable
          onPress={handleConfirm}
          className="bg-kanna-green w-full rounded-2xl py-4 items-center mb-3"
        >
          <Text className="text-kanna-bg font-bold text-base">I Am 21 or Older</Text>
        </Pressable>

        <Pressable
          onPress={handleDeny}
          className="bg-kanna-surface w-full rounded-2xl py-4 items-center"
        >
          <Text className="text-kanna-text-secondary font-semibold text-base">I Am Under 21</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
