import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildKannaSystemPrompt } from '@/lib/kanna-prompt';
import { STRAIN_DATABASE } from '@/lib/strain-data';

const anthropic = new Anthropic();

interface ChatRequestBody {
  message: string;
  conversationId?: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
  userName?: string;
}

function extractStrainIds(text: string): string[] {
  const match = text.match(/<strains>\[([^\]]+)\]<\/strains>/);
  if (!match) return [];
  return match[1].split(',').map(s => s.trim());
}

function extractFindDispensary(text: string): boolean {
  return text.includes('<find_dispensary>true</find_dispensary>');
}

function cleanResponseText(text: string): string {
  return text
    .replace(/<strains>\[[^\]]+\]<\/strains>/g, '')
    .replace(/<find_dispensary>true<\/find_dispensary>/g, '')
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequestBody = await request.json();
    const { message, history = [], userName } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Build conversation history for Claude
    const messages: { role: 'user' | 'assistant'; content: string }[] = [
      ...history.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message },
    ];

    const systemPrompt = buildKannaSystemPrompt(userName);

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    const rawContent = response.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('');

    // Extract structured data from response
    const strainIds = extractStrainIds(rawContent);
    const findDispensary = extractFindDispensary(rawContent);
    const cleanedText = cleanResponseText(rawContent);

    // Look up full strain objects
    const recommendedStrains = strainIds
      .map(id => STRAIN_DATABASE.find(s => s.id === id))
      .filter(Boolean);

    return NextResponse.json({
      id: crypto.randomUUID(),
      role: 'assistant',
      content: cleanedText,
      strainCards: recommendedStrains.length > 0 ? recommendedStrains : undefined,
      findDispensary: findDispensary || undefined,
      conversationId: body.conversationId || crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from Kanna' },
      { status: 500 }
    );
  }
}
