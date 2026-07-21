"use client";

import { Proposal } from "@/lib/types";

interface Props {
  proposal: Proposal;
  onUpdate: (updated: Partial<Proposal>) => void;
}

export default function VideosEditor({ proposal, onUpdate }: Props) {
  function addVideo() {
    onUpdate({
      videos: [...proposal.videos, { url: "", title: "" }],
    });
  }

  function removeVideo(index: number) {
    onUpdate({
      videos: proposal.videos.filter((_, i) => i !== index),
    });
  }

  function updateVideo(index: number, field: "url" | "title", value: string) {
    const updated = [...proposal.videos];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate({ videos: updated });
  }

  return (
    <div className="space-y-4">
      {proposal.videos.length === 0 && (
        <p className="text-sm text-neutral-600">No hay videos agregados</p>
      )}
      {proposal.videos.map((video, index) => (
        <div
          key={index}
          className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-500">Video {index + 1}</span>
            <button
              onClick={() => removeVideo(index)}
              className="text-xs text-red-400 hover:text-red-300"
            >
              Eliminar
            </button>
          </div>
          <input
            type="text"
            value={video.title}
            onChange={(e) => updateVideo(index, "title", e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E50914] focus:outline-none"
            placeholder="Título del video"
          />
          <input
            type="text"
            value={video.url}
            onChange={(e) => updateVideo(index, "url", e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-[#E50914] focus:outline-none"
            placeholder="https://www.youtube.com/embed/..."
          />
        </div>
      ))}
      <button
        onClick={addVideo}
        className="w-full py-2.5 rounded-lg border border-dashed border-neutral-700 text-sm text-neutral-500 hover:border-neutral-500 hover:text-white transition-colors"
      >
        + Agregar video
      </button>
    </div>
  );
}
