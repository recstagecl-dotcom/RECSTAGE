export type BlockType =
  | "hero"
  | "cards"
  | "nosotros"
  | "info"
  | "service"
  | "videos"
  | "gallery"
  | "faq"
  | "price"
  | "payment"
  | "contact";

export type ProposalTemplate =
  | "banda-soporte"
  | "show-club"
  | "festival"
  | "personalizado";

export type ProposalStatus = "active" | "inactive";

export interface HeroBlock {
  titleLine1: string;
  titleHighlight: string;
  titleLine2: string;
  backgroundImage: string;
  backgroundVideo: string;
  tagline: string;
}

export interface CardItem {
  image: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface CardsBlock {
  titleLine1: string;
  titleHighlight: string;
  titleLine2: string;
  cards: CardItem[];
}

export interface InfoBlock {
  flyer: string;
  eventName: string;
  date: string;
  venue: string;
  location: string;
  time: string;
  description: string;
}

export interface ServiceBlock {
  title: string;
  description: string;
}

export interface VideoItem {
  url: string;
  title: string;
}

export interface GalleryItem {
  url: string;
  alt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PriceBlock {
  amount: number;
  currency: string;
  description: string;
}

export interface PaymentBlock {
  methods: string[];
  notes: string;
}

export interface ContactBlock {
  email: string;
  phone: string;
  whatsapp: string;
}

export interface DesignConfig {
  logo: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface Proposal {
  id: string;
  code: string;
  internalName: string;
  client: string;
  event: string;
  date: string;
  priceAmount: number;
  status: ProposalStatus;
  visible: boolean;
  template: ProposalTemplate;
  blocks: BlockType[];
  hero: HeroBlock;
  cards: CardsBlock;
  nosotros: CardsBlock;
  info: InfoBlock;
  service: ServiceBlock;
  videos: VideoItem[];
  gallery: GalleryItem[];
  faq: FaqItem[];
  price: PriceBlock;
  payment: PaymentBlock;
  contact: ContactBlock;
  design: DesignConfig;
}
