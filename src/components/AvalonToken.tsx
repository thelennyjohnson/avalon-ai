import { useEffect, useRef } from 'react';

export default function AvalonToken() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let lastT = 0;
    let rotation = 0;
    let pulse = 0;

    const draw = (t: number) => {
      const dt = Math.min(50, t - lastT);
      lastT = t;
      rotation += dt * 0.0005;
      pulse += dt * 0.002;

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const minDim = Math.min(w, h);
      const r = minDim * 0.28;

      // Energy pulses radiating outward
      for (let i = 0; i < 3; i++) {
        const p = ((pulse + i * 2.1) % 6) / 6;
        const ringR = r * (1 + p * 1.5);
        const alpha = (1 - p) * 0.4;
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(180, 213, 255, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Outer glow
      for (let i = 5; i >= 1; i--) {
        const grad = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * (1 + i * 0.3));
        grad.addColorStop(0, `rgba(180, 213, 255, ${0.12 / i})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r * (1 + i * 0.3), 0, Math.PI * 2);
        ctx.fill();
      }

      // Token body — neutron star white-blue
      const bodyGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 0, cx, cy, r);
      bodyGrad.addColorStop(0, '#ffffff');
      bodyGrad.addColorStop(0.3, '#e8f4ff');
      bodyGrad.addColorStop(0.6, '#b4d5ff');
      bodyGrad.addColorStop(0.85, '#3b4fff');
      bodyGrad.addColorStop(1, '#1e2a5e');
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Rim highlight
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Rotating energy ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.arc(0, 0, r * 1.15, 0, Math.PI * 1.3);
      ctx.strokeStyle = 'rgba(255, 167, 38, 0.5)';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, r * 1.3, Math.PI, Math.PI * 2.3);
      ctx.strokeStyle = 'rgba(59, 79, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Sword in center — drawn as a stylized vertical blade
      ctx.save();
      ctx.translate(cx, cy);

      const swordH = r * 1.1;
      const swordW = r * 0.12;
      const glowAlpha = 0.6 + Math.sin(t * 0.003) * 0.3;

      // Sword glow
      ctx.shadowColor = 'rgba(255, 167, 38, 0.8)';
      ctx.shadowBlur = 25;

      // Blade
      const bladeGrad = ctx.createLinearGradient(-swordW, 0, swordW, 0);
      bladeGrad.addColorStop(0, '#b4d5ff');
      bladeGrad.addColorStop(0.5, '#ffffff');
      bladeGrad.addColorStop(1, '#b4d5ff');
      ctx.fillStyle = bladeGrad;

      ctx.beginPath();
      ctx.moveTo(0, -swordH * 0.5);
      ctx.lineTo(swordW, -swordH * 0.38);
      ctx.lineTo(swordW * 0.7, swordH * 0.28);
      ctx.lineTo(0, swordH * 0.5);
      ctx.lineTo(-swordW * 0.7, swordH * 0.28);
      ctx.lineTo(-swordW, -swordH * 0.38);
      ctx.closePath();
      ctx.fill();

      // Crossguard
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#ffa726';
      ctx.beginPath();
      ctx.roundRect(-swordW * 2.5, -swordH * 0.05, swordW * 5, swordH * 0.08, 2);
      ctx.fill();

      // Hilt
      ctx.fillStyle = '#e85d04';
      ctx.beginPath();
      ctx.roundRect(-swordW * 0.5, swordH * 0.05, swordW, swordH * 0.12, 2);
      ctx.fill();

      // Pommel
      ctx.beginPath();
      ctx.arc(0, swordH * 0.2, swordW * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = '#ffa726';
      ctx.fill();

      // Central glow line on blade
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.moveTo(0, -swordH * 0.48);
      ctx.lineTo(0, swordH * 0.48);
      ctx.strokeStyle = `rgba(255, 255, 255, ${glowAlpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();

      // Sparkle particles
      for (let i = 0; i < 8; i++) {
        const a = (rotation * 2 + i * Math.PI / 4) % (Math.PI * 2);
        const dist = r * (0.7 + Math.sin(t * 0.001 + i) * 0.15);
        const sx = cx + Math.cos(a) * dist;
        const sy = cy + Math.sin(a) * dist;
        const sz = 1 + Math.sin(t * 0.002 + i) * 1.5;
        ctx.beginPath();
        ctx.arc(sx, sy, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + Math.sin(t * 0.003 + i) * 0.3})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-hidden="true"
    />
  );
}
