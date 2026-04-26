import { Invoice } from "@/components/Invoice";
import { InvoicePdfFrame } from "@/components/InvoicePdfFrame";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : {};
  const raw = params?.id;
  const id = typeof raw === "string" ? raw : "NO-ID";

  return (
    <div>
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
      <InvoicePdfFrame id={id}>
        <Invoice id={id} />
      </InvoicePdfFrame>
    </div>
  );
}
