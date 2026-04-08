import { View, Text, ScrollView, Pressable, Linking, Platform } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { mockProducts, getProductAvailability } from '../../lib/mock/products';
import { useChatStore } from '../../lib/stores/chatStore';
import { useCartStore } from '../../lib/stores/cartStore';

const categoryLabels: Record<string, string> = {
  flower: 'Flower', edibles: 'Edibles', drinks: 'Drinks',
  concentrates: 'Concentrates', 'pre-rolls': 'Pre-rolls',
  topicals: 'Topicals', tinctures: 'Tinctures', accessories: 'Accessories',
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const sendMessage = useChatStore((s) => s.sendMessage);
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-kanna-bg items-center justify-center">
        <Text className="text-white">Product not found</Text>
      </SafeAreaView>
    );
  }

  const availability = getProductAvailability(product.id);

  const handleNavigate = (lat: number, lng: number, name: string) => {
    const url = Platform.select({
      ios: `maps:0,0?q=${encodeURIComponent(name)}@${lat},${lng}`,
      android: `geo:0,0?q=${lat},${lng}(${encodeURIComponent(name)})`,
      default: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    });
    if (url) Linking.openURL(url);
  };

  return (
    <SafeAreaView className="flex-1 bg-kanna-bg">
      {/* Header */}
      <View className="flex-row items-center px-5 py-3">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#ffffff" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Product image */}
        <View className="w-full aspect-square bg-kanna-surface">
          <Image
            source={{ uri: product.imageUrl }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            transition={200}
          />
        </View>

        <View className="px-5 pt-4">
          {/* Category + Brand */}
          <Text className="text-kanna-text-secondary text-xs uppercase tracking-wider mb-1">
            {categoryLabels[product.category] || product.category} · {product.brand}
          </Text>

          {/* Name */}
          <Text className="text-white font-bold text-2xl mb-2">{product.name}</Text>

          {/* Price + Rating */}
          <View className="flex-row items-center gap-4 mb-4">
            <Text className="text-kanna-green font-bold text-xl">
              ${product.priceMin}–{product.priceMax}
            </Text>
            <View className="flex-row items-center gap-1">
              <Ionicons name="star" size={14} color="#f39c12" />
              <Text className="text-white text-sm font-semibold">{product.rating}</Text>
              <Text className="text-kanna-text-secondary text-xs">({product.reviewCount})</Text>
            </View>
          </View>

          {/* THC/CBD */}
          {(product.thcContent || product.cbdContent) && (
            <View className="flex-row gap-3 mb-4">
              {product.thcContent != null && (
                <View className="bg-kanna-surface rounded-xl px-4 py-3">
                  <Text className="text-kanna-text-secondary text-xs">THC</Text>
                  <Text className="text-white font-bold text-lg">
                    {product.thcContent}{product.category === 'flower' || product.category === 'concentrates' ? '%' : 'mg'}
                  </Text>
                </View>
              )}
              {product.cbdContent != null && product.cbdContent > 0 && (
                <View className="bg-kanna-surface rounded-xl px-4 py-3">
                  <Text className="text-kanna-text-secondary text-xs">CBD</Text>
                  <Text className="text-white font-bold text-lg">
                    {product.cbdContent}{product.category === 'flower' ? '%' : 'mg'}
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Description */}
          <View className="mb-4">
            <Text className="text-white text-sm leading-5">{product.description}</Text>
          </View>

          {/* Tags */}
          {product.tags.length > 0 && (
            <View className="flex-row flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <View key={tag} className="bg-kanna-green/10 px-3 py-1.5 rounded-full">
                  <Text className="text-kanna-green text-xs">{tag}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Available At */}
          <View className="mb-6">
            <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
              Available At
            </Text>
            {availability.length > 0 ? (
              <View className="bg-kanna-surface rounded-2xl overflow-hidden">
                {availability.map((avail, idx) => {
                  const inCart = cartItems.some(
                    (i) => i.product.id === product.id && i.dispensaryId === avail.dispensaryId
                  );
                  return (
                    <View
                      key={avail.dispensaryId}
                      className={`px-4 py-4 ${idx < availability.length - 1 ? 'border-b border-white/5' : ''}`}
                    >
                      <View className="flex-row items-center justify-between mb-2">
                        <View className="flex-1">
                          <View className="flex-row items-center gap-2">
                            <Text className="text-white font-semibold text-sm">{avail.dispensary.name}</Text>
                            {avail.dispensary.isVerified && (
                              <Ionicons name="checkmark-circle" size={14} color="#2ecc71" />
                            )}
                          </View>
                          <Text className="text-kanna-text-secondary text-xs mt-0.5">
                            {avail.dispensary.distance} mi · {avail.dispensary.address}
                          </Text>
                        </View>
                        <Text className="text-kanna-green font-bold text-lg">${avail.price}</Text>
                      </View>
                      <View className="flex-row gap-2">
                        <Pressable
                          onPress={() => {
                            if (!inCart) addItem(product, avail.dispensary, avail.price);
                          }}
                          className={`flex-1 py-2.5 rounded-xl flex-row items-center justify-center gap-2 ${
                            inCart ? 'bg-kanna-surface-light' : 'bg-kanna-green'
                          }`}
                        >
                          <Ionicons name={inCart ? 'checkmark' : 'cart'} size={16} color={inCart ? '#2ecc71' : '#0a0a1a'} />
                          <Text className={`text-sm font-bold ${inCart ? 'text-kanna-green' : 'text-kanna-bg'}`}>
                            {inCart ? 'In Cart' : 'Reserve for Pickup'}
                          </Text>
                        </Pressable>
                        <Pressable
                          onPress={() => handleNavigate(avail.dispensary.latitude, avail.dispensary.longitude, avail.dispensary.name)}
                          className="py-2.5 px-4 rounded-xl bg-kanna-surface-light"
                        >
                          <Ionicons name="navigate" size={16} color="#8a8aa3" />
                        </Pressable>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View className="bg-kanna-surface rounded-2xl p-4 items-center">
                <Text className="text-kanna-text-secondary text-sm">Not available nearby</Text>
              </View>
            )}
          </View>

          {/* Ask Kanna */}
          <Pressable
            onPress={() => {
              sendMessage(`Tell me about ${product.name} by ${product.brand} — is this good for a beginner?`);
              router.replace('/(tabs)/chat');
            }}
            className="bg-kanna-surface rounded-2xl py-4 flex-row items-center justify-center gap-2 mb-3 border border-kanna-green/30"
          >
            <Text className="text-lg">🌿</Text>
            <Text className="text-kanna-green font-bold text-base">Ask Kanna About This</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
