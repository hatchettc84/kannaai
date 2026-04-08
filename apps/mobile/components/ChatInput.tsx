import { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
  };

  return (
    <View className="flex-row items-end gap-2 px-4 py-3 border-t" style={{ backgroundColor: '#FFFFFF', borderColor: '#F2F2F0' }}>
      <Pressable className="w-10 h-10 items-center justify-center">
        <Ionicons name="happy-outline" size={22} color="#8A8A8A" />
      </Pressable>
      <View className="flex-1 rounded-2xl flex-row items-end px-4 py-2 min-h-[44px]" style={{ backgroundColor: '#F2F2F0' }}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message"
          placeholderTextColor="#8A8A8A"
          multiline
          maxLength={500}
          className="flex-1 text-sm max-h-[100px] py-1"
          style={{ color: '#1A1A1A' }}
          onSubmitEditing={handleSend}
          editable={!disabled}
        />
      </View>
      <Pressable
        onPress={handleSend}
        disabled={disabled || !text.trim()}
        className="w-10 h-10 rounded-full items-center justify-center"
        style={{
          backgroundColor: text.trim() && !disabled ? '#4A6741' : '#F2F2F0',
        }}
      >
        <Ionicons
          name="send"
          size={18}
          color={text.trim() && !disabled ? '#FFFFFF' : '#8A8A8A'}
        />
      </Pressable>
    </View>
  );
}
