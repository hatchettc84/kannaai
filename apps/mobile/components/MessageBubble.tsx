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
          <Text className="text-lg">🌿</Text>
          <Text className="text-kanna-green text-xs font-semibold">Kanna</Text>
        </View>
      )}

      <View
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-kanna-green rounded-br-md'
            : 'bg-kanna-surface rounded-bl-md'
        }`}
      >
        <Text className={`text-sm leading-5 ${isUser ? 'text-kanna-bg' : 'text-white'}`}>
          {message.content}
        </Text>
      </View>

      {message.strainCards && message.strainCards.length > 0 && (
        <View className="w-full mt-2 max-w-[90%]">
          {message.strainCards.map((strain) => (
            <StrainCard key={strain.id} strain={strain} />
          ))}
        </View>
      )}

      {message.dispensaryCards && message.dispensaryCards.length > 0 && (
        <View className="w-full mt-2 max-w-[90%]">
          {message.dispensaryCards.map((dispensary) => (
            <DispensaryCard key={dispensary.id} dispensary={dispensary} />
          ))}
        </View>
      )}
    </View>
  );
}
