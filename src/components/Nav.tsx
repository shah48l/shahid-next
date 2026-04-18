"use client";
import { useState, useEffect } from "react";
import JazzToggle from "@/components/JazzToggle";

const NAV_ITEMS = [
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Nav() {
  const [logoHovered, setLogoHovered] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Track which section is in view
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map(i => i.id);
    const observers: IntersectionObserver[] = [];

    // Map of section → whether it's intersecting
    const visible = new Map<string, number>();

    const pick = () => {
      // Pick the section with the highest intersection ratio that is visible
      let best: string | null = null;
      let bestRatio = 0;
      visible.forEach((ratio, id) => {
        if (ratio > bestRatio) { bestRatio = ratio; best = id; }
      });
      setActiveId(best);
    };

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          visible.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
          pick();
        },
        {
          // Fires when section occupies the middle band of the viewport
          rootMargin: "-15% 0px -55% 0px",
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[1000] px-4 md:px-10 border-b"
      style={{ borderColor: "#1f1f30", backdropFilter: "blur(28px)", background: "rgba(6,6,9,0.82)" }}
    >
      <div className="flex items-center justify-between h-[68px] gap-4">

        {/* Logo + Avatar */}
        <a
          href="#hero"
          className="no-underline shrink-0 flex items-center gap-3"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          {/* Avatar ring */}
          <div style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            padding: 2,
            background: logoHovered
              ? "linear-gradient(135deg, #00ffaa, #5eaaff)"
              : "linear-gradient(135deg, rgba(0,255,170,0.4), rgba(94,170,255,0.25))",
            boxShadow: logoHovered
              ? "0 0 0 3px rgba(0,255,170,0.15), 0 0 24px rgba(0,255,170,0.22)"
              : "none",
            transition: "background 0.35s ease, box-shadow 0.35s ease",
            flexShrink: 0,
          }}>
            <div style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #060609",
              transform: logoHovered ? "scale(1.07)" : "scale(1)",
              transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/vAGA.png"
                alt="Shahid J"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: logoHovered ? "brightness(1.1) saturate(1.12)" : "brightness(1)",
                  transition: "filter 0.35s ease",
                }}
              />
            </div>
          </div>

          {/* Wordmark */}
          <span style={{
            fontFamily: "var(--mono)",
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: logoHovered ? "#e8ffe8" : "#00ffaa",
            transition: "color 0.25s ease",
          }}>
            shahid
            <span style={{
              color: logoHovered ? "#6a6860" : "#3a3934",
              transition: "color 0.25s ease",
            }}>
              .dev
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link px-4 py-2 no-underline${activeId === item.id ? " active" : ""}`}
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          <JazzToggle compact />
          <div className="hidden lg:flex items-center gap-2" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#00ffaa" }}>
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
            className="shrink-0 px-3 py-1.5 rounded-full no-underline transition-all"
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: activeId === item.id ? "#00ffaa" : "#b8b5ad",
              background: activeId === item.id ? "rgba(0,255,170,0.08)" : "rgba(18,18,28,0.92)",
              border: `1px solid ${activeId === item.id ? "rgba(0,255,170,0.3)" : "#1f1f30"}`,
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
