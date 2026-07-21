"use client";

import { useParams, useRouter } from "next/navigation";
import { useProposals } from "@/lib/store";
import { useState } from "react";
import { Proposal, BlockType } from "@/lib/types";
import BlockTogglePanel from "@/components/admin/BlockTogglePanel";
import BlockEditor from "@/components/admin/BlockEditor";
import ProposalPreview from "@/components/admin/ProposalPreview";
import PasswordGate from "@/components/admin/PasswordGate";

export default function AdminEditor() {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;
  const { getProposal, updateProposal, loaded } = useProposals();
  const [editOverrides, setEditOverrides] = useState<Partial<Proposal>>({});
  const [saved, setSaved] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<"blocks" | "design">("blocks");

  const baseProposal = loaded ? getProposal(code) : null;
  const proposal = baseProposal
    ? {
        ...baseProposal,
        ...editOverrides,
        cards: editOverrides.cards ?? baseProposal.cards ?? {
          titleLine1: "TU SHOW MERECE",
          titleHighlight: "UN REGISTRO PROFESIONAL",
          titleLine2: "",
          cards: [],
        },
      }
    : null;

  function handleUpdate(updated: Partial<Proposal>) {
    if (!proposal) return;
    setEditOverrides((prev) => ({ ...prev, ...updated }));
    setSaved(false);
  }

  function handleSave() {
    if (!proposal) return;
    updateProposal(proposal);
    setEditOverrides({});
    setSaved(true);
  }

  function handleBlockToggle(block: BlockType) {
    if (!proposal) return;
    const blocks = proposal.blocks.includes(block)
      ? proposal.blocks.filter((b) => b !== block)
      : [...proposal.blocks, block];
    handleUpdate({ blocks });
  }

  function handleBlockReorder(blocks: BlockType[]) {
    handleUpdate({ blocks });
  }

  if (!loaded || !proposal) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-neutral-500">Cargando propuesta...</p>
      </div>
    );
  }

  return (
    <PasswordGate>
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top bar */}
      <header className="border-b border-neutral-800 px-6 py-3 flex items-center justify-between bg-neutral-950 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <input
              type="text"
              value={proposal.internalName}
              onChange={(e) => handleUpdate({ internalName: e.target.value })}
              className="bg-transparent text-lg font-bold text-white border-none outline-none focus:ring-0 placeholder-neutral-600"
              placeholder="Nombre de la propuesta"
            />
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="font-mono">/p/{proposal.code}</span>
              <span>•</span>
              <span>{proposal.client || "Sin cliente"}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              saved
                ? "bg-green-900/30 text-green-400"
                : "bg-yellow-900/30 text-yellow-400"
            }`}
          >
            {saved ? "Guardado" : "Sin guardar"}
          </span>

          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showPreview
                ? "bg-[#E50914] text-white"
                : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            {showPreview ? "Editor" : "Preview"}
          </button>

          <a
            href={`/p/${proposal.code}`}
            target="_blank"
            className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-400 text-sm font-medium hover:text-white transition-colors"
          >
            Abrir URL ↗
          </a>

          <button
            onClick={handleSave}
            disabled={saved}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              saved
                ? "bg-neutral-800 text-neutral-600 cursor-not-allowed"
                : "bg-[#E50914] text-white hover:scale-105"
            }`}
          >
            Guardar
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {showPreview ? (
          /* Preview mode */
          <div className="flex-1 overflow-y-auto">
            <ProposalPreview proposal={proposal} />
          </div>
        ) : (
          /* Editor mode */
          <>
            {/* Sidebar */}
            <aside className="w-80 border-r border-neutral-800 bg-neutral-950 overflow-y-auto flex-shrink-0">
              {/* Tabs */}
              <div className="flex border-b border-neutral-800">
                <button
                  onClick={() => setActiveTab("blocks")}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === "blocks"
                      ? "text-white border-b-2 border-[#E50914]"
                      : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  Bloques
                </button>
                <button
                  onClick={() => setActiveTab("design")}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === "design"
                      ? "text-white border-b-2 border-[#E50914]"
                      : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  Diseño
                </button>
              </div>

              {activeTab === "blocks" ? (
                <BlockTogglePanel
                  blocks={proposal.blocks}
                  onToggle={handleBlockToggle}
                  onReorder={handleBlockReorder}
                />
              ) : (
                <div className="p-6 space-y-6">
                  {/* Client info */}
                  <div>
                    <h3 className="text-sm font-medium text-neutral-400 mb-3">Cliente</h3>
                    <input
                      type="text"
                      value={proposal.client}
                      onChange={(e) => handleUpdate({ client: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none transition-colors"
                      placeholder="Nombre del cliente"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-neutral-400 mb-3">Evento</h3>
                    <input
                      type="text"
                      value={proposal.event}
                      onChange={(e) => handleUpdate({ event: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none transition-colors"
                      placeholder="Nombre del evento"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-neutral-400 mb-3">Fecha</h3>
                    <input
                      type="date"
                      value={proposal.date}
                      onChange={(e) => handleUpdate({ date: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Colors */}
                  <div>
                    <h3 className="text-sm font-medium text-neutral-400 mb-3">Colores</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={proposal.design.primaryColor}
                          onChange={(e) =>
                            handleUpdate({
                              design: { ...proposal.design, primaryColor: e.target.value },
                            })
                          }
                          className="w-10 h-10 rounded-lg border border-neutral-700 cursor-pointer bg-transparent"
                        />
                        <div>
                          <p className="text-sm text-white">Color primario</p>
                          <p className="text-xs text-neutral-500 font-mono">
                            {proposal.design.primaryColor}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={proposal.design.secondaryColor}
                          onChange={(e) =>
                            handleUpdate({
                              design: { ...proposal.design, secondaryColor: e.target.value },
                            })
                          }
                          className="w-10 h-10 rounded-lg border border-neutral-700 cursor-pointer bg-transparent"
                        />
                        <div>
                          <p className="text-sm text-white">Color secundario</p>
                          <p className="text-xs text-neutral-500 font-mono">
                            {proposal.design.secondaryColor}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <h3 className="text-sm font-medium text-neutral-400 mb-3">Estado</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm text-neutral-300">Visible</span>
                        <div
                          onClick={() => handleUpdate({ visible: !proposal.visible })}
                          className={`w-11 h-6 rounded-full transition-colors relative ${
                            proposal.visible ? "bg-[#E50914]" : "bg-neutral-700"
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                              proposal.visible ? "translate-x-5.5" : "translate-x-0.5"
                            }`}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </aside>

            {/* Block editors */}
            <main className="flex-1 overflow-y-auto">
              <BlockEditor proposal={proposal} onUpdate={handleUpdate} />
            </main>
          </>
        )}
      </div>
    </div>
    </PasswordGate>
  );
}
