"use client";
import { useState, useEffect } from "react";
import { jazz, sfx } from "@/lib/audio";

type JazzToggleProps = {
  compact?: boolean;
};

export default function JazzToggle({ compact = false }: JazzToggleProps) {
  const [playing, setPlaying] = useState(() => Boolean(jazz?.playing));
  const [sfxOn, setSfxOn] = useState(() => Boolean(sfx?.enabled));

  const toggleJazz = () => {
    if (!jazz) return;
    sfx?.playClick();
    const on = jazz.toggle();
    setPlaying(on);
  };

  const toggleSfx = () => {
    if (!sfx) return;
    sfx.playClick();
    const on = sfx.toggle();
    setSfxOn(on);
  };

  useEffect(() => {
    if (!sfxOn) return;
    const scrollHandler = () => sfx?.playScrollTick();
    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [sfxOn]);

  const buttonBase = {
    fontFamily: "var(--mono, monospace)",
    background: "rgba(18,18,28,0.92)",
    border: "1px solid #1f1f30",
    backdropFilter: "blur(16px)",
  } as const;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={toggleJazz}
          onMouseEnter={() => sfx?.playHover()}
          className={`flex min-h-[40px] items-center justify-center gap-2 rounded-full px-3 py-2 text-[10px] sm:text-[11px] cursor-pointer transition-all ${playing ? "text-[#00ffaa] shadow-[0_0_20px_rgba(0,255,170,0.12)]" : "text-[#8d8a84]"}`}
          style={{ ...buttonBase, borderColor: playing ? "#00ffaa" : "#1f1f30" }}
          aria-label={playing ? "Turn music off" : "Turn music on"}
          title='Music: "Lobby Time" by Kevin MacLeod (incompetech.com), CC BY 3.0'
        >
          <span className={`w-4 h-4 rounded-full border-2 border-current flex items-center justify-center ${playing ? "animate-spin" : ""}`} style={{ animationDuration: "2.4s" }}>
            <span className="w-1 h-1 rounded-full bg-current" />
          </span>
          <span className="hidden sm:inline">{playing ? "Music On" : "Music Off"}</span>
          <span className="sm:hidden">Music</span>
        </button>

        <button
          onClick={toggleSfx}
          onMouseEnter={() => sfx?.playHover()}
          className={`flex min-h-[40px] items-center justify-center gap-2 rounded-full px-3 py-2 text-[10px] sm:text-[11px] cursor-pointer transition-all ${sfxOn ? "text-[#00ffaa]" : "text-[#8d8a84]"}`}
          style={{ ...buttonBase, borderColor: sfxOn ? "#00ffaa" : "#1f1f30" }}
          aria-label={sfxOn ? "Turn sound effects off" : "Turn sound effects on"}
        >
          <span className="flex items-end gap-[2px] h-3">
            {[4, 8, 5, 10].map((h, i) => (
              <span key={i} className="w-[2px] rounded-sm bg-current transition-all" style={{ height: sfxOn ? h : 3 }} />
            ))}
          </span>
          <span>{sfxOn ? "SFX On" : "SFX Off"}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 z-[500]">
      <div
        className="w-full sm:w-[340px] rounded-[24px] p-3 sm:p-3.5"
        style={{ background: "rgba(8,8,12,0.78)", border: "1px solid rgba(31,31,48,0.95)", backdropFilter: "blur(18px)", boxShadow: "0 16px 48px rgba(0,0,0,0.28)" }}
      >
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={toggleJazz}
            onMouseEnter={() => sfx?.playHover()}
            className={`flex min-h-[48px] items-center justify-center gap-2 rounded-2xl px-3 py-3 text-[11px] cursor-pointer transition-all ${playing ? "text-[#00ffaa] shadow-[0_0_20px_rgba(0,255,170,0.12)]" : "text-[#7a7872]"}`}
            style={{ ...buttonBase, borderColor: playing ? "#00ffaa" : "#1f1f30" }}
          >
            <span className={`w-5 h-5 rounded-full border-2 border-current flex items-center justify-center ${playing ? "animate-spin" : ""}`} style={{ animationDuration: "2.4s" }}>
              <span className="w-1 h-1 rounded-full bg-current" />
            </span>
            {playing ? "Music On" : "Music Off"}
          </button>

          <button
            onClick={toggleSfx}
            onMouseEnter={() => sfx?.playHover()}
            className={`flex min-h-[48px] items-center justify-center gap-2 rounded-2xl px-3 py-3 text-[11px] cursor-pointer transition-all ${sfxOn ? "text-[#00ffaa]" : "text-[#7a7872]"}`}
            style={{ ...buttonBase, borderColor: sfxOn ? "#00ffaa" : "#1f1f30" }}
          >
            <span className="flex items-end gap-[2px] h-3">
              {[4, 8, 5, 10].map((h, i) => (
                <span key={i} className="w-[2px] rounded-sm bg-current transition-all" style={{ height: sfxOn ? h : 3 }} />
              ))}
            </span>
            {sfxOn ? "SFX On" : "SFX Off"}
          </button>
        </div>

        <p className="mt-2 px-1 text-[10px] leading-relaxed text-[#7a7872]" style={{ fontFamily: "var(--mono, monospace)" }}>
          Music: &quot;Lobby Time&quot; by Kevin MacLeod (incompetech.com), licensed under CC BY 3.0.
        </p>
      </div>
    </div>
  );
}
