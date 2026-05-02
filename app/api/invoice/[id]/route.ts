import { NextResponse, type NextRequest } from "next/server";
import jsforce from "jsforce";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SOQL = `
SELECT
  Id, Name, CreatedDate,
  Billing_Status__c, Billing_Type__c,
  Commission_Type__c, Commission_Rate__c, Split_Percent__c,
  Flat_Fee_Amount__c, Base_Amount_Auto__c,
  Invoice_Amount__c, Net_Commission__c,
  Invoice_Description__c, Bill_To_Email__c, Client_Email__c,
  Payment_URL__c, QR_Code_URL__c, Paid_Date__c,
  Stripe_Amount__c, Stripe_Status__c,
  Deal__r.Id, Deal__r.Name,
  Deal__r.TTL_Core__Client_Company__r.Name,
  Deal__r.TTL_Core__Client_Contact__r.Name,
  Deal__r.TTL_Core__Client_Contact__r.Email,
  Deal__r.Agent_Contact__r.Name,
  Deal__r.Agent_Contact__r.Email,
  Deal__r.Agent_Contact__r.Phone,
  Deal__r.Commis__c,
  Deal__r.TTL_Core__Lease_Structure__c,
  Deal__r.TTL_Core__Client_Expectations_Term_Months__c,
  Deal__r.TTL_Core__Asking_Monthly_Rent__c,
  Deal__r.TTL_Core__Lease_Commencement__c,
  Deal__r.Rent_Commencement_Date_c__c,
  Deal__r.Free_Rent_Months_c__c
FROM Commission_Billing_Record__c
WHERE Id = '{ID}'
LIMIT 1
`.trim();

const ID_REGEX = /^[a-zA-Z0-9]{15,18}$/;

async function getAccessToken(): Promise<{
  access_token: string;
  instance_url: string;
}> {
  const loginUrl = process.env.SF_LOGIN_URL;
  const clientId = process.env.SF_CLIENT_ID;
  const clientSecret = process.env.SF_CLIENT_SECRET;
  if (!loginUrl || !clientId || !clientSecret) {
    throw new Error(
      "Missing Salesforce credentials. Set SF_LOGIN_URL, SF_CLIENT_ID, and SF_CLIENT_SECRET."
    );
  }
  const tokenUrl = `${loginUrl.replace(/\/$/, "")}/services/oauth2/token`;
  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Salesforce token request failed (${res.status})${body ? `: ${body}` : ""}`
    );
  }
  const json = (await res.json()) as {
    access_token?: string;
    instance_url?: string;
  };
  if (!json.access_token || !json.instance_url) {
    throw new Error(
      "Salesforce token response missing access_token or instance_url"
    );
  }
  return { access_token: json.access_token, instance_url: json.instance_url };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!ID_REGEX.test(id)) {
    return NextResponse.json(
      { error: "Invalid Salesforce record id" },
      { status: 400 }
    );
  }

  try {
    const { access_token, instance_url } = await getAccessToken();
    const conn = new jsforce.Connection({
      instanceUrl: instance_url,
      accessToken: access_token,
    });
    const result = await conn.query(SOQL.replace("{ID}", id));
    const record = result.records?.[0];
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
