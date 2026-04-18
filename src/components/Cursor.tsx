"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onEnter = () => {
      dot.style.width = "8px";
      dot.style.height = "8px";
      ring.style.width = "44px";
      ring.style.height = "44px";
      ring.style.borderColor = "rgba(0,255,170,0.6)";
    };
    const onLeave = () => {
      dot.style.width = "6px";
      dot.style.height = "6px";
      ring.style.width = "28px";
      ring.style.height = "28px";
      ring.style.borderColor = "rgba(0,255,170,0.35)";
    };

    const INTERACTIVE = "a,button,input,[role='button'],[tabindex]";
    const attachHover = () => {
      document.querySelectorAll<HTMLElement>(INTERACTIVE).forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attachHover();
    const obs = new MutationObserver(attachHover);
    obs.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[99998] rounded-full"
        style={{ width: 6, height: 6, background: "#00ffaa", boxShadow: "0 0 8px rgba(0,255,170,0.9)", transition: "width 0.15s,height 0.15s", willChange: "transform" }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99997] rounded-full"
        style={{ width: 28, height: 28, border: "1.5px solid rgba(0,255,170,0.35)", boxShadow: "0 0 12px rgba(0,255,170,0.12)", transition: "width 0.2s,height 0.2s,border-color 0.2s", willChange: "transform" }}
      />
    </>
  );
}
