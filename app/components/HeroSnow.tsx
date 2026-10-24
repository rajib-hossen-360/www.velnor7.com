'use client';

import React, { useEffect, useRef } from 'react';

export default function HeroSnow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let cw = 0;
    let ch = 0;
    const flakes: Array<{
      x: number;
      y: number;
      layer: number;
      phase: number;
      r: number;
      speed: number;
      alpha: number;
    }> = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = rect.width;
      ch = rect.height;
      canvas.width = Math.max(1, Math.round(cw * dpr));
      canvas.height = Math.max(1, Math.round(ch * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (flakes.length === 0) {
        const total = Math.round(Math.min(90, (cw * ch) / 8000));
        for (let i = 0; i < total; i++) {
          const layer = i % 3;
          flakes.push({
            x: Math.random() * cw,
            y: Math.random() * ch,
            layer,
            phase: Math.random() * Math.PI * 2,
            r: 0.8 + layer * 0.7 + Math.random() * 0.5,
            speed: 14 + layer * 16 + Math.random() * 8,
            alpha: 0.25 + layer * 0.22,
          });
        }
      }
    };

    let last = performance.now();
    const render = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = '#f0f4f8';

      for (const f of flakes) {
        f.y += f.speed * dt;
        f.x += Math.sin(now * 0.001 + f.phase) * 8 * dt;
        if (f.y > ch + 4) {
          f.y = -4;
          f.x = Math.random() * cw;
        }
        if (f.x > cw + 4) f.x = -4;
        else if (f.x < -4) f.x = cw + 4;

        ctx.globalAlpha = f.alpha;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    resize();
    animId = requestAnimationFrame(render);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__snow" aria-hidden="true" />;
}
