import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuthStore } from '../lib/stores/authStore';

export default function Index() {
  const { isAuthenticated, isAgeVerified, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <View className="flex-1 bg-kanna-bg items-center justify-center">
        <ActivityIndicator size="large" color="#2ecc71" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/welcome" />;
  }

  if (!isAgeVerified) {
    return <Redirect href="/(auth)/age-gate" />;
  }

  return <Redirect href="/(tabs)/chat" />;
}
