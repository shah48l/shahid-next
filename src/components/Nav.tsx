"use client";
import { useState } from "react";
import JazzToggle from "@/components/JazzToggle";

const NAV_ITEMS = [
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [logoHovered, setLogoHovered] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[1000] px-4 md:px-10 border-b"
      style={{ borderColor: "#1f1f30", backdropFilter: "blur(24px)", background: "rgba(6,6,9,0.76)" }}
    >
      <div className="flex items-center justify-between h-14 gap-4">

        {/* Logo + Avatar */}
        <a
          href="#hero"
          className="no-underline shrink-0 flex items-center gap-2.5"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          style={{ textDecoration: "none" }}
        >
          {/* Avatar ring */}
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              padding: 1.5,
              background: logoHovered
                ? "linear-gradient(135deg, #00ffaa, #5eaaff)"
                : "linear-gradient(135deg, rgba(0,255,170,0.35), rgba(94,170,255,0.2))",
              boxShadow: logoHovered
                ? "0 0 0 3px rgba(0,255,170,0.15), 0 0 20px rgba(0,255,170,0.2)"
                : "none",
              transition: "background 0.35s ease, box-shadow 0.35s ease",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                border: "1.5px solid #060609",
                transform: logoHovered ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/vAGA.png"
                alt="Shahid J"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: logoHovered ? "brightness(1.08) saturate(1.1)" : "brightness(1)",
                  transition: "filter 0.35s ease",
                }}
              />
            </div>
          </div>

          {/* Wordmark */}
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: logoHovered ? "#e8ffe8" : "#00ffaa",
              transition: "color 0.25s ease",
            }}
          >
            shahid
            <span
              style={{
                color: logoHovered ? "#6a6860" : "#3a3934",
                transition: "color 0.25s ease",
              }}
            >
              .dev
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-lg no-underline"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "#7a7872",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#f0ece6";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#7a7872";
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          <JazzToggle compact />
          <div className="hidden sm:flex items-center gap-2" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#00ffaa" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00ffaa" }} />
            <span>Open to work</span>
          </div>
        </div>
      </div>

      {/* Mobile scrollable links */}
      <div className="md:hidden flex gap-2 overflow-x-auto pb-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="shrink-0 px-3 py-1.5 rounded-full no-underline"
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "#b8b5ad",
              background: "rgba(18,18,28,0.92)",
              border: "1px solid #1f1f30",
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
