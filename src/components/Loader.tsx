"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/hooks/useGsap";
import SplitText from "@/components/reactbits/SplitText";

const ASCII = `
 ███████╗██╗  ██╗ █████╗ ██╗  ██╗██╗██████╗ 
 ██╔════╝██║  ██║██╔══██╗██║  ██║██║██╔══██╗
 ███████╗███████║███████║███████║██║██║  ██║
 ╚════██║██╔══██║██╔══██║██╔══██║██║██║  ██║
 ███████║██║  ██║██║  ██║██║  ██║██║██████╔╝
 ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═════╝`;

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const [showSplit, setShowSplit] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        gsap.to(el, {
          opacity: 0, duration: 0.6, ease: "power2.inOut",
          onComplete: () => { setGone(true); onComplete(); },
        });
      },
    });

    tl.to(el.querySelector(".l-ascii"), { opacity: 1, duration: 0.8 }, 0)
      .call(() => setShowSplit(true), [], 0.6)
      .to(el.querySelector(".l-bar"), { opacity: 1, duration: 0.3 }, 1.5)
      .to(el.querySelector(".l-fill"), { width: "100%", duration: 2, ease: "power2.inOut" }, 1.6)
      .to({}, { duration: 0.4 });
  }, [onComplete]);

  if (gone) return null;

  return (
    <div ref={ref} className="fixed inset-0 z-[99999] flex flex-col items-center justify-center" style={{ background: "#060609" }}>
      <pre className="l-ascii opacity-0" style={{ fontFamily: "var(--mono)", fontSize: "clamp(5px,1vw,12px)", color: "#00ffaa", whiteSpace: "pre", lineHeight: 1.2, textAlign: "center", textShadow: "0 0 20px rgba(0,255,170,0.25)" }}>
        {ASCII}
      </pre>

      <div className="mt-6 h-8">
        {showSplit && (
          <SplitText
            text="Welcome to Shahid's personal space"
            className="text-[#00ffaa] text-base tracking-wider"
            delay={50}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            onLetterAnimationComplete={() => {}}
          />
        )}
      </div>

      <div className="l-bar opacity-0 mt-4" style={{ width: 200, height: 2, background: "#1f1f30", borderRadius: 1, overflow: "hidden" }}>
        <div className="l-fill" style={{ height: "100%", width: 0, background: "#00ffaa", borderRadius: 1, boxShadow: "0 0 12px rgba(0,255,170,0.25)" }} />
      </div>
    </div>
  );
}
