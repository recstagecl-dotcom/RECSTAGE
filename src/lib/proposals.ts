import { Proposal } from "./types";

const proposals: Proposal[] = [
  {
    id: "1",
    code: "3JK82P",
    internalName: "BLACK VOID",
    client: "Black Void",
    event: "Teloneo OPETH",
    date: "2026-08-15",
    priceAmount: 450000,
    status: "active",
    visible: true,
    template: "banda-soporte",
    blocks: ["hero", "cards", "service", "videos", "price", "payment", "contact"],
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
          description: "Nos encargamos de toda la producción técnica para que tu banda solo se preocupe por tocar.",
        },
        {
          image: "",
          icon: "🎵",
          title: "Sonido Profesional",
          subtitle: "Calidad de estudio en vivo",
          description: "Ingenieros de sonido con experiencia en festivales y shows de primer nivel.",
        },
        {
          image: "",
          icon: "💡",
          title: "Iluminación Cinematográfica",
          subtitle: "Diseño visual premium",
          description: "Diseños de iluminación que transforman tu show en una experiencia visual inolvidable.",
        },
        {
          image: "",
          icon: "📹",
          title: "Grabación en Vivo",
          subtitle: "Registra tu mejor momento",
          description: "Audio y video profesional para que tu show viva para siempre.",
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
          icon: "🎙️",
          title: "Productor Principal",
          subtitle: "Dirección y mezcla",
          description: "Más de 10 años de experiencia en grabaciones en vivo.",
        },
        {
          image: "",
          icon: "🎥",
          title: "Director de Fotografía",
          subtitle: "Captura visual",
          description: "Especialista en cobertura de shows en vivo con múltiples cámaras.",
        },
      ],
    },
    info: {
      flyer: "",
      eventName: "Teloneo OPETH",
      date: "15 de Agosto, 2026",
      venue: "Teatro Caupolicán",
      location: "Santiago, Chile",
      time: "21:00 hrs",
      description: "Black Void se presenta como teloneo de OPETH en su gira sudamericana.",
    },
    service: {
      title: "Plan Banda Soporte",
      description:
        "Servicio completo de producción escénica para tu presentación. Incluye montaje profesional, sonido de alta gama, iluminación cinematográfica y gestión técnica integral. Nos encargamos de todo para que vos solo te preocupes por subir al escenario y destrozar.",
    },
    videos: [
      {
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Show en vivo — Temporada 2025",
      },
      {
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Behind the scenes — Festival Kosmik",
      },
    ],
    gallery: [
      { url: "/images/gallery-1.jpg", alt: "Escenario iluminado en rojo" },
      { url: "/images/gallery-2.jpg", alt: "Banda tocando en vivo" },
      { url: "/images/gallery-3.jpg", alt: "Vista desde el backstage" },
      { url: "/images/gallery-4.jpg", alt: "Público en primer plano" },
    ],
    faq: [
      {
        question: "¿Cuál es el tiempo de montaje?",
        answer:
          "El montaje completo se realiza en un máximo de 4 horas antes del evento. Nuestro equipo llega con antelación para garantizar que todo esté listo.",
      },
      {
        question: "¿Se puede personalizar la iluminación?",
        answer:
          "Sí, trabajamos con un diseño de iluminación personalizado según la identidad visual de la banda y la atmósfera del show.",
      },
      {
        question: "¿Incluye técnico de sonido?",
        answer:
          "Sí, el plan incluye un ingeniero de sonido profesional durante todo el evento.",
      },
    ],
    price: {
      amount: 450000,
      currency: "CLP",
      description: "Producción escénica completa para teloneo",
    },
    payment: {
      subtitle: "Formas de Pago",
      description: "Trabajamos con diferentes opciones para que elijas la que mejor se adapte a ti.",
      methods: ["Transferencia bancaria", "Depósito", "QR"],
      notes: "50% de reserva para confirmar fecha. Saldo 7 días antes del evento.",
    },
    contact: {
      email: "contacto@recstage.cl",
      instagram: "@recstage",
      whatsapp: "+56 9 1234 5678",
    },
    design: {
      logo: "/logo.png",
      primaryColor: "#E50914",
      secondaryColor: "#141414",
    },
  },
  {
    id: "2",
    code: "KA91LMX",
    internalName: "RITUAL SONORO",
    client: "Ritual Sonoro",
    event: "Festival Kosmik 2026",
    date: "2026-10-20",
    priceAmount: 1200000,
    status: "active",
    visible: true,
    template: "festival",
    blocks: [
      "hero",
      "cards",
      "service",
      "videos",
      "gallery",
      "faq",
      "price",
      "payment",
      "contact",
    ],
    hero: {
      titleLine1: "NO DEJES QUE UNO DE LOS RECUERDOS",
      titleHighlight: "MÁS IMPORTANTES DE TU BANDA",
      titleLine2: "QUEDE REGISTRADO CON UN CELULAR",
      backgroundImage: "/images/hero-bg-2.jpg",
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
          title: "Producción Festival",
          subtitle: "Escenario de primer nivel",
          description: "Setup completo para festivales con sonido line array y pantallas LED.",
        },
        {
          image: "",
          icon: "🎵",
          title: "Sonido Line Array",
          subtitle: "Potencia y claridad",
          description: "Sistemas de sonido profesionales que cubren cualquier espacio.",
        },
        {
          image: "",
          icon: "💡",
          title: "Luces LED",
          subtitle: "Shows visuales épicos",
          description: "Consolas DMX y paneles LED para espectáculos inolvidables.",
        },
        {
          image: "",
          icon: "📹",
          title: "Cobertura Completa",
          subtitle: "Multi-cámara profesional",
          description: "Grabación con múltiples cámaras para un resultado cinematográfico.",
        },
      ],
    },
    nosotros: {
      titleLine1: "NUESTRO",
      titleHighlight: "EQUIPO TÉCNICO",
      titleLine2: "",
      cards: [
        {
          image: "",
          icon: "👨‍💻",
          title: "Ingeniero de Sonido",
          subtitle: "Sonido line array",
          description: "Especialista en sistemas de sonido para festivales.",
        },
        {
          image: "",
          icon: "🎨",
          title: "Director Luces",
          subtitle: "Diseño visual",
          description: "Diseñador de espectáculos de luces LED y DMX.",
        },
      ],
    },
    info: {
      flyer: "",
      eventName: "Festival Kosmik 2026",
      date: "20 de Octubre, 2026",
      venue: "Parque Bicentenario",
      location: "Santiago, Chile",
      time: "16:00 - 23:00 hrs",
      description: "Festival de música alternativa con bandas nacionales e internacionales.",
    },
    service: {
      title: "Plan Festival",
      description:
        "Producción integral para festival. Escenario de primer nivel, sonido line array, iluminación profesional con consola DMX, pantallas LED y staff técnico completo. Tu banda merece un setup de festival, sin importar la escala del evento.",
    },
    videos: [
      {
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Festival Kosmik 2025 — Highlights",
      },
    ],
    gallery: [
      { url: "/images/gallery-5.jpg", alt: "Festival al aire libre" },
      { url: "/images/gallery-6.jpg", alt: "Pantalla LED en vivo" },
      { url: "/images/gallery-7.jpg", alt: "Vista aérea del escenario" },
    ],
    faq: [
      {
        question: "¿Trabajan con festivales al aire libre?",
        answer:
          "Sí, tenemos experiencia en eventos al aire libre con cubiertas técnicas, generadores y toda la logística necesaria.",
      },
      {
        question: "¿Pueden manejar múltiples bandas?",
        answer:
          "Absolutamente. Nuestro sistema de montaje está diseñado para cambios de escenario rápidos entre bandas.",
      },
    ],
    price: {
      amount: 1200000,
      currency: "CLP",
      description: "Producción integral para festival — incluye escenario, sonido, luces y staff",
    },
    payment: {
      subtitle: "Condiciones de Pago",
      description: "Para eventos grandes ofrecemos planes de pago flexibles.",
      methods: ["Transferencia bancaria", "Depósito"],
      notes: "30% de reserva. 40% a 30 días del evento. 30% el día del festival.",
    },
    contact: {
      email: "contacto@recstage.cl",
      instagram: "@recstage",
      whatsapp: "+56 9 1234 5678",
    },
    design: {
      logo: "/logo.png",
      primaryColor: "#E50914",
      secondaryColor: "#0A0A0A",
    },
  },
];

export function getProposalByCode(code: string): Proposal | undefined {
  return proposals.find(
    (p) => p.code === code && p.visible && p.status === "active"
  );
}

export function getAllProposals(): Proposal[] {
  return proposals.filter((p) => p.visible && p.status === "active");
}
