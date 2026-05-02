import jsforce from "jsforce";

export const SF_ID_REGEX = /^[a-zA-Z0-9]{15,18}$/;

export type CommissionBillingRecord = {
  Id: string;
  Name?: string | null;
  CreatedDate?: string | null;
  Billing_Type__c?: string | null;
  Commission_Rate__c?: number | null;
  Invoice_Amount__c?: number | null;
  Invoice_Description__c?: string | null;
  Bill_To_Email__c?: string | null;
  Client_Email__c?: string | null;
  Payment_URL__c?: string | null;
  QR_Code_URL__c?: string | null;
  Deal__r?: {
    Name?: string | null;
    TTL_Core__RecordType_Name__c?: string | null;
    TTL_Core__Address_Line_1__c?: string | null;
    TTL_Core__City__c?: string | null;
    TTL_Core__State__c?: string | null;
    TTL_Core__Zip_Code__c?: string | null;
    TTL_Core__Property__r?: {
      Name?: string | null;
      TTL_Core__Address__c?: string | null;
      TTL_Core__City__c?: string | null;
      TTL_Core__State__c?: string | null;
      TTL_Core__Postal_Zip_Code__c?: string | null;
      TTL_Core__Land_Size_Acres__c?: number | null;
    } | null;
    TTL_Core__Space_Unit_Name__c?: string | null;
    TTL_Core__Unit__r?: {
      Name?: string | null;
      TTL_Core__Suite__c?: string | null;
      TTL_Core__Unit_Number__c?: string | null;
      TTL_Core__Rentable_SF__c?: number | null;
    } | null;
    Space_Unit__r?: {
      Name?: string | null;
      TTL_Core__Suite__c?: string | null;
      TTL_Core__Unit_Number__c?: string | null;
      TTL_Core__Rentable_SF__c?: number | null;
    } | null;
    Leased_Space_Amount__c?: number | null;
    TTL_Core__Lease_Structure__c?: string | null;
    TTL_Core__Lease_Term_Months__c?: number | null;
    TTL_Core__Lease_Term_Months_formula__c?: number | null;
    Lease_Years__c?: number | null;
    TTL_Core__Client_Expectations_Term_Months__c?: number | string | null;
    TTL_Core__Lease_Commencement__c?: string | null;
    Rent_Commencement_Date_c__c?: string | null;
    TTL_Core__Landlord_Company_Name__c?: string | null;
    TTL_Core__Landlord_Contact__r?: {
      Name?: string | null;
      Email?: string | null;
      Phone?: string | null;
    } | null;
    Landlord_Contact__r?: {
      Name?: string | null;
      Email?: string | null;
      Phone?: string | null;
    } | null;
    TTL_Core__Tenant_Company_Name__c?: string | null;
    TTL_Core__Tenant_Contact__r?: {
      Name?: string | null;
      Email?: string | null;
      Phone?: string | null;
    } | null;
    Tenant_Contact__r?: {
      Name?: string | null;
      Email?: string | null;
      Phone?: string | null;
    } | null;
    Agent_Contact__r?: {
      Name?: string | null;
      Email?: string | null;
      Phone?: string | null;
    } | null;
    TTL_Core__Client_Company__r?: { Name?: string | null } | null;
    TTL_Core__Client_Contact__r?: {
      Name?: string | null;
      Email?: string | null;
    } | null;
  } | null;
};

const SOQL = `
SELECT
  Id, Name, CreatedDate,
  Billing_Type__c,
  Commission_Rate__c,
  Invoice_Amount__c,
  Invoice_Description__c, Bill_To_Email__c, Client_Email__c,
  Payment_URL__c, QR_Code_URL__c,
  Deal__r.Name,
  Deal__r.TTL_Core__RecordType_Name__c,
  Deal__r.TTL_Core__Address_Line_1__c,
  Deal__r.TTL_Core__City__c,
  Deal__r.TTL_Core__State__c,
  Deal__r.TTL_Core__Zip_Code__c,
  Deal__r.TTL_Core__Property__r.Name,
  Deal__r.TTL_Core__Property__r.TTL_Core__Address__c,
  Deal__r.TTL_Core__Property__r.TTL_Core__City__c,
  Deal__r.TTL_Core__Property__r.TTL_Core__State__c,
  Deal__r.TTL_Core__Property__r.TTL_Core__Postal_Zip_Code__c,
  Deal__r.TTL_Core__Property__r.TTL_Core__Land_Size_Acres__c,
  Deal__r.TTL_Core__Space_Unit_Name__c,
  Deal__r.TTL_Core__Unit__r.Name,
  Deal__r.TTL_Core__Unit__r.TTL_Core__Suite__c,
  Deal__r.TTL_Core__Unit__r.TTL_Core__Unit_Number__c,
  Deal__r.TTL_Core__Unit__r.TTL_Core__Rentable_SF__c,
  Deal__r.Space_Unit__r.Name,
  Deal__r.Space_Unit__r.TTL_Core__Suite__c,
  Deal__r.Space_Unit__r.TTL_Core__Unit_Number__c,
  Deal__r.Space_Unit__r.TTL_Core__Rentable_SF__c,
  Deal__r.Leased_Space_Amount__c,
  Deal__r.TTL_Core__Lease_Structure__c,
  Deal__r.TTL_Core__Lease_Term_Months__c,
  Deal__r.TTL_Core__Lease_Term_Months_formula__c,
  Deal__r.Lease_Years__c,
  Deal__r.TTL_Core__Client_Expectations_Term_Months__c,
  Deal__r.TTL_Core__Lease_Commencement__c,
  Deal__r.Rent_Commencement_Date_c__c,
  Deal__r.TTL_Core__Landlord_Company_Name__c,
  Deal__r.TTL_Core__Landlord_Contact__r.Name,
  Deal__r.TTL_Core__Landlord_Contact__r.Email,
  Deal__r.TTL_Core__Landlord_Contact__r.Phone,
  Deal__r.Landlord_Contact__r.Name,
  Deal__r.Landlord_Contact__r.Email,
  Deal__r.Landlord_Contact__r.Phone,
  Deal__r.TTL_Core__Tenant_Company_Name__c,
  Deal__r.TTL_Core__Tenant_Contact__r.Name,
  Deal__r.TTL_Core__Tenant_Contact__r.Email,
  Deal__r.TTL_Core__Tenant_Contact__r.Phone,
  Deal__r.Tenant_Contact__r.Name,
  Deal__r.Tenant_Contact__r.Email,
  Deal__r.Tenant_Contact__r.Phone,
  Deal__r.Agent_Contact__r.Name,
  Deal__r.Agent_Contact__r.Email,
  Deal__r.Agent_Contact__r.Phone,
  Deal__r.TTL_Core__Client_Company__r.Name,
  Deal__r.TTL_Core__Client_Contact__r.Name,
  Deal__r.TTL_Core__Client_Contact__r.Email
FROM Commission_Billing_Record__c
WHERE Id = '{ID}'
LIMIT 1
`.trim();

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

export async function fetchCommissionBillingRecord(
  id: string
): Promise<CommissionBillingRecord | null> {
  if (!SF_ID_REGEX.test(id)) {
    throw new Error("Invalid Salesforce record id");
  }
  const { access_token, instance_url } = await getAccessToken();
  const conn = new jsforce.Connection({
    instanceUrl: instance_url,
    accessToken: access_token,
  });
  const result = await conn.query<CommissionBillingRecord>(
    SOQL.replace("{ID}", id)
  );
  return result.records?.[0] ?? null;
}

export function isFlatFeeBillingType(value: string | null | undefined): boolean {
  if (!value) return false;
  const v = value.toLowerCase().trim();
  return (
    v === "flat fee" ||
    v === "flatfee" ||
    v === "flat" ||
    v === "bpo" ||
    v.includes("flat")
  );
}

function cleanDescription(raw: string | null | undefined): string {
  if (!raw) return "";
  return raw
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?[a-z][^>]*>/gi, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

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

function expandRepAbbreviation(value: string | null | undefined): string {
  if (!value) return "";
  return value.replace(/\bRep\b/gi, "Representation");
}

function formatNumber(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "";
  return new Intl.NumberFormat("en-US").format(n);
}

function formatLeaseTerm(
  months: number | string | null | undefined
): string {
  if (months == null || months === "") return "";
  const m = typeof months === "number" ? months : Number(months);
  if (!Number.isFinite(m) || m <= 0) return "";
  const years = Math.floor(m / 12);
  const remaining = Math.round(m - years * 12);
  const yearsLabel = years === 1 ? "Year" : "Years";
  const monthsLabel = remaining === 1 ? "Month" : "Months";
  if (years === 0) return `${remaining} ${monthsLabel}`;
  if (remaining === 0) return `${years} ${yearsLabel}`;
  return `${years} ${yearsLabel}, ${remaining} ${monthsLabel}`;
}

function formatAcres(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(n);
}

function formatPropertyAddress(
  line1: string | null | undefined,
  city: string | null | undefined,
  state: string | null | undefined,
  zip: string | null | undefined
): string {
  const street = line1?.trim() ?? "";
  const cityPart = city?.trim() ?? "";
  const statePart = state?.trim() ?? "";
  const zipPart = zip?.trim() ?? "";

  // If the street/address field already contains the city or zip, treat it
  // as a fully-formed address and don't append city/state/zip again.
  const streetLower = street.toLowerCase();
  const alreadyHasCityOrZip =
    (cityPart && streetLower.includes(cityPart.toLowerCase())) ||
    (zipPart && streetLower.includes(zipPart));
  if (alreadyHasCityOrZip) return street;

  let cityStateZip = cityPart;
  if (statePart) cityStateZip += (cityStateZip ? ", " : "") + statePart;
  if (zipPart) cityStateZip += (cityStateZip ? " " : "") + zipPart;

  const parts: string[] = [];
  if (street) parts.push(street);
  if (cityStateZip) parts.push(cityStateZip);
  return parts.join(", ");
}

function resolveQrUrl(
  qrUrl: string | null | undefined,
  payUrl: string | null | undefined
): string | undefined {
  if (qrUrl && qrUrl.trim() !== "") return qrUrl;
  if (payUrl && payUrl.trim() !== "") {
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&data=${encodeURIComponent(
      payUrl
    )}`;
  }
  return undefined;
}

export type LeaseInvoiceMapping = {
  id: string;
  due: string;
  amountDisplay: string;
  billedToName: string;
  billedToLine2: string;
  billedToLine3: string;
  billedToEmail: string;
  agentName: string;
  agentTitle: string;
  agentPhoneLine: string;
  agentEmail: string;
  representationType: string;
  propertyAddress: string;
  unit: string;
  squareFootage: string;
  acreage: string;
  tenantName: string;
  tenantContact: string;
  tenantPhone: string;
  tenantEmail: string;
  totalDeal: string;
  rate: string;
  leaseType: string;
  term: string;
  rentCommencement: string;
  payUrl?: string;
  qrUrl?: string;
};

const HARDCODED_AGENT = {
  name: "Noah Kahkonen",
  title: "Senior Advisor",
  phone: "614-559-3350 Ext. 117",
  email: "nkahkonen@bestcorporaterealestate.com",
};

export function mapRecordToLeaseInvoice(
  rec: CommissionBillingRecord
): LeaseInvoiceMapping {
  const deal = rec.Deal__r ?? null;

  const landlordCompany = deal?.TTL_Core__Landlord_Company_Name__c ?? "";
  const landlordContact =
    deal?.TTL_Core__Landlord_Contact__r ?? deal?.Landlord_Contact__r ?? null;

  const tenantCompany = deal?.TTL_Core__Tenant_Company_Name__c ?? "";
  const tenantContactObj =
    deal?.TTL_Core__Tenant_Contact__r ?? deal?.Tenant_Contact__r ?? null;

  const agentContact = deal?.Agent_Contact__r ?? null;

  const recordTypeName = deal?.TTL_Core__RecordType_Name__c ?? "";
  const isTenantRep = /tenant/i.test(recordTypeName);

  // For tenant rep deals the user wants the BILLED TO contact to be the
  // Agent_Contact (cooperating / listing agent on the deal). For landlord
  // rep (and anything else) it stays the landlord contact.
  const billedToContact = isTenantRep ? agentContact : landlordContact;

  const rentCommencement =
    formatDate(deal?.Rent_Commencement_Date_c__c) ||
    formatDate(deal?.TTL_Core__Lease_Commencement__c);

  const termMonths =
    deal?.TTL_Core__Lease_Term_Months_formula__c ??
    deal?.TTL_Core__Lease_Term_Months__c ??
    deal?.TTL_Core__Client_Expectations_Term_Months__c ??
    (deal?.Lease_Years__c ? deal.Lease_Years__c * 12 : null);
  const term = formatLeaseTerm(termMonths);

  return {
    id: rec.Name ?? rec.Id,
    due: formatDate(rec.CreatedDate),
    amountDisplay: formatUsd(rec.Invoice_Amount__c),
    billedToName: landlordCompany,
    billedToLine2: billedToContact?.Name ?? "",
    billedToLine3: billedToContact?.Phone ?? "",
    billedToEmail:
      rec.Bill_To_Email__c ??
      billedToContact?.Email ??
      rec.Client_Email__c ??
      "",
    agentName: HARDCODED_AGENT.name,
    agentTitle: HARDCODED_AGENT.title,
    agentPhoneLine: HARDCODED_AGENT.phone,
    agentEmail: HARDCODED_AGENT.email,
    representationType: expandRepAbbreviation(
      deal?.TTL_Core__RecordType_Name__c
    ),
    propertyAddress:
      formatPropertyAddress(
        deal?.TTL_Core__Property__r?.TTL_Core__Address__c,
        deal?.TTL_Core__Property__r?.TTL_Core__City__c,
        deal?.TTL_Core__Property__r?.TTL_Core__State__c,
        deal?.TTL_Core__Property__r?.TTL_Core__Postal_Zip_Code__c
      ) ||
      formatPropertyAddress(
        deal?.TTL_Core__Address_Line_1__c,
        deal?.TTL_Core__City__c,
        deal?.TTL_Core__State__c,
        deal?.TTL_Core__Zip_Code__c
      ),
    unit:
      deal?.TTL_Core__Unit__r?.TTL_Core__Suite__c ??
      deal?.TTL_Core__Unit__r?.TTL_Core__Unit_Number__c ??
      deal?.Space_Unit__r?.TTL_Core__Suite__c ??
      deal?.Space_Unit__r?.TTL_Core__Unit_Number__c ??
      deal?.TTL_Core__Space_Unit_Name__c ??
      deal?.TTL_Core__Unit__r?.Name ??
      deal?.Space_Unit__r?.Name ??
      "",
    squareFootage: (() => {
      const sqft =
        deal?.TTL_Core__Unit__r?.TTL_Core__Rentable_SF__c ??
        deal?.Space_Unit__r?.TTL_Core__Rentable_SF__c ??
        deal?.Leased_Space_Amount__c;
      return sqft ? formatNumber(sqft) : "";
    })(),
    acreage: deal?.TTL_Core__Property__r?.TTL_Core__Land_Size_Acres__c
      ? formatAcres(deal.TTL_Core__Property__r.TTL_Core__Land_Size_Acres__c)
      : "",
    tenantName: tenantCompany,
    tenantContact: tenantContactObj?.Name ?? "",
    tenantPhone: tenantContactObj?.Phone ?? "",
    tenantEmail: tenantContactObj?.Email ?? "",
    totalDeal: formatUsd(rec.Invoice_Amount__c),
    rate: formatPercent(rec.Commission_Rate__c),
    leaseType: deal?.TTL_Core__Lease_Structure__c ?? "",
    term,
    rentCommencement,
    payUrl: rec.Payment_URL__c ?? undefined,
    qrUrl: resolveQrUrl(rec.QR_Code_URL__c, rec.Payment_URL__c),
  };
}

export type FixedFeeInvoiceMapping = {
  id: string;
  amountDisplay: string;
  due: string;
  dealName: string;
  description: string | null;
  billedToName: string;
  billedToLine2: string;
  billedToLine3: string;
  billedToEmail: string;
  agentName: string;
  agentTitle: string;
  agentPhoneLine: string;
  agentEmail: string;
  payUrl?: string;
  qrUrl?: string;
};

export function mapRecordToFixedFeeInvoice(
  rec: CommissionBillingRecord
): FixedFeeInvoiceMapping {
  const deal = rec.Deal__r ?? null;
  const company = deal?.TTL_Core__Client_Company__r?.Name ?? "";
  const contactName = deal?.TTL_Core__Client_Contact__r?.Name ?? "";
  const contactEmail = deal?.TTL_Core__Client_Contact__r?.Email ?? "";

  return {
    id: rec.Name ?? rec.Id,
    amountDisplay: formatUsd(rec.Invoice_Amount__c),
    due: formatDate(rec.CreatedDate),
    dealName: deal?.Name ?? "",
    description: cleanDescription(rec.Invoice_Description__c) || null,
    billedToName: company || contactName,
    billedToLine2:
      company && contactName && company !== contactName ? contactName : "",
    billedToLine3: "",
    billedToEmail:
      rec.Bill_To_Email__c ?? rec.Client_Email__c ?? contactEmail ?? "",
    agentName: HARDCODED_AGENT.name,
    agentTitle: HARDCODED_AGENT.title,
    agentPhoneLine: HARDCODED_AGENT.phone,
    agentEmail: HARDCODED_AGENT.email,
    payUrl: rec.Payment_URL__c ?? undefined,
    qrUrl: resolveQrUrl(rec.QR_Code_URL__c, rec.Payment_URL__c),
  };
}
