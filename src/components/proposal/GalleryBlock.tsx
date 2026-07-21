import { GalleryItem } from "@/lib/types";

interface Props {
  gallery: GalleryItem[];
}

export default function GalleryBlock({ gallery }: Props) {
  if (gallery.length === 0) return null;

  return (
    <section className="py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-px bg-neutral-700" />
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Galería
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-16 text-white">
          Galería
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-900 glass hover-lift"
            >
              <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-neutral-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
