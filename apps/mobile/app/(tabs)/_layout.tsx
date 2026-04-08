import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '../../lib/stores/cartStore';

function TabIcon({ name, color, focused }: { name: string; color: string; focused: boolean }) {
  if (focused) {
    return (
      <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: '#D4534B' }}>
        <Ionicons name={name as any} size={20} color="#FFFFFF" />
      </View>
    );
  }
  return <Ionicons name={name as any} size={24} color={color} />;
}

export default function TabLayout() {
  const cartCount = useCartStore((s) => s.getItemCount());

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#F2F2F0',
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 30,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#D4534B',
        tabBarInactiveTintColor: '#8A8A8A',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Category',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="grid" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="chatbubble-ellipses" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <TabIcon name="cart" color={color} focused={focused} />
              {cartCount > 0 && (
                <View className="absolute -top-1 -right-2 bg-kanna-coral w-4 h-4 rounded-full items-center justify-center">
                  <Text className="text-white text-[8px] font-bold">{cartCount}</Text>
                </View>
              )}
            </View>
          ),
          href: '/cart',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="person" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
