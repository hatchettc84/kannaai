import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../lib/stores/authStore';
import { useChatStore } from '../../lib/stores/chatStore';

const preferences = [
  { icon: 'speedometer-outline' as const, label: 'Tolerance', value: 'Medium' },
  { icon: 'leaf-outline' as const, label: 'Preferred Type', value: 'Sativa, Hybrid' },
  { icon: 'medical-outline' as const, label: 'Medical', value: 'None set' },
];

const menuItems = [
  { icon: 'heart-outline' as const, label: 'Favorite Strains', count: 3 },
  { icon: 'time-outline' as const, label: 'Chat History', count: 5 },
  { icon: 'storefront-outline' as const, label: 'Saved Dispensaries', count: 2 },
  { icon: 'notifications-outline' as const, label: 'Deal Alerts', count: null },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuthStore();
  const clearChat = useChatStore((s) => s.clearChat);

  const handleSignOut = async () => {
    clearChat();
    await signOut();
    router.replace('/(auth)/welcome');
  };

  return (
    <SafeAreaView className="flex-1 bg-kanna-bg" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-3 pb-6">
          <Text className="text-white font-bold text-2xl mb-6">Profile</Text>

          {/* Avatar & Name */}
          <View className="items-center mb-6">
            <View className="w-20 h-20 rounded-full bg-kanna-green/20 items-center justify-center mb-3">
              <Text className="text-3xl">🌿</Text>
            </View>
            <Text className="text-white font-bold text-xl">{user?.name || 'Cannabis Enthusiast'}</Text>
            <Text className="text-kanna-text-secondary text-sm mt-1">
              {user?.email || 'Member since 2026'}
            </Text>
          </View>
        </View>

        {/* Preferences */}
        <View className="px-5 mb-6">
          <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            Preferences
          </Text>
          <View className="bg-kanna-surface rounded-2xl overflow-hidden">
            {preferences.map((pref, idx) => (
              <Pressable
                key={pref.label}
                className={`flex-row items-center px-4 py-4 ${
                  idx < preferences.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <Ionicons name={pref.icon} size={22} color="#8a8aa3" />
                <Text className="text-white text-sm flex-1 ml-3">{pref.label}</Text>
                <Text className="text-kanna-text-secondary text-sm">{pref.value}</Text>
                <Ionicons name="chevron-forward" size={18} color="#8a8aa3" style={{ marginLeft: 8 }} />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-5 mb-6">
          <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            My Stuff
          </Text>
          <View className="bg-kanna-surface rounded-2xl overflow-hidden">
            {menuItems.map((item, idx) => (
              <Pressable
                key={item.label}
                className={`flex-row items-center px-4 py-4 ${
                  idx < menuItems.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <Ionicons name={item.icon} size={22} color="#8a8aa3" />
                <Text className="text-white text-sm flex-1 ml-3">{item.label}</Text>
                {item.count !== null && (
                  <View className="bg-kanna-green/20 px-2 py-0.5 rounded-full mr-2">
                    <Text className="text-kanna-green text-xs font-semibold">{item.count}</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={18} color="#8a8aa3" />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Sign Out */}
        <View className="px-5 mb-12">
          <Pressable onPress={handleSignOut} className="bg-kanna-surface rounded-2xl py-4 items-center">
            <Text className="text-kanna-error text-sm font-semibold">Sign Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
