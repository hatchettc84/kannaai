import { useRef, useEffect } from 'react';
import { View, FlatList, KeyboardAvoidingView, Platform, Text, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useChatStore } from '../../lib/stores/chatStore';
import { useAuthStore } from '../../lib/stores/authStore';
import { MessageBubble } from '../../components/MessageBubble';
import { ChatInput } from '../../components/ChatInput';
import type { ChatMessage } from '@kannaai/shared';

export default function ChatScreen() {
  const { messages, isLoading, sendMessage, clearChat, setGreeting, useRealAI, toggleAI } = useChatStore();
  const userName = useAuthStore((s) => s.user?.name);
  const flatListRef = useRef<FlatList>(null);
  const greetingSet = useRef(false);

  useEffect(() => {
    if (userName && !greetingSet.current) {
      setGreeting(userName);
      greetingSet.current = true;
    }
  }, [userName, setGreeting]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <MessageBubble message={item} />
  );

  return (
    <SafeAreaView className="flex-1 bg-kanna-bg" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-3 border-b" style={{ borderColor: '#F2F2F0' }}>
        <View className="w-9 h-9 rounded-full items-center justify-center mr-3" style={{ backgroundColor: '#4A6741' }}>
          <Text className="text-white text-sm font-bold">K</Text>
        </View>
        <View className="flex-1">
          <Text className="font-bold text-base" style={{ color: '#1A1A1A' }}>Kanna</Text>
          <Text className="text-[10px]" style={{ color: useRealAI ? '#5B8C51' : '#8A8A8A' }}>
            {useRealAI ? 'AI Powered' : 'Demo Mode'}
          </Text>
        </View>
        <Pressable onPress={toggleAI} className="mr-3 px-3 py-1.5 rounded-full" style={{ backgroundColor: '#F2F2F0' }}>
          <Text className="text-[10px] font-semibold" style={{ color: useRealAI ? '#4A6741' : '#8A8A8A' }}>
            {useRealAI ? 'AI ON' : 'DEMO'}
          </Text>
        </Pressable>
        <Pressable onPress={clearChat}>
          <Ionicons name="create-outline" size={20} color="#8A8A8A" />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
          style={{ backgroundColor: '#F8F7F4' }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            isLoading ? (
              <View className="flex-row items-center gap-2 mb-4 ml-1">
                <View className="w-7 h-7 rounded-full items-center justify-center" style={{ backgroundColor: '#4A6741' }}>
                  <Text className="text-white text-[10px] font-bold">K</Text>
                </View>
                <ActivityIndicator size="small" color="#4A6741" />
                <Text className="text-xs" style={{ color: '#8A8A8A' }}>Kanna is thinking...</Text>
              </View>
            ) : null
          }
        />

        <ChatInput onSend={(text) => sendMessage(text, userName)} disabled={isLoading} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
