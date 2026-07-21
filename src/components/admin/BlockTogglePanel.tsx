import { BlockType } from "@/lib/types";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface Props {
  blocks: BlockType[];
  onToggle: (block: BlockType) => void;
  onReorder: (blocks: BlockType[]) => void;
}

const ALL_BLOCKS: { type: BlockType; label: string; icon: string }[] = [
  { type: "hero", label: "Hero", icon: "🎬" },
  { type: "cards", label: "Tarjetas", icon: "🃏" },
  { type: "nosotros", label: "Nosotros", icon: "👥" },
  { type: "info", label: "Info Show", icon: "📋" },
  { type: "service", label: "Servicio", icon: "📝" },
  { type: "videos", label: "Videos", icon: "🎥" },
  { type: "gallery", label: "Galería", icon: "🖼️" },
  { type: "faq", label: "FAQ", icon: "❓" },
  { type: "price", label: "Precio", icon: "💰" },
  { type: "payment", label: "Pagos", icon: "💳" },
  { type: "contact", label: "Contacto", icon: "📞" },
];

function SortableBlock({
  type,
  label,
  icon,
  active,
  onToggle,
}: {
  type: BlockType;
  label: string;
  icon: string;
  active: boolean;
  onToggle: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: type });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : "auto" as string | number,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 ${
        active
          ? "bg-neutral-800 border border-neutral-600"
          : "bg-neutral-900/50 border border-transparent hover:border-neutral-800"
      } ${isDragging ? "ring-1 ring-[#E50914]" : ""}`}
    >
      <div className="flex items-center gap-2">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-neutral-500 hover:text-white p-1 -ml-1"
        >
          <GripVertical size={14} />
        </button>
        <span className="text-lg">{icon}</span>
        <span
          className={`text-sm font-medium ${
            active ? "text-white" : "text-neutral-500"
          }`}
        >
          {label}
        </span>
      </div>
      <button
        onClick={onToggle}
        className={`w-10 h-5.5 rounded-full transition-colors relative ${
          active ? "bg-[#E50914]" : "bg-neutral-700"
        }`}
      >
        <div
          className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform ${
            active ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function BlockTogglePanel({ blocks, onToggle, onReorder }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = blocks.indexOf(active.id as BlockType);
    const newIndex = blocks.indexOf(over.id as BlockType);
    if (oldIndex === -1 || newIndex === -1) return;
    onReorder(arrayMove(blocks, oldIndex, newIndex));
  }

  const activeBlocks = blocks.filter((b) => ALL_BLOCKS.some((ab) => ab.type === b));
  const inactiveBlocks = ALL_BLOCKS.filter((ab) => !blocks.includes(ab.type));

  return (
    <div className="p-4 space-y-4">
      <p className="text-xs text-neutral-500 mb-2 px-2">
        Arrastrá para reordenar · Tocá el switch para activar/desactivar
      </p>

      {activeBlocks.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={activeBlocks} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {activeBlocks.map((type) => {
                const block = ALL_BLOCKS.find((b) => b.type === type)!;
                return (
                  <SortableBlock
                    key={type}
                    type={block.type}
                    label={block.label}
                    icon={block.icon}
                    active={true}
                    onToggle={() => onToggle(type)}
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {inactiveBlocks.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-neutral-600 px-2">Inactivos</p>
          {inactiveBlocks.map(({ type, label, icon }) => (
            <div
              key={type}
              className="flex items-center justify-between px-3 py-3 rounded-xl bg-neutral-900/50 border border-transparent hover:border-neutral-800 transition-all"
            >
              <div className="flex items-center gap-2">
                <div className="w-6" />
                <span className="text-lg">{icon}</span>
                <span className="text-sm font-medium text-neutral-500">{label}</span>
              </div>
              <button
                onClick={() => onToggle(type)}
                className="w-10 h-5.5 rounded-full transition-colors relative bg-neutral-700"
              >
                <div className="absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform translate-x-0.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
