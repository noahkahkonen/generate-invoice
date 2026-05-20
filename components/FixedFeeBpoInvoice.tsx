import Image from "next/image";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { blockPad, bodyLine, bodySize, padH, padV } from "./invoiceTokens";

export type FixedFeeBpoInvoiceProps = {
  id?: string;
  amountDisplay?: string;
  due?: string;
  dealName?: string;
  description?: string | null;
  billedToName?: string;
  billedToLine2?: string;
  billedToLine3?: string;
  billedToEmail?: string;
  agentName?: string;
  agentTitle?: string;
  agentPhoneLine?: string;
  agentEmail?: string;
  payUrl?: string;
  qrUrl?: string;
};

const filled = (s?: string | null): s is string => !!s && s.trim() !== "";

function multiline(parts: ReactNode[]): ReactNode | null {
  const kept = parts.filter((p) => p !== null && p !== undefined && p !== "");
  if (kept.length === 0) return null;
  return kept.map((node, i) => (
    <Fragment key={i}>
      {i > 0 ? <br /> : null}
      {node}
    </Fragment>
  ));
}

const sectionHeader: CSSProperties = {
  fontSize: bodySize,
  fontWeight: 800,
  color: "#245535",
  letterSpacing: 1.5,
  textTransform: "uppercase",
  marginBottom: "clamp(6px, 0.8vh, 12px)",
};

const partyBody: CSSProperties = {
  fontSize: bodySize,
  lineHeight: bodyLine,
  color: "#333",
};

const primaryBody: CSSProperties = {
  fontSize: "clamp(14px, 1.1vh + 0.5rem, 18px)",
  color: "#222",
  lineHeight: bodyLine,
  fontWeight: 600,
};

export function FixedFeeBpoInvoice({
  id,
  amountDisplay,
  due,
  dealName,
  description,
  billedToName,
  billedToLine2,
  billedToLine3,
  billedToEmail,
  agentName,
  agentTitle,
  agentPhoneLine,
  agentEmail,
  payUrl,
  qrUrl,
}: FixedFeeBpoInvoiceProps) {
  const billedTo = multiline([
    filled(billedToName) ? billedToName : null,
    filled(billedToLine2) ? billedToLine2 : null,
    filled(billedToLine3) ? billedToLine3 : null,
    filled(billedToEmail) ? billedToEmail : null,
  ]);
  const agent = multiline([
    filled(agentName) ? <strong>{agentName}</strong> : null,
    filled(agentTitle) ? agentTitle : null,
    filled(agentPhoneLine) ? agentPhoneLine : null,
    filled(agentEmail) ? agentEmail : null,
  ]);

  const hasBilledTo = billedTo !== null;
  const hasAgent = agent !== null;
  const hasPartiesRow = hasBilledTo || hasAgent;

  const hasDealName = filled(dealName);
  const hasDescription = filled(description);
  const hasDeal = hasDealName || hasDescription;
  const hasAmount = filled(amountDisplay);
  const hasDealRow = hasDeal || hasAmount;

  const hasPayLink = filled(payUrl);
  const hasQr = filled(qrUrl);
  const hasPayColumn = hasPayLink || hasQr;

  const hasHeaderSubtitle = filled(id) || filled(due);

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
            gap: 12,
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
            {hasHeaderSubtitle ? (
              <div
                style={{
                  fontSize: "clamp(11px, 1.05vh + 0.3rem, 14px)",
                  color: "#c8e6c9",
                  lineHeight: 1.65,
                  marginTop: 4,
                }}
              >
                {filled(id) ? <>#{id}</> : null}
                {filled(id) && filled(due) ? <br /> : null}
                {filled(due) ? <>Due: {due}</> : null}
              </div>
            ) : null}
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
              padding: `clamp(8px, 1vh, 14px) ${padH}`,
            }}
          >
            4608 Sawmill Road, Columbus, OH 43220 | 614-559-3350 |
            info@bestcorporaterealestate.com
          </div>
        </div>

        <div className="invoice-page-body">
          {hasPartiesRow ? (
            <div
              style={{
                display: "flex",
                background: "#f5f5ef",
                padding: `${blockPad} ${padH}`,
                borderBottom: "1px solid #e0e0d8",
              }}
            >
              {hasBilledTo ? (
                <div style={{ flex: 1 }}>
                  <div style={sectionHeader}>Billed To</div>
                  <div style={partyBody}>{billedTo}</div>
                </div>
              ) : null}
              {hasAgent ? (
                <div
                  style={{
                    flex: 1,
                    borderLeft: hasBilledTo ? "1.5px solid #d0d0c8" : "none",
                    paddingLeft: hasBilledTo
                      ? "clamp(14px, 1.5vw, 24px)"
                      : 0,
                  }}
                >
                  <div style={sectionHeader}>Agent</div>
                  <div style={partyBody}>{agent}</div>
                </div>
              ) : null}
            </div>
          ) : null}

          {hasDealRow ? (
            <div
              style={{
                display: "flex",
                padding: `${blockPad} ${padH}`,
                gap: "clamp(20px, 2.2vw, 40px)",
                alignItems: "center",
                borderBottom: "1px solid #e0e0d8",
                flex: 1,
              }}
            >
              {hasDeal ? (
                <div
                  style={{
                    flex: "1 1 0%",
                    minWidth: 0,
                    paddingRight: "clamp(0px, 0.5vw, 8px)",
                  }}
                >
                  <div
                    style={{
                      ...sectionHeader,
                      marginBottom: "clamp(10px, 1.1vh, 16px)",
                    }}
                  >
                    Billed for
                  </div>
                  {hasDealName ? (
                    <div style={primaryBody}>{dealName}</div>
                  ) : null}
                  {hasDescription && hasDealName ? (
                    <div
                      style={{
                        marginTop: "clamp(8px, 0.9vh, 12px)",
                        paddingTop: "clamp(6px, 0.6vh, 10px)",
                        borderTop: "1px solid #e8e8e0",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "clamp(10px, 0.65vh + 0.35rem, 11px)",
                          fontWeight: 800,
                          color: "#245535",
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          marginBottom: 6,
                        }}
                      >
                        Description
                      </div>
                      <div
                        style={{
                          fontSize: bodySize,
                          color: "#555",
                          lineHeight: 1.55,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {description!.trim()}
                      </div>
                    </div>
                  ) : null}
                  {hasDescription && !hasDealName ? (
                    <div style={{ ...primaryBody, whiteSpace: "pre-line" }}>
                      {description!.trim()}
                    </div>
                  ) : null}
                </div>
              ) : null}
              {hasAmount ? (
                <div
                  style={{
                    flex: hasDeal ? "0 0 42%" : "1 1 100%",
                    minWidth: 0,
                    maxWidth: hasDeal ? "min(100%, 50%)" : "100%",
                    boxSizing: "border-box",
                    paddingLeft: hasDeal ? "clamp(4px, 0.8vw, 10px)" : 0,
                  }}
                >
                  <div
                    style={{
                      background: "#245535",
                      borderRadius: 4,
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
                        Amount due
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
                </div>
              ) : null}
            </div>
          ) : null}

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
              Payment options
            </div>
            <div
              style={{
                display: "flex",
                gap: "clamp(16px, 2vw, 32px)",
                alignItems: "flex-start",
              }}
            >
              {hasQr ? (
                <Image
                  src={qrUrl!}
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
              ) : null}
              <div style={{ flex: 1, minWidth: 0 }}>
                {hasPayLink ? (
                  <a
                    href={payUrl}
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
                    Pay now ↗
                  </a>
                ) : null}
                <div
                  style={{
                    marginTop: hasPayColumn ? "clamp(8px, 0.9vh, 14px)" : 0,
                    borderTop: hasPayColumn ? "1px solid #e0e0d8" : "none",
                    paddingTop: hasPayColumn ? "clamp(8px, 0.9vh, 12px)" : 0,
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
