"use client";

import { useCallback, useEffect, useState } from "react";
import { Proposal } from "./types";
import { getSupabase } from "./supabase";
import { getAllProposals } from "./proposals";

let _supabase: ReturnType<typeof getSupabase> | null = null;
function supabase() {
  if (!_supabase) _supabase = getSupabase();
  return _supabase;
}

export function useProposals() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase()
        .from("proposals")
        .select("data")
        .order("created_at", { ascending: true });

      if (error || !data || data.length === 0) {
        const defaults = getAllProposals();
        const rows = defaults.map((p) => ({
          code: p.code,
          data: p,
        }));
        await supabase().from("proposals").upsert(rows, { onConflict: "code" });
        setProposals(defaults);
      } else {
        setProposals(data.map((row) => row.data as Proposal));
      }
      setLoaded(true);
    }
    load();
  }, []);

  const getProposal = useCallback(
    (code: string): Proposal | undefined => {
      return proposals.find((p) => p.code === code);
    },
    [proposals]
  );

  const updateProposal = useCallback(async (updated: Proposal) => {
    setProposals((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    await supabase()
      .from("proposals")
      .upsert({ code: updated.code, data: updated }, { onConflict: "code" });
  }, []);

  const createProposal = useCallback(async (proposal: Proposal) => {
    setProposals((prev) => [...prev, proposal]);
    await supabase()
      .from("proposals")
      .upsert({ code: proposal.code, data: proposal }, { onConflict: "code" });
  }, []);

  const deleteProposal = useCallback(async (id: string) => {
    setProposals((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) {
        supabase().from("proposals").delete().eq("code", target.code);
      }
      return prev.filter((p) => p.id !== id);
    });
  }, []);

  const duplicateProposal = useCallback(async (id: string) => {
    const original = proposals.find((p) => p.id === id);
    if (!original) return "";
    const newCode = generateCode();
    const duplicate: Proposal = {
      ...JSON.parse(JSON.stringify(original)),
      id: String(Date.now()),
      code: newCode,
      internalName: `${original.internalName} (Copia)`,
      visible: false,
    };
    setProposals((prev) => [...prev, duplicate]);
    await supabase()
      .from("proposals")
      .upsert({ code: duplicate.code, data: duplicate }, { onConflict: "code" });
    return newCode;
  }, [proposals]);

  return {
    proposals,
    loaded,
    getProposal,
    updateProposal,
    createProposal,
    deleteProposal,
    duplicateProposal,
  };
}

function generateCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function generateNewProposal(): Proposal {
  return {
    id: String(Date.now()),
    code: generateCode(),
    internalName: "Nueva Propuesta",
    client: "",
    event: "",
    date: "",
    priceAmount: 0,
    status: "active",
    visible: true,
    template: "personalizado",
    blocks: ["hero", "cards", "nosotros", "info", "service", "price", "contact"],
    hero: {
      titleLine1: "NO DEJES QUE UNO DE LOS RECUERDOS",
      titleHighlight: "MÁS IMPORTANTES DE TU BANDA",
      titleLine2: "QUEDE REGISTRADO CON UN CELULAR",
      backgroundImage: "/images/hero-bg.jpg",
      backgroundVideo: "/video.mp4",
      tagline: "REC STAGE — Grabación profesional de shows en vivo",
    },
    cards: {
      titleLine1: "TU SHOW MERECE",
      titleHighlight: "UN REGISTRO PROFESIONAL",
      titleLine2: "",
      cards: [
        {
          image: "",
          icon: "🎬",
          title: "Producción Completa",
          subtitle: "Del montaje al show",
          description: "Descripción del servicio aquí.",
        },
      ],
    },
    nosotros: {
      titleLine1: "CONOCE AL",
      titleHighlight: "EQUIPO",
      titleLine2: "",
      cards: [
        {
          image: "",
          icon: "👤",
          title: "Tu nombre",
          subtitle: "Director / Productor",
          description: "Breve descripción del miembro del equipo.",
        },
      ],
    },
    info: {
      flyer: "",
      eventName: "",
      date: "",
      venue: "",
      location: "",
      time: "",
      description: "",
    },
    service: {
      title: "Nuestro Servicio",
      description: "Descripción del servicio aquí.",
    },
    videos: [],
    gallery: [],
    faq: [],
    price: {
      amount: 0,
      currency: "CLP",
      description: "Descripción del plan",
    },
    payment: {
      subtitle: "Formas de Pago",
      description: "",
      methods: ["Transferencia bancaria"],
      notes: "Condiciones de pago",
    },
    contact: {
      email: "",
      instagram: "",
      whatsapp: "",
    },
    design: {
      logo: "",
      primaryColor: "#E50914",
      secondaryColor: "#141414",
    },
  };
}
