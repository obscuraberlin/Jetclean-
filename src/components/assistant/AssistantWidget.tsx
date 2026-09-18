'use client';

import { ArrowRight, Bot, Send, Sparkles, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { useQuote } from '@/components/quote/QuoteProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { company } from '@/content/company';
import { track } from '@/lib/analytics';
import {
  assistantName,
  localAnswer,
  suggestedQuestions,
  type AssistantAnswer,
  type AssistantLink,
} from '@/lib/assistant/knowledge';
import { easePremium } from '@/lib/motion';
import { cn } from '@/lib/utils';

type ChatMessage = {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  links?: AssistantLink[];
};

const MAX_HISTORY = 12;

/**
 * KI-Assistent: runder Button unten rechts (über dem WhatsApp-Button), öffnet ein
 * Chat-Panel. Antworten kommen von /api/assistant (Claude); fällt die Route aus
 * (statische Vorschau, Netzfehler), antwortet die lokale Wissensbasis im Browser.
 */
export function AssistantWidget() {
  const { isOpen: quoteOpen, open: openQuote } = useQuote();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const nextId = useRef(1);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const headingId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    inputRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, pending]);

  if (quoteOpen) return null;

  const push = (message: Omit<ChatMessage, 'id'>) =>
    setMessages((current) => [...current, { ...message, id: nextId.current++ }]);

  async function ask(question: string) {
    const text = question.trim();
    if (!text || pending) return;
    setInput('');
    push({ role: 'user', text });
    setPending(true);
    track('assistant_question', { length: text.length });

    const history = [...messages, { id: 0, role: 'user' as const, text }]
      .slice(-MAX_HISTORY)
      .map((message) => ({ role: message.role, content: message.text.slice(0, 1000) }));

    let answer: AssistantAnswer;
    try {
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), 25000);
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });
      window.clearTimeout(timer);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = (await response.json()) as AssistantAnswer;
      if (typeof data.text !== 'string') throw new Error('Ungültige Antwort');
      answer = data;
    } catch {
      answer = localAnswer(text);
    }
    push({ role: 'assistant', text: answer.text, links: answer.links });
    setPending(false);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void ask(input);
  }

  function onLink(link: AssistantLink) {
    if (link.href === 'angebot') {
      setOpen(false);
      openQuote('assistant');
      return true;
    }
    return false;
  }

  return (
    <>
      {/* Button: über dem WhatsApp-Button, gleiche rechte Kante */}
      <button
        type="button"
        onClick={() => {
          setOpen((value) => !value);
          if (!open) track('assistant_opened');
        }}
        aria-expanded={open}
        aria-controls="assistant-panel"
        aria-label={
          open ? `${assistantName} schließen` : `${assistantName} öffnen – Fragen stellen`
        }
        data-testid="assistant-toggle"
        className={cn(
          'fixed right-4 z-40 flex size-14 items-center justify-center rounded-full bg-navy-950 text-white shadow-lift transition-transform duration-300 ease-(--ease-premium) hover:scale-105 lg:right-6',
          'bottom-[calc(var(--mobile-cta-height)+1rem+4.25rem+env(safe-area-inset-bottom))] lg:bottom-[5.75rem]',
        )}
      >
        {open ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <Bot className="size-7" aria-hidden="true" />
        )}
        {!open ? (
          <span
            aria-hidden="true"
            className="absolute -top-1 -left-1 flex size-6 items-center justify-center rounded-full bg-brand-500 text-white shadow-brand"
          >
            <Sparkles className="size-3.5" />
          </span>
        ) : null}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.section
            id="assistant-panel"
            role="dialog"
            aria-labelledby={headingId}
            data-testid="assistant-panel"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: easePremium }}
            className={cn(
              'fixed z-40 flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-lift',
              'inset-x-3 bottom-[calc(var(--mobile-cta-height)+1rem+8.5rem+env(safe-area-inset-bottom))] max-h-[min(34rem,calc(100dvh-var(--mobile-cta-height)-11rem))]',
              'lg:inset-x-auto lg:right-6 lg:bottom-[10.25rem] lg:max-h-[min(36rem,calc(100dvh-12rem))] lg:w-[24rem]',
            )}
          >
            <header className="flex items-center gap-3 border-b border-line bg-navy-950 px-4 py-3 text-white">
              <span className="flex size-9 items-center justify-center rounded-full bg-white/10">
                <Bot className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 id={headingId} className="text-sm font-bold">
                  {assistantName}
                </h2>
                <p className="text-[0.6875rem] text-white/70">
                  Beantwortet Fragen zu Leistungen, Ablauf und Kosten
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex size-8 items-center justify-center rounded-full hover:bg-white/10"
                aria-label="Schließen"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </header>

            <div
              ref={logRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              aria-live="polite"
              data-testid="assistant-log"
            >
              <Bubble role="assistant">
                Guten Tag! Ich bin der {assistantName}. Was möchten Sie über unsere Gebäudereinigung
                in Berlin wissen?
              </Bubble>
              {messages.length === 0 ? (
                <ul className="flex flex-wrap gap-2" aria-label="Vorschläge">
                  {suggestedQuestions.map((question) => (
                    <li key={question}>
                      <button
                        type="button"
                        onClick={() => void ask(question)}
                        className="rounded-full border border-line bg-surface px-3 py-1.5 text-left text-xs font-medium text-navy-900 transition-colors hover:border-brand-300 hover:bg-brand-50"
                      >
                        {question}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
              {messages.map((message) => (
                <Bubble key={message.id} role={message.role}>
                  {message.text}
                  {message.links?.length ? (
                    <span className="mt-2 flex flex-wrap gap-2">
                      {message.links.map((link) =>
                        link.href === 'angebot' ? (
                          <button
                            key={link.href}
                            type="button"
                            onClick={() => onLink(link)}
                            className="inline-flex items-center gap-1 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white hover:bg-brand-600"
                          >
                            {link.label}
                            <ArrowRight className="size-3" aria-hidden="true" />
                          </button>
                        ) : (
                          <Link
                            key={link.href}
                            href={link.href === 'rueckruf' ? '/kontakt#rueckruf' : link.href}
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center gap-1 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-50"
                          >
                            {link.label}
                            <ArrowRight className="size-3" aria-hidden="true" />
                          </Link>
                        ),
                      )}
                    </span>
                  ) : null}
                </Bubble>
              ))}
              {pending ? (
                <Bubble role="assistant">
                  <span className="inline-flex gap-1" aria-label="Antwort wird erstellt">
                    <Dot delay={0} />
                    <Dot delay={0.15} />
                    <Dot delay={0.3} />
                  </span>
                </Bubble>
              ) : null}
            </div>

            <form onSubmit={onSubmit} className="border-t border-line bg-surface p-3">
              <div className="flex items-center gap-2 rounded-full border border-line bg-white pr-1.5 pl-4 focus-within:border-brand-400">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  maxLength={500}
                  placeholder="Ihre Frage …"
                  aria-label="Ihre Frage an den Assistenten"
                  className="h-11 min-w-0 flex-1 bg-transparent text-sm text-navy-950 outline-none placeholder:text-muted"
                  data-testid="assistant-input"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={pending || !input.trim()}
                  className="flex size-9 items-center justify-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600 disabled:opacity-40"
                  aria-label="Frage senden"
                  data-testid="assistant-send"
                >
                  <Send className="size-4" aria-hidden="true" />
                </button>
              </div>
              <p className="mt-2 text-center text-[0.6875rem] leading-snug text-muted">
                KI-Antworten ohne Gewähr. Verbindliche Auskünfte: {company.contact.phoneDisplay}
              </p>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, children }: { role: 'user' | 'assistant'; children: React.ReactNode }) {
  return (
    <div className={cn('flex', role === 'user' ? 'justify-end' : 'justify-start')}>
      <p
        className={cn(
          'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line',
          role === 'user'
            ? 'rounded-br-md bg-brand-500 text-white'
            : 'rounded-bl-md bg-surface text-navy-900',
        )}
      >
        {children}
      </p>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="block size-1.5 rounded-full bg-navy-400"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 0.9, repeat: Infinity, delay }}
    />
  );
}
