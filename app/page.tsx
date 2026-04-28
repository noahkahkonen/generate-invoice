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
  const id = typeof raw === "string" ? raw : "INV-SAMPLE";

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
        <Invoice
          id={id}
          due="4/19/26"
          amountDisplay="$2,560.23"
          billedToName="Valerie Tivin"
          billedToLine2="Best Corporate Real Estate"
          billedToLine3="614-559-3350"
          billedToEmail="info@bestcorporaterealestate.com"
          agentName="Noah Kahkonen"
          agentTitle="Senior Advisor"
          agentPhoneLine="614-559-3350 Ext. 117"
          agentEmail="nkahkonen@bestcorporaterealestate.com"
          representationType="Landlord Representation"
          propertyAddress={"2631 Morse Road\nColumbus, OH 43219"}
          unit="Suite C"
          squareFootage="2,750"
          acreage="N/A"
          tenantName="Chubby Cheeks Daycare, Inc"
          tenantContact="Sahir Safi"
          tenantPhone="614-559-3350"
          tenantEmail="info@bestcorporaterealestate.com"
          totalDeal="$157,240.16"
          rate="6%"
          leaseType="MG"
          term="5 Years, 2 Months"
          rentCommencement="MM/DD/YY"
        />
      </InvoicePdfFrame>
    </div>
  );
}
