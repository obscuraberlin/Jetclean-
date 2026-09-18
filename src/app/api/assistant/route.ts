import Anthropic from '@anthropic-ai/sdk';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  buildSystemPrompt,
  extractLinks,
  localAnswer,
  type AssistantAnswer,
} from '@/lib/assistant/knowledge';
import { checkRateLimit, hashIdentifier } from '@/lib/leads/rate-limit';

export const runtime = 'nodejs';

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().trim().min(1).max(1000),
      }),
    )
    .min(1)
    .max(16),
});

/** Modell per ENV überschreibbar; Standard: Claude Opus 5. */
const MODEL = process.env.ASSISTANT_MODEL || 'claude-opus-5';

let cachedSystemPrompt: string | null = null;
function systemPrompt() {
  cachedSystemPrompt ??= buildSystemPrompt();
  return cachedSystemPrompt;
}

/**
 * KI-Assistent: beantwortet Fragen ausschließlich auf Basis der Website-Inhalte.
 * Ohne `ANTHROPIC_API_KEY` antwortet der lokale Schlagwort-Fallback.
 */
export async function POST(request: Request) {
  const headerList = await headers();
  const forwardedFor = headerList.get('x-forwarded-for')?.split(',')[0]?.trim();
  const ip = forwardedFor || headerList.get('x-real-ip') || 'unknown';
  const limit = checkRateLimit(`assistant:${await hashIdentifier(ip)}`);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte versuchen Sie es in ein paar Minuten erneut.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  let parsed: z.infer<typeof bodySchema>;
  try {
    parsed = bodySchema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const lastUser = [...parsed.messages].reverse().find((message) => message.role === 'user');
  if (!lastUser) return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });

  if (!process.env.ANTHROPIC_API_KEY) {
    const answer = localAnswer(lastUser.content);
    return NextResponse.json({ ...answer, mode: 'local' } satisfies AssistantAnswer & {
      mode: string;
    });
  }

  try {
    const client = new Anthropic();
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 1024,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { effort: 'low' },
      system: [{ type: 'text', text: systemPrompt(), cache_control: { type: 'ephemeral' } }],
      messages: parsed.messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    });

    if (response.stop_reason === 'refusal') {
      return NextResponse.json({
        text: 'Diese Frage kann ich hier nicht beantworten. Unser Team hilft Ihnen gern persönlich weiter.',
        links: [{ label: 'Rückruf anfordern', href: 'rueckruf' }],
        mode: 'ai',
      });
    }

    const text = response.content
      .filter((block): block is Anthropic.Beta.BetaTextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim();
    if (!text) throw new Error('Leere Antwort');
    return NextResponse.json({ ...extractLinks(text), mode: 'ai' });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ ...localAnswer(lastUser.content), mode: 'local' });
    }
    if (error instanceof Anthropic.APIError) {
      console.error('[assistant] API-Fehler', error.status, error.message);
    } else {
      console.error('[assistant] Fehler', error);
    }
    return NextResponse.json({ ...localAnswer(lastUser.content), mode: 'local' });
  }
}
