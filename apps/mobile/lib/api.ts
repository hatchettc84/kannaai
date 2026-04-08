import { auth } from './firebase';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://kannaai.vercel.app';

interface ChatResponse {
  id: string;
  role: 'assistant';
  content: string;
  strainCards?: Array<{
    id: string;
    name: string;
    type: 'sativa' | 'indica' | 'hybrid';
    thcMin: number;
    thcMax: number;
    cbdMin: number;
    cbdMax: number;
    effects: string[];
    flavors: string[];
    terpenes: string[];
    description: string;
  }>;
  findDispensary?: boolean;
  conversationId: string;
  createdAt: string;
}

async function getAuthHeaders(): Promise<Record<string, string>> {
  try {
    const token = await auth.currentUser?.getIdToken();
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  } catch {
    // Not authenticated — proceed without token
  }
  return {};
}

export async function sendChatMessage(
  message: string,
  history: { role: 'user' | 'assistant'; content: string }[],
  userName?: string,
  conversationId?: string,
): Promise<ChatResponse> {
  const authHeaders = await getAuthHeaders();

  const response = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
    },
    body: JSON.stringify({ message, history, userName, conversationId }),
  });

  if (!response.ok) {
    throw new Error(`Chat API error: ${response.status}`);
  }

  return response.json();
}
