import Image from "next/image";
import { Fragment, type ReactNode } from "react";
import { blockPad, bodyLine, bodySize, padH, padV } from "./invoiceTokens";

const isFilled = (s?: string | null): s is string =>
  !!(s && s.trim() !== "");

function joinLines(parts: ReactNode[]): ReactNode {
  const filled = parts.filter(
    (p) => p !== null && p !== undefined && p !== ""
  );
  if (filled.length === 0) return null;
  return filled.map((node, i) => (
    <Fragment key={i}>
      {i > 0 ? <br /> : null}
      {node}
    </Fragment>
  ));
}

export type InvoiceProps = {
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

export function Invoice({
  id,
  due,
  amountDisplay,
  billedToName,
  billedToLine2,
  billedToLine3,
  billedToEmail,
  agentName,
  agentTitle,
  agentPhoneLine,
  agentEmail,
  representationType,
  propertyAddress,
  unit,
  squareFootage,
  acreage,
  tenantName,
  tenantContact,
  tenantPhone,
  tenantEmail,
  totalDeal,
  rate,
  leaseType,
  term,
  rentCommencement,
  payUrl,
  qrUrl,
}: InvoiceProps) {
  return (
    <div
      className="invoice-outer invoice-page-shell"
      style={{
        background: "#f0f0eb",
        padding: "12px",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <div
        className="invoice-page-card"
        style={{
          background: "#fff",
          width: "100%",
          margin: "0 auto",
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          fontFamily: "Arial, Helvetica, sans-serif",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            background: "#245535",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: `${padV} ${padH}`,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/best-logo.png"
              alt="Best Corporate Real Estate"
              width={196}
              height={158}
              style={{
                height: "clamp(75px, 7.8vh, 105px)",
                width: "auto",
                maxWidth: "min(63vw, 420px)",
                objectFit: "contain",
              }}
            />
          </div>
          <div style={{ textAlign: "right", color: "#fff" }}>
            <div
              style={{
                fontSize: "clamp(30px, 3.6vh, 44px)",
                fontWeight: 800,
                letterSpacing: 2,
                lineHeight: 1.1,
              }}
            >
              INVOICE
            </div>
            <div
              style={{
                fontSize: "clamp(11px, 1.05vh + 0.3rem, 14px)",
                color: "#c8e6c9",
                lineHeight: 1.65,
                marginTop: 4,
              }}
            >
              #{id}
              <br />
              Due: {due}
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#1a3f27",
            display: "table",
            width: "100%",
            minHeight: "clamp(40px, 4vh, 56px)",
            color: "#a5d6a7",
            fontSize: "clamp(10px, 0.8vh + 0.4rem, 12px)",
            lineHeight: 1.5,
            fontWeight: 400,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "table-cell",
              verticalAlign: "middle",
              textAlign: "center",
              padding: `${"clamp(8px, 1vh, 14px)"} ${padH}`,
            }}
          >
            4608 Sawmill Road, Columbus, OH 43220 | 614-559-3350 |
            info@bestcorporaterealestate.com
          </div>
        </div>

        <div className="invoice-page-body">
          <div
            style={{
              display: "flex",
              background: "#f5f5ef",
              padding: `${blockPad} ${padH}`,
              borderBottom: "1px solid #e0e0d8",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: bodySize,
                  fontWeight: 800,
                  color: "#245535",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  marginBottom: "clamp(6px, 0.8vh, 12px)",
                }}
              >
                Billed To
              </div>
              <div
                style={{
                  fontSize: bodySize,
                  lineHeight: bodyLine,
                  color: "#333",
                }}
              >
                {joinLines([
                  isFilled(billedToName) ? billedToName : null,
                  isFilled(billedToLine2) ? billedToLine2 : null,
                  isFilled(billedToLine3) ? billedToLine3 : null,
                  isFilled(billedToEmail) ? billedToEmail : null,
                ])}
              </div>
            </div>
            <div
              style={{
                flex: 1,
                borderLeft: "1.5px solid #d0d0c8",
                paddingLeft: "clamp(14px, 1.5vw, 24px)",
              }}
            >
              <div
                style={{
                  fontSize: bodySize,
                  fontWeight: 800,
                  color: "#245535",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  marginBottom: "clamp(6px, 0.8vh, 12px)",
                }}
              >
                Agent
              </div>
              <div
                style={{
                  fontSize: bodySize,
                  lineHeight: bodyLine,
                  color: "#333",
                }}
              >
                {joinLines([
                  isFilled(agentName) ? <strong>{agentName}</strong> : null,
                  isFilled(agentTitle) ? agentTitle : null,
                  isFilled(agentPhoneLine) ? agentPhoneLine : null,
                  isFilled(agentEmail) ? agentEmail : null,
                ])}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              padding: `${blockPad} ${padH}`,
              gap: "clamp(20px, 2.2vw, 40px)",
              alignItems: "flex-start",
              borderBottom: "1px solid #e0e0d8",
            }}
          >
            <div
              style={{
                flex: "1 1 0%",
                minWidth: 0,
                paddingRight: "clamp(0px, 0.5vw, 8px)",
              }}
            >
              <div
                style={{
                  fontSize: bodySize,
                  fontWeight: 800,
                  color: "#245535",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  marginBottom: "clamp(6px, 0.7vh, 10px)",
                }}
              >
                Billed For
              </div>
              {isFilled(representationType) ? (
                <div
                  style={{
                    fontSize: "clamp(9px, 0.6vh + 0.3rem, 11px)",
                    fontWeight: 700,
                    letterSpacing: 1,
                    color: "#245535",
                    textTransform: "uppercase",
                    marginBottom: "clamp(6px, 0.7vh, 10px)",
                  }}
                >
                  {representationType}
                </div>
              ) : null}
              <div
                style={{
                  fontSize: "clamp(10px, 0.7vh + 0.3rem, 12px)",
                  color: "#444",
                  lineHeight: 1.8,
                  whiteSpace: "pre-line",
                }}
              >
                {propertyAddress}
                <br />
                Unit: {unit || "N/A"}
                <br />
                Square Footage: {squareFootage || "N/A"}
                <br />
                Acreage: {acreage || "N/A"}
              </div>
              <div
                style={{
                  fontSize: "clamp(9px, 0.6vh + 0.3rem, 11px)",
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: "#245535",
                  textTransform: "uppercase",
                  marginBottom: "clamp(6px, 0.7vh, 10px)",
                  marginTop: "clamp(14px, 1.6vh, 22px)",
                }}
              >
                Tenant
              </div>
              <div
                style={{
                  fontSize: "clamp(10px, 0.7vh + 0.3rem, 12px)",
                  color: "#444",
                  lineHeight: 1.8,
                }}
              >
                <strong>{tenantName || "Not provided"}</strong>
                <br />
                Contact: {tenantContact || "Not provided"}
                <br />
                {tenantPhone || "Not provided"}
                <br />
                {tenantEmail || "Not provided"}
              </div>
            </div>
            <div
              style={{
                flex: "0 0 42%",
                minWidth: 0,
                maxWidth: "min(100%, 50%)",
                boxSizing: "border-box",
                paddingLeft: "clamp(4px, 0.8vw, 10px)",
              }}
            >
              <div
                style={{
                  background: "#245535",
                  borderRadius: 4,
                  marginBottom: "clamp(10px, 1.1vh, 20px)",
                  display: "table",
                  width: "100%",
                  minHeight: "clamp(96px, 10vh, 140px)",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    display: "table-cell",
                    verticalAlign: "middle",
                    textAlign: "center",
                    padding:
                      "clamp(14px, 1.2vh, 22px) clamp(22px, 2.2vw, 36px)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(10px, 0.75vh + 0.35rem, 12px)",
                      color: "#a5d6a7",
                      marginBottom: 4,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      lineHeight: 1.2,
                    }}
                  >
                    Amount Due
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(24px, 2.4vh, 36px)",
                      fontWeight: 800,
                      color: "#fff",
                      letterSpacing: 1,
                      lineHeight: 1.1,
                    }}
                  >
                    {amountDisplay}
                  </div>
                </div>
              </div>
              <table
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  borderCollapse: "collapse",
                  tableLayout: "fixed",
                }}
              >
                <tbody>
                  {[
                    ["Total", totalDeal],
                    ["Rate", rate],
                    ["Lease Type", leaseType],
                    ["Term", term],
                    ["Rent Commencement", rentCommencement],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td
                        style={{
                          fontSize: bodySize,
                          padding:
                            "clamp(5px, 0.6vh, 9px) clamp(0px, 0.3vw, 4px) clamp(5px, 0.6vh, 9px) 0",
                          color: "#444",
                          borderBottom: "1px solid #f0f0e8",
                          width: "52%",
                        }}
                      >
                        {label}
                      </td>
                      <td
                        style={{
                          fontSize: bodySize,
                          padding: "clamp(5px, 0.6vh, 9px) 0",
                          color: "#222",
                          textAlign: "right",
                          fontWeight: 600,
                          borderBottom: "1px solid #f0f0e8",
                          width: "48%",
                        }}
                      >
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            style={{
              padding: `clamp(12px, 1.4vh, 20px) ${padH} clamp(14px, 1.6vh, 22px)`,
              background: "#f9f9f5",
              borderBottom: "1px solid #e0e0d8",
            }}
          >
            <div
              style={{
                fontSize: "clamp(11px, 0.85vh + 0.35rem, 13px)",
                fontWeight: 800,
                color: "#245535",
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: "clamp(10px, 1.1vh, 20px)",
              }}
            >
              Payment Options
            </div>
            <div
              style={{
                display: "flex",
                gap: "clamp(16px, 2vw, 32px)",
                alignItems: "flex-start",
              }}
            >
              {qrUrl ? (
                <Image
                  src={qrUrl}
                  alt="Pay invoice QR code"
                  width={110}
                  height={110}
                  unoptimized
                  style={{
                    width: "clamp(72px, 8vh, 110px)",
                    height: "clamp(72px, 8vh, 110px)",
                    border: "2px solid #245535",
                    borderRadius: 4,
                    background: "#fff",
                    objectFit: "contain",
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "clamp(72px, 8vh, 110px)",
                    height: "clamp(72px, 8vh, 110px)",
                    border: "2px solid #245535",
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fff",
                    color: "#245535",
                    fontSize: "clamp(9px, 0.75vh + 0.25rem, 11px)",
                    textAlign: "center",
                    flexShrink: 0,
                  }}
                >
                  QR CODE
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <a
                  href={payUrl && payUrl.length > 0 ? payUrl : "#"}
                  style={{
                    display: "inline-block",
                    background: "#245535",
                    color: "#fff",
                    fontSize: "clamp(11px, 0.85vh + 0.35rem, 13px)",
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    padding:
                      "clamp(6px, 0.6vh, 9px) clamp(14px, 1.4vw, 20px)",
                    borderRadius: 3,
                    textDecoration: "none",
                    textTransform: "uppercase",
                  }}
                >
                  Pay Now ↗
                </a>
                <div
                  style={{
                    marginTop: "clamp(8px, 0.9vh, 14px)",
                    borderTop: "1px solid #e0e0d8",
                    paddingTop: "clamp(8px, 0.9vh, 12px)",
                    fontSize: "clamp(11px, 0.85vh + 0.35rem, 12px)",
                    color: "#555",
                    lineHeight: 1.7,
                  }}
                >
                  Make checks payable to:{" "}
                  <strong>Best Corporate Real Estate, Inc.</strong>
                  <br />
                  Mail to: 4608 Sawmill Road, Columbus, OH 43220
                  <br />
                  Tax ID: <strong>31-1309032</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#245535",
            padding: `clamp(8px, 0.9vh, 12px) ${padH}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#a5d6a7",
            fontSize: "clamp(10px, 0.8vh + 0.3rem, 12px)",
            flexShrink: 0,
          }}
        >
          <span>bestcorporaterealestate.com</span>
          <span
            style={{
              fontSize: "clamp(11px, 1.05vh + 0.35rem, 14px)",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Thank you for your business
          </span>
          <span>614-559-3350</span>
        </div>
      </div>
    </div>
  );
}
