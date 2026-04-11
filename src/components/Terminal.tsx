"use client";
import { useEffect, useRef } from "react";
import { sfx } from "@/lib/audio";

const LINES = [
  { t: "c", p: "~$", x: "whoami" },
  { t: "o", x: "Shahid J — Backend Engineer" },
  { t: "c", p: "~$", x: "cat skills.json" },
  { t: "o", x: '{ "backend": ["Django", "FastAPI"],' },
  { t: "o", x: '  "databases": ["PostgreSQL", "Redis"],' },
  { t: "o", x: '  "cloud": ["Docker", "AWS", "CI/CD"] }' },
  { t: "c", p: "~$", x: "python manage.py runserver" },
  { t: "o", x: "✓ System check passed." },
  { t: "o", x: "✓ Dev server at 0.0.0.0:8000" },
  { t: "m", x: "# Ready to build." },
];
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bd = ref.current; if (!bd) return;
    let active = true;
    (async () => {
      await sleep(3000);
      for (const l of LINES) {
        if (!active) return;
        const d = document.createElement("div");
        if (l.t === "c") {
          d.style.cssText = "display:flex;gap:8px;margin-bottom:2px";
          d.innerHTML = `<span style="color:#00ffaa;white-space:nowrap">${l.p}</span><span class="tc" style="color:#f0ece6"></span>`;
          bd.appendChild(d);
          const c = d.querySelector(".tc")!;
          for (let i = 0; i < l.x.length; i++) { if (!active) return; c.textContent += l.x[i]; sfx?.playHover(); await sleep(30 + Math.random() * 30); }
          await sleep(250);
        } else if (l.t === "o") {
          d.style.cssText = "color:#7a7872;padding-left:20px"; d.textContent = l.x; bd.appendChild(d); await sleep(80);
        } else {
          d.style.cssText = "color:#4a4944;font-style:italic"; d.textContent = l.x; bd.appendChild(d); await sleep(150);
        }
        bd.scrollTop = bd.scrollHeight;
      }
      const end = document.createElement("div");
      end.style.cssText = "display:flex;gap:8px";
      end.innerHTML = `<span style="color:#00ffaa">~$</span><span style="display:inline-block;width:8px;height:16px;background:#00ffaa;animation:blink 1s step-end infinite;vertical-align:middle;margin-left:2px"></span>`;
      bd.appendChild(end);
    })();
    return () => { active = false; };
  }, []);

  return (
    <div className="w-[460px] max-w-full rounded-xl overflow-hidden" style={{ background: "#12121c", border: "1px solid #1f1f30", boxShadow: "0 16px 64px rgba(0,0,0,0.5)" }}>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#1a1a28", borderBottom: "1px solid #1f1f30" }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
        <span className="ml-2" style={{ fontFamily: "var(--mono, monospace)", fontSize: 12, color: "#4a4944" }}>shahid@portfolio ~</span>
      </div>
      <div ref={ref} className="p-5 min-h-[260px] max-h-[320px] overflow-y-auto" style={{ fontFamily: "var(--mono, monospace)", fontSize: 13, lineHeight: 1.7 }} />
    </div>
  );
}
