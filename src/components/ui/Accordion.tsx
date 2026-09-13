'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useId, useState } from 'react';
import { cn } from '@/lib/utils';

export type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
  /** Erstes Element geöffnet starten */
  defaultOpen?: number | null;
};

/**
 * Zugängliches Accordion (Button + Region, aria-expanded/aria-controls),
 * mit sanfter Höhenanimation – ohne Layout-Thrashing außerhalb des Panels.
 */
export function Accordion({ items, className, defaultOpen = null }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const reduce = useReducedMotion();

  return (
    <div className={cn('divide-y divide-line rounded-2xl border border-line bg-white', className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.question} className="px-5 sm:px-6">
            <h3 className="text-base font-semibold tracking-normal">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-[0.9375rem] font-semibold text-navy-900 transition-colors hover:text-brand-600 sm:py-5 sm:text-base"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    'size-5 shrink-0 text-navy-400 transition-transform duration-300 ease-(--ease-premium)',
                    isOpen && 'rotate-180 text-brand-500',
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="content"
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-[0.9375rem] leading-relaxed text-muted">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
