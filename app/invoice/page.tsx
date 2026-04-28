import { Invoice } from "@/components/Invoice";
import { FixedFeeBpoInvoice } from "@/components/FixedFeeBpoInvoice";
import { InvoicePdfFrame } from "@/components/InvoicePdfFrame";
import { firstString, formatUsdFromParam } from "@/lib/invoiceQuery";
import Link from "next/link";

export default async function InvoicePage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : {};

  const billingType = (firstString(params.billingType) ?? "Percent")
    .toLowerCase()
    .trim();
  const isFlatFee =
    billingType === "flat fee" ||
    billingType === "flatfee" ||
    billingType === "flat" ||
    billingType === "bpo";

  const id = firstString(params.id) ?? "";
  const due = firstString(params.due) ?? "";

  const billedToName = firstString(params.client) ?? "";
  const billedToLine2 = firstString(params.org) ?? "";
  const billedToLine3 = firstString(params.billedPhone) ?? "";
  const billedToEmail =
    firstString(params.clientEmail) ?? firstString(params.billedEmail) ?? "";

  const agentName = firstString(params.agent) ?? "";
  const agentTitle = firstString(params.title) ?? "";
  const agentPhoneLine = firstString(params.agentPhone) ?? "";
  const agentEmail = firstString(params.agentEmail) ?? "";

  const payUrl = firstString(params.payUrl) ?? "";
  const qrUrl = firstString(params.qrUrl) ?? "";

  const navBar = (
    <p
      className="no-print"
      style={{
        maxWidth: 844,
        margin: "0 auto 8px",
        fontSize: 12,
        color: "#5a5a52",
      }}
    >
      <Link
        href="/invoice?billingType=Percent"
        style={{
          color: isFlatFee ? "#245535" : "#333",
          fontWeight: 600,
        }}
      >
        Lease / commission invoice
      </Link>
      <span style={{ margin: "0 8px", color: "#b0b0a8" }}>·</span>
      <Link
        href="/invoice?billingType=Flat%20Fee"
        style={{
          color: isFlatFee ? "#333" : "#245535",
          fontWeight: 600,
        }}
      >
        Flat fee invoice
      </Link>
    </p>
  );

  if (isFlatFee) {
    const amountDisplay = formatUsdFromParam(firstString(params.amount), "");
    const dealName =
      firstString(params.deal) ?? firstString(params.dealName) ?? "";
    const descriptionRaw =
      firstString(params.description) ?? firstString(params.desc) ?? null;
    const description =
      descriptionRaw == null
        ? null
        : descriptionRaw
            .split("|")
            .map((s) => s.trim())
            .join("\n");

    return (
      <div>
        {navBar}
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

  const amountDisplay = formatUsdFromParam(firstString(params.amount), "");
  const totalDeal = formatUsdFromParam(firstString(params.totalDeal), "");
  const rate = firstString(params.rate) ?? "";
  const leaseType = firstString(params.leaseType) ?? "";
  const term = firstString(params.term) ?? "";
  const rentCommencement = firstString(params.rentCommencement) ?? "";
  const representationType = firstString(params.repType) ?? "";

  return (
    <div>
      {navBar}
      <InvoicePdfFrame id={id}>
        <Invoice
          id={id}
          due={due}
          amountDisplay={amountDisplay}
          billedToName={billedToName}
          billedToLine2={billedToLine2}
          billedToLine3={billedToLine3}
          billedToEmail={billedToEmail}
          agentName={agentName}
          agentTitle={agentTitle}
          agentPhoneLine={agentPhoneLine}
          agentEmail={agentEmail}
          representationType={representationType}
          propertyAddress={firstString(params.address) ?? ""}
          unit={firstString(params.unit) ?? ""}
          squareFootage={firstString(params.sqft) ?? ""}
          acreage={firstString(params.acreage) ?? ""}
          tenantName={firstString(params.tenant) ?? ""}
          tenantContact={firstString(params.tenantContact) ?? ""}
          tenantPhone={firstString(params.tenantPhone) ?? ""}
          tenantEmail={firstString(params.tenantEmail) ?? ""}
          totalDeal={totalDeal}
          rate={rate}
          leaseType={leaseType}
          term={term}
          rentCommencement={rentCommencement}
          payUrl={payUrl}
          qrUrl={qrUrl}
        />
      </InvoicePdfFrame>
    </div>
  );
}
