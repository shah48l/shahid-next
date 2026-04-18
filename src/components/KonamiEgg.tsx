"use client";
import { useEffect, useState } from "react";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

const LINES = [
  { t: "system", x: "CHEAT CODE DETECTED" },
  { t: "gap" },
  { t: "dim", x: "$ whoami" },
  { t: "bright", x: "→  Shahid J — Backend Engineer" },
  { t: "gap" },
  { t: "dim", x: "$ cat secret.txt" },
  { t: "bright", x: "You just found the Konami code easter egg." },
  { t: "dim", x: "That tells me you're the kind of developer" },
  { t: "dim", x: "who reads source code and presses random keys." },
  { t: "dim", x: "I like you already." },
  { t: "gap" },
  { t: "dim", x: "$ sudo hire shahidj" },
  { t: "bright", x: "✓ PERMISSION GRANTED — excellent instincts." },
  { t: "gap" },
  { t: "accent", x: "📧  mjshahid48@gmail.com" },
  { t: "accent", x: "💼  linkedin.com/in/shahidj2004" },
  { t: "gap" },
  { t: "dim", x: "# press Escape or click to close" },
];

export default function KonamiEgg() {
  const [open, setOpen] = useState(false);
  const [seq, setSeq] = useState<string[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); return; }
      setSeq(prev => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.join(",") === KONAMI.join(",")) {
          setOpen(true);
          return [];
        }
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div className="konami-overlay" onClick={() => setOpen(false)}>
      <div className="konami-terminal" onClick={e => e.stopPropagation()}>
        {LINES.map((l, i) => {
          if (l.t === "gap") return <div key={i} style={{ height: 10 }} />;
          if (l.t === "system") return (
            <div key={i} style={{ fontSize: 11, letterSpacing: "0.18em", color: "#00ffaa", marginBottom: 18, textTransform: "uppercase", opacity: 0.7 }}>
              ★ &nbsp;{l.x} &nbsp;★
            </div>
          );
          if (l.t === "bright") return <div key={i} style={{ fontSize: 14, color: "#f0ece6", marginBottom: 4, lineHeight: 1.7 }}>{l.x}</div>;
          if (l.t === "accent") return <div key={i} style={{ fontSize: 14, color: "#00ffaa", lineHeight: 1.8 }}>{l.x}</div>;
          return <div key={i} style={{ fontSize: 13, color: "#4a4944", lineHeight: 1.7 }}>{l.x}</div>;
        })}
        <button
          onClick={() => setOpen(false)}
          style={{ marginTop: 24, fontFamily: "var(--mono)", fontSize: 11, color: "#3a3934", background: "none", border: "1px solid #1f1f30", borderRadius: 8, padding: "8px 20px", cursor: "none", transition: "color 0.2s, border-color 0.2s" }}
          onMouseEnter={e => { (e.target as HTMLButtonElement).style.color = "#00ffaa"; (e.target as HTMLButtonElement).style.borderColor = "rgba(0,255,170,0.3)"; }}
          onMouseLeave={e => { (e.target as HTMLButtonElement).style.color = "#3a3934"; (e.target as HTMLButtonElement).style.borderColor = "#1f1f30"; }}
        >
          close [ esc ]
        </button>
      </div>
    </div>
  );
}
