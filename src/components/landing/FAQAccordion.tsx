"use client";

/**
 * FAQAccordion — Accordéon FAQ animé
 * ------------------------------------
 * USAGE :
 *   <FAQAccordion
 *     items={[
 *       { question: "Quelles aides ?", answer: "MaPrimeRénov, CEE..." },
 *       ...
 *     ]}
 *     accentColor="#F59F0A"
 *   />
 */

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  accentColor?: string;
}

export function FAQAccordion({ items, accentColor = "#F59F0A" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="bg-card rounded-xl border border-border/50 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-medium text-foreground hover:bg-muted/30 transition-colors"
            >
              <span>{item.question}</span>
              <ChevronDown
                className="h-5 w-5 flex-shrink-0 transition-transform duration-200"
                style={{
                  color: isOpen ? accentColor : "#94a3b8",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5">
                <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
