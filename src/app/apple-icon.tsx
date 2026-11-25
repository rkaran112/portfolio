import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon on iOS. Square: iOS rounds the corners itself. */
export default function AppleIcon() {
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
          color: "#a4f4fd",
          fontSize: 92,
          fontWeight: 700,
          letterSpacing: -3,
        }}
      >
        RK
      </div>
    ),
    size,
  );
}
