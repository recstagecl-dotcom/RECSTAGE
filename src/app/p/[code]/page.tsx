import { notFound } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import ProposalRenderer from "@/components/proposal/ProposalRenderer";
import { Proposal } from "@/lib/types";
import { getAllProposals } from "@/lib/proposals";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ code: string }>;
}

async function getProposalByCode(code: string): Promise<Proposal | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("proposals")
    .select("data")
    .eq("code", code)
    .single();

  if (data) return data.data as Proposal;

  const { count } = await supabase
    .from("proposals")
    .select("code", { count: "exact", head: true });

  if (!count || count === 0) {
    const defaults = getAllProposals();
    const rows = defaults.map((p) => ({ code: p.code, data: p }));
    await supabase.from("proposals").upsert(rows, { onConflict: "code" });

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
