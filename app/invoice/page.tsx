import { Invoice } from "@/components/Invoice";
import { FixedFeeBpoInvoice } from "@/components/FixedFeeBpoInvoice";
import { InvoicePdfFrame } from "@/components/InvoicePdfFrame";
import { firstString, formatUsdFromParam } from "@/lib/invoiceQuery";
import {
  SF_ID_REGEX,
  fetchCommissionBillingRecord,
  isFlatFeeCommissionType,
  mapRecordToFixedFeeInvoice,
  mapRecordToLeaseInvoice,
} from "@/lib/salesforce";
import Link from "next/link";

export const dynamic = "force-dynamic";

function NavBar({ isFlatFee }: { isFlatFee: boolean }) {
  return (
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
}

function StatusBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 844,
        margin: "32px auto",
        padding: "20px 24px",
        background: "#fff",
        border: "1px solid #e0e0d8",
        borderRadius: 6,
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 14,
        color: "#333",
      }}
    >
      {children}
    </div>
  );
}

export default async function InvoicePage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : {};

  const billingType = (firstString(params.billingType) ?? "Percent")
    .toLowerCase()
    .trim();
  const isFlatFeeFromParam =
    billingType === "flat fee" ||
    billingType === "flatfee" ||
    billingType === "flat" ||
    billingType === "bpo";

  const id = firstString(params.id) ?? "";

  if (id && SF_ID_REGEX.test(id)) {
    let record;
    try {
      record = await fetchCommissionBillingRecord(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      return (
        <div>
          <NavBar isFlatFee={isFlatFeeFromParam} />
          <StatusBox>
            <strong style={{ color: "#a02020" }}>
              Could not load invoice from Salesforce.
            </strong>
            <div style={{ marginTop: 6, color: "#555" }}>{message}</div>
            <div style={{ marginTop: 10, fontSize: 12, color: "#888" }}>
              Record id: <code>{id}</code>
            </div>
          </StatusBox>
        </div>
      );
    }
    if (!record) {
      return (
        <div>
          <NavBar isFlatFee={isFlatFeeFromParam} />
          <StatusBox>
            <strong>Commission Billing Record not found.</strong>
            <div style={{ marginTop: 10, fontSize: 12, color: "#888" }}>
              Record id: <code>{id}</code>
            </div>
          </StatusBox>
        </div>
      );
    }

    const useFlatFee = isFlatFeeCommissionType(record.Commission_Type__c);
    if (useFlatFee) {
      const props = mapRecordToFixedFeeInvoice(record);
      return (
        <div>
          <NavBar isFlatFee={true} />
          <InvoicePdfFrame id={props.id} pdfFilenameStyle="fixed-fee">
            <FixedFeeBpoInvoice {...props} />
          </InvoicePdfFrame>
        </div>
      );
    }
    const props = mapRecordToLeaseInvoice(record);
    return (
      <div>
        <NavBar isFlatFee={false} />
        <InvoicePdfFrame id={props.id}>
          <Invoice {...props} />
        </InvoicePdfFrame>
      </div>
    );
  }

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

  if (isFlatFeeFromParam) {
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
        <NavBar isFlatFee={true} />
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
      <NavBar isFlatFee={false} />
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
