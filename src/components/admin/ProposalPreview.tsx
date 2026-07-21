import { Proposal, BlockType } from "@/lib/types";
import HeroBlock from "@/components/proposal/HeroBlock";
import CardsBlock from "@/components/proposal/CardsBlock";
import NosotrosBlock from "@/components/proposal/NosotrosBlock";
import InfoBlock from "@/components/proposal/InfoBlock";
import ServiceBlock from "@/components/proposal/ServiceBlock";
import VideosBlock from "@/components/proposal/VideosBlock";
import GalleryBlock from "@/components/proposal/GalleryBlock";
import FaqBlock from "@/components/proposal/FaqBlock";
import PriceBlock from "@/components/proposal/PriceBlock";
import PaymentBlock from "@/components/proposal/PaymentBlock";
import ContactBlock from "@/components/proposal/ContactBlock";

interface Props {
  proposal: Proposal;
}

export default function ProposalPreview({ proposal }: Props) {
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
    </div>
  );
}
