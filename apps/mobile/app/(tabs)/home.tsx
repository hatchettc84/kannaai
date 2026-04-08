import { useState, useRef } from 'react';
import { View, Text, ScrollView, Pressable, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useAuthStore } from '../../lib/stores/authStore';
import { useLocationStore } from '../../lib/stores/locationStore';
import { mockProducts } from '../../lib/mock/products';
import type { Product } from '@kannaai/shared';

const SCREEN_WIDTH = Dimensions.get('window').width;
const BANNER_WIDTH = SCREEN_WIDTH - 40; // px-5 padding on each side

const promoBanners = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=800&q=80',
    title: 'KannaAI Cannabis 🌿',
    discount: '30',
    subtitle: 'The grass is greener with us.\nWe make memories even sweeter.',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1616690002498-89e8e49710c2?w=800&q=80',
    title: 'Premium Edibles 🍪',
    discount: '30',
    subtitle: 'Handcrafted gummies & treats.\nPrecise dosing, incredible flavors.',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1585063560888-e56b8badf8ec?w=800&q=80',
    title: 'New Arrivals ✨',
    discount: '30',
    subtitle: 'Fresh drops every week.\nDiscover trending strains near you.',
  },
];

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
  const [activeBanner, setActiveBanner] = useState(0);

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

        {/* Promo Banner Carousel */}
        <View className="mb-6">
          <FlatList
            horizontal
            pagingEnabled
            data={promoBanners}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            snapToInterval={BANNER_WIDTH + 10}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 20 }}
            onScroll={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / (BANNER_WIDTH + 10));
              setActiveBanner(index);
            }}
            scrollEventThrottle={16}
            renderItem={({ item }) => (
              <View
                className="rounded-2xl overflow-hidden mr-2.5"
                style={{ width: BANNER_WIDTH, height: 170 }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ position: 'absolute', width: '100%', height: '100%' }}
                  contentFit="cover"
                />
                <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(30, 50, 25, 0.65)' }} />
                <View className="flex-1 px-6 justify-center z-10">
                  <Text className="text-sm font-semibold" style={{ color: '#D4A843' }}>
                    {item.title}
                  </Text>
                  <View className="flex-row items-baseline mt-1">
                    <Text className="text-5xl font-black" style={{ color: '#D4A843' }}>{item.discount}</Text>
                    <Text className="text-lg font-bold" style={{ color: '#D4A843' }}>%</Text>
                    <Text className="text-lg font-bold text-white ml-1">OFF</Text>
                  </View>
                  <Text className="text-xs text-white/70 mt-1">{item.subtitle}</Text>
                </View>
              </View>
            )}
          />
          {/* Pagination dots */}
          <View className="flex-row justify-center mt-3 gap-1.5">
            {promoBanners.map((_, i) => (
              <View
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: activeBanner === i ? '#4A6741' : '#D4E8CD' }}
              />
            ))}
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
