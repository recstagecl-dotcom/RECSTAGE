"use client";

import { Proposal } from "@/lib/types";

interface Props {
  proposal: Proposal;
  onUpdate: (updated: Partial<Proposal>) => void;
}

export default function ContactEditor({ proposal, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-neutral-500 mb-1.5 block">Email</label>
        <input
          type="email"
          value={proposal.contact.email}
          onChange={(e) =>
            onUpdate({
              contact: { ...proposal.contact, email: e.target.value },
            })
          }
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
          placeholder="contacto@recstage.cl"
        />
      </div>
      <div>
        <label className="text-xs text-neutral-500 mb-1.5 block">Instagram</label>
        <input
          type="text"
          value={proposal.contact.instagram}
          onChange={(e) =>
            onUpdate({
              contact: { ...proposal.contact, instagram: e.target.value },
            })
          }
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
          placeholder="@recstage"
        />
      </div>
      <div>
        <label className="text-xs text-neutral-500 mb-1.5 block">WhatsApp</label>
        <input
          type="tel"
          value={proposal.contact.whatsapp}
          onChange={(e) =>
            onUpdate({
              contact: { ...proposal.contact, whatsapp: e.target.value },
            })
          }
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
          placeholder="+56 9 1234 5678"
        />
      </div>
    </div>
  );
}
