"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Invoice, type InvoiceProps } from "@/components/Invoice";
import { InvoicePdfFrame } from "@/components/InvoicePdfFrame";

type SfRecord = {
  Id: string;
  Name?: string | null;
  CreatedDate?: string | null;
  Billing_Status__c?: string | null;
  Billing_Type__c?: string | null;
  Commission_Type__c?: string | null;
  Commission_Rate__c?: number | null;
  Split_Percent__c?: number | null;
  Flat_Fee_Amount__c?: number | null;
  Base_Amount_Auto__c?: number | null;
  Invoice_Amount__c?: number | null;
  Net_Commission__c?: number | null;
  Invoice_Description__c?: string | null;
  Bill_To_Email__c?: string | null;
  Client_Email__c?: string | null;
  Payment_URL__c?: string | null;
  QR_Code_URL__c?: string | null;
  Deal__r?: {
    Id?: string | null;
    Name?: string | null;
    TTL_Core__Client_Company__r?: { Name?: string | null } | null;
    TTL_Core__Client_Contact__r?: {
      Name?: string | null;
      Email?: string | null;
    } | null;
    Agent_Contact__r?: {
      Name?: string | null;
      Email?: string | null;
      Phone?: string | null;
    } | null;
    Commis__c?: number | null;
    TTL_Core__Lease_Structure__c?: string | null;
    TTL_Core__Client_Expectations_Term_Months__c?: number | string | null;
    TTL_Core__Asking_Monthly_Rent__c?: number | null;
    TTL_Core__Lease_Commencement__c?: string | null;
    Rent_Commencement_Date_c__c?: string | null;
    Free_Rent_Months_c__c?: number | null;
  } | null;
};

const SAMPLE_PROPS: InvoiceProps = {
  id: "INV-SAMPLE",
  due: "4/19/26",
  amountDisplay: "$2,560.23",
  billedToName: "Valerie Tivin",
  billedToLine2: "Best Corporate Real Estate",
  billedToLine3: "614-559-3350",
  billedToEmail: "info@bestcorporaterealestate.com",
  agentName: "Noah Kahkonen",
  agentTitle: "Senior Advisor",
  agentPhoneLine: "614-559-3350 Ext. 117",
  agentEmail: "nkahkonen@bestcorporaterealestate.com",
  representationType: "Landlord Representation",
  propertyAddress: "2631 Morse Road\nColumbus, OH 43219",
  unit: "Suite C",
  squareFootage: "2,750",
  acreage: "N/A",
  tenantName: "Chubby Cheeks Daycare, Inc",
  tenantContact: "Sahir Safi",
  tenantPhone: "614-559-3350",
  tenantEmail: "info@bestcorporaterealestate.com",
  totalDeal: "$157,240.16",
  rate: "6%",
  leaseType: "MG",
  term: "5 Years, 2 Months",
  rentCommencement: "MM/DD/YY",
};

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

function formatUsd(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

function formatPercent(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "";
  return `${n}%`;
}

function mapRecordToProps(rec: SfRecord): InvoiceProps {
  const deal = rec.Deal__r ?? null;
  const company = deal?.TTL_Core__Client_Company__r?.Name ?? "";
  const contactName = deal?.TTL_Core__Client_Contact__r?.Name ?? "";
  const contactEmail = deal?.TTL_Core__Client_Contact__r?.Email ?? "";
  const agent = deal?.Agent_Contact__r ?? null;

  const rentCommencement =
    formatDate(deal?.Rent_Commencement_Date_c__c) ||
    formatDate(deal?.TTL_Core__Lease_Commencement__c);

  const termMonths = deal?.TTL_Core__Client_Expectations_Term_Months__c;
  const term =
    termMonths == null || termMonths === ""
      ? ""
      : `${termMonths} months`;

  return {
    id: rec.Name ?? rec.Id,
    due: formatDate(rec.CreatedDate),
    amountDisplay: formatUsd(rec.Invoice_Amount__c),

    billedToName: company || contactName,
    billedToLine2:
      company && contactName && company !== contactName ? contactName : "",
    billedToLine3: "",
    billedToEmail:
      rec.Bill_To_Email__c ?? rec.Client_Email__c ?? contactEmail ?? "",

    agentName: agent?.Name ?? "",
    agentTitle: "",
    agentPhoneLine: agent?.Phone ?? "",
    agentEmail: agent?.Email ?? "",

    representationType: "",
    propertyAddress: rec.Invoice_Description__c ?? "",
    unit: "",
    squareFootage: "",
    acreage: "",

    tenantName: "",
    tenantContact: "",
    tenantPhone: "",
    tenantEmail: "",

    totalDeal: formatUsd(rec.Invoice_Amount__c),
    rate: formatPercent(rec.Commission_Rate__c),
    leaseType: deal?.TTL_Core__Lease_Structure__c ?? "",
    term,
    rentCommencement,

    payUrl: rec.Payment_URL__c ?? undefined,
    qrUrl: rec.QR_Code_URL__c ?? undefined,
  };
}

function StatusMessage({ children }: { children: React.ReactNode }) {
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

export default function InvoiceClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState<SfRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`/api/invoice/${encodeURIComponent(id)}`)
      .then(async (res) => {
        const body = await res.json().catch(() => null);
        if (!res.ok) {
          const message =
            (body && typeof body.error === "string" && body.error) ||
            `Request failed (${res.status})`;
          throw new Error(message);
        }
        return body as SfRecord;
      })
      .then((record) => {
        if (cancelled) return;
        setData(record);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load invoice");
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const header = (
    <p
      className="no-print"
      style={{
        maxWidth: 844,
        margin: "0 auto 8px",
        fontSize: 12,
        color: "#333",
      }}
    >
      <span style={{ color: "#333", fontWeight: 600 }}>
        Lease / commission invoice
      </span>
      <span style={{ margin: "0 8px", color: "#b0b0a8" }}>·</span>
      <Link href="/bpo" style={{ color: "#245535", fontWeight: 600 }}>
        Flat fee invoice
      </Link>
    </p>
  );

  if (id && loading) {
    return (
      <div>
        {header}
        <StatusMessage>Loading invoice…</StatusMessage>
      </div>
    );
  }

  if (id && error) {
    return (
      <div>
        {header}
        <StatusMessage>
          <strong style={{ color: "#a02020" }}>Could not load invoice.</strong>
          <div style={{ marginTop: 6, color: "#555" }}>{error}</div>
          <div style={{ marginTop: 10, fontSize: 12, color: "#888" }}>
            Record id: <code>{id}</code>
          </div>
        </StatusMessage>
      </div>
    );
  }

  const props: InvoiceProps =
    id && data ? mapRecordToProps(data) : SAMPLE_PROPS;

  return (
    <div>
      {header}
      <InvoicePdfFrame id={props.id}>
        <Invoice {...props} />
      </InvoicePdfFrame>
    </div>
  );
}
