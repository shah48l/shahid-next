"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { sfx } from "@/lib/audio";

const PROMPT = "shahid@portfolio:~$";

const BOOT_LINES = [
  { t: "c", x: "whoami" },
  { t: "o", x: "Shahid J — Backend Engineer" },
  { t: "c", x: "cat skills.json" },
  { t: "o", x: '{ "backend": ["Django","FastAPI"],' },
  { t: "o", x: '  "databases": ["PostgreSQL","Redis"],' },
  { t: "o", x: '  "cloud": ["Docker","AWS","CI/CD"] }' },
  { t: "c", x: "python manage.py runserver" },
  { t: "o", x: "✓ System check passed." },
  { t: "o", x: "✓ Dev server running at 0.0.0.0:8000" },
  { t: "m", x: "# interactive — type 'help' to explore" },
];

type Out = { text: string; color?: string };

const CMDS: Record<string, Out[]> = {
  help: [
    { text: "┌─ commands ────────────────────────────────────┐", color: "#00ffaa33" },
    { text: "│  whoami          — who am I                   │", color: "#9da5b2" },
    { text: "│  skills          — full tech stack            │", color: "#9da5b2" },
    { text: "│  projects        — what I've shipped          │", color: "#9da5b2" },
    { text: "│  contact         — reach out                  │", color: "#9da5b2" },
    { text: "│  ls              — list portfolio files       │", color: "#9da5b2" },
    { text: "│  neofetch        — system info                │", color: "#9da5b2" },
    { text: "│  git log --oneline  — commit history          │", color: "#9da5b2" },
    { text: "│  git status      — working tree               │", color: "#9da5b2" },
    { text: "│  ping github.com — latency check              │", color: "#9da5b2" },
    { text: "│  fortune         — random wisdom              │", color: "#9da5b2" },
    { text: "│  uname -a        — system info                │", color: "#9da5b2" },
    { text: "│  date            — current time               │", color: "#9da5b2" },
    { text: "│  history         — command history            │", color: "#9da5b2" },
    { text: "│  clear           — clear screen               │", color: "#9da5b2" },
    { text: "└───────────────────────────────────────────────┘", color: "#00ffaa33" },
    { text: "  💡 try 'sudo hire me'", color: "#4a4944" },
  ],
  whoami: [
    { text: "Shahid J — Backend Software Engineer", color: "#f0ece6" },
    { text: "─────────────────────────────────────────────", color: "#1f1f30" },
    { text: "📍 Hyderabad, India", color: "#7a7872" },
    { text: "🐍 Python · Django · FastAPI · REST APIs", color: "#7a7872" },
    { text: "🗄  PostgreSQL · Redis · MongoDB", color: "#7a7872" },
    { text: "☁️  Docker · AWS · GitHub Actions · Linux", color: "#7a7872" },
    { text: "🧠 ML Integration · PyTorch · U-Net", color: "#7a7872" },
    { text: "✅ Available for opportunities", color: "#00ffaa" },
  ],
  skills: [
    { text: "Backend    → Django · FastAPI · Celery · Microservices", color: "#c0bbb2" },
    { text: "Databases  → PostgreSQL · MySQL · MongoDB · Redis", color: "#c0bbb2" },
    { text: "DevOps     → Docker · AWS · GitHub Actions · Linux", color: "#c0bbb2" },
    { text: "ML / AI    → PyTorch · U-Net · Gemini API · OpenCV", color: "#c0bbb2" },
    { text: "Frontend   → React · Next.js · TypeScript · Tailwind", color: "#c0bbb2" },
    { text: "Craft      → SOLID · Design Patterns · TDD · DSA", color: "#c0bbb2" },
  ],
  projects: [
    { text: "★  Rescue Rover         🏆 Best Innovative — CSI", color: "#ffb347" },
    { text: "   OpenCV · Tesseract OCR · ML · Python", color: "#4a4944" },
    { text: "", color: "" },
    { text: "⚡  FluentX Messaging    60% latency reduction", color: "#5eaaff" },
    { text: "   Django REST · Redis Channels · WebSockets", color: "#4a4944" },
    { text: "", color: "" },
    { text: "🧠  Image Segmentation   91% Dice Score", color: "#b18cff" },
    { text: "   U-Net · PyTorch · TorchScript · Spark", color: "#4a4944" },
    { text: "", color: "" },
    { text: "📧  AI Email Automation", color: "#00e5e5" },
    { text: "   Gemini API · Amazon SES · Celery", color: "#4a4944" },
  ],
  contact: [
    { text: "📧  mjshahid48@gmail.com", color: "#c0bbb2" },
    { text: "💼  linkedin.com/in/shahidj2004", color: "#c0bbb2" },
    { text: "🐙  github.com/shah48l", color: "#c0bbb2" },
    { text: "📞  +91 87786 17605", color: "#c0bbb2" },
    { text: "", color: "" },
    { text: "→  Scroll to Final Frame ↓", color: "#4a4944" },
  ],
  ls: [
    { text: "drwxr-xr-x  portfolio.tsx", color: "#5eaaff" },
    { text: "drwxr-xr-x  projects/", color: "#5eaaff" },
    { text: "-rw-r--r--  resume.pdf", color: "#c0bbb2" },
    { text: "-rw-r--r--  skills.json", color: "#c0bbb2" },
    { text: "-rw-r--r--  experience.md", color: "#c0bbb2" },
    { text: "-r--------  .env.dreams", color: "#3a3934" },
    { text: "            └─ AVAILABLE_FOR_HIRE=true", color: "#00ffaa" },
  ],
  neofetch: [
    { text: "  ╭──────────────╮   shahid @ portfolio", color: "#00ffaa" },
    { text: "  │  ◉  ◉  ◉  ◉ │   ──────────────────", color: "#00ffaa" },
    { text: "  │  ▓▓▓▓▓▓▓▓▓▓ │   OS: Developer v2.0", color: "#00ffaa" },
    { text: "  │  ▓▓▓▓▓▓▓▓▓▓ │   Host: Hyderabad, IN", color: "#00ffaa" },
    { text: "  │  /\\/\\/\\/\\/ │   Shell: Django/FastAPI", color: "#00ffaa" },
    { text: "  ╰──────────────╯   CPU: Backend Systems", color: "#00ffaa" },
    { text: "                     Memory: 91% Dice Score", color: "#7a7872" },
    { text: "                     Uptime: 2 years", color: "#7a7872" },
    { text: "                     Disk: 60% latency cut", color: "#7a7872" },
    { text: "                     ██ ██ ██ ██ ██ ██", color: "#00ffaa44" },
  ],
  exit: [
    { text: "Nice try 😄", color: "#ffb347" },
    { text: "You can't leave — there's too much good stuff here.", color: "#7a7872" },
    { text: "Scroll down instead ↓", color: "#4a4944" },
  ],
  "git status": [
    { text: "On branch main", color: "#c0bbb2" },
    { text: "Your branch is up to date with 'origin/main'.", color: "#c0bbb2" },
    { text: "", color: "" },
    { text: "nothing to commit, working tree clean ✓", color: "#00ffaa" },
  ],
  "rm -rf /": [
    { text: "rm: /: Operation not permitted 😅", color: "#ff6b6b" },
    { text: "Portfolio is immutable. Nice try.", color: "#4a4944" },
  ],
  "sudo hire me": [
    { text: "[sudo] password for recruiter: ••••••••", color: "#7a7872" },
    { text: "Authenticating…", color: "#7a7872" },
    { text: "✓ GRANTED", color: "#00ffaa" },
    { text: "─────────────────────────────────────────────", color: "#1f1f30" },
    { text: "🎉 Excellent choice. Impeccable taste.", color: "#00ffaa" },
    { text: "📧 mjshahid48@gmail.com", color: "#f0ece6" },
    { text: "💼 linkedin.com/in/shahidj2004", color: "#f0ece6" },
    { text: "─────────────────────────────────────────────", color: "#1f1f30" },
    { text: "Let's ship something great together.", color: "#00ffaa" },
  ],
  "uname -a": [
    { text: "DeveloperOS 2.0 shahid-kernel #1 SMP Python Django FastAPI", color: "#c0bbb2" },
    { text: "Architecture: backend-first  CPU: problem-solver  RAM: 16GB coffee", color: "#4a4944" },
  ],
  "ping github.com": [
    { text: "PING github.com (140.82.121.3): 56 bytes", color: "#7a7872" },
    { text: "64 bytes from github.com: icmp_seq=0 ttl=52 time=12.4 ms", color: "#c0bbb2" },
    { text: "64 bytes from github.com: icmp_seq=1 ttl=52 time=11.8 ms", color: "#c0bbb2" },
    { text: "64 bytes from github.com: icmp_seq=2 ttl=52 time=13.1 ms", color: "#c0bbb2" },
    { text: "", color: "" },
    { text: "→  github.com/shah48l", color: "#00ffaa" },
  ],
  fortune: [
    { text: '"The best code is no code at all."  — Jeff Atwood', color: "#b18cff" },
    { text: "→  But when you must write it, make it clean.", color: "#4a4944" },
  ],
  date: [
    { text: new Date().toUTCString(), color: "#c0bbb2" },
  ],
  "cat resume.pdf": [
    { text: "binary file — opening in browser…", color: "#7a7872" },
    { text: "→  linkedin.com/in/shahidj2004", color: "#00ffaa" },
  ],
  "git log --oneline": [
    { text: "a4f9c2e  feat: ship FluentX 60% latency reduction", color: "#00ffaa" },
    { text: "b3e812a  feat: Image Segmentation 91% Dice Score", color: "#c0bbb2" },
    { text: "9cd445f  feat: AI Email Automation with Gemini", color: "#c0bbb2" },
    { text: "1a2b3c4  feat: Rescue Rover — Best Innovative CSI", color: "#ffb347" },
    { text: "0000001  init: became a backend engineer", color: "#4a4944" },
  ],
};

const ALL_CMDS = Object.keys(CMDS);
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export default function Terminal() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const histRef = useRef<string[]>([]);
  const histIdxRef = useRef(-1);
  const [interactive, setInteractive] = useState(false);
  const [val, setVal] = useState("");

  const scroll = () => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; };

  const addLine = useCallback((text: string, color = "#7a7872", extra = "") => {
    const bd = bodyRef.current; if (!bd) return;
    const d = document.createElement("div");
    d.style.cssText = `color:${color};padding-left:16px;white-space:pre;line-height:1.65;${extra}`;
    d.textContent = text;
    bd.appendChild(d); scroll();
  }, []);

  const addCmdLine = useCallback((cmd: string) => {
    const bd = bodyRef.current; if (!bd) return;
    const d = document.createElement("div");
    d.style.cssText = "display:flex;gap:8px;margin-bottom:2px;padding-left:4px";
    d.innerHTML = `<span style="color:#00ffaa;opacity:0.6;white-space:nowrap;font-size:11px;flex-shrink:0">${PROMPT}</span><span style="color:#f0ece6">${cmd}</span>`;
    bd.appendChild(d); scroll();
  }, []);

  const runCmd = useCallback((raw: string) => {
    const cmd = raw.trim();
    addCmdLine(cmd);
    sfx?.playClick();
    if (!cmd) return;

    if (cmd === "clear") { if (bodyRef.current) bodyRef.current.innerHTML = ""; return; }
    if (cmd === "history") {
      histRef.current.forEach((h, i) => addLine(`  ${String(i + 1).padStart(3)}  ${h}`));
      return;
    }

    const key = cmd.toLowerCase();
    const out = CMDS[key];
    if (!out) {
      addLine(`bash: ${cmd}: command not found`, "#ff6b6b66");
      addLine("type 'help' to see available commands", "#3a3934");
      return;
    }
    out.forEach(({ text, color }) => {
      if (!text) addLine("", "", "height:6px");
      else addLine(text, color || "#7a7872");
    });
    if (key === "sudo hire me") setTimeout(() => sfx?.playBoot?.(), 900);
  }, [addLine, addCmdLine]);

  // Boot sequence
  useEffect(() => {
    const bd = bodyRef.current; if (!bd) return;
    let alive = true;
    (async () => {
      await sleep(2600);
      for (const l of BOOT_LINES) {
        if (!alive) return;
        const d = document.createElement("div");
        if (l.t === "c") {
          d.style.cssText = "display:flex;gap:8px;margin-bottom:2px;padding-left:4px";
          d.innerHTML = `<span style="color:#00ffaa;opacity:0.6;white-space:nowrap;font-size:11px;flex-shrink:0">${PROMPT}</span><span class="tc" style="color:#f0ece6"></span>`;
          bd.appendChild(d);
          const c = d.querySelector(".tc")!;
          for (let i = 0; i < l.x.length; i++) {
            if (!alive) return;
            c.textContent += l.x[i]; sfx?.playHover();
            await sleep(26 + Math.random() * 26);
          }
          await sleep(200);
        } else if (l.t === "o") {
          d.style.cssText = "color:#7a7872;padding-left:16px;line-height:1.65";
          d.textContent = l.x; bd.appendChild(d); await sleep(65);
        } else {
          d.style.cssText = "color:#4a4944;font-style:italic;padding-left:16px;margin-top:4px";
          d.textContent = l.x; bd.appendChild(d); await sleep(110);
        }
        scroll();
      }
      if (alive) setInteractive(true);
    })();
    return () => { alive = false; };
  }, []);

  useEffect(() => { if (interactive) inputRef.current?.focus(); }, [interactive]);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const v = val;
      if (v.trim()) histRef.current.unshift(v.trim());
      histIdxRef.current = -1;
      setVal(""); runCmd(v);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = ALL_CMDS.filter(c => c.startsWith(val.toLowerCase()));
      if (matches.length === 1) setVal(matches[0]);
      else if (matches.length > 1) { addCmdLine(val); addLine(matches.join("   "), "#5eaaff66"); }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdxRef.current + 1, histRef.current.length - 1);
      histIdxRef.current = next;
      if (histRef.current[next] !== undefined) setVal(histRef.current[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdxRef.current - 1, -1);
      histIdxRef.current = next;
      setVal(next === -1 ? "" : (histRef.current[next] ?? ""));
    }
  };

  return (
    <div
      className="w-full md:w-[460px] rounded-xl overflow-hidden"
      style={{ background: "#0c0c18", border: "1px solid rgba(31,31,48,0.9)", boxShadow: "0 24px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.025), 0 0 0 1px rgba(0,255,170,0.025)" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-4 py-3" style={{ background: "#121224", borderBottom: "1px solid rgba(31,31,48,0.8)" }}>
        {(["#ff5f57", "#febc2e", "#28c840"] as const).map((c) => (
          <span key={c} className="w-3 h-3 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}44` }} />
        ))}
        <span className="ml-auto" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#2a2a40", letterSpacing: "0.04em" }}>
          bash — shahid@portfolio
        </span>
      </div>

      {/* Output body */}
      <div
        ref={bodyRef}
        className="px-2 pt-4 min-h-[200px] max-h-[285px] overflow-y-auto"
        style={{ fontFamily: "var(--mono)", fontSize: 12.5, lineHeight: 1.65, scrollbarWidth: "none" }}
      />

      {/* Interactive input */}
      {interactive && (
        <div className="flex items-center gap-2 px-2 pb-4 pt-1" style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>
          <span style={{ color: "#00ffaa", opacity: 0.6, whiteSpace: "nowrap", flexShrink: 0, fontSize: 11 }}>{PROMPT}</span>
          <input
            ref={inputRef}
            value={val}
            onChange={e => setVal(e.target.value)}
            onKeyDown={onKey}
            placeholder="type 'help'…"
            spellCheck={false}
            autoComplete="off"
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#f0ece6", fontFamily: "inherit", fontSize: "inherit", caretColor: "#00ffaa", minWidth: 0 }}
          />
        </div>
      )}
    </div>
  );
}
