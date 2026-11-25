import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Initials, replacing the default Next.js favicon the site shipped with. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0c0c",
          borderRadius: 14,
          color: "#a4f4fd",
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        RK
      </div>
    ),
    size,
  );
}
