import { FixedFeeBpoInvoice } from "@/components/FixedFeeBpoInvoice";
import { InvoicePdfFrame } from "@/components/InvoicePdfFrame";
import { firstString, formatUsdFromParam } from "@/lib/invoiceQuery";
import Link from "next/link";

export default async function BpoPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : {};
  // Sample data only when the page is opened bare (no query params at all).
  // With real params, absent fields stay blank instead of showing sample text.
  const isSample = Object.keys(params).length === 0;
  const sample = (v: string) => (isSample ? v : "");
  const id = firstString(params.id) ?? sample("INV-SAMPLE");
  const due = firstString(params.due) ?? sample("5/1/26");
  const amountRaw = firstString(params.amount) ?? (isSample ? "450" : "");
  const amountDisplay = amountRaw
    ? formatUsdFromParam(amountRaw, "")
    : "";
  const dealName =
    firstString(params.deal) ??
    firstString(params.dealName) ??
    sample("Sample deal name");
  const descriptionRaw =
    firstString(params.description) ?? firstString(params.desc) ?? null;
  const description =
    descriptionRaw == null
      ? null
      : descriptionRaw.split("|").map((s) => s.trim()).join("\n");
  const billedToName = firstString(params.client) ?? sample("Valerie Tivin");
  const billedToLine2 =
    firstString(params.org) ?? sample("Best Corporate Real Estate");
  const billedToLine3 = firstString(params.billedPhone) ?? sample("614-559-3350");
  const billedToEmail =
    firstString(params.clientEmail) ??
    firstString(params.billedEmail) ??
    sample("info@bestcorporaterealestate.com");
  const agentName = firstString(params.agent) ?? "Noah Kahkonen";
  const agentTitle = firstString(params.title) ?? "Senior Advisor";
  const agentPhoneLine =
    firstString(params.agentPhone) ?? "614-559-3350 Ext. 117";
  const agentEmail =
    firstString(params.agentEmail) ?? "nkahkonen@bestcorporaterealestate.com";
  const payUrl = firstString(params.payUrl) ?? "";
  const qrUrl = firstString(params.qrUrl) ?? "";

  return (
    <div>
      <p
        className="no-print"
        style={{
          maxWidth: 844,
          margin: "0 auto 8px",
          fontSize: 12,
          color: "#5a5a52",
        }}
      >
        <Link href="/" style={{ color: "#245535", fontWeight: 600 }}>
          Lease / commission invoice
        </Link>
        <span style={{ margin: "0 8px", color: "#b0b0a8" }}>·</span>
        <span style={{ color: "#333" }}>Flat fee invoice</span>
      </p>
      <InvoicePdfFrame id={id} pdfFilenameStyle="fixed-fee">
        <FixedFeeBpoInvoice
          id={id}
          amountDisplay={amountDisplay}
          due={due}
          dealName={dealName}
          description={description}
          billedToName={billedToName}
          billedToLine2={billedToLine2}
          billedToLine3={billedToLine3}
          billedToEmail={billedToEmail}
          agentName={agentName}
          agentTitle={agentTitle}
          agentPhoneLine={agentPhoneLine}
          agentEmail={agentEmail}
          payUrl={payUrl}
          qrUrl={qrUrl}
        />
      </InvoicePdfFrame>
    </div>
  );
}
