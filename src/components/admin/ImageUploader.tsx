"use client";

import { useState, useRef } from "react";
import { getSupabase } from "@/lib/supabase";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export default function ImageUploader({ value, onChange, label, className = "" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("No es una imagen");
      return;
    }
    setUploading(true);
    setError("");

    const ext = file.name.split(".").pop() || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const supabase = getSupabase();
    const { error: uploadError } = await supabase.storage.from("images").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("images").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className={className}>
      {label && (
        <p className="text-xs text-neutral-500 mb-1.5">{label}</p>
      )}

      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt=""
            className="w-full h-32 object-cover rounded-lg border border-neutral-700"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <button
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 bg-neutral-800 text-white text-xs rounded-lg hover:bg-neutral-700"
            >
              Cambiar
            </button>
            <button
              onClick={() => onChange("")}
              className="px-3 py-1.5 bg-red-900/80 text-white text-xs rounded-lg hover:bg-red-800"
            >
              Quitar
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`w-full h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
            dragOver
              ? "border-[#E50914] bg-[#E50914]/5"
              : "border-neutral-700 hover:border-neutral-500 bg-neutral-900/50"
          }`}
        >
          {uploading ? (
            <span className="text-xs text-neutral-400">Subiendo...</span>
          ) : (
            <span className="text-xs text-neutral-500">
              Arrastrá una imagen o hacé clic
            </span>
          )}
          {error && (
            <span className="text-xs text-red-400 mt-1 block">{error}</span>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
