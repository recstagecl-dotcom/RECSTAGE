"use client";

import { useState, useRef, useSyncExternalStore } from "react";
import { FaqItem } from "@/lib/types";

interface Props {
  faq: FaqItem[];
  primaryColor: string;
}

function useMounted() {
  const ref = useRef(false);
  return useSyncExternalStore(
    () => () => {},
    () => {
      if (!ref.current) ref.current = true;
      return ref.current;
    },
    () => false
  );
}

export default function FaqBlock({ faq, primaryColor }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const mounted = useMounted();

  if (faq.length === 0) return null;

  return (
    <section className="py-24 sm:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-px" style={{ backgroundColor: primaryColor }} />
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            FAQ
          </span>
        </div>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-16"
          style={{ color: primaryColor }}
        >
          Hablemos de los detalles
        </h2>
        <div className="space-y-3">
          {faq.map((item, index) => (
            <div
              key={index}
              className="glass rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-medium text-white pr-4">
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                    mounted && openIndex === index ? "rotate-180" : ""
                  }`}
                  style={{ color: primaryColor }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mounted && openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-6 text-neutral-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
