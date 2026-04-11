"use client";
import GooeyNav from "@/components/reactbits/GooeyNav";
import JazzToggle from "@/components/JazzToggle";

const NAV_ITEMS = [
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[1000] px-4 md:px-10 py-3 border-b"
      style={{ borderColor: "#1f1f30", backdropFilter: "blur(24px)", background: "rgba(6,6,9,0.72)" }}
    >
      <div className="flex flex-col gap-3 md:gap-0">
        <div className="flex justify-between items-center gap-4">
          <a href="#hero" className="no-underline" style={{ fontFamily: "var(--mono)", fontSize: 18, fontWeight: 600, color: "#00ffaa" }}>
            shahid<span style={{ color: "#4a4944" }}>.dev</span>
          </a>

          <div className="hidden xl:block">
            <GooeyNav
              items={NAV_ITEMS}
              animationTime={600}
              particleCount={37}
              particleDistances={[90, 10]}
              particleR={600}
              timeVariance={1100}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
              initialActiveIndex={0}
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <JazzToggle compact />
            <div className="hidden md:flex items-center gap-2" style={{ fontFamily: "var(--mono)", fontSize: 12, color: "#00ffaa" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00ffaa" }} />
              <span>Open to work</span>
            </div>
          </div>
        </div>

        <div className="xl:hidden flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 px-3 py-2 rounded-full no-underline"
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
      </div>
    </nav>
  );
}
