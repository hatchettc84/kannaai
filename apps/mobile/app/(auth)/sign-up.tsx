import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../lib/stores/authStore';

export default function SignUpScreen() {
  const router = useRouter();
  const signUp = useAuthStore((s) => s.signUp);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!name.trim() || !email.trim()) return;
    signUp(name.trim(), email.trim());
    router.replace('/(tabs)/chat');
  };

  return (
    <SafeAreaView className="flex-1 bg-kanna-bg">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="px-6 pt-4">
          <Pressable onPress={() => router.back()} className="mb-6">
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>

          <Text className="text-white font-bold text-3xl mb-2">Create Account</Text>
          <Text className="text-kanna-text-secondary text-sm mb-8">
            Join KannaAI and get personalized cannabis recommendations
          </Text>

          {/* Name */}
          <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-2">
            Full Name
          </Text>
          <View className="bg-kanna-surface rounded-2xl px-4 py-3 mb-4">
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor="#8a8aa3"
              className="text-white text-sm"
              autoCapitalize="words"
            />
          </View>

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
          <View className="bg-kanna-surface rounded-2xl px-4 py-3 mb-8">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              placeholderTextColor="#8a8aa3"
              className="text-white text-sm"
              secureTextEntry
            />
          </View>

          <Pressable
            onPress={handleSignUp}
            className={`rounded-2xl py-4 items-center mb-4 ${
              name.trim() && email.trim() ? 'bg-kanna-green' : 'bg-kanna-surface'
            }`}
          >
            <Text className={`font-bold text-base ${
              name.trim() && email.trim() ? 'text-kanna-bg' : 'text-kanna-text-secondary'
            }`}>Create Account</Text>
          </Pressable>

          {/* Divider */}
          <View className="flex-row items-center mb-4">
            <View className="flex-1 h-[1px] bg-white/10" />
            <Text className="text-kanna-text-secondary text-xs mx-4">or continue with</Text>
            <View className="flex-1 h-[1px] bg-white/10" />
          </View>

          {/* OAuth buttons */}
          <View className="flex-row gap-3 mb-6">
            <Pressable
              onPress={() => { signUp('User', 'user@google.com'); router.replace('/(tabs)/chat'); }}
              className="flex-1 bg-kanna-surface rounded-2xl py-4 flex-row items-center justify-center gap-2"
            >
              <Ionicons name="logo-google" size={20} color="#ffffff" />
              <Text className="text-white font-semibold text-sm">Google</Text>
            </Pressable>
            <Pressable
              onPress={() => { signUp('User', 'user@apple.com'); router.replace('/(tabs)/chat'); }}
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
