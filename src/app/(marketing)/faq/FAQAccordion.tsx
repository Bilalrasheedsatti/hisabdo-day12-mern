"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@/types";

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div
            key={item.question}
            className={`rounded-brutal border-2 border-ink bg-white shadow-brutal-sm transition-colors ${
              open ? "bg-[#EAF0FF]" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={open}
            >
              <span className="font-bold text-ink">{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-primary transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            {open ? (
              <p className="border-t-2 border-ink/10 px-5 pb-5 pt-3 text-sm leading-relaxed text-ink-soft">
                {item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
