import Image from "next/image";

const padH = "clamp(18px, 2.2vw, 32px)" as const;
const padV = "clamp(14px, 1.8vh, 28px)" as const;
const blockPad = "clamp(16px, 2.2vh, 30px)" as const;
const bodySize = "clamp(12px, 0.9vh + 0.4rem, 15px)" as const;
const bodyLine = 1.8 as const;

export function Invoice({ id }: { id: string }) {
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
                height: "clamp(50px, 5.2vh, 70px)",
                width: "auto",
                maxWidth: "min(42vw, 280px)",
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
              Due: 4/19/26
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
            nkahkonen@bestcorporaterealestate.com
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
                Valerie Tivin
                <br />
                Best Corporate Real Estate
                <br />
                614-559-3350
                <br />
                info@bestcorporaterealestate.com
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
                <strong>Noah Kahkonen</strong>
                <br />
                Senior Advisor
                <br />
                614-559-3350 Ext. 117
                <br />
                nkahkonen@bestcorporaterealestate.com
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
                  marginBottom: "clamp(10px, 1.1vh, 16px)",
                }}
              >
                Billed For
              </div>

              <div
                style={{
                  fontSize: "clamp(10px, 0.7vh + 0.4rem, 12px)",
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: "#245535",
                  textTransform: "uppercase",
                  marginBottom: "clamp(3px, 0.4vh, 6px)",
                }}
              >
                Landlord Representation
              </div>
              <div
                style={{
                  fontSize: bodySize,
                  color: "#444",
                  lineHeight: bodyLine,
                }}
              >
                2631 Morse Road Columbus, OH 43219
                <br />
                Unit: Suite C
                <br />
                Square Footage: 2,750
                <br />
                Acreage: N/A
              </div>

              <div
                style={{
                  fontSize: "clamp(10px, 0.7vh + 0.4rem, 12px)",
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: "#245535",
                  textTransform: "uppercase",
                  marginBottom: "clamp(3px, 0.4vh, 6px)",
                  marginTop: "clamp(10px, 1.2vh, 18px)",
                }}
              >
                Tenant
              </div>
              <div
                style={{
                  fontSize: bodySize,
                  color: "#444",
                  lineHeight: bodyLine,
                }}
              >
                <strong>Chubby Cheeks Daycare, Inc</strong>
                <br />
                Contact: Sahir Safi
                <br />
                614-559-3350
                <br />
                info@bestcorporaterealestate.com
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
                    $2,560.23
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
                    ["Total", "$157,240.16"],
                    ["Rate", "6%"],
                    ["Lease Type", "MG"],
                    ["Term", "5 Years, 2 Months"],
                    ["Rent Commencement", "MM/DD/YY"],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td
                        style={{
                          fontSize: bodySize,
                          padding: "clamp(5px, 0.6vh, 9px) clamp(0px, 0.3vw, 4px) clamp(5px, 0.6vh, 9px) 0",
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

              <div style={{ flex: 1, minWidth: 0 }}>
                <a
                  href="#"
                  style={{
                    display: "inline-block",
                    background: "#245535",
                    color: "#fff",
                    fontSize: "clamp(11px, 0.85vh + 0.35rem, 13px)",
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    padding: "clamp(6px, 0.6vh, 9px) clamp(14px, 1.4vw, 20px)",
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
                  Tax ID: <strong>XX-XXXXXXX</strong>
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
