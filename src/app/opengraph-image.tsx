import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CréaScope — Planifiez vos vidéos, centralisez vos stats";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  const { width, height } = size;
  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg,#0b1220,#111827)",
          color: "white",
          padding: 48,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: "white",
              color: "#111827",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            CF
          </div>
          <div style={{ fontSize: 22, opacity: 0.9 }}>CréaScope</div>
        </div>

        <div>
          <div style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.05 }}>
            Planifiez vos vidéos. Centralisez vos stats.
          </div>
          <div style={{ marginTop: 12, fontSize: 26, opacity: 0.9 }}>
            L&apos;outil des micro‑créateurs TikTok · Instagram · YouTube
          </div>
        </div>

          <div style={{ fontSize: 20, opacity: 0.9 }}>creascope.app</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
