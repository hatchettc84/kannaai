import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-kanna-bg items-center justify-center px-8">
      <Text className="text-4xl mb-4">🌿</Text>
      <Text className="text-white font-bold text-xl mb-2">Page Not Found</Text>
      <Text className="text-kanna-text-secondary text-sm text-center mb-6">
        This page doesn't exist. Let's get you back to Kanna.
      </Text>
      <Pressable
        onPress={() => router.replace('/(tabs)/chat')}
        className="bg-kanna-green rounded-2xl px-6 py-3"
      >
        <Text className="text-kanna-bg font-bold">Go to Chat</Text>
      </Pressable>
    </View>
  );
}
