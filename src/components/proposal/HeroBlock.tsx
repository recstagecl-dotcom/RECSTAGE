import { HeroBlock as HeroBlockType } from "@/lib/types";

interface Props {
  data: HeroBlockType;
  primaryColor: string;
  logo?: string;
}

export default function HeroBlock({ data, primaryColor, logo }: Props) {
  const hasVideo = data.backgroundVideo && data.backgroundVideo.length > 0;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {hasVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={data.backgroundVideo}
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${data.backgroundImage})` }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {logo && (
          <div className="mb-12 animate-fade-in">
            <img
              src={logo}
              alt="REC STAGE"
              className="h-20 sm:h-24 md:h-28 lg:h-32 mx-auto object-contain"
            />
          </div>
        )}

        <div className="animate-fade-in-up animation-delay-200">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            <span className="text-white block">{data.titleLine1}</span>
            <span className="block mt-2" style={{ color: primaryColor }}>
              {data.titleHighlight}
            </span>
            <span className="text-white block mt-2">{data.titleLine2}</span>
          </h1>
        </div>

        {data.tagline && (
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-neutral-600 mt-12 font-light animate-fade-in-up animation-delay-400">
            {data.tagline}
          </p>
        )}

        <div className="mt-16 animate-fade-in-up animation-delay-600">
          <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-neutral-600">
            <div className="w-10 h-px bg-neutral-800" />
            <span>Scroll</span>
            <div className="w-10 h-px bg-neutral-800" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
