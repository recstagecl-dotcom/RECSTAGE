"use client";

import { Proposal, CardItem } from "@/lib/types";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import ImageUploader from "../ImageUploader";

interface Props {
  proposal: Proposal;
  onUpdate: (updated: Partial<Proposal>) => void;
}

function SortableCard({
  card,
  index,
  onUpdateCard,
  onRemove,
}: {
  card: CardItem;
  index: number;
  onUpdateCard: (index: number, field: keyof CardItem, value: string) => void;
  onRemove: (index: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: `card-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 space-y-3"
    >
      <div className="flex items-center gap-2">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-neutral-600 hover:text-neutral-400 p-1"
        >
          <GripVertical size={16} />
        </button>
        <span className="text-xs text-neutral-500 font-mono flex-1">
          Tarjeta {index + 1}
        </span>
        <button
          onClick={() => onRemove(index)}
          className="text-xs text-red-400 hover:text-red-300"
        >
          Eliminar
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-neutral-600 mb-1 block">Ícono</label>
          <input
            type="text"
            value={card.icon}
            onChange={(e) => onUpdateCard(index, "icon", e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E50914] focus:outline-none"
          />
        </div>
      </div>
      <ImageUploader
        value={card.image}
        onChange={(url) => onUpdateCard(index, "image", url)}
        label="Imagen de la tarjeta"
      />
      <div>
        <label className="text-xs text-neutral-600 mb-1 block">Título</label>
        <input
          type="text"
          value={card.title}
          onChange={(e) => onUpdateCard(index, "title", e.target.value)}
          className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E50914] focus:outline-none"
        />
      </div>
      <div>
        <label className="text-xs text-neutral-600 mb-1 block">Subtítulo (accent)</label>
        <input
          type="text"
          value={card.subtitle}
          onChange={(e) => onUpdateCard(index, "subtitle", e.target.value)}
          className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E50914] focus:outline-none"
        />
      </div>
      <div>
        <label className="text-xs text-neutral-600 mb-1 block">Descripción</label>
        <textarea
          value={card.description}
          onChange={(e) => onUpdateCard(index, "description", e.target.value)}
          rows={2}
          className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E50914] focus:outline-none resize-none"
        />
      </div>
    </div>
  );
}

export default function CardsEditor({ proposal, onUpdate }: Props) {
  const cards = proposal.cards;

  function updateTitle(field: "titleLine1" | "titleHighlight" | "titleLine2", value: string) {
    onUpdate({ cards: { ...cards, [field]: value } });
  }

  function addCard() {
    onUpdate({
      cards: { ...cards, cards: [...cards.cards, { image: "", icon: "⭐", title: "Nuevo servicio", subtitle: "Subtítulo", description: "Descripción" }] },
    });
  }

  function removeCard(index: number) {
    onUpdate({ cards: { ...cards, cards: cards.cards.filter((_, i) => i !== index) } });
  }

  function updateCard(index: number, field: keyof CardItem, value: string) {
    const updated = [...cards.cards];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate({ cards: { ...cards, cards: updated } });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = Number(String(active.id).replace("card-", ""));
    const newIndex = Number(String(over.id).replace("card-", ""));
    const reordered = arrayMove(cards.cards, oldIndex, newIndex);
    onUpdate({ cards: { ...cards, cards: reordered } });
  }

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Título de la sección
        </h3>
        <input
          type="text"
          value={cards.titleLine1}
          onChange={(e) => updateTitle("titleLine1", e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
          placeholder="TU SHOW MERECE"
        />
        <input
          type="text"
          value={cards.titleHighlight}
          onChange={(e) => updateTitle("titleHighlight", e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
          placeholder="UN REGISTRO PROFESIONAL"
        />
        <input
          type="text"
          value={cards.titleLine2}
          onChange={(e) => updateTitle("titleLine2", e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#E50914] focus:outline-none"
          placeholder="(opcional)"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
            Tarjetas ({cards.cards.length})
          </h3>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={cards.cards.map((_, i) => `card-${i}`)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {cards.cards.map((card, index) => (
                <SortableCard
                  key={index}
                  card={card}
                  index={index}
                  onUpdateCard={updateCard}
                  onRemove={removeCard}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <button
          onClick={addCard}
          className="w-full mt-4 py-2.5 rounded-lg border border-dashed border-neutral-700 text-sm text-neutral-500 hover:border-neutral-500 hover:text-white transition-colors"
        >
          + Agregar tarjeta
        </button>
      </div>
    </div>
  );
}
