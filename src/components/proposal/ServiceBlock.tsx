import { ServiceBlock as ServiceBlockType } from "@/lib/types";

interface Props {
  data: ServiceBlockType;
  primaryColor: string;
}

export default function ServiceBlock({ data, primaryColor }: Props) {
  return (
    <section className="py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-px" style={{ backgroundColor: primaryColor }} />
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Servicio
          </span>
        </div>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8"
          style={{ color: primaryColor }}
        >
          {data.title}
        </h2>
        <div className="relative">
          <div
            className="absolute left-0 top-0 w-[2px] h-full opacity-30"
            style={{ backgroundColor: primaryColor }}
          />
          <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-light pl-6">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
}
