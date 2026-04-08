import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { Product } from '@kannaai/shared';

const categoryLabels: Record<string, { label: string; color: string }> = {
  flower: { label: 'Flower', color: '#2ecc71' },
  edibles: { label: 'Edibles', color: '#e74c3c' },
  drinks: { label: 'Drinks', color: '#f39c12' },
  concentrates: { label: 'Concentrates', color: '#f1c40f' },
  'pre-rolls': { label: 'Pre-rolls', color: '#9b59b6' },
  topicals: { label: 'Topicals', color: '#27ae60' },
  tinctures: { label: 'Tinctures', color: '#3498db' },
  accessories: { label: 'Accessories', color: '#95a5a6' },
};

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const cat = categoryLabels[product.category] || { label: product.category, color: '#8a8aa3' };

  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      className="flex-1 bg-kanna-surface-light rounded-2xl overflow-hidden mb-3 border border-white/5"
    >
      {/* Image */}
      <View className="w-full aspect-square bg-kanna-surface relative">
        <Image
          source={{ uri: product.imageUrl }}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          placeholder={{ blurhash: 'L5H2EC=PM+yV0g-mq.wG9c010J}I' }}
          transition={200}
        />
        {/* Category badge */}
        <View
          className="absolute top-2 left-2 px-2 py-1 rounded-full"
          style={{ backgroundColor: cat.color + '33' }}
        >
          <Text style={{ color: cat.color }} className="text-[10px] font-bold">
            {cat.label}
          </Text>
        </View>
      </View>

      {/* Info */}
      <View className="p-3">
        <Text className="text-white font-bold text-sm" numberOfLines={1}>
          {product.name}
        </Text>
        <Text className="text-kanna-text-secondary text-xs mt-0.5" numberOfLines={1}>
          {product.brand}
        </Text>
        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-kanna-green font-bold text-sm">
            ${product.priceMin}–{product.priceMax}
          </Text>
          <View className="flex-row items-center gap-0.5">
            <Ionicons name="star" size={10} color="#f39c12" />
            <Text className="text-kanna-text-secondary text-[10px]">{product.rating}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
