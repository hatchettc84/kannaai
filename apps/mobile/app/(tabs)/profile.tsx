import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../lib/stores/authStore';
import { useChatStore } from '../../lib/stores/chatStore';

const menuItems = [
  { icon: 'heart-outline' as const, label: 'Favorite Strains' },
  { icon: 'time-outline' as const, label: 'Order History' },
  { icon: 'storefront-outline' as const, label: 'Saved Dispensaries' },
  { icon: 'notifications-outline' as const, label: 'Notifications' },
  { icon: 'settings-outline' as const, label: 'Preferences' },
  { icon: 'help-circle-outline' as const, label: 'Help & Support' },
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
        <View className="px-5 pt-3 pb-6">
          <Text className="text-lg font-bold mb-6" style={{ color: '#1A1A1A' }}>Profile</Text>

          {/* Avatar & Name */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 rounded-full items-center justify-center mb-3" style={{ backgroundColor: '#D4E8CD' }}>
              <Text className="text-3xl">🌿</Text>
            </View>
            <Text className="text-xl font-bold" style={{ color: '#1A1A1A' }}>{user?.name || 'Cannabis Enthusiast'}</Text>
            <Text className="text-sm mt-1" style={{ color: '#8A8A8A' }}>{user?.email || 'Member since 2026'}</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-5 mb-6">
          <View className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#F8F7F4' }}>
            {menuItems.map((item, idx) => (
              <Pressable
                key={item.label}
                className={`flex-row items-center px-4 py-4 ${
                  idx < menuItems.length - 1 ? 'border-b' : ''
                }`}
                style={{ borderColor: '#F2F2F0' }}
              >
                <Ionicons name={item.icon} size={22} color="#4A6741" />
                <Text className="text-sm flex-1 ml-3" style={{ color: '#1A1A1A' }}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={18} color="#8A8A8A" />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Sign Out */}
        <View className="px-5 mb-12">
          <Pressable onPress={handleSignOut} className="rounded-2xl py-4 items-center" style={{ backgroundColor: '#F8F7F4' }}>
            <Text className="text-sm font-semibold" style={{ color: '#D4534B' }}>Sign Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
