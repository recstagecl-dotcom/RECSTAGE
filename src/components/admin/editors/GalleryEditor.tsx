"use client";

import { Proposal } from "@/lib/types";

interface Props {
  proposal: Proposal;
  onUpdate: (updated: Partial<Proposal>) => void;
}

export default function GalleryEditor({ proposal, onUpdate }: Props) {
  function addImage() {
    onUpdate({
      gallery: [...proposal.gallery, { url: "", alt: "" }],
    });
  }

  function removeImage(index: number) {
    onUpdate({
      gallery: proposal.gallery.filter((_, i) => i !== index),
    });
  }

  function updateImage(index: number, field: "url" | "alt", value: string) {
    const updated = [...proposal.gallery];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate({ gallery: updated });
  }

  return (
    <div className="space-y-4">
      {proposal.gallery.length === 0 && (
        <p className="text-sm text-neutral-600">No hay imágenes agregadas</p>
      )}
      <div className="grid grid-cols-2 gap-3">
        {proposal.gallery.map((image, index) => (
          <div
            key={index}
            className="bg-neutral-900 border border-neutral-700 rounded-lg p-3 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Img {index + 1}</span>
              <button
                onClick={() => removeImage(index)}
                className="text-xs text-red-400 hover:text-red-300"
              >
                ✕
              </button>
            </div>
            <input
              type="text"
              value={image.url}
              onChange={(e) => updateImage(index, "url", e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-600 rounded px-2 py-1.5 text-xs text-white font-mono focus:border-[#E50914] focus:outline-none"
              placeholder="/images/foto.jpg"
            />
            <input
              type="text"
              value={image.alt}
              onChange={(e) => updateImage(index, "alt", e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-600 rounded px-2 py-1.5 text-xs text-white focus:border-[#E50914] focus:outline-none"
              placeholder="Descripción"
            />
          </div>
        ))}
      </div>
      <button
        onClick={addImage}
        className="w-full py-2.5 rounded-lg border border-dashed border-neutral-700 text-sm text-neutral-500 hover:border-neutral-500 hover:text-white transition-colors"
      >
        + Agregar imagen
      </button>
    </div>
  );
}
