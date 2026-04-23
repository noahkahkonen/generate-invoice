/** Safe segment for filesystem / download names */
export function sanitizeInvoiceFilenamePart(s: string): string {
  const trimmed = s.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return trimmed || "invoice";
}

/** e.g. BCRE-Invoice-INV-2024-001-2026-04-19.pdf */
export function buildInvoicePdfFilename(id: string): string {
  const date = new Date().toISOString().slice(0, 10);
  return `BCRE-Invoice-${sanitizeInvoiceFilenamePart(id)}-${date}.pdf`;
}
