import { useState } from 'react';
import { View, Text, Pressable, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../lib/stores/authStore';
import { CannabisLeaf } from '../../components/CannabisLeaf';

// Self-hosted on our API domain — replace cannabis-bg.mp4 with a real dispensary video
const VIDEO_URL = 'https://kannaai.vercel.app/cannabis-bg.mp4';

function VideoBackground() {
  if (Platform.OS !== 'web') return null;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      style={{
        position: 'absolute' as any,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover' as any,
        zIndex: 0,
      }}
    >
      <source src={VIDEO_URL} type="video/mp4" />
    </video>
  );
}

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
      <View className="flex-1" style={{ position: 'relative' }}>
        {/* Video Background */}
        <VideoBackground />

        {/* Dark overlay */}
        <View
          className="absolute inset-0"
          style={{
            backgroundColor: 'rgba(20, 30, 18, 0.65)',
            zIndex: 1,
          }}
        />

        {/* Gradient overlay — darker at bottom for text readability */}
        <View
          className="absolute inset-0"
          style={{
            zIndex: 2,
            ...(Platform.OS === 'web'
              ? { background: 'linear-gradient(to bottom, transparent 30%, rgba(10,15,8,0.8) 70%, rgba(10,15,8,0.95) 100%)' }
              : { backgroundColor: 'rgba(10,15,8,0.4)' }),
          }}
        />

        {/* Content */}
        <View className="flex-1 items-center justify-end pb-12 px-8" style={{ zIndex: 10 }}>
          <View className="items-center w-full">
            {/* Logo leaf */}
            <View className="mb-4">
              <CannabisLeaf size={56} color="#F8F7F4" />
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
    </View>
  );
}
