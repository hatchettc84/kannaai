import { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '../../lib/stores/cartStore';

const pickupTimes = [
  'ASAP (15-30 min)',
  'In 1 hour',
  'In 2 hours',
  'Later today',
];

export default function CartScreen() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotal, clearCart, placeOrder } = useCartStore();
  const [selectedTime, setSelectedTime] = useState(pickupTimes[0]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ReturnType<typeof placeOrder> | null>(null);

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    const order = placeOrder(selectedTime);
    setConfirmedOrder(order);
    setOrderPlaced(true);
  };

  if (orderPlaced && confirmedOrder) {
    return (
      <SafeAreaView className="flex-1 bg-kanna-bg">
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-24 h-24 rounded-full bg-kanna-green/20 items-center justify-center mb-6">
            <Ionicons name="checkmark-circle" size={56} color="#2ecc71" />
          </View>
          <Text className="text-white font-bold text-2xl mb-2 text-center">Order Confirmed!</Text>
          <Text className="text-kanna-text-secondary text-center text-sm leading-5 mb-2">
            Your order has been sent to
          </Text>
          <Text className="text-kanna-green font-bold text-lg mb-1">{confirmedOrder.dispensary.name}</Text>
          <Text className="text-kanna-text-secondary text-sm mb-6">
            Pickup: {selectedTime}
          </Text>

          <View className="bg-kanna-surface rounded-2xl p-4 w-full mb-6">
            <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
              Order Summary
            </Text>
            {confirmedOrder.items.map((item) => (
              <View key={item.product.id} className="flex-row justify-between py-2">
                <Text className="text-white text-sm flex-1">{item.product.name} x{item.quantity}</Text>
                <Text className="text-kanna-green text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
            <View className="flex-row justify-between pt-3 mt-2 border-t border-white/10">
              <Text className="text-white font-bold">Total</Text>
              <Text className="text-kanna-green font-bold text-lg">${confirmedOrder.total.toFixed(2)}</Text>
            </View>
          </View>

          <Text className="text-kanna-text-secondary text-xs text-center mb-6">
            Order #{confirmedOrder.id.toUpperCase()} · The dispensary will notify you when your order is ready.
          </Text>

          <Pressable
            onPress={() => router.replace('/(tabs)/chat')}
            className="bg-kanna-green w-full rounded-2xl py-4 items-center mb-3"
          >
            <Text className="text-kanna-bg font-bold text-base">Back to Chat</Text>
          </Pressable>
          <Pressable
            onPress={() => router.replace('/(tabs)/explore')}
            className="bg-kanna-surface w-full rounded-2xl py-4 items-center"
          >
            <Text className="text-white font-semibold text-sm">Continue Shopping</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-kanna-bg">
      {/* Header */}
      <View className="flex-row items-center px-5 py-3 border-b border-white/5">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <Text className="text-white font-bold text-lg ml-4 flex-1">Your Cart</Text>
        {items.length > 0 && (
          <Pressable onPress={clearCart}>
            <Text className="text-kanna-error text-sm">Clear</Text>
          </Pressable>
        )}
      </View>

      {items.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="cart-outline" size={64} color="#8a8aa3" />
          <Text className="text-white font-bold text-lg mt-4">Your cart is empty</Text>
          <Text className="text-kanna-text-secondary text-sm mt-2 text-center">
            Browse the Shop and add products to reserve for pickup.
          </Text>
          <Pressable
            onPress={() => router.replace('/(tabs)/explore')}
            className="bg-kanna-green rounded-2xl px-6 py-3 mt-6"
          >
            <Text className="text-kanna-bg font-bold">Browse Shop</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView className="flex-1">
          {/* Dispensary */}
          <View className="px-5 pt-4 pb-2">
            <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-2">
              Pickup From
            </Text>
            <View className="bg-kanna-surface rounded-2xl p-4 flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full bg-kanna-green/20 items-center justify-center">
                <Ionicons name="storefront" size={20} color="#2ecc71" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold text-sm">{items[0]?.dispensary.name}</Text>
                <Text className="text-kanna-text-secondary text-xs">
                  {items[0]?.dispensary.distance} mi · {items[0]?.dispensary.address}
                </Text>
              </View>
            </View>
          </View>

          {/* Items */}
          <View className="px-5 pt-4">
            <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
              Items ({items.length})
            </Text>
            {items.map((item) => (
              <View key={item.product.id} className="bg-kanna-surface rounded-2xl p-4 mb-2">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1">
                    <Text className="text-white font-semibold text-sm">{item.product.name}</Text>
                    <Text className="text-kanna-text-secondary text-xs mt-0.5">{item.product.brand}</Text>
                  </View>
                  <Pressable onPress={() => removeItem(item.product.id)}>
                    <Ionicons name="trash-outline" size={18} color="#e74c3c" />
                  </Pressable>
                </View>
                <View className="flex-row items-center justify-between mt-3">
                  <View className="flex-row items-center gap-3">
                    <Pressable
                      onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-kanna-surface-light items-center justify-center"
                    >
                      <Ionicons name="remove" size={16} color="#ffffff" />
                    </Pressable>
                    <Text className="text-white font-bold text-base w-6 text-center">{item.quantity}</Text>
                    <Pressable
                      onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-kanna-surface-light items-center justify-center"
                    >
                      <Ionicons name="add" size={16} color="#ffffff" />
                    </Pressable>
                  </View>
                  <Text className="text-kanna-green font-bold text-base">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Pickup Time */}
          <View className="px-5 pt-4">
            <Text className="text-kanna-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
              Pickup Time
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {pickupTimes.map((time) => (
                <Pressable
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  className={`px-4 py-2.5 rounded-xl ${
                    selectedTime === time ? 'bg-kanna-green' : 'bg-kanna-surface'
                  }`}
                >
                  <Text className={`text-sm font-semibold ${
                    selectedTime === time ? 'text-kanna-bg' : 'text-kanna-text-secondary'
                  }`}>{time}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Order Summary */}
          <View className="px-5 pt-6 pb-4">
            <View className="bg-kanna-surface rounded-2xl p-4">
              <View className="flex-row justify-between py-1">
                <Text className="text-kanna-text-secondary text-sm">Subtotal</Text>
                <Text className="text-white text-sm">${getTotal().toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between py-1">
                <Text className="text-kanna-text-secondary text-sm">Tax (est.)</Text>
                <Text className="text-white text-sm">${(getTotal() * 0.0975).toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between pt-3 mt-2 border-t border-white/10">
                <Text className="text-white font-bold text-base">Total</Text>
                <Text className="text-kanna-green font-bold text-lg">
                  ${(getTotal() * 1.0975).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          {/* Place Order */}
          <View className="px-5 pb-8">
            <Pressable
              onPress={handlePlaceOrder}
              className="bg-kanna-green rounded-2xl py-4 flex-row items-center justify-center gap-2"
            >
              <Ionicons name="bag-check" size={20} color="#0a0a1a" />
              <Text className="text-kanna-bg font-bold text-base">
                Reserve for Pickup · ${(getTotal() * 1.0975).toFixed(2)}
              </Text>
            </Pressable>
            <Text className="text-kanna-text-secondary text-xs text-center mt-3">
              Pay at the dispensary when you pick up. No charge until pickup.
            </Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
