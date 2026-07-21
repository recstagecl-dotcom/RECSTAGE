"use client";

import Link from "next/link";
import { useProposals, generateNewProposal } from "@/lib/store";
import { useRouter } from "next/navigation";
import PasswordGate from "@/components/admin/PasswordGate";

export default function Dashboard() {
  const { proposals, loaded, deleteProposal, duplicateProposal, createProposal } =
    useProposals();
  const router = useRouter();

  function handleCreate() {
    const newProposal = generateNewProposal();
    createProposal(newProposal);
    router.push(`/admin/${newProposal.code}`);
  }

  if (!loaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-neutral-500">Cargando...</p>
      </div>
    );
  }

  return (
    <PasswordGate>
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-[#E50914]">
                REC STAGE
              </h1>
              <p className="text-neutral-500 mt-2 text-lg font-light">
                Panel de Propuestas
              </p>
            </div>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#E50914] text-white font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-900/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nueva Propuesta
            </button>
          </div>

          {proposals.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-neutral-600 text-lg">No hay propuestas todavía.</p>
              <button
                onClick={handleCreate}
                className="mt-6 text-[#E50914] hover:underline"
              >
                Crear la primera
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className="group border border-neutral-800 rounded-2xl p-6 bg-neutral-900/50 hover:border-neutral-600 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {proposal.internalName}
                      </h3>
                      <p className="text-neutral-500 text-sm mt-1">
                        {proposal.client || "Sin cliente"}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        proposal.visible
                          ? "bg-green-900/50 text-green-400 border border-green-800"
                          : "bg-neutral-800 text-neutral-500 border border-neutral-700"
                      }`}
                    >
                      {proposal.visible ? "Visible" : "Oculta"}
                    </span>
                  </div>

                  {proposal.event && (
                    <p className="text-neutral-400 text-sm mb-2">
                      📅 {proposal.event}
                    </p>
                  )}

                  <div className="flex items-center gap-2 mb-4 text-sm text-neutral-500">
                    <span className="font-mono bg-neutral-800 px-2 py-0.5 rounded">
                      /p/{proposal.code}
                    </span>
                    <span>•</span>
                    <span>{proposal.blocks.length} bloques</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/${proposal.code}`}
                      className="flex-1 text-center py-2.5 rounded-xl bg-neutral-800 text-white text-sm font-medium hover:bg-neutral-700 transition-colors"
                    >
                      Editar
                    </Link>
                    <Link
                      href={`/p/${proposal.code}`}
                      target="_blank"
                      className="flex-1 text-center py-2.5 rounded-xl border border-neutral-700 text-neutral-400 text-sm font-medium hover:border-neutral-500 hover:text-white transition-colors"
                    >
                      Ver
                    </Link>
                    <button
                      onClick={async () => {
                        const newCode = await duplicateProposal(proposal.id);
                        if (newCode) router.push(`/admin/${newCode}`);
                      }}
                      className="p-2.5 rounded-xl border border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white transition-colors"
                      title="Duplicar"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("¿Eliminar esta propuesta?")) {
                          deleteProposal(proposal.id);
                        }
                      }}
                      className="p-2.5 rounded-xl border border-neutral-700 text-neutral-400 hover:border-red-700 hover:text-red-400 transition-colors"
                      title="Eliminar"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PasswordGate>
  );
}
