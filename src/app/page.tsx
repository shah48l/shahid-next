"use client";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
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

          <div className="noise" aria-hidden="true" />
          <div className="grid-bg" aria-hidden="true" />

          {/* Floating orbs */}
          <div className="fixed top-[5%] -left-[8%] w-[500px] h-[500px] rounded-full pointer-events-none z-0" style={{ filter: "blur(100px)", background: "radial-gradient(circle, rgba(0,255,170,0.12), transparent 70%)" }} />
          <div className="fixed top-[45%] -right-[8%] w-[400px] h-[400px] rounded-full pointer-events-none z-0" style={{ filter: "blur(100px)", background: "radial-gradient(circle, rgba(94,170,255,0.08), transparent 70%)" }} />
          <div className="fixed bottom-[5%] left-[25%] w-[350px] h-[350px] rounded-full pointer-events-none z-0" style={{ filter: "blur(100px)", background: "radial-gradient(circle, rgba(177,140,255,0.07), transparent 70%)" }} />

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

          <footer className="relative z-[1] flex flex-col sm:flex-row justify-between items-center px-5 md:px-10 py-6 gap-2 text-center" style={{ borderTop: "1px solid #1f1f30", fontFamily: "var(--mono)", fontSize: 12, color: "#4a4944" }}>
            <span>Designed &amp; Built by Shahid J</span>
            <span>&copy; 2026</span>
          </footer>
        </>
      )}
    </>
  );
}
