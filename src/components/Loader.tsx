"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/hooks/useGsap";
import SplitText from "@/components/reactbits/SplitText";
import { sfx, jazz } from "@/lib/audio";

const ASCII = `
 ███████╗██╗  ██╗ █████╗ ██╗  ██╗██╗██████╗
 ██╔════╝██║  ██║██╔══██╗██║  ██║██║██╔══██╗
 ███████╗███████║███████║███████║██║██║  ██║
 ╚════██║██╔══██║██╔══██║██╔══██║██║██║  ██║
 ███████║██║  ██║██║  ██║██║  ██║██║██████╔╝
 ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═════╝`;

// ASCII bot that cycles through dance frames
const BOT_FRAMES = [
  `  \\o/\n   |\n  / \\`,
  `  _o_\n  \\|\n  / \\`,
  `  \\o/\n  /|\n  / \\`,
  `  \\o_\n   |/\n  / \\`,
  `  _o/\n  \\|\\\n  / \\`,
  `  \\o/\n   |\n  \\  /`,
];

function DancingBot() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFrame(f => (f + 1) % BOT_FRAMES.length), 180);
    return () => clearInterval(id);
  }, []);
  return (
    <pre
      aria-hidden
      style={{
        fontFamily: "var(--mono)",
        fontSize: 18,
        color: "#00ffaa",
        lineHeight: 1.5,
        textAlign: "center",
        textShadow: "0 0 14px rgba(0,255,170,0.45)",
        userSelect: "none",
        whiteSpace: "pre",
        minHeight: 54,
      }}
    >
      {BOT_FRAMES[frame]}
    </pre>
  );
}

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const [showSplit, setShowSplit] = useState(false);
  const [started, setStarted] = useState(false);

  const boot = useCallback(() => {
    if (started) return;
    setStarted(true);
    sfx?.playBoot();
    jazz?.start();
  }, [started]);

  // Any keypress boots
  useEffect(() => {
    const onKey = () => boot();
    window.addEventListener("keydown", onKey, { once: true });
    return () => window.removeEventListener("keydown", onKey);
  }, [boot]);

  // Loading animation after boot
  useEffect(() => {
    if (!started) return;
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({
      delay: 0.3,
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
  }, [started, onComplete]);

  if (gone) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center cursor-pointer select-none"
      style={{ background: "#060609" }}
      onClick={boot}
    >
      <pre
        className="l-ascii opacity-0"
        style={{
          fontFamily: "var(--mono)",
          fontSize: "clamp(7px,2vw,12px)",
          color: "#00ffaa",
          whiteSpace: "pre",
          lineHeight: 1.2,
          textAlign: "center",
          textShadow: "0 0 20px rgba(0,255,170,0.25)",
        }}
      >
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

      {!started ? (
        <div className="flex flex-col items-center gap-5 mt-10">
          <DancingBot />
          <div
            className="loader-blink"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "clamp(11px,3.5vw,16px)",
              color: "#00ffaa",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textShadow: "0 0 18px rgba(0,255,170,0.35)",
              textAlign: "center",
              padding: "0 16px",
            }}
          >
            [ tap or press any key to boot ]
          </div>
        </div>
      ) : (
        <div className="l-bar opacity-0 mt-6" style={{ width: 220, height: 2, background: "#1f1f30", borderRadius: 1, overflow: "hidden" }}>
          <div className="l-fill" style={{ height: "100%", width: 0, background: "#00ffaa", borderRadius: 1, boxShadow: "0 0 12px rgba(0,255,170,0.25)" }} />
        </div>
      )}
    </div>
  );
}
