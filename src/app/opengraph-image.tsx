import { ImageResponse } from "next/og";

export const alt = "MONCRÉ — kosmetyki do stylizacji męskich włosów";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#141416",
          color: "#F7F6F2",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 6, opacity: 0.6 }}>MEN&apos;S HAIR STYLING</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 168, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4 }}>
          <span>YOUR HAIR.</span>
          <span>YOUR RULES.</span>
        </div>
        <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: 2 }}>MONCRÉ</div>
      </div>
    ),
    size,
  );
}
