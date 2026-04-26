/**
 * URL query helpers for server-rendered invoice pages (Salesforce, etc. can
 * build links with these same keys).
 */

export function firstString(
  v: string | string[] | undefined
): string | undefined {
  if (typeof v === "string" && v.trim() !== "") return v;
  if (Array.isArray(v) && v[0] && v[0].trim() !== "") return v[0];
  return undefined;
}

export function formatUsdFromParam(raw: string | undefined, fallback: string) {
  if (raw == null || raw === "") return fallback;
  const n = Number.parseFloat(String(raw).replace(/[^0-9.-]/g, ""));
  if (Number.isNaN(n)) return fallback;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}
