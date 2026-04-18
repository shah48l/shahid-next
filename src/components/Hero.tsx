"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/hooks/useGsap";
import { PROFILE, STATS } from "@/data/portfolio";
import { sfx } from "@/lib/audio";
import Magnet from "@/components/reactbits/Magnet";
import Terminal from "./Terminal";

const MailSvg = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const GhSvg = () => <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
const LiSvg = () => <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.064 2.064 0 110-4.128 2.064 2.064 0 010 4.128zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;

function ProximityText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const chars = el.querySelectorAll<HTMLSpanElement>(".px");
    const handler = (e: MouseEvent) => {
      chars.forEach(ch => {
        const r = ch.getBoundingClientRect();
        const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
        if (d < 120) { const t = 1 - d / 120; ch.style.fontWeight = `${Math.round(300 + t * 500)}`; ch.style.color = `rgba(0,255,170,${0.3 + t * 0.7})`; ch.style.textShadow = `0 0 ${t * 20}px rgba(0,255,170,${t * 0.5})`; }
        else { ch.style.fontWeight = ""; ch.style.color = ""; ch.style.textShadow = ""; }
      });
    };
    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, []);
  return <span ref={ref} aria-label={text}>{[...text].map((c, i) => <span key={i} className="px inline-block transition-all duration-150">{c === " " ? "\u00A0" : c}</span>)}</span>;
}

function Counter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current; const obj = { v: 0 };
    gsap.to(obj, { v: value, duration: 2, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 95%" }, onUpdate: () => { el.textContent = String(Math.round(obj.v)); } });
  }, [value]);
  return <div><div ref={ref} className="text-3xl md:text-4xl font-extrabold" style={{ color: "#00ffaa" }}>0</div><div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "#4a4944", marginTop: 4, letterSpacing: "0.04em" }}>{label}</div></div>;
}

export default function Hero() {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!sec.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1 } });
      tl.from(".hb", { y: 30, opacity: 0, duration: 0.7 }, 0.15)
        .from(".h-nm", { y: 60, opacity: 0, duration: 1.1 }, 0.25)
        .from(".h-rl", { y: 60, opacity: 0, duration: 1.1 }, 0.4)
        .from(".h-sb", { y: 30, opacity: 0, duration: 0.8 }, 0.6)
        .from(".h-desc", { y: 30, opacity: 0, duration: 0.8 }, 0.7)
        .from(".h-btn", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, 0.85)
        .from(".h-stat", { y: 20, opacity: 0, duration: 0.5, stagger: 0.08 }, 1);
      const t = sec.current!.querySelector(".h-term") as HTMLElement;
      if (t?.offsetParent) tl.from(t, { x: 60, opacity: 0, duration: 1.2, ease: "power3.out" }, 0.6);
    }, sec.current);
    return () => ctx.revert();
  }, []);

  const mono = { fontFamily: "var(--mono)" };
  const btnBase = "h-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-xl no-underline transition-all";

  return (
    <section ref={sec} id="hero" className="min-h-screen flex items-center px-5 md:px-10 pt-34 md:pt-40 pb-20 md:pb-24">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-14 lg:gap-18 w-full max-w-[1320px] mx-auto">
        <div className="flex-1 min-w-0">
          <div className="hb inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 md:mb-10" style={{ ...mono, fontSize: 13, color: "#00ffaa", background: "rgba(0,255,170,0.12)", border: "1px solid rgba(0,255,170,0.15)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00ffaa" }} /> Available for opportunities
          </div>
          <h1 className="mb-6 md:mb-7" style={{ fontSize: "clamp(3.5rem,9vw,8.25rem)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-0.05em" }}>
            <span className="h-nm block" style={{ color: "#f0ece6" }}><ProximityText text={PROFILE.name} /></span>
            <span className="h-rl block" style={{ color: "#00ffaa" }}>{PROFILE.role}</span>
            <span className="h-sb block mt-3" style={{ fontWeight: 300, fontSize: "0.4em", color: "#6f6b65" }}>{PROFILE.tagline}</span>
          </h1>
          <p className="h-desc max-w-[620px] mb-9 md:mb-10" style={{ fontSize: 19, lineHeight: 1.8, color: "#c6c1b8", fontWeight: 300 }}>
            Building <strong style={{ color: "#f0ece6", fontWeight: 500 }}>T-shaped backend systems</strong> with depth in Python, Django/DRF, and clean architecture.
            I craft <strong style={{ color: "#f0ece6", fontWeight: 500 }}>real-time, production-grade APIs</strong> and integrate Machine Learning at scale.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Magnet padding={60} magnetStrength={3}><a href="#contact" className={btnBase} style={{ ...mono, fontSize: 14, fontWeight: 600, background: "#00ffaa", color: "#060609", boxShadow: "0 0 30px rgba(0,255,170,0.15)" }} onMouseEnter={() => sfx?.playHover()} onClick={() => sfx?.playClick()}><MailSvg /> Get in touch</a></Magnet>
            <Magnet padding={60} magnetStrength={3}><a href={PROFILE.github} target="_blank" rel="noopener" className={btnBase} style={{ ...mono, fontSize: 14, color: "#f0ece6", border: "1px solid #1f1f30", background: "rgba(18,18,28,0.72)" }} onMouseEnter={() => sfx?.playHover()} onClick={() => sfx?.playClick()}><GhSvg /> GitHub</a></Magnet>
            <Magnet padding={60} magnetStrength={3}><a href={PROFILE.linkedin} target="_blank" rel="noopener" className={btnBase} style={{ ...mono, fontSize: 14, color: "#f0ece6", border: "1px solid #1f1f30", background: "rgba(18,18,28,0.72)" }} onMouseEnter={() => sfx?.playHover()} onClick={() => sfx?.playClick()}><LiSvg /> LinkedIn</a></Magnet>
          </div>
          <div className="flex flex-wrap gap-8 md:gap-14 pt-9 mt-11" style={{ borderTop: "1px solid #1f1f30" }}>
            {STATS.map(s => <div key={s.label} className="h-stat"><Counter value={s.value} label={s.label} /></div>)}
          </div>
        </div>
        <div className="h-term w-full lg:w-auto flex-shrink-0"><Terminal /></div>
      </div>
    </section>
  );
}
