import { useState, useMemo } from 'react';
import { View, Text, TextInput, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ProductCard } from '../../components/ProductCard';
import { mockProducts } from '../../lib/mock/products';
import { useCartStore } from '../../lib/stores/cartStore';
import type { ProductCategory } from '@kannaai/shared';

const categories: { label: string; value: ProductCategory | 'all'; icon: string }[] = [
  { label: 'All', value: 'all', icon: 'grid-outline' },
  { label: 'Flower', value: 'flower', icon: 'leaf-outline' },
  { label: 'Edibles', value: 'edibles', icon: 'nutrition-outline' },
  { label: 'Drinks', value: 'drinks', icon: 'beer-outline' },
  { label: 'Pre-rolls', value: 'pre-rolls', icon: 'flame-outline' },
  { label: 'Concentrates', value: 'concentrates', icon: 'diamond-outline' },
  { label: 'Topicals', value: 'topicals', icon: 'hand-left-outline' },
  { label: 'Tinctures', value: 'tinctures', icon: 'water-outline' },
  { label: 'Accessories', value: 'accessories', icon: 'settings-outline' },
];

export default function ShopScreen() {
  const router = useRouter();
  const cartItemCount = useCartStore((s) => s.getItemCount());
  const cartTotal = useCartStore((s) => s.getTotal());
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');

  const filtered = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch = !search ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <SafeAreaView className="flex-1 bg-kanna-bg" edges={['top']}>
      <View className="px-4 pt-3 pb-2">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-white font-bold text-2xl">Shop</Text>
          <Text className="text-kanna-text-secondary text-xs">{filtered.length} products</Text>
        </View>

        {/* Search */}
        <View className="bg-kanna-surface rounded-2xl flex-row items-center px-4 py-3 mb-4">
          <Ionicons name="search" size={20} color="#8a8aa3" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search products, brands..."
            placeholderTextColor="#8a8aa3"
            className="flex-1 text-white text-sm ml-3"
          />
          {search ? (
            <Pressable onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color="#8a8aa3" />
            </Pressable>
          ) : null}
        </View>

        {/* Category chips */}
        <FlatList
          horizontal
          data={categories}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.value}
          contentContainerStyle={{ paddingBottom: 8 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setActiveCategory(item.value)}
              className={`mr-2 px-3 py-2 rounded-full flex-row items-center gap-1.5 ${
                activeCategory === item.value ? 'bg-kanna-green' : 'bg-kanna-surface'
              }`}
            >
              <Ionicons
                name={item.icon as any}
                size={14}
                color={activeCategory === item.value ? '#0a0a1a' : '#8a8aa3'}
              />
              <Text className={`text-xs font-semibold ${
                activeCategory === item.value ? 'text-kanna-bg' : 'text-kanna-text-secondary'
              }`}>{item.label}</Text>
            </Pressable>
          )}
        />
      </View>

      {/* Product grid */}
      <FlatList
        data={filtered}
        numColumns={2}
        renderItem={({ item }) => (
          <View className="flex-1 px-1.5">
            <ProductCard product={item} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20 }}
        columnWrapperStyle={{ gap: 0 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Ionicons name="storefront-outline" size={48} color="#8a8aa3" />
            <Text className="text-kanna-text-secondary mt-3 text-sm">No products found</Text>
          </View>
        }
      />

      {/* Floating cart button */}
      {cartItemCount > 0 && (
        <Pressable
          onPress={() => router.push('/cart')}
          className="absolute bottom-24 left-5 right-5 bg-kanna-green rounded-2xl py-4 px-5 flex-row items-center justify-between"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 }}
        >
          <View className="flex-row items-center gap-2">
            <Ionicons name="cart" size={20} color="#0a0a1a" />
            <View className="bg-kanna-bg/30 w-6 h-6 rounded-full items-center justify-center">
              <Text className="text-kanna-bg text-xs font-bold">{cartItemCount}</Text>
            </View>
          </View>
          <Text className="text-kanna-bg font-bold text-base">
            View Cart · ${cartTotal.toFixed(2)}
          </Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}
