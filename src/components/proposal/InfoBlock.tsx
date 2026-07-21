import { InfoBlock as InfoBlockType } from "@/lib/types";

interface Props {
  data: InfoBlockType;
  primaryColor: string;
}

export default function InfoBlock({ data, primaryColor }: Props) {
  return (
    <section className="py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-px" style={{ backgroundColor: primaryColor }} />
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Info del Show
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Flyer */}
          <div className="relative rounded-2xl overflow-hidden glass">
            {data.flyer ? (
              <img
                src={data.flyer}
                alt={data.eventName || "Flyer del show"}
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="aspect-[3/4] bg-neutral-900 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto text-neutral-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-neutral-600 text-sm">Sin flyer</p>
                </div>
              </div>
            )}
          </div>

          {/* Event details */}
          <div className="space-y-8">
            {data.eventName && (
              <div>
                <h3
                  className="text-3xl sm:text-4xl font-black tracking-tight"
                  style={{ color: primaryColor }}
                >
                  {data.eventName}
                </h3>
              </div>
            )}

            <div className="space-y-6">
              {data.date && (
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    <svg className="w-5 h-5" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">Fecha</p>
                    <p className="text-white text-lg font-medium">{data.date}</p>
                  </div>
                </div>
              )}

              {data.venue && (
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    <svg className="w-5 h-5" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">Lugar</p>
                    <p className="text-white text-lg font-medium">{data.venue}</p>
                  </div>
                </div>
              )}

              {data.location && (
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    <svg className="w-5 h-5" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">Dirección</p>
                    <p className="text-white text-lg font-medium">{data.location}</p>
                  </div>
                </div>
              )}

              {data.time && (
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    <svg className="w-5 h-5" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">Horario</p>
                    <p className="text-white text-lg font-medium">{data.time}</p>
                  </div>
                </div>
              )}
            </div>

            {data.description && (
              <div className="pt-4 border-t border-neutral-800">
                <p className="text-neutral-400 leading-relaxed font-light">
                  {data.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
