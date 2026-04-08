import { useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../lib/stores/authStore';

export default function WelcomeScreen() {
  const router = useRouter();
  const { googleSignIn, devSignIn } = useAuthStore();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await googleSignIn();
      // After sign-in, redirect to age gate
      router.replace('/(auth)/age-gate');
    } catch (error: any) {
      // If Firebase isn't configured, fall back to dev mode
      if (error?.message?.includes('placeholder') || error?.code === 'auth/invalid-api-key') {
        Alert.alert(
          'Firebase Not Configured',
          'Using dev mode. Add your Firebase config to apps/mobile/.env to enable real Google Sign-In.',
          [{ text: 'Continue in Dev Mode', onPress: () => {
            devSignIn('Cornelius', 'cornelius@kannaai.com');
            router.replace('/(auth)/age-gate');
          }}]
        );
      } else {
        Alert.alert('Sign-In Failed', error?.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleDevSignIn = () => {
    devSignIn('Cornelius', 'cornelius@kannaai.com');
    router.replace('/(auth)/age-gate');
  };

  return (
    <SafeAreaView className="flex-1 bg-kanna-bg">
      <View className="flex-1 items-center justify-center px-8">
        {/* Logo */}
        <View className="w-28 h-28 rounded-full bg-kanna-green/20 items-center justify-center mb-6">
          <Text className="text-6xl">🌿</Text>
        </View>

        <Text className="text-white font-bold text-4xl mb-2">KannaAI</Text>
        <Text className="text-kanna-green text-lg font-semibold mb-4">
          Your Personal Cannabis Concierge
        </Text>
        <Text className="text-kanna-text-secondary text-center text-sm leading-5 mb-12 max-w-[280px]">
          Tell Kanna how you feel, and she'll recommend the perfect strain and find a dispensary near you.
        </Text>

        {/* Google Sign-In — Primary CTA */}
        <Pressable
          onPress={handleGoogleSignIn}
          disabled={isSigningIn}
          className={`w-full rounded-2xl py-4 flex-row items-center justify-center gap-3 mb-3 ${
            isSigningIn ? 'bg-kanna-surface' : 'bg-white'
          }`}
        >
          <Ionicons name="logo-google" size={22} color={isSigningIn ? '#8a8aa3' : '#4285F4'} />
          <Text className={`font-bold text-base ${isSigningIn ? 'text-kanna-text-secondary' : 'text-gray-800'}`}>
            {isSigningIn ? 'Signing in...' : 'Continue with Google'}
          </Text>
        </Pressable>

        {/* Apple Sign-In */}
        <Pressable
          onPress={handleDevSignIn}
          className="bg-kanna-surface w-full rounded-2xl py-4 flex-row items-center justify-center gap-3 mb-3"
        >
          <Ionicons name="logo-apple" size={22} color="#ffffff" />
          <Text className="text-white font-semibold text-base">Continue with Apple</Text>
        </Pressable>

        {/* Dev mode skip */}
        <Pressable onPress={handleDevSignIn} className="mt-4">
          <Text className="text-kanna-text-secondary text-sm underline">Skip (Dev Mode)</Text>
        </Pressable>
      </View>

      <View className="px-8 pb-4">
        <Text className="text-kanna-text-secondary text-xs text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
}
