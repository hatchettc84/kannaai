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
    <View className="flex-row items-end gap-2 px-4 py-3 bg-kanna-bg border-t border-white/5">
      <View className="flex-1 bg-kanna-surface rounded-2xl flex-row items-end px-4 py-2 min-h-[44px]">
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Tell me how you're feeling..."
          placeholderTextColor="#8a8aa3"
          multiline
          maxLength={500}
          className="flex-1 text-white text-sm max-h-[100px] py-1"
          onSubmitEditing={handleSend}
          editable={!disabled}
        />
      </View>
      <Pressable
        onPress={handleSend}
        disabled={disabled || !text.trim()}
        className={`w-11 h-11 rounded-full items-center justify-center ${
          text.trim() && !disabled ? 'bg-kanna-green' : 'bg-kanna-surface'
        }`}
      >
        <Ionicons
          name="arrow-up"
          size={22}
          color={text.trim() && !disabled ? '#0a0a1a' : '#8a8aa3'}
        />
      </Pressable>
    </View>
  );
}
