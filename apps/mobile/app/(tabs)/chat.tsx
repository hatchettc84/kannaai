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

  // Personalize greeting when user name is available
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
      <View className="flex-row items-center px-5 py-3 border-b border-white/5">
        <Text className="text-2xl mr-2">🌿</Text>
        <View className="flex-1">
          <Text className="text-white font-bold text-lg">Kanna</Text>
          <Text className="text-kanna-text-secondary text-xs">
            {useRealAI ? 'AI Powered' : 'Demo Mode'}
          </Text>
        </View>
        <Pressable onPress={toggleAI} className="mr-3 px-3 py-1.5 rounded-full bg-kanna-surface">
          <Text className={`text-xs font-semibold ${useRealAI ? 'text-kanna-green' : 'text-kanna-text-secondary'}`}>
            {useRealAI ? 'AI ON' : 'DEMO'}
          </Text>
        </Pressable>
        <Pressable onPress={clearChat}>
          <Ionicons name="create-outline" size={22} color="#8a8aa3" />
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
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            isLoading ? (
              <View className="flex-row items-center gap-2 mb-4 ml-1">
                <Text className="text-lg">🌿</Text>
                <ActivityIndicator size="small" color="#2ecc71" />
                <Text className="text-kanna-text-secondary text-xs">Kanna is thinking...</Text>
              </View>
            ) : null
          }
        />

        <ChatInput onSend={(text) => sendMessage(text, userName)} disabled={isLoading} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
