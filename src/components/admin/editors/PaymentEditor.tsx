"use client";

import { Proposal } from "@/lib/types";

interface Props {
  proposal: Proposal;
  onUpdate: (updated: Partial<Proposal>) => void;
}

export default function PaymentEditor({ proposal, onUpdate }: Props) {
  function addMethod() {
    onUpdate({
      payment: {
        ...proposal.payment,
        methods: [...proposal.payment.methods, ""],
      },
    });
  }

  function removeMethod(index: number) {
    onUpdate({
      payment: {
        ...proposal.payment,
        methods: proposal.payment.methods.filter((_, i) => i !== index),
      },
    });
  }

  function updateMethod(index: number, value: string) {
    const updated = [...proposal.payment.methods];
    updated[index] = value;
    onUpdate({
      payment: { ...proposal.payment, methods: updated },
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-neutral-500 mb-1.5 block">
          Métodos de pago
        </label>
        <div className="space-y-2">
          {proposal.payment.methods.map((method, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={method}
                onChange={(e) => updateMethod(index, e.target.value)}
                className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E50914] focus:outline-none"
                placeholder="Método de pago"
              />
              <button
                onClick={() => removeMethod(index)}
                className="text-neutral-500 hover:text-red-400 p-1"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={addMethod}
            className="text-xs text-[#E50914] hover:underline"
          >
            + Agregar método
          </button>
        </div>
      </div>
      <div>
        <label className="text-xs text-neutral-500 mb-1.5 block">
          Notas de pago
        </label>
        <textarea
          value={proposal.payment.notes}
          onChange={(e) =>
            onUpdate({
              payment: { ...proposal.payment, notes: e.target.value },
            })
          }
          rows={3}
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none resize-none"
          placeholder="Condiciones de pago"
        />
      </div>
    </div>
  );
}
