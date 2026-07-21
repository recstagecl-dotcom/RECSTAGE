"use client";

import { Proposal } from "@/lib/types";
import ImageUploader from "../ImageUploader";

interface Props {
  proposal: Proposal;
  onUpdate: (updated: Partial<Proposal>) => void;
}

export default function HeroEditor({ proposal, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-neutral-500 mb-1.5 block">Línea 1 (blanca)</label>
        <input
          type="text"
          value={proposal.hero.titleLine1}
          onChange={(e) =>
            onUpdate({ hero: { ...proposal.hero, titleLine1: e.target.value } })
          }
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
          placeholder="NO DEJES QUE UNO DE LOS RECUERDOS"
        />
      </div>
      <div>
        <label className="text-xs text-neutral-500 mb-1.5 block">
          Línea 2 (roja — resaltada)
        </label>
        <input
          type="text"
          value={proposal.hero.titleHighlight}
          onChange={(e) =>
            onUpdate({ hero: { ...proposal.hero, titleHighlight: e.target.value } })
          }
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
          placeholder="MÁS IMPORTANTES DE TU BANDA"
        />
      </div>
      <div>
        <label className="text-xs text-neutral-500 mb-1.5 block">Línea 3 (blanca)</label>
        <input
          type="text"
          value={proposal.hero.titleLine2}
          onChange={(e) =>
            onUpdate({ hero: { ...proposal.hero, titleLine2: e.target.value } })
          }
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
          placeholder="QUEDE REGISTRADO CON UN CELULAR"
        />
      </div>
      <div>
        <label className="text-xs text-neutral-500 mb-1.5 block">Tagline</label>
        <input
          type="text"
          value={proposal.hero.tagline}
          onChange={(e) =>
            onUpdate({ hero: { ...proposal.hero, tagline: e.target.value } })
          }
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
          placeholder="REC STAGE — Grabación profesional de shows en vivo"
        />
      </div>
      <div>
        <label className="text-xs text-neutral-500 mb-1.5 block">Video de fondo (URL o ruta)</label>
        <input
          type="text"
          value={proposal.hero.backgroundVideo}
          onChange={(e) =>
            onUpdate({ hero: { ...proposal.hero, backgroundVideo: e.target.value } })
          }
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:border-[#E50914] focus:outline-none"
          placeholder="https://... o /video.mp4"
        />
      </div>
      <ImageUploader
        value={proposal.hero.backgroundImage}
        onChange={(url) => onUpdate({ hero: { ...proposal.hero, backgroundImage: url } })}
        label="Imagen de fallback"
      />
    </div>
  );
}
