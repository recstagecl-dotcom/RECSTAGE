import { PriceBlock as PriceBlockType } from "@/lib/types";

interface Props {
  data: PriceBlockType;
  primaryColor: string;
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PriceBlock({ data, primaryColor }: Props) {
  return (
    <section className="py-24 sm:py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-px" style={{ backgroundColor: primaryColor }} />
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Inversión
          </span>
          <div className="w-12 h-px" style={{ backgroundColor: primaryColor }} />
        </div>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-10"
          style={{ color: primaryColor }}
        >
          Inversión
        </h2>
        <div className="relative rounded-3xl p-10 sm:p-14 glass animate-pulse-glow">
          <div
            className="absolute inset-0 rounded-3xl opacity-5"
            style={{ backgroundColor: primaryColor }}
          />
          <p className="relative text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-4 text-white">
            {formatCurrency(data.amount, data.currency)}
          </p>
          <p className="relative text-neutral-400 text-lg font-light">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
}
