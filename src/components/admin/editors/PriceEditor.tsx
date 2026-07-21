"use client";

import { Proposal } from "@/lib/types";

interface Props {
  proposal: Proposal;
  onUpdate: (updated: Partial<Proposal>) => void;
}

export default function PriceEditor({ proposal, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-neutral-500 mb-1.5 block">Monto</label>
          <input
            type="number"
            value={proposal.price.amount}
            onChange={(e) =>
              onUpdate({
                price: { ...proposal.price, amount: Number(e.target.value) },
              })
            }
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
            placeholder="450000"
          />
        </div>
        <div>
          <label className="text-xs text-neutral-500 mb-1.5 block">Moneda</label>
          <select
            value={proposal.price.currency}
            onChange={(e) =>
              onUpdate({
                price: { ...proposal.price, currency: e.target.value },
              })
            }
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
          >
            <option value="CLP">CLP</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="ARS">ARS</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-xs text-neutral-500 mb-1.5 block">Descripción del precio</label>
        <input
          type="text"
          value={proposal.price.description}
          onChange={(e) =>
            onUpdate({
              price: { ...proposal.price, description: e.target.value },
            })
          }
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
          placeholder="Producción escénica completa"
        />
      </div>
    </div>
  );
}
