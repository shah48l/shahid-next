"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/hooks/useGsap";
import { SKILLS, EXPERIENCE, PROJECTS, EDUCATION, PROFILE, TECH_LOGOS } from "@/data/portfolio";
import { sfx } from "@/lib/audio";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import Magnet from "@/components/reactbits/Magnet";
import ProfileCard from "@/components/reactbits/ProfileCard";

const mono = { fontFamily: "var(--mono)" };
const GhSvg = () => <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
const LiSvg = () => <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.064 2.064 0 110-4.128 2.064 2.064 0 010 4.128zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const MailSvg = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const PhSvg = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>;

function SH({ num, title, center }: { num: string; title: string; center?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!ref.current) return; const ctx = gsap.context(() => { gsap.from(ref.current!.children, { scrollTrigger: { trigger: ref.current!, start: "top 90%" }, y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: "expo.out" }); }, ref.current); return () => ctx.revert(); }, []);
  return <div ref={ref} className={`flex items-center gap-4 mb-14 ${center ? "justify-center" : ""}`}><span style={{ ...mono, fontSize: 16, color: "#00ffaa", fontWeight: 500 }}>{num}</span><h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.04em" }}>{title}</h2>{!center && <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #1f1f30, transparent)" }} />}</div>;
}

// ═══ LOGO LOOP ═══
export function LogoLoop() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = ref.current; if (!t) return;
    t.innerHTML += t.innerHTML;
    const tw = t.scrollWidth / 2;
    const ctx = gsap.context(() => { gsap.to(t, { x: -tw, duration: 35, ease: "none", repeat: -1, modifiers: { x: gsap.utils.unitize((v: string) => parseFloat(v) % tw) } }); });
    return () => ctx.revert();
  }, []);
  return (
    <div className="py-4 overflow-hidden relative z-[1]" style={{ borderTop: "1px solid #1f1f30", borderBottom: "1px solid #1f1f30" }}>
      <div ref={ref} className="flex gap-10 w-max">
        {TECH_LOGOS.map(t => (
          <span key={t.name} className="flex items-center gap-3 flex-shrink-0 whitespace-nowrap" style={{ ...mono, fontSize: 13, color: "#7a7872" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.url} alt={t.name} width={22} height={22} className="opacity-70" />
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}

// ═══ SKILLS — SpotlightCard hover ═══
export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!ref.current) return; const ctx = gsap.context(() => { ref.current!.querySelectorAll<HTMLElement>(".sk-wrap").forEach((c, i) => { gsap.from(c, { scrollTrigger: { trigger: c, start: "top 92%" }, y: 50, opacity: 0, duration: 0.7, delay: (i % 3) * 0.1, ease: "expo.out", onComplete: () => { gsap.set(c, { clearProps: "transform,opacity" }); } }); }); }, ref.current); return () => ctx.revert(); }, []);
  return (
    <section ref={ref} id="skills" className="py-20 md:py-32 px-5 md:px-10 max-w-[1200px] mx-auto">
      <SH num="01." title="Tech Arsenal" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SKILLS.map(s => (
          <div key={s.name} className="sk-wrap h-full" onMouseEnter={() => sfx?.playCardHover()}>
            <SpotlightCard className="h-full" spotlightColor="rgba(0,255,170,0.15)">
              <div className="p-7 md:p-8 h-full" style={{ background: "transparent", borderRadius: 16 }}>
                <span className="text-[32px] block mb-5 w-fit">{s.icon}</span>
                <h3 className="text-[22px] font-semibold mb-3" style={{ color: "#f0ece6" }}>{s.name}</h3>
                <p className="text-[15px] leading-7 mb-6" style={{ color: "#c0bbb2" }}>{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map(t => <span key={t} className="px-3 py-1.5 rounded-md" style={{ ...mono, fontSize: 11, background: "rgba(19,24,34,0.92)", border: "1px solid rgba(56,65,82,0.72)", color: "#9da5b2" }}>{t}</span>)}
                </div>
              </div>
            </SpotlightCard>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══ EXPERIENCE ═══
export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!ref.current) return; const ctx = gsap.context(() => { ref.current!.querySelectorAll<HTMLElement>(".tl-item").forEach(item => { const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: "top 90%" } }); tl.from(item.querySelector(".tl-dot")!, { scale: 0, opacity: 0, duration: 0.4, ease: "back.out(2)" }).from(item, { x: -30, opacity: 0, duration: 0.6, ease: "expo.out" }, 0.1); }); }, ref.current); return () => ctx.revert(); }, []);
  return (
    <section ref={ref} id="experience" className="py-20 md:py-32 px-5 md:px-10 max-w-[1200px] mx-auto">
      <SH num="02." title="Where I've Built" />
      <div className="relative max-w-[800px]">
        <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: "linear-gradient(180deg, rgba(0,255,170,0.12), #1f1f30 20%, #1f1f30 80%, transparent)" }} />
        {EXPERIENCE.map(exp => (
          <div key={exp.company} className="tl-item pl-12 mb-14 relative" onMouseEnter={() => sfx?.playHover()}>
            <div className="tl-dot absolute -left-[7px] top-1.5 w-4 h-4 rounded-full" style={{ background: "#060609", border: "2px solid #00ffaa", boxShadow: "0 0 16px rgba(0,255,170,0.12)" }} />
            <div className="rounded-[22px] p-6 md:p-7 exp-card-inner" style={{ background: "linear-gradient(180deg, rgba(14,16,24,0.9), rgba(8,9,15,0.96))", border: "1px solid rgba(31,31,48,0.9)", boxShadow: "0 24px 70px rgba(0,0,0,0.18)" }}>
              <div style={{ ...mono, fontSize: 12, color: "#00ffaa", letterSpacing: "0.08em", marginBottom: 10 }}>{exp.period.toUpperCase()}</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>{exp.company}</h3>
              <div style={{ fontSize: 16, color: "#d0cac1", marginBottom: 6 }}>{exp.role}</div>
              <div style={{ ...mono, fontSize: 12, color: "#6f6b65", marginBottom: 18 }}>{exp.location}</div>
              <ul>{exp.points.map((p, i) => <li key={i} className="relative pl-5 mb-3" style={{ fontSize: 15, color: "#beb8af", lineHeight: 1.8, listStyle: "none" }}><span className="absolute left-0" style={{ color: "#00ffaa" }}>▸</span>{p}</li>)}</ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══ PROJECTS — SpotlightCard hover ═══
export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!ref.current) return; const ctx = gsap.context(() => { ref.current!.querySelectorAll<HTMLElement>(".pj-wrap").forEach(c => { gsap.from(c, { scrollTrigger: { trigger: c, start: "top 90%" }, y: 50, opacity: 0, duration: 0.8, ease: "expo.out" }); }); }, ref.current); return () => ctx.revert(); }, []);
  return (
    <section ref={ref} id="projects" className="py-20 md:py-32 px-5 md:px-10 max-w-[1200px] mx-auto">
      <SH num="03." title="Projects" />
      <div className="space-y-5">
        {PROJECTS.map(p => (
          <div key={p.name} className="pj-wrap" onMouseEnter={() => sfx?.playCardHover()}>
            <SpotlightCard spotlightColor="rgba(0,229,229,0.1)">
              <div className="p-8 md:p-10" style={{ background: "transparent", borderRadius: 16 }}>
                <div style={{ ...mono, fontSize: 12, color: "#00ffaa", letterSpacing: "0.08em", marginBottom: 12 }}>{p.label}</div>
                <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 10 }}>{p.name}</h3>
                {p.award && <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ ...mono, fontSize: 12, color: "#ffb347", background: "rgba(255,179,71,0.08)", border: "1px solid rgba(255,179,71,0.25)" }}>{p.award}</div>}
                <p className="max-w-[760px] mb-6" style={{ fontSize: 16, color: "#c0bbb2", lineHeight: 1.8 }}>{p.desc}</p>
                <div className="flex flex-wrap gap-2">{p.tech.map(t => <span key={t} className="px-3 py-1.5 rounded-md" style={{ ...mono, fontSize: 12, color: "#00e5e5", background: "rgba(0,229,229,0.05)", border: "1px solid rgba(0,229,229,0.15)" }}>{t}</span>)}</div>
              </div>
            </SpotlightCard>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══ EDUCATION — SpotlightCard ═══
export function EducationSection() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!ref.current) return; const ctx = gsap.context(() => { gsap.from(".edu-wrap", { scrollTrigger: { trigger: ".edu-wrap", start: "top 90%" }, y: 40, opacity: 0, duration: 0.8, ease: "expo.out" }); }, ref.current); return () => ctx.revert(); }, []);
  return (
    <section ref={ref} id="education" className="py-20 md:py-32 px-5 md:px-10 max-w-[1200px] mx-auto">
      <SH num="04." title="Education" />
      <div className="edu-wrap max-w-[600px]" onMouseEnter={() => sfx?.playCardHover()}>
        <SpotlightCard spotlightColor="rgba(94,170,255,0.1)">
          <div className="p-8 md:p-10" style={{ background: "transparent", borderRadius: 16 }}>
            <h3 style={{ fontSize: 26, fontWeight: 700, marginBottom: 10 }}>{EDUCATION.degree}</h3>
            <div style={{ fontSize: 18, color: "#79b8ff", marginBottom: 6 }}>{EDUCATION.school}</div>
            <div style={{ ...mono, fontSize: 13, color: "#6f6b65" }}>{EDUCATION.location} · {EDUCATION.year}</div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}

// ═══ CONTACT — Magnet on every link ═══
export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".c-desc", { scrollTrigger: { trigger: "#contact", start: "top 95%" }, y: 20, opacity: 0, duration: 0.6, ease: "expo.out" });
      gsap.from(".c-link", { scrollTrigger: { trigger: ".c-links", start: "top 98%" }, y: 15, opacity: 0, duration: 0.5, stagger: 0.08, ease: "expo.out" });
      gsap.delayedCall(4, () => { document.querySelectorAll<HTMLElement>(".c-link").forEach(el => { gsap.set(el, { clearProps: "opacity,transform" }); }); });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  const links = [
    { href: `mailto:${PROFILE.email}`, icon: <MailSvg />, label: PROFILE.email },
    { href: PROFILE.github, icon: <GhSvg />, label: "GitHub", ext: true },
    { href: PROFILE.linkedin, icon: <LiSvg />, label: "LinkedIn", ext: true },
    { href: `tel:${PROFILE.phone}`, icon: <PhSvg />, label: PROFILE.phone },
  ];

  return (
    <section ref={ref} id="contact" className="py-20 md:py-32 px-5 md:px-10 max-w-[1200px] mx-auto text-center">
      <SH num="05." title="Let's Build Together" center />
      <p className="c-desc max-w-[520px] mx-auto mb-10" style={{ fontSize: 18, color: "#c0bbb2", lineHeight: 1.8 }}>
        I&apos;m always excited to connect with engineers, founders, and teams building impactful products.
      </p>
      <div className="c-links flex flex-wrap justify-center gap-4">
        {links.map(l => (
          <Magnet key={l.label} padding={50} magnetStrength={2}>
            <a href={l.href} target={l.ext ? "_blank" : undefined} rel={l.ext ? "noopener" : undefined}
              className="c-link flex items-center gap-3 px-5 py-3.5 rounded-xl no-underline transition-all hover:-translate-y-1"
              style={{ ...mono, fontSize: 14, color: "#f0ece6", background: "rgba(18,18,28,0.84)", border: "1px solid #1f1f30", boxShadow: "0 20px 40px rgba(0,0,0,0.16)" }}
              onMouseEnter={() => sfx?.playHover()} onClick={() => sfx?.playClick()}>
              {l.icon}{l.label}
            </a>
          </Magnet>
        ))}
      </div>
    </section>
  );
}

export function SignatureCard() {
  const contactLinks = [
    { href: PROFILE.github, icon: <GhSvg />, label: "GitHub", ext: true },
    { href: PROFILE.linkedin, icon: <LiSvg />, label: "LinkedIn", ext: true },
    { href: `tel:${PROFILE.phone}`, icon: <PhSvg />, label: PROFILE.phone },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 px-5 md:px-10 max-w-[1280px] mx-auto">
      <div
        className="rounded-[32px] px-6 py-8 md:px-10 md:py-12"
        style={{
          background: "linear-gradient(180deg, rgba(14,10,12,0.96), rgba(8,8,12,0.98))",
          border: "1px solid rgba(90,56,48,0.6)",
          boxShadow: "0 30px 100px rgba(0,0,0,0.24)",
        }}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-[560px]">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ ...mono, fontSize: 12, color: "#ffb07a", background: "rgba(255,142,85,0.08)", border: "1px solid rgba(255,142,85,0.18)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#ff8e55" }} />
              Final Frame
            </div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.6rem)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.04em", color: "#f7ede5" }}>
              If this left an impression, let&apos;s build something memorable together.
            </h2>
            <p className="mt-5 max-w-[440px]" style={{ fontSize: 17, lineHeight: 1.85, color: "#cbb5a8" }}>
              I&apos;m always excited to connect with engineers, founders, and teams building impactful products.
            </p>

            {/* Contact links */}
            <div className="flex flex-wrap gap-3 mt-8">
              {contactLinks.map(l => (
                <Magnet key={l.label} padding={40} magnetStrength={2}>
                  <a
                    href={l.href}
                    target={l.ext ? "_blank" : undefined}
                    rel={l.ext ? "noopener" : undefined}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl no-underline transition-all hover:-translate-y-0.5"
                    style={{ ...mono, fontSize: 13, color: "#f0ece6", background: "rgba(18,12,10,0.9)", border: "1px solid rgba(90,56,48,0.5)", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}
                    onMouseEnter={() => sfx?.playHover()}
                    onClick={() => sfx?.playClick()}
                  >
                    {l.icon}{l.label}
                  </a>
                </Magnet>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[380px]" onMouseEnter={() => sfx?.playCardHover()}>
              <ProfileCard
                className="mx-auto"
                name={PROFILE.name}
                title={PROFILE.role}
                handle="shahidj"
                status="Available for Opportunities"
                contactText="Email Me"
                avatarUrl="/vAGA.png"
                miniAvatarUrl="/vAGA.png"
                showUserInfo
                enableTilt
                enableMobileTilt={true}
                mobileTiltSensitivity={8}
                onContactClick={() => {
                  sfx?.playClick();
                  window.location.href = `mailto:${PROFILE.email}`;
                }}
                behindGlowColor="rgba(255, 137, 76, 0.48)"
                behindGlowSize="42%"
                behindGlowEnabled
                innerGradient="linear-gradient(145deg, rgba(107,46,32,0.64) 0%, rgba(33,24,63,0.36) 58%, rgba(255,162,91,0.22) 100%)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
