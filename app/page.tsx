import { Suspense } from "react";
import InvoiceClient from "./InvoiceClient";

export default function Page() {
  return (
    <Suspense
      fallback={
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
          Loading invoice…
        </div>
      }
    >
      <InvoiceClient />
    </Suspense>
  );
}
