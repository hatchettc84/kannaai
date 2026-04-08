import { useState } from 'react';
import { View, Text, Pressable, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../lib/stores/authStore';

export default function AgeGateScreen() {
  const router = useRouter();
  const { verifyAge, user } = useAuthStore();
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');

  const isValid = month.length >= 1 && day.length >= 1 && year.length === 4;

  const handleVerify = async () => {
    setError('');
    const m = month.padStart(2, '0');
    const d = day.padStart(2, '0');
    const dateStr = `${year}-${m}-${d}`;
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
      setError('Please enter a valid date');
      return;
    }

    try {
      await verifyAge(dateStr);
      router.replace('/(auth)/location-permission');
    } catch (err: any) {
      setError(err.message || 'Age verification failed');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-kanna-bg">
      <View className="flex-1 items-center justify-center px-8">
        <View className="w-20 h-20 rounded-full bg-kanna-warning/20 items-center justify-center mb-6">
          <Ionicons name="shield-checkmark" size={40} color="#f39c12" />
        </View>

        <Text className="text-white font-bold text-2xl mb-2 text-center">Age Verification</Text>
        {user?.name && (
          <Text className="text-kanna-green text-sm mb-3">Welcome, {user.name}!</Text>
        )}
        <Text className="text-kanna-text-secondary text-center text-sm leading-5 mb-8 max-w-[300px]">
          You must be 21 years or older to use KannaAI. Please enter your date of birth.
        </Text>

        {/* Date of Birth Input */}
        <View className="flex-row gap-3 mb-4 w-full">
          <View className="flex-1">
            <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-2 text-center">
              Month
            </Text>
            <View className="bg-kanna-surface rounded-2xl px-4 py-3">
              <TextInput
                value={month}
                onChangeText={(t) => setMonth(t.replace(/[^0-9]/g, '').slice(0, 2))}
                placeholder="MM"
                placeholderTextColor="#8a8aa3"
                className="text-white text-lg text-center font-bold"
                keyboardType="number-pad"
                maxLength={2}
              />
            </View>
          </View>
          <View className="flex-1">
            <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-2 text-center">
              Day
            </Text>
            <View className="bg-kanna-surface rounded-2xl px-4 py-3">
              <TextInput
                value={day}
                onChangeText={(t) => setDay(t.replace(/[^0-9]/g, '').slice(0, 2))}
                placeholder="DD"
                placeholderTextColor="#8a8aa3"
                className="text-white text-lg text-center font-bold"
                keyboardType="number-pad"
                maxLength={2}
              />
            </View>
          </View>
          <View className="flex-1">
            <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-2 text-center">
              Year
            </Text>
            <View className="bg-kanna-surface rounded-2xl px-4 py-3">
              <TextInput
                value={year}
                onChangeText={(t) => setYear(t.replace(/[^0-9]/g, '').slice(0, 4))}
                placeholder="YYYY"
                placeholderTextColor="#8a8aa3"
                className="text-white text-lg text-center font-bold"
                keyboardType="number-pad"
                maxLength={4}
              />
            </View>
          </View>
        </View>

        {error ? (
          <Text className="text-kanna-error text-sm mb-4">{error}</Text>
        ) : null}

        <Pressable
          onPress={handleVerify}
          disabled={!isValid}
          className={`w-full rounded-2xl py-4 items-center mt-2 ${
            isValid ? 'bg-kanna-green' : 'bg-kanna-surface'
          }`}
        >
          <Text className={`font-bold text-base ${
            isValid ? 'text-kanna-bg' : 'text-kanna-text-secondary'
          }`}>Verify My Age</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
