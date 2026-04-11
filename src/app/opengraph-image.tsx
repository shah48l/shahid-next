import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Shahid J — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: "#060609",
          padding: "72px 80px",
          fontFamily: "monospace",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid lines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,255,170,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          display: "flex",
        }} />

        {/* Glow orb top-right */}
        <div style={{
          position: "absolute", top: -80, right: -80,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,255,170,0.14), transparent 70%)",
          display: "flex",
        }} />

        {/* Glow orb bottom-left */}
        <div style={{
          position: "absolute", bottom: -60, left: 200,
          width: 360, height: 360, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(94,170,255,0.09), transparent 70%)",
          display: "flex",
        }} />

        {/* Logo / handle */}
        <div style={{
          position: "absolute", top: 64, left: 80,
          display: "flex", alignItems: "center", gap: 16,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "linear-gradient(135deg, #00ffaa, #5eaaff)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 700, color: "#060609",
          }}>
            SJ
          </div>
          <span style={{ fontSize: 20, fontWeight: 600, color: "#00ffaa" }}>
            shahid<span style={{ color: "#3a3934" }}>.dev</span>
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            fontSize: 14, color: "#00ffaa", letterSpacing: "0.12em",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00ffaa" }} />
            BACKEND ENGINEER · OPEN TO WORK
          </div>

          <div style={{
            fontSize: 76, fontWeight: 800, lineHeight: 0.95,
            letterSpacing: "-0.04em", color: "#f0ece6",
          }}>
            Shahid J
          </div>

          <div style={{ fontSize: 32, fontWeight: 300, color: "#00ffaa" }}>
            Software Engineer
          </div>

          <div style={{
            fontSize: 20, color: "#7a7872", marginTop: 8,
            maxWidth: 600, lineHeight: 1.6,
          }}>
            Python · Django · FastAPI · REST APIs · ML Integration
          </div>

          {/* Tag row */}
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            {["Next.js", "GSAP", "Web Audio API", "WebGL", "Tailwind v4"].map((tag) => (
              <div key={tag} style={{
                padding: "6px 16px", borderRadius: 8,
                border: "1px solid rgba(0,255,170,0.2)",
                background: "rgba(0,255,170,0.06)",
                fontSize: 14, color: "#00ffaa",
              }}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
