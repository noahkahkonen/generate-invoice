import { NextResponse, type NextRequest } from "next/server";
import {
  SF_ID_REGEX,
  fetchCommissionBillingRecord,
} from "@/lib/salesforce";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!SF_ID_REGEX.test(id)) {
    return NextResponse.json(
      { error: "Invalid Salesforce record id" },
      { status: 400 }
    );
  }

  try {
    const record = await fetchCommissionBillingRecord(id);
    if (!record) {
      return NextResponse.json(
        { error: "Commission Billing Record not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(record);
  } catch (err) {
    console.error("Salesforce invoice fetch failed", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
