import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../lib/stores/authStore';

export default function SignInScreen() {
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!email.trim()) return;
    signIn(email.trim());
    router.replace('/(tabs)/chat');
  };

  return (
    <SafeAreaView className="flex-1 bg-kanna-bg">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="px-6 pt-4">
          <Pressable onPress={() => router.back()} className="mb-6">
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>

          <Text className="text-white font-bold text-3xl mb-2">Welcome Back</Text>
          <Text className="text-kanna-text-secondary text-sm mb-8">
            Sign in to continue your Kanna experience
          </Text>

          {/* Email */}
          <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-2">
            Email
          </Text>
          <View className="bg-kanna-surface rounded-2xl px-4 py-3 mb-4">
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="#8a8aa3"
              className="text-white text-sm"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-2">
            Password
          </Text>
          <View className="bg-kanna-surface rounded-2xl px-4 py-3 mb-3">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Your password"
              placeholderTextColor="#8a8aa3"
              className="text-white text-sm"
              secureTextEntry
            />
          </View>

          <Pressable className="self-end mb-8">
            <Text className="text-kanna-green text-sm">Forgot password?</Text>
          </Pressable>

          <Pressable
            onPress={handleSignIn}
            className={`rounded-2xl py-4 items-center mb-4 ${
              email.trim() ? 'bg-kanna-green' : 'bg-kanna-surface'
            }`}
          >
            <Text className={`font-bold text-base ${
              email.trim() ? 'text-kanna-bg' : 'text-kanna-text-secondary'
            }`}>Sign In</Text>
          </Pressable>

          {/* Divider */}
          <View className="flex-row items-center mb-4">
            <View className="flex-1 h-[1px] bg-white/10" />
            <Text className="text-kanna-text-secondary text-xs mx-4">or continue with</Text>
            <View className="flex-1 h-[1px] bg-white/10" />
          </View>

          {/* OAuth buttons */}
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => { signIn('user@google.com'); router.replace('/(tabs)/chat'); }}
              className="flex-1 bg-kanna-surface rounded-2xl py-4 flex-row items-center justify-center gap-2"
            >
              <Ionicons name="logo-google" size={20} color="#ffffff" />
              <Text className="text-white font-semibold text-sm">Google</Text>
            </Pressable>
            <Pressable
              onPress={() => { signIn('user@apple.com'); router.replace('/(tabs)/chat'); }}
              className="flex-1 bg-kanna-surface rounded-2xl py-4 flex-row items-center justify-center gap-2"
            >
              <Ionicons name="logo-apple" size={20} color="#ffffff" />
              <Text className="text-white font-semibold text-sm">Apple</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
