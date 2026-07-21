"use client";

import { useParams } from "next/navigation";
import { useProposals } from "@/lib/store";
import ProposalRenderer from "@/components/proposal/ProposalRenderer";
import { useEffect, useState } from "react";

export default function ProposalPage() {
  const params = useParams();
  const code = params.code as string;
  const { getProposal, loaded } = useProposals();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const proposal = mounted ? getProposal(code) : null;

  if (!mounted || !loaded || !proposal) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-neutral-500">Cargando...</p>
      </div>
    );
  }

  if (!proposal.visible) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-neutral-500">Esta propuesta no está disponible.</p>
      </div>
    );
  }

  return <ProposalRenderer proposal={proposal} />;
}
