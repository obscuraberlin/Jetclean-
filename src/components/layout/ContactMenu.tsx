'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ArrowLeft, Bot, MessageCircle, PhoneCall, Send, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { CallbackForm } from '@/components/quote/CallbackForm';
import { useQuote } from '@/components/quote/QuoteProvider';
import {
  assistantFallback,
  assistantGreeting,
  assistantIntents,
  matchIntent,
  type AssistantAction,
} from '@/content/assistant';
import { company } from '@/content/company';
import { track } from '@/lib/analytics';
import { cn, telHref } from '@/lib/utils';
import { SocialIcon } from './SocialIcon';

type View = 'menu' | 'assistant' | 'callback';

/**
 * Ein kleiner runder Kontakt-Button unten rechts. Öffnet ein Menü mit WhatsApp,
 * JETCLEAN Assistent und Rückruf – ohne fremde Plugins, im Look der Marke.
 */
export function ContactMenu() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>('menu');
  const reduce = useReducedMotion();
  const { isOpen: quoteOpen } = useQuote();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (quoteOpen) return null;

  const close = () => {
    setOpen(false);
    setTimeout(() => setView('menu'), 300);
  };

  return (
    <div
      className="fixed right-4 bottom-[calc(var(--mobile-cta-height)+1rem+env(safe-area-inset-bottom))] z-40 sm:right-6 lg:bottom-6"
      data-testid="contact-menu"
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="false"
            aria-labelledby={titleId}
            initial={reduce ? false : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 bottom-16 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-line bg-[#fdfcfa] shadow-lift"
          >
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              {view !== 'menu' ? (
                <button
                  type="button"
                  onClick={() => setView('menu')}
                  className="flex size-8 items-center justify-center rounded-full text-navy-600 hover:bg-surface hover:text-navy-950"
                  aria-label="Zurück"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                </button>
              ) : null}
              <p id={titleId} className="flex-1 font-display text-sm font-bold text-navy-950">
                {view === 'menu'
                  ? 'JETCLEAN kontaktieren'
                  : view === 'assistant'
                    ? 'JETCLEAN Assistent'
                    : 'Rückruf anfordern'}
              </p>
              <button
                type="button"
                onClick={close}
                className="flex size-8 items-center justify-center rounded-full text-navy-600 hover:bg-surface hover:text-navy-950"
                aria-label="Schließen"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            {view === 'menu' ? (
              <ul className="p-2">
                {company.contact.whatsapp ? (
                  <li>
                    <a
                      href={`https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent('Guten Tag, ich interessiere mich für ein Reinigungsangebot.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track('cta_click', { source: 'contact-menu-whatsapp' })}
                      className="flex items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-surface"
                    >
                      <span className="flex size-10 items-center justify-center rounded-full bg-success-50 text-success-600">
                        <SocialIcon platform="whatsapp" className="size-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-navy-950">WhatsApp</span>
                        <span className="block text-xs text-muted">
                          Kurze Nachricht, schnelle Antwort
                        </span>
                      </span>
                    </a>
                  </li>
                ) : null}
                <li>
                  <button
                    type="button"
                    onClick={() => setView('assistant')}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-surface"
                    data-testid="contact-assistant"
                  >
                    <span className="flex size-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <Bot className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-navy-950">
                        KI-Assistent
                      </span>
                      <span className="block text-xs text-muted">
                        Antworten zu Leistungen und Ablauf
                      </span>
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setView('callback')}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-surface"
                  >
                    <span className="flex size-10 items-center justify-center rounded-full bg-navy-950 text-white">
                      <PhoneCall className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-navy-950">
                        Rückruf anfordern
                      </span>
                      <span className="block text-xs text-muted">
                        Wir rufen Sie zur Wunschzeit an
                      </span>
                    </span>
                  </button>
                </li>
              </ul>
            ) : null}

            {view === 'assistant' ? <Assistant onClose={close} /> : null}

            {view === 'callback' ? (
              <div className="max-h-[70vh] overflow-y-auto p-3">
                <CallbackForm
                  source="contact-menu"
                  className="rounded-2xl border-0 p-3 shadow-none sm:p-3"
                />
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-label={open ? 'Kontaktmenü schließen' : 'JETCLEAN kontaktieren'}
        className={cn(
          'flex size-13 items-center justify-center rounded-full bg-navy-950 text-white shadow-lift transition-[transform,background-color] duration-300 ease-(--ease-premium) hover:bg-navy-800 motion-safe:hover:-translate-y-0.5',
        )}
        data-testid="contact-toggle"
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <MessageCircle className="size-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

/* --------------------------------------------------------------------------- */

type Message = { role: 'assistant' | 'user'; text: string; actions?: AssistantAction[] };

function Assistant({ onClose }: { onClose: () => void }) {
  const { open } = useQuote();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: assistantGreeting },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [askedIds, setAskedIds] = useState<string[]>([]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking]);

  const respond = (question: string, intentId?: string) => {
    const intent = intentId
      ? (assistantIntents.find((i) => i.id === intentId) ?? null)
      : matchIntent(question);
    setMessages((prev) => [...prev, { role: 'user', text: question }]);
    setThinking(true);
    track('cta_click', { source: 'assistant', intent: intent?.id ?? 'fallback' });
    window.setTimeout(() => {
      setThinking(false);
      if (intent) setAskedIds((prev) => (prev.includes(intent.id) ? prev : [...prev, intent.id]));
      setMessages((prev) => [
        ...prev,
        intent
          ? { role: 'assistant', text: intent.answer, actions: intent.actions }
          : { role: 'assistant', text: assistantFallback, actions: ['quote', 'callback', 'phone'] },
      ]);
    }, 550);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;
    setInput('');
    respond(question);
  };

  const quick = assistantIntents.filter((i) => !askedIds.includes(i.id)).slice(0, 4);

  const requestQuote = () => {
    onClose();
    open('assistant');
  };

  return (
    <div className="flex max-h-[70vh] flex-col">
      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            <div
              className={cn(
                'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                message.role === 'user'
                  ? 'rounded-br-md bg-navy-950 text-white'
                  : 'rounded-bl-md bg-surface text-navy-800',
              )}
            >
              {message.text}
              {message.actions?.length ? (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {message.actions.map((action) =>
                    action === 'callback' ? (
                      <CallbackChip key={action} />
                    ) : action === 'phone' ? (
                      <a
                        key={action}
                        href={telHref(company.contact.phoneE164)}
                        className="rounded-full border border-navy-950 px-3 py-1.5 text-xs font-semibold text-navy-950 transition-colors hover:bg-navy-950 hover:text-white"
                      >
                        {company.contact.phoneDisplay}
                      </a>
                    ) : (
                      <button
                        key={action}
                        type="button"
                        onClick={requestQuote}
                        className="rounded-full bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-600"
                      >
                        Angebot anfragen
                      </button>
                    ),
                  )}
                </div>
              ) : null}
            </div>
          </div>
        ))}
        {thinking ? (
          <div className="flex justify-start">
            <div
              className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-surface px-3.5 py-3"
              aria-label="Antwort wird erstellt"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-1.5 animate-bounce rounded-full bg-navy-400"
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
      {quick.length ? (
        <div className="flex flex-wrap gap-1.5 px-4 pb-2">
          {quick.map((intent) => (
            <button
              key={intent.id}
              type="button"
              onClick={() => respond(intent.label, intent.id)}
              className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-navy-800 transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              {intent.label}
            </button>
          ))}
        </div>
      ) : null}
      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line p-2">
        <label htmlFor="assistant-input" className="sr-only">
          Ihre Frage
        </label>
        <input
          id="assistant-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ihre Frage …"
          className="h-10 flex-1 rounded-full border border-line bg-white px-4 text-sm text-navy-900 placeholder:text-navy-400 focus:border-brand-500 focus:outline-none"
          maxLength={200}
          autoComplete="off"
        />
        <button
          type="submit"
          className="flex size-10 items-center justify-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600"
          aria-label="Senden"
        >
          <Send className="size-4" aria-hidden="true" />
        </button>
      </form>
      <p className="px-4 pb-3 text-[0.6875rem] leading-snug text-muted">
        Der Assistent antwortet aus den Inhalten dieser Website. Es werden keine Daten an Dritte
        übertragen.
      </p>
    </div>
  );
}

function CallbackChip() {
  return (
    <a
      href="/kontakt#rueckruf"
      className="rounded-full border border-navy-950 px-3 py-1.5 text-xs font-semibold text-navy-950 transition-colors hover:bg-navy-950 hover:text-white"
    >
      Rückruf anfordern
    </a>
  );
}
