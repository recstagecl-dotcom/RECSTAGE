"use client";

import { Proposal } from "@/lib/types";

interface Props {
  proposal: Proposal;
  onUpdate: (updated: Partial<Proposal>) => void;
}

export default function ServiceEditor({ proposal, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-neutral-500 mb-1.5 block">Título</label>
        <input
          type="text"
          value={proposal.service.title}
          onChange={(e) =>
            onUpdate({ service: { ...proposal.service, title: e.target.value } })
          }
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
          placeholder="Título del servicio"
        />
      </div>
      <div>
        <label className="text-xs text-neutral-500 mb-1.5 block">Descripción</label>
        <textarea
          value={proposal.service.description}
          onChange={(e) =>
            onUpdate({
              service: { ...proposal.service, description: e.target.value },
            })
          }
          rows={5}
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none resize-none"
          placeholder="Descripción del servicio"
        />
      </div>
    </div>
  );
}
