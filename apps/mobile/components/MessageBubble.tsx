import { View, Text } from 'react-native';
import type { ChatMessage } from '@kannaai/shared';
import { StrainCard } from './StrainCard';
import { DispensaryCard } from './DispensaryCard';

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <View className={`mb-4 ${isUser ? 'items-end' : 'items-start'}`}>
      {!isUser && (
        <View className="flex-row items-center gap-2 mb-1.5 ml-1">
          <View className="w-7 h-7 rounded-full items-center justify-center" style={{ backgroundColor: '#4A6741' }}>
            <Text className="text-white text-[10px] font-bold">K</Text>
          </View>
          <Text className="text-[10px] font-semibold" style={{ color: '#4A6741' }}>Kanna</Text>
        </View>
      )}

      <View className="flex-row items-end gap-2">
        <View
          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
            isUser ? 'rounded-br-md' : 'rounded-bl-md ml-9'
          }`}
          style={{
            backgroundColor: isUser ? '#F2F2F0' : '#FFFFFF',
            ...(isUser ? {} : { borderWidth: 1, borderColor: '#F2F2F0' }),
          }}
        >
          <Text className="text-sm leading-5" style={{ color: '#1A1A1A' }}>
            {message.content}
          </Text>
        </View>
        {isUser && (
          <View className="w-7 h-7 rounded-full items-center justify-center" style={{ backgroundColor: '#D4E8CD' }}>
            <Text className="text-[10px]">👤</Text>
          </View>
        )}
      </View>

      {/* Timestamp */}
      <Text className={`text-[10px] mt-1 ${isUser ? 'mr-10' : 'ml-10'}`} style={{ color: '#5B8C51' }}>
        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>

      {message.strainCards && message.strainCards.length > 0 && (
        <View className="w-full mt-2 max-w-[90%] ml-9">
          {message.strainCards.map((strain) => (
            <StrainCard key={strain.id} strain={strain} />
          ))}
        </View>
      )}

      {message.dispensaryCards && message.dispensaryCards.length > 0 && (
        <View className="w-full mt-2 max-w-[90%] ml-9">
          {message.dispensaryCards.map((dispensary) => (
            <DispensaryCard key={dispensary.id} dispensary={dispensary} />
          ))}
        </View>
      )}
    </View>
  );
}
