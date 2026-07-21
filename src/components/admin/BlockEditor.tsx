"use client";

import { Proposal, BlockType } from "@/lib/types";
import HeroEditor from "./editors/HeroEditor";
import ServiceEditor from "./editors/ServiceEditor";
import VideosEditor from "./editors/VideosEditor";
import GalleryEditor from "./editors/GalleryEditor";
import FaqEditor from "./editors/FaqEditor";
import PriceEditor from "./editors/PriceEditor";
import PaymentEditor from "./editors/PaymentEditor";
import ContactEditor from "./editors/ContactEditor";
import CardsEditor from "./editors/CardsEditor";
import NosotrosEditor from "./editors/NosotrosEditor";
import InfoEditor from "./editors/InfoEditor";

interface Props {
  proposal: Proposal;
  onUpdate: (updated: Partial<Proposal>) => void;
}

const BLOCK_CONFIG: Record<
  BlockType,
  { label: string; icon: string; component: React.ComponentType<{
    proposal: Proposal;
    onUpdate: (updated: Partial<Proposal>) => void;
  }> }
> = {
  hero: { label: "Hero", icon: "🎬", component: HeroEditor },
  cards: { label: "Tarjetas", icon: "🃏", component: CardsEditor },
  nosotros: { label: "Nosotros", icon: "👥", component: NosotrosEditor },
  info: { label: "Info Show", icon: "📋", component: InfoEditor },
  service: { label: "Servicio", icon: "📋", component: ServiceEditor },
  videos: { label: "Videos", icon: "🎥", component: VideosEditor },
  gallery: { label: "Galería", icon: "🖼️", component: GalleryEditor },
  faq: { label: "FAQ", icon: "❓", component: FaqEditor },
  price: { label: "Precio", icon: "💰", component: PriceEditor },
  payment: { label: "Pagos", icon: "💳", component: PaymentEditor },
  contact: { label: "Contacto", icon: "📞", component: ContactEditor },
};

export default function BlockEditor({ proposal, onUpdate }: Props) {
  const activeBlocks = proposal.blocks;

  if (activeBlocks.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-neutral-600 text-lg mb-2">No hay bloques activos</p>
          <p className="text-neutral-700 text-sm">
            Activá bloques desde el panel de la izquierda
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-neutral-800">
      {activeBlocks.map((blockType) => {
        const config = BLOCK_CONFIG[blockType];
        if (!config) return null;
        const EditorComponent = config.component;
        return (
          <div key={blockType} className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span>{config.icon}</span>
              <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">
                {config.label}
              </h2>
            </div>
            <EditorComponent proposal={proposal} onUpdate={onUpdate} />
          </div>
        );
      })}
    </div>
  );
}
