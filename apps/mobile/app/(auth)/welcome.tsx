import { useState } from 'react';
import { View, Text, Pressable, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useAuthStore } from '../../lib/stores/authStore';
import { CannabisLeaf } from '../../components/CannabisLeaf';

// Background image — cannabis buds in jar, hosted on API domain
const BG_IMAGE = 'https://kannaai.vercel.app/welcome-bg.jpg';

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
    <View className="flex-1" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Background Image */}
      <Image
        source={{ uri: BG_IMAGE }}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
        }}
        contentFit="cover"
      />

      {/* Dark overlay */}
      <View
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)', zIndex: 1 }}
      />

      {/* Bottom gradient for text readability */}
      {Platform.OS === 'web' ? (
        <View
          className="absolute inset-0"
          style={{
            zIndex: 2,
            background: 'linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.9) 100%)',
          } as any}
        />
      ) : (
        <View
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 2 }}
        />
      )}

      {/* Content */}
      <View className="flex-1 items-center justify-end pb-12 px-8" style={{ zIndex: 10 }}>
        <View className="items-center w-full">
          {/* Cannabis leaf logo */}
          <View className="mb-4">
            <CannabisLeaf size={60} color="#F8F7F4" />
          </View>

          <Text className="text-5xl font-bold mb-3" style={{ color: '#F8F7F4', fontFamily: 'Georgia, serif' }}>
            KannaAI
          </Text>
          <Text className="text-sm text-center mb-2 leading-5" style={{ color: 'rgba(248,247,244,0.7)' }}>
            Get connected to the{'\n'}best cannabis concierge{'\n'}in your local area
          </Text>

          {/* Get Started button */}
          <Pressable
            onPress={handleGoogleSignIn}
            disabled={isSigningIn}
            className="w-full rounded-2xl py-4 flex-row items-center justify-center gap-3 mt-8"
            style={{
              borderWidth: 1,
              borderColor: 'rgba(248,247,244,0.25)',
              backgroundColor: isSigningIn ? 'rgba(74,103,65,0.3)' : 'rgba(74,103,65,0.5)',
            }}
          >
            <Text className="font-bold text-base" style={{ color: '#F8F7F4' }}>
              {isSigningIn ? 'Signing in...' : 'Get started →'}
            </Text>
          </Pressable>

          <Pressable onPress={handleDevSignIn} className="mt-4">
            <Text className="text-xs" style={{ color: 'rgba(248,247,244,0.4)' }}>Skip (Dev Mode)</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
