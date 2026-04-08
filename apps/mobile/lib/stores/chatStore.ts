import { create } from 'zustand';
import type { ChatMessage } from '@kannaai/shared';
import { sendChatMessage } from '../api';
import { getMockRecommendations, mockDispensaries } from '../mock/strains';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  conversationId: string | null;
  useRealAI: boolean;
  setGreeting: (name?: string) => void;
  sendMessage: (text: string, userName?: string) => void;
  clearChat: () => void;
  toggleAI: () => void;
}

const createId = () => Math.random().toString(36).substring(2, 10);

const initialMessages: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: "Hey there! I'm Kanna, your personal cannabis concierge. How are you feeling today?",
    createdAt: new Date().toISOString(),
  },
];

export const useChatStore = create<ChatState>((set, get) => ({
  messages: initialMessages,
  isLoading: false,
  conversationId: null,
  useRealAI: true,

  setGreeting: (name?: string) => {
    const greeting = name
      ? `Hey ${name}! I'm Kanna, your personal cannabis concierge. How are you feeling today?`
      : "Hey there! I'm Kanna, your personal cannabis concierge. How are you feeling today?";
    set({
      messages: [{
        id: 'welcome',
        role: 'assistant',
        content: greeting,
        createdAt: new Date().toISOString(),
      }],
    });
  },

  sendMessage: async (text: string, userName?: string) => {
    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      content: text,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      isLoading: true,
    }));

    const { useRealAI, messages, conversationId } = get();

    if (!useRealAI) {
      // Fallback to mock responses
      setTimeout(() => {
        const { text: responseText, strains, dispensaries } = getMockRecommendations(text);
        const assistantMessage: ChatMessage = {
          id: createId(),
          role: 'assistant',
          content: responseText,
          strainCards: strains.length > 0 ? strains : undefined,
          dispensaryCards: dispensaries && dispensaries.length > 0 ? dispensaries : undefined,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          messages: [...state.messages, assistantMessage],
          isLoading: false,
        }));
      }, 800);
      return;
    }

    try {
      // Build history from recent messages (excluding welcome + current)
      const history = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.role, content: m.content }));

      const response = await sendChatMessage(
        text,
        history,
        userName,
        conversationId || undefined,
      );

      const assistantMessage: ChatMessage = {
        id: response.id,
        role: 'assistant',
        content: response.content,
        strainCards: response.strainCards,
        // If Kanna suggests finding dispensaries, show mock dispensaries for now
        dispensaryCards: response.findDispensary ? mockDispensaries : undefined,
        createdAt: response.createdAt,
      };

      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isLoading: false,
        conversationId: response.conversationId,
      }));
    } catch (error) {
      console.error('Failed to send message:', error);
      // Fallback to mock on API failure
      const { text: responseText, strains } = getMockRecommendations(text);
      const fallbackMessage: ChatMessage = {
        id: createId(),
        role: 'assistant',
        content: responseText,
        strainCards: strains.length > 0 ? strains : undefined,
        createdAt: new Date().toISOString(),
      };
      set((state) => ({
        messages: [...state.messages, fallbackMessage],
        isLoading: false,
      }));
    }
  },

  clearChat: () => set({ messages: initialMessages, isLoading: false, conversationId: null }),
  toggleAI: () => set((state) => ({ useRealAI: !state.useRealAI })),
}));
