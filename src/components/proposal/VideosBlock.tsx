import { VideoItem } from "@/lib/types";

interface Props {
  videos: VideoItem[];
  primaryColor: string;
}

export default function VideosBlock({ videos, primaryColor }: Props) {
  if (videos.length === 0) return null;

  return (
    <section className="py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-px" style={{ backgroundColor: primaryColor }} />
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Media
          </span>
        </div>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-16"
          style={{ color: primaryColor }}
        >
          En Vivo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div key={index} className="group">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-900 glass transition-all duration-500 hover-lift">
                <iframe
                  src={video.url}
                  title={video.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="mt-4 text-sm text-neutral-500 font-medium tracking-wide uppercase">
                {video.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
