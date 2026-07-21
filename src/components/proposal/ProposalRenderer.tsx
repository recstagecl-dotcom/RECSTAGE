import { Proposal, BlockType } from "@/lib/types";
import HeroBlock from "./HeroBlock";
import CardsBlock from "./CardsBlock";
import NosotrosBlock from "./NosotrosBlock";
import InfoBlock from "./InfoBlock";
import ServiceBlock from "./ServiceBlock";
import VideosBlock from "./VideosBlock";
import GalleryBlock from "./GalleryBlock";
import FaqBlock from "./FaqBlock";
import PriceBlock from "./PriceBlock";
import PaymentBlock from "./PaymentBlock";
import ContactBlock from "./ContactBlock";

interface Props {
  proposal: Proposal;
}

export default function ProposalRenderer({ proposal }: Props) {
  const { blocks, design } = proposal;
  const primaryColor = design.primaryColor;

  function renderBlock(type: BlockType) {
    switch (type) {
      case "hero":
        return (
          <HeroBlock
            key={type}
            data={proposal.hero}
            primaryColor={primaryColor}
            logo={design.logo}
          />
        );
      case "cards":
        return proposal.cards ? (
          <CardsBlock key={type} data={proposal.cards} primaryColor={primaryColor} />
        ) : null;
      case "nosotros":
        return proposal.nosotros ? (
          <NosotrosBlock key={type} data={proposal.nosotros} primaryColor={primaryColor} />
        ) : null;
      case "info":
        return proposal.info ? (
          <InfoBlock key={type} data={proposal.info} primaryColor={primaryColor} />
        ) : null;
      case "service":
        return (
          <ServiceBlock key={type} data={proposal.service} primaryColor={primaryColor} />
        );
      case "videos":
        return (
          <VideosBlock key={type} videos={proposal.videos} primaryColor={primaryColor} />
        );
      case "gallery":
        return <GalleryBlock key={type} gallery={proposal.gallery} />;
      case "faq":
        return (
          <FaqBlock key={type} faq={proposal.faq} primaryColor={primaryColor} />
        );
      case "price":
        return (
          <PriceBlock key={type} data={proposal.price} primaryColor={primaryColor} />
        );
      case "payment":
        return (
          <PaymentBlock key={type} data={proposal.payment} primaryColor={primaryColor} />
        );
      case "contact":
        return (
          <ContactBlock key={type} data={proposal.contact} primaryColor={primaryColor} />
        );
      default:
        return null;
    }
  }

  return (
    <div className="bg-black min-h-screen">
      {blocks.map((block) => renderBlock(block))}

      <footer className="py-16 px-6 border-t border-neutral-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-8 h-px mx-auto mb-8" style={{ backgroundColor: design.primaryColor }} />
          <p className="text-neutral-600 text-sm font-light tracking-wide">
            © 2026 REC STAGE
          </p>
          <p className="text-neutral-700 text-xs mt-2 uppercase tracking-[0.15em]">
            Producción escénica profesional
          </p>
        </div>
      </footer>
    </div>
  );
}
