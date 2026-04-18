"use client";
import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number; pulse: number };

export default function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, mx = -9999, my = -9999, raf = 0;

    const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const N = Math.min(70, Math.floor(innerWidth / 18));
    const pts: P[] = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: 1.2 + Math.random() * 1.4,
      hue: [160, 210, 265, 185][Math.floor(Math.random() * 4)],
      pulse: Math.random() * Math.PI * 2,
    }));

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    let t = 0;
    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, W, H);

      // Draw connections first
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 160) {
            const a = (1 - d / 160) * 0.09;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,255,170,${a})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw & update particles
      pts.forEach(p => {
        p.pulse += 0.025;
        const pulseFactor = 0.85 + Math.sin(p.pulse) * 0.15;

        // Mouse repulsion
        const dx = p.x - mx, dy = p.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110 && d > 0) {
          const f = (110 - d) / 110 * 0.7;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }

        // Speed cap + friction
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 2.2) { p.vx = (p.vx / spd) * 2.2; p.vy = (p.vy / spd) * 2.2; }
        p.vx *= 0.982; p.vy *= 0.982;
        p.x += p.vx; p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;

        // Glow dot
        const r = p.r * pulseFactor;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
        grd.addColorStop(0, `hsla(${p.hue},100%,65%,0.55)`);
        grd.addColorStop(1, `hsla(${p.hue},100%,65%,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,72%,0.7)`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.55 }} />;
}
