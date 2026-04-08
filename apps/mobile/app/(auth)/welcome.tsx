import { useState } from 'react';
import { View, Text, Pressable, Alert, ImageBackground } from 'react-native';
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
      router.replace('/(auth)/age-gate');
    } catch (error: any) {
      if (error?.message?.includes('placeholder') || error?.code === 'auth/invalid-api-key') {
        Alert.alert(
          'Firebase Not Configured',
          'Using dev mode.',
          [{ text: 'Continue', onPress: () => {
            devSignIn('Cornelius', 'cornelius@kannaai.com');
            router.replace('/(auth)/age-gate');
          }}]
        );
      } else {
        Alert.alert('Sign-In Failed', error?.message || 'Something went wrong.');
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
    <View className="flex-1" style={{ backgroundColor: '#1A1A1A' }}>
      {/* Background image area — dark cannabis leaf aesthetic */}
      <View className="flex-1 items-center justify-end pb-12 px-8" style={{ backgroundColor: '#2D3B2A' }}>
        {/* Overlay gradient effect */}
        <View className="absolute inset-0" style={{ backgroundColor: 'rgba(42, 60, 38, 0.85)' }} />

        {/* Content */}
        <View className="z-10 items-center w-full">
          <Text className="text-5xl font-bold mb-3" style={{ color: '#F8F7F4', fontFamily: 'serif' }}>
            KannaAI
          </Text>
          <Text className="text-sm text-center mb-2" style={{ color: 'rgba(248,247,244,0.7)' }}>
            Get connected to the{'\n'}best cannabis concierge{'\n'}in your local area
          </Text>

          <Pressable
            onPress={handleGoogleSignIn}
            disabled={isSigningIn}
            className="w-full rounded-2xl py-4 flex-row items-center justify-center gap-3 mt-8 border"
            style={{ borderColor: 'rgba(248,247,244,0.3)', backgroundColor: 'rgba(74,103,65,0.6)' }}
          >
            <Text className="font-bold text-base" style={{ color: '#F8F7F4' }}>
              {isSigningIn ? 'Signing in...' : 'Get started'} →
            </Text>
          </Pressable>

          <Pressable onPress={handleDevSignIn} className="mt-4">
            <Text className="text-xs" style={{ color: 'rgba(248,247,244,0.5)' }}>Skip (Dev Mode)</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
