"use client";
import { useEffect } from "react";

export default function TiltInit() {
  useEffect(() => {
    const SELECTORS = ".pj-wrap, .sk-wrap";

    const attach = () => {
      document.querySelectorAll<HTMLElement>(SELECTORS).forEach(el => {
        if (el.dataset.tilt) return;
        el.dataset.tilt = "1";
        el.style.transition = "transform 0.12s ease, box-shadow 0.12s ease";
        el.style.willChange = "transform";
        el.style.perspective = "800px";

        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          const rx = -y * 10;
          const ry = x * 10;
          el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.025,1.025,1.025)`;
          el.style.boxShadow = `${-ry * 2}px ${rx * 2}px 40px rgba(0,255,170,0.08)`;
        };
        const onLeave = () => {
          el.style.transform = "";
          el.style.boxShadow = "";
        };

        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    attach();
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  return null;
}
