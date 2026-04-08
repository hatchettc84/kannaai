import { View, Text, ScrollView, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useAuthStore } from '../../lib/stores/authStore';
import { useLocationStore } from '../../lib/stores/locationStore';
import { mockProducts } from '../../lib/mock/products';
import type { Product } from '@kannaai/shared';

function ProductCardSmall({ product }: { product: Product }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      className="w-40 mr-3 rounded-2xl overflow-hidden"
      style={{ backgroundColor: '#D4E8CD' }}
    >
      {/* THC/CBD header */}
      <View className="flex-row justify-between px-3 pt-2">
        <Text className="text-[10px] font-semibold" style={{ color: '#4A6741' }}>
          {product.thcContent != null ? `THC ${product.thcContent}%` : ''}
        </Text>
        <Text className="text-[10px] font-semibold" style={{ color: '#4A6741' }}>
          {product.cbdContent != null ? `CBD ${product.cbdContent}` : ''}
        </Text>
      </View>
      {/* Image */}
      <View className="h-24 items-center justify-center px-2">
        <Image
          source={{ uri: product.imageUrl }}
          style={{ width: 80, height: 80, borderRadius: 40 }}
          contentFit="cover"
          transition={200}
        />
      </View>
      {/* Footer */}
      <View className="px-3 pb-3 pt-1">
        <Text className="text-sm font-bold" style={{ color: '#1A1A1A' }} numberOfLines={1}>{product.name}</Text>
        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-[10px] font-semibold uppercase" style={{ color: '#4A6741' }}>
            {product.category}
          </Text>
          <Text className="text-xs font-bold" style={{ color: '#1A1A1A' }}>${product.priceMin}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function FeaturedCard({ product }: { product: Product }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      className="rounded-2xl overflow-hidden mb-3 flex-row"
      style={{ backgroundColor: '#4A6741', height: 100 }}
    >
      <Image
        source={{ uri: product.imageUrl }}
        style={{ width: 100, height: 100 }}
        contentFit="cover"
      />
      <View className="flex-1 px-4 justify-center">
        <Text className="text-white font-bold text-sm" numberOfLines={1}>{product.name}</Text>
        <Text className="text-white/70 text-xs mt-0.5 uppercase">{product.category}</Text>
        {product.thcContent != null && (
          <View className="bg-white/20 self-start px-2 py-0.5 rounded-full mt-2">
            <Text className="text-white text-[10px] font-bold">
              {product.thcContent}{product.category === 'flower' ? '%' : 'mg'} THC
            </Text>
          </View>
        )}
      </View>
      <View className="justify-center pr-4">
        <Text className="text-white font-bold text-lg">${product.priceMin}</Text>
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const userName = useAuthStore((s) => s.user?.name) || 'Friend';
  const city = useLocationStore((s) => s.city) || 'Your area';

  const popularItems = mockProducts.slice(0, 5);
  const featuredItems = mockProducts.slice(3, 7);

  return (
    <SafeAreaView className="flex-1 bg-kanna-bg" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center px-5 pt-3 pb-4">
          <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: '#D4E8CD' }}>
            <Text className="text-lg">🌿</Text>
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold" style={{ color: '#1A1A1A' }}>
              Hello {userName.split(' ')[0]} 👋
            </Text>
            <Text className="text-xs" style={{ color: '#8A8A8A' }}>{city}</Text>
          </View>
          <Pressable className="mr-3">
            <Ionicons name="notifications-outline" size={24} color="#1A1A1A" />
          </Pressable>
          <Pressable>
            <Ionicons name="ellipsis-vertical" size={20} color="#1A1A1A" />
          </Pressable>
        </View>

        {/* Promo Banner */}
        <View className="px-5 mb-6">
          <View className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#4A6741', height: 160 }}>
            <View className="flex-1 px-6 justify-center">
              <Text className="text-sm font-semibold" style={{ color: '#D4A843' }}>
                KannaAI Cannabis 🌿
              </Text>
              <View className="flex-row items-baseline mt-1">
                <Text className="text-5xl font-black" style={{ color: '#D4A843' }}>70</Text>
                <Text className="text-lg font-bold" style={{ color: '#D4A843' }}>%</Text>
                <Text className="text-lg font-bold text-white ml-1">OFF</Text>
              </View>
              <Text className="text-xs text-white/70 mt-1">
                The grass is greener with us.{'\n'}We make memories even sweeter.
              </Text>
            </View>
            {/* Pagination dots */}
            <View className="flex-row justify-center pb-3 gap-1.5">
              <View className="w-2 h-2 rounded-full bg-white" />
              <View className="w-2 h-2 rounded-full bg-white/30" />
              <View className="w-2 h-2 rounded-full bg-white/30" />
            </View>
          </View>
        </View>

        {/* Popular Items */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between px-5 mb-3">
            <Text className="text-lg font-bold" style={{ color: '#1A1A1A' }}>Popular items</Text>
            <Pressable onPress={() => router.push('/(tabs)/explore')}>
              <Ionicons name="arrow-forward" size={20} color="#D4534B" />
            </Pressable>
          </View>
          <FlatList
            horizontal
            data={popularItems}
            renderItem={({ item }) => <ProductCardSmall product={item} />}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 8 }}
          />
        </View>

        {/* Featured Items */}
        <View className="px-5 mb-8">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold" style={{ color: '#1A1A1A' }}>Featured items</Text>
            <Pressable onPress={() => router.push('/(tabs)/explore')}>
              <Ionicons name="arrow-forward" size={20} color="#D4534B" />
            </Pressable>
          </View>
          {featuredItems.map((product) => (
            <FeaturedCard key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
