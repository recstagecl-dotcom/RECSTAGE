import { notFound } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import ProposalRenderer from "@/components/proposal/ProposalRenderer";
import { Proposal } from "@/lib/types";
import { getAllProposals } from "@/lib/proposals";

interface Props {
  params: Promise<{ code: string }>;
}

async function getProposalByCode(code: string): Promise<Proposal | null> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("proposals")
    .select("data")
    .eq("code", code)
    .single();

  if (data) return data.data as Proposal;

  if (error) {
    console.log("Supabase query error:", error.message, error.code);
  }

  const { count } = await supabase
    .from("proposals")
    .select("code", { count: "exact", head: true });

  console.log("Table count:", count);

  if (!count || count === 0) {
    console.log("Seeding default proposals...");
    const defaults = getAllProposals();
    const rows = defaults.map((p) => ({ code: p.code, data: p }));
    const { error: seedError } = await supabase
      .from("proposals")
      .upsert(rows, { onConflict: "code" });

    if (seedError) {
      console.log("Seed error:", seedError.message);
    } else {
      console.log("Seeded", rows.length, "proposals");
    }

    const retry = await supabase
      .from("proposals")
      .select("data")
      .eq("code", code)
      .single();

    if (retry.data) return retry.data.data as Proposal;
  }

  return null;
}

export async function generateMetadata({ params }: Props) {
  const { code } = await params;
  const proposal = await getProposalByCode(code);

  if (!proposal) return { title: "Propuesta no encontrada" };

  return {
    title: `${proposal.internalName} — REC STAGE`,
    description: `Propuesta comercial para ${proposal.client} — ${proposal.event}`,
  };
}

export default async function ProposalPage({ params }: Props) {
  const { code } = await params;
  const proposal = await getProposalByCode(code);

  if (!proposal) notFound();

  if (!proposal.visible) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-neutral-500">Esta propuesta no está disponible.</p>
      </div>
    );
  }

  return <ProposalRenderer proposal={proposal} />;
}
