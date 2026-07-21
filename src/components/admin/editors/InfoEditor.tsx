"use client";

import { Proposal } from "@/lib/types";
import ImageUploader from "../ImageUploader";

interface Props {
  proposal: Proposal;
  onUpdate: (updated: Partial<Proposal>) => void;
}

export default function InfoEditor({ proposal, onUpdate }: Props) {
  const info = proposal.info;

  function update(field: keyof typeof info, value: string) {
    onUpdate({ info: { ...info, [field]: value } });
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-neutral-500 mb-1.5 block">Nombre del evento</label>
        <input
          type="text"
          value={info.eventName}
          onChange={(e) => update("eventName", e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
          placeholder="Festival Kosmik 2026"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-neutral-500 mb-1.5 block">Fecha</label>
          <input
            type="text"
            value={info.date}
            onChange={(e) => update("date", e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
            placeholder="15 de Agosto, 2026"
          />
        </div>
        <div>
          <label className="text-xs text-neutral-500 mb-1.5 block">Horario</label>
          <input
            type="text"
            value={info.time}
            onChange={(e) => update("time", e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
            placeholder="21:00 hrs"
          />
        </div>
      </div>
      <div>
        <label className="text-xs text-neutral-500 mb-1.5 block">Lugar / Sede</label>
        <input
          type="text"
          value={info.venue}
          onChange={(e) => update("venue", e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
          placeholder="Teatro Municipal"
        />
      </div>
      <div>
        <label className="text-xs text-neutral-500 mb-1.5 block">Dirección</label>
        <input
          type="text"
          value={info.location}
          onChange={(e) => update("location", e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
          placeholder="Av. Principal 1234, Santiago"
        />
      </div>
      <div>
        <label className="text-xs text-neutral-500 mb-1.5 block">Descripción</label>
        <textarea
          value={info.description}
          onChange={(e) => update("description", e.target.value)}
          rows={3}
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none resize-none"
          placeholder="Información adicional del evento"
        />
      </div>
      <ImageUploader
        value={info.flyer}
        onChange={(url) => update("flyer", url)}
        label="Flyer del evento"
      />
    </div>
  );
}
