"use client";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Cursor from "@/components/Cursor";
import KonamiEgg from "@/components/KonamiEgg";
import Particles from "@/components/Particles";
import TiltInit from "@/components/TiltInit";
import { LogoLoop, Skills, Experience, Projects, EducationSection, SignatureCard } from "@/components/Sections";

// ReactBits SplashCursor — WebGL fluid simulation
const SplashCursor = dynamic(() => import("@/components/reactbits/SplashCursor"), { ssr: false });

function ScrollProgress() {
  useEffect(() => {
    const bar = document.querySelector<HTMLDivElement>(".scroll-progress");
    if (!bar) return;
    const h = () => { const t = document.documentElement.scrollHeight - innerHeight; bar.style.transform = `scaleX(${t > 0 ? scrollY / t : 0})`; };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return <div className="scroll-progress" />;
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const onDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Loader onComplete={onDone} />
      {loaded && (
        <>
          {/* ReactBits SplashCursor — WebGL fluid cursor */}
          <SplashCursor
            DENSITY_DISSIPATION={3.5}
            VELOCITY_DISSIPATION={2}
            SPLAT_RADIUS={0.2}
            SPLAT_FORCE={6000}
            CURL={3}
            COLOR_UPDATE_SPEED={10}
            BACK_COLOR={{ r: 0, g: 0, b: 0 }}
            TRANSPARENT={true}
          />

          <Cursor />
          <KonamiEgg />
          <Particles />
          <TiltInit />
          <div className="crt-lines" aria-hidden="true" />
          <div className="noise" aria-hidden="true" />
          <div className="grid-bg" aria-hidden="true" />

          {/* Floating orbs */}
          <div className="orb-a fixed top-[5%] -left-[8%] w-[520px] h-[520px] rounded-full pointer-events-none z-0" style={{ filter: "blur(110px)", background: "radial-gradient(circle, rgba(0,255,170,0.13), transparent 70%)" }} />
          <div className="orb-b fixed top-[45%] -right-[8%] w-[420px] h-[420px] rounded-full pointer-events-none z-0" style={{ filter: "blur(100px)", background: "radial-gradient(circle, rgba(94,170,255,0.09), transparent 70%)" }} />
          <div className="orb-c fixed bottom-[5%] left-[25%] w-[380px] h-[380px] rounded-full pointer-events-none z-0" style={{ filter: "blur(110px)", background: "radial-gradient(circle, rgba(177,140,255,0.08), transparent 70%)" }} />
          <div className="orb-a fixed top-[60%] left-[10%] w-[300px] h-[300px] rounded-full pointer-events-none z-0" style={{ filter: "blur(90px)", background: "radial-gradient(circle, rgba(0,229,229,0.06), transparent 70%)", animationDelay: "4s" }} />

          <ScrollProgress />
          <Nav />

          <main className="relative z-[1]">
            <Hero />
            <LogoLoop />
            <Skills />
            <Experience />
            <Projects />
            <EducationSection />
            <SignatureCard />
          </main>

          <footer className="relative z-[1]">
            <div className="footer-border" />
            <div className="flex flex-col sm:flex-row justify-between items-center px-5 md:px-10 py-6 gap-2 text-center" style={{ fontFamily: "var(--mono)", fontSize: 12, color: "#3a3830" }}>
              <span>Designed &amp; Built by <span style={{ color: "#4a4944" }}>Shahid J</span></span>
              <span style={{ color: "#2a2824" }}>&copy; 2026</span>
            </div>
          </footer>
        </>
      )}
    </>
  );
}
