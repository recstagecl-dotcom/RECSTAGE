"use client";

import { Proposal, FaqItem } from "@/lib/types";
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

interface Props {
  proposal: Proposal;
  onUpdate: (updated: Partial<Proposal>) => void;
}

function SortableFaq({
  item,
  index,
  onUpdateItem,
  onRemove,
}: {
  item: FaqItem;
  index: number;
  onUpdateItem: (index: number, field: keyof FaqItem, value: string) => void;
  onRemove: (index: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: `faq-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 space-y-3"
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
          Pregunta {index + 1}
        </span>
        <button
          onClick={() => onRemove(index)}
          className="text-xs text-red-400 hover:text-red-300"
        >
          Eliminar
        </button>
      </div>
      <input
        type="text"
        value={item.question}
        onChange={(e) => onUpdateItem(index, "question", e.target.value)}
        className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E50914] focus:outline-none"
        placeholder="¿Pregunta?"
      />
      <textarea
        value={item.answer}
        onChange={(e) => onUpdateItem(index, "answer", e.target.value)}
        rows={3}
        className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E50914] focus:outline-none resize-none"
        placeholder="Respuesta"
      />
    </div>
  );
}

export default function FaqEditor({ proposal, onUpdate }: Props) {
  function addFaq() {
    onUpdate({ faq: [...proposal.faq, { question: "", answer: "" }] });
  }

  function removeFaq(index: number) {
    onUpdate({ faq: proposal.faq.filter((_, i) => i !== index) });
  }

  function updateFaq(index: number, field: keyof FaqItem, value: string) {
    const updated = [...proposal.faq];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate({ faq: updated });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = Number(String(active.id).replace("faq-", ""));
    const newIndex = Number(String(over.id).replace("faq-", ""));
    onUpdate({ faq: arrayMove(proposal.faq, oldIndex, newIndex) });
  }

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  return (
    <div className="space-y-4">
      {proposal.faq.length === 0 && (
        <p className="text-sm text-neutral-600">No hay preguntas agregadas</p>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={proposal.faq.map((_, i) => `faq-${i}`)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {proposal.faq.map((item, index) => (
              <SortableFaq
                key={index}
                item={item}
                index={index}
                onUpdateItem={updateFaq}
                onRemove={removeFaq}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <button
        onClick={addFaq}
        className="w-full py-2.5 rounded-lg border border-dashed border-neutral-700 text-sm text-neutral-500 hover:border-neutral-500 hover:text-white transition-colors"
      >
        + Agregar pregunta
      </button>
    </div>
  );
}
