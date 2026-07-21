import { PaymentBlock as PaymentBlockType } from "@/lib/types";

interface Props {
  data: PaymentBlockType;
  primaryColor: string;
}

export default function PaymentBlock({ data, primaryColor }: Props) {
  return (
    <section className="py-24 sm:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-px" style={{ backgroundColor: primaryColor }} />
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Pagos
          </span>
        </div>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
          style={{ color: primaryColor }}
        >
          {data.subtitle || "Formas de Pago"}
        </h2>
        {data.description && (
          <p className="text-neutral-400 text-lg font-light mb-16 leading-relaxed max-w-2xl">
            {data.description}
          </p>
        )}
        {!data.description && <div className="mb-16" />}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {data.methods.map((method, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 text-center transition-all duration-300 hover-lift"
            >
              <div
                className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}15` }}
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: primaryColor }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <p className="text-white font-medium">{method}</p>
            </div>
          ))}
        </div>
        {data.notes && (
          <p className="text-center text-neutral-500 text-sm font-light leading-relaxed">
            {data.notes}
          </p>
        )}
      </div>
    </section>
  );
}
