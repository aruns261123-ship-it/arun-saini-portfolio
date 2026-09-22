import { ImageResponse } from "next/og";

// Edge runtime: required for on-demand OG image generation (and the Node
// runtime's @vercel/og build fails on Windows dev machines).
export const runtime = "edge";
export const alt = "Arun Saini — SEO Expert & Front-End Developer";
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
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #050508 0%, #12122a 100%)",
          color: "#f4f5fa",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: 24,
            color: "#8b96ff",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 999, background: "#8b96ff" }} />
          SEO Expert · Technical SEO · Front-End Developer
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
            display: "flex",
          }}
        >
          I Build Search-Optimized
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#8b96ff",
            display: "flex",
          }}
        >
          Digital Experiences.
        </div>
        <div style={{ marginTop: 40, fontSize: 30, color: "#a2a5b8", display: "flex" }}>
          Arun Saini — India
        </div>
      </div>
    ),
    size
  );
}
