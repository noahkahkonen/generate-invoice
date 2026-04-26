"use client";

import { useCallback, useMemo } from "react";
import {
  buildFixedFeeInvoicePdfFilename,
  buildInvoicePdfFilename,
} from "./invoicePdfFilename";

function getBuildPdfFilename(kind: "lease" | "fixed-fee" | undefined) {
  if (kind === "fixed-fee") return buildFixedFeeInvoicePdfFilename;
  return buildInvoicePdfFilename;
}

export function InvoicePdfFrame({
  id,
  children,
  /** If omitted, uses lease / commission filename pattern. */
  pdfFilenameStyle,
  printHint,
}: {
  id: string;
  children: React.ReactNode;
  pdfFilenameStyle?: "lease" | "fixed-fee";
  printHint?: string;
}) {
  const buildPdfFilename = useMemo(
    () => getBuildPdfFilename(pdfFilenameStyle),
    [pdfFilenameStyle]
  );

  const handlePrint = useCallback(() => {
    const prevTitle = document.title;
    const filename = buildPdfFilename(id);
    document.title = filename.replace(/\.pdf$/i, "");

    const restore = () => {
      document.title = prevTitle;
      window.removeEventListener("afterprint", restore);
      clearTimeout(fallback);
    };
    const fallback = window.setTimeout(restore, 10_000);
    window.addEventListener("afterprint", restore);

    window.print();
  }, [buildPdfFilename, id]);

  return (
    <div>
      <div
        className="no-print"
        style={{
          maxWidth: 844,
          margin: "0 auto 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 12, color: "#5a5a52" }}>
          Suggested filename:{" "}
          <code style={{ fontSize: 11, color: "#245535" }}>
            {buildPdfFilename(id)}
          </code>
        </span>
        <button
          type="button"
          onClick={handlePrint}
          style={{
            background: "#245535",
            color: "#fff",
            border: "none",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0.3,
            padding: "10px 20px",
            borderRadius: 4,
            cursor: "pointer",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          Save as PDF
        </button>
      </div>
      <p
        className="no-print"
        style={{
          maxWidth: 844,
          margin: "0 auto 16px",
          fontSize: 12,
          color: "#666",
          lineHeight: 1.5,
        }}
      >
        {printHint ?? (
          <>
            Your browser will open the print dialog—set the destination to{" "}
            <strong>Save as PDF</strong> (or “Print to PDF”). The file matches
            this preview, not a screenshot. Margins are set to none so the
            design is full-width on screen and in the PDF.
          </>
        )}
      </p>
      <div
        className="invoice-print-root"
        style={{
          width: "8.5in",
          maxWidth: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </div>
  );
}
