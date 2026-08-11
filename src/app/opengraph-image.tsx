import { ImageResponse } from "next/og";

export const alt = "R.Karan, systems and performance engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card. Deliberately plain: no webfont fetch at build time, so this can
 * never fail a deploy. The page itself does the visual work.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0c0c",
          color: "#ffffff",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          {["#00d2ff", "#4ade80", "#f5b544", "#b39dff", "#a4f4fd"].map((accent) => (
            <div
              key={accent}
              style={{ width: 40, height: 6, borderRadius: 3, background: accent }}
            />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 108, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            R.Karan
          </div>
          <div style={{ fontSize: 34, color: "rgba(255,255,255,0.65)", marginTop: 28 }}>
            SDE · Full-stack
          </div>
        </div>

        <div style={{ fontSize: 26, color: "rgba(255,255,255,0.5)" }}>
          lattice · cacheopt · relay · quorum · resume-tailor
        </div>
      </div>
    ),
    size,
  );
}
