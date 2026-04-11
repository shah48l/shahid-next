"use client";
import { useState, useEffect } from "react";
import { jazz, sfx } from "@/lib/audio";

type JazzToggleProps = {
  compact?: boolean;
};

const MusicIcon = ({ spinning }: { spinning: boolean }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ animation: spinning ? "spin 2.4s linear infinite" : "none" }}>
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2a10 10 0 1 0 10 10" />
    <path d="M12 2v4M16 3l-4 3" />
  </svg>
);

const BarsIcon = ({ active }: { active: boolean }) => (
  <span className="flex items-end gap-[2.5px]" style={{ height: 14 }}>
    {[5, 10, 7, 12, 4].map((h, i) => (
      <span key={i} className="w-[2px] rounded-sm bg-current"
        style={{
          height: active ? h : 3,
          transition: `height 0.2s ease ${i * 0.04}s`,
        }} />
    ))}
  </span>
);

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

  const btnStyle = (on: boolean) => ({
    width: 36,
    height: 36,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: `1px solid ${on ? "rgba(0,255,170,0.5)" : "#1f1f30"}`,
    background: on ? "rgba(0,255,170,0.07)" : "rgba(18,18,28,0.92)",
    color: on ? "#00ffaa" : "#4a4944",
    boxShadow: on ? "0 0 12px rgba(0,255,170,0.12)" : "none",
    transition: "border-color 0.2s, background 0.2s, color 0.2s, box-shadow 0.2s",
    flexShrink: 0,
  } as const);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={toggleJazz}
          onMouseEnter={() => sfx?.playHover()}
          style={btnStyle(playing)}
          aria-label={playing ? "Turn music off" : "Turn music on"}
          title='Music: "Lobby Time" by Kevin MacLeod (incompetech.com), CC BY 3.0'
        >
          <MusicIcon spinning={playing} />
        </button>

        <button
          onClick={toggleSfx}
          onMouseEnter={() => sfx?.playHover()}
          style={btnStyle(sfxOn)}
          aria-label={sfxOn ? "Turn SFX off" : "Turn SFX on"}
          title="Sound effects"
        >
          <BarsIcon active={sfxOn} />
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
            className={`flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl px-3 py-3 text-[11px] cursor-pointer transition-all ${playing ? "text-[#00ffaa]" : "text-[#7a7872]"}`}
            style={{ fontFamily: "var(--mono)", background: "rgba(18,18,28,0.92)", border: `1px solid ${playing ? "#00ffaa" : "#1f1f30"}` }}
          >
            <MusicIcon spinning={playing} />
            {playing ? "Music On" : "Music Off"}
          </button>

          <button
            onClick={toggleSfx}
            onMouseEnter={() => sfx?.playHover()}
            className={`flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl px-3 py-3 text-[11px] cursor-pointer transition-all ${sfxOn ? "text-[#00ffaa]" : "text-[#7a7872]"}`}
            style={{ fontFamily: "var(--mono)", background: "rgba(18,18,28,0.92)", border: `1px solid ${sfxOn ? "#00ffaa" : "#1f1f30"}` }}
          >
            <BarsIcon active={sfxOn} />
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
