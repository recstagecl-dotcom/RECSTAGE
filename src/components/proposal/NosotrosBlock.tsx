"use client";

import { CardsBlock as NosotrosBlockType, CardItem } from "@/lib/types";

interface Props {
  data: NosotrosBlockType;
  primaryColor: string;
}

function MemberCard({ item, primaryColor, index }: { item: CardItem; primaryColor: string; index: number }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
      style={{
        animationDelay: `${index * 100}ms`,
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div className="relative h-56 overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
            <span className="text-5xl opacity-30">{item.icon}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative -mt-8 flex justify-center z-10">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-neutral-950 border-2 transition-all duration-300 group-hover:scale-110"
          style={{ borderColor: primaryColor }}
        >
          {item.icon}
        </div>
      </div>

      <div className="p-6 pt-4 text-center bg-neutral-950">
        <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
        <p className="text-sm font-semibold mb-3" style={{ color: primaryColor }}>
          {item.subtitle}
        </p>
        <p className="text-sm text-neutral-400 leading-relaxed font-light">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function NosotrosBlock({ data, primaryColor }: Props) {
  if (data.cards.length === 0) return null;

  return (
    <section className="py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            {data.titleLine1 && (
              <span className="text-white block">{data.titleLine1}</span>
            )}
            {data.titleHighlight && (
              <span className="block mt-2" style={{ color: primaryColor }}>
                {data.titleHighlight}
              </span>
            )}
            {data.titleLine2 && (
              <span className="text-white block mt-2">{data.titleLine2}</span>
            )}
          </h2>
        </div>

        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))` }}
        >
          {data.cards.map((card, index) => (
            <MemberCard key={index} item={card} primaryColor={primaryColor} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
