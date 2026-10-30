import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { palette } from "@/config/theme";

/**
 * Default social sharing image (1200 × 630), generated at build time.
 * To use a designed graphic instead, delete this file and add
 * src/app/opengraph-image.jpg (1200 × 630) — Next.js picks it up automatically.
 */
export const alt = siteConfig.seo.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [serif, sans] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/CormorantGaramond-Medium.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Manrope-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: palette.cream, color: palette.ink }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 0 64px 80px" }}>
          <div style={{ fontFamily: "Cormorant", fontSize: 34, letterSpacing: 8 }}>STILL LIVING</div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Cormorant", fontSize: 92, lineHeight: 0.98 }}>
            <span>Przestrzeń,</span>
            <span>która ma znaczenie.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", fontFamily: "Manrope", fontSize: 18, letterSpacing: 4, color: palette.stoneDeep }}>
            <div style={{ width: 48, height: 1, background: palette.stone, marginRight: 20 }} />
            PROJEKT · MATERIAŁY · REALIZACJA
          </div>
        </div>
        <div style={{ width: 330, display: "flex", alignItems: "flex-end", padding: "0 72px 0 0" }}>
          <div
            style={{
              width: 258,
              height: 470,
              display: "flex",
              borderTopLeftRadius: 129,
              borderTopRightRadius: 129,
              background: `linear-gradient(160deg, #EFE7DC 0%, ${palette.sand} 100%)`,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 150,
                height: 330,
                marginBottom: 60,
                borderTopLeftRadius: 75,
                borderTopRightRadius: 75,
                background: palette.paper,
                border: "6px solid #CBB9A2",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: serif, weight: 500, style: "normal" },
        { name: "Manrope", data: sans, weight: 500, style: "normal" },
      ],
    },
  );
}
