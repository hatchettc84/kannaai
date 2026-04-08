import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

const categories = [
  { id: 'pre-rolls', label: 'Pre Rolls', image: 'https://placehold.co/200x200/A8C99B/4A6741?text=🚬' },
  { id: 'flower', label: 'Flower', image: 'https://placehold.co/200x200/A8C99B/4A6741?text=🌿' },
  { id: 'edibles', label: 'Edibles', image: 'https://placehold.co/200x200/A8C99B/4A6741?text=🍪' },
  { id: 'tinctures', label: 'Tincture', image: 'https://placehold.co/200x200/A8C99B/4A6741?text=💧' },
  { id: 'concentrates', label: 'Extracts', image: 'https://placehold.co/200x200/A8C99B/4A6741?text=💎' },
  { id: 'topicals', label: 'Topicals', image: 'https://placehold.co/200x200/A8C99B/4A6741?text=🧴' },
];

export default function CategoryScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-kanna-bg" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-5 pt-3 pb-4">
        <Pressable onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </Pressable>
        <Text className="text-lg font-bold flex-1 text-center" style={{ color: '#1A1A1A' }}>
          All Categories
        </Text>
        <View className="w-8" />
      </View>

      {/* Search */}
      <View className="px-5 mb-5">
        <View className="flex-row items-center px-4 py-3 rounded-xl" style={{ backgroundColor: '#F2F2F0' }}>
          <Ionicons name="search" size={20} color="#8A8A8A" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Browse for anything..."
            placeholderTextColor="#8A8A8A"
            className="flex-1 text-sm ml-3"
            style={{ color: '#1A1A1A' }}
          />
        </View>
      </View>

      {/* Category Grid */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        <View className="flex-row flex-wrap" style={{ gap: 12 }}>
          {categories.map((cat) => (
            <Pressable
              key={cat.id}
              className="rounded-2xl overflow-hidden"
              style={{
                width: '47%',
                backgroundColor: '#D4E8CD',
                aspectRatio: 0.9,
              }}
            >
              {/* Label */}
              <Text
                className="text-base font-bold px-3 pt-3"
                style={{ color: '#C27B5A' }}
              >
                {cat.label}
              </Text>
              {/* Image */}
              <View className="flex-1 items-center justify-center">
                <Image
                  source={{ uri: cat.image }}
                  style={{ width: '80%', height: '80%', borderRadius: 16 }}
                  contentFit="cover"
                  transition={200}
                />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
