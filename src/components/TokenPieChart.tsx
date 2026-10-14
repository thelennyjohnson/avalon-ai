import { useEffect, useRef, useState } from 'react';

interface Slice { label: string; pct: number; color: string; }
const SLICES: Slice[] = [
  { label: 'Community', pct: 65, color: '#ff7a18' },
  { label: 'Team', pct: 15, color: '#3b4fff' },
  { label: 'Airdrop', pct: 15, color: '#ffa726' },
  { label: 'Investors', pct: 5, color: '#b4d5ff' },
];

export default function TokenPieChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const hoveredRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const [, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let lastT = 0;
    let animProgress = 0;

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

    const draw = (t: number) => {
      const dt = Math.min(50, t - lastT || 16);
      lastT = t;
      animProgress = Math.min(1, animProgress + dt * 0.0015);
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.35;
      const innerRadius = radius * 0.55;
      const total = SLICES.reduce((sum, slice) => sum + slice.pct, 0);
      let hoverIdx: number | null = null;
      const mouse = mouseRef.current;

      if (mouse) {
        const mx = mouse.x - cx;
        const my = mouse.y - cy;
        const distance = Math.hypot(mx, my);
        if (distance >= innerRadius * 0.9 && distance <= radius * 1.15) {
          let mouseAngle = Math.atan2(my, mx) + Math.PI / 2;
          if (mouseAngle < 0) mouseAngle += Math.PI * 2;
          let accumulated = 0;
          for (let i = 0; i < SLICES.length; i++) {
            const sweep = (SLICES[i].pct / total) * Math.PI * 2;
            if (mouseAngle >= accumulated && mouseAngle < accumulated + sweep) { hoverIdx = i; break; }
            accumulated += sweep;
          }
        }
      }

      if (hoverIdx !== hoveredRef.current) {
        hoveredRef.current = hoverIdx;
        setHovered(hoverIdx);
      }

      let startAngle = -Math.PI / 2;
      for (let i = 0; i < SLICES.length; i++) {
        const slice = SLICES[i];
        const sweep = (slice.pct / total) * Math.PI * 2 * animProgress;
        const isHovered = hoverIdx === i;
        const offset = isHovered ? 6 : 0;
        const midAngle = startAngle + sweep / 2;
        const ox = Math.cos(midAngle) * offset;
        const oy = Math.sin(midAngle) * offset;

        ctx.save();
        if (isHovered) { ctx.shadowColor = slice.color; ctx.shadowBlur = 22; }
        ctx.beginPath();
        ctx.arc(cx + ox, cy + oy, radius, startAngle, startAngle + sweep);
        ctx.arc(cx + ox, cy + oy, innerRadius, startAngle + sweep, startAngle, true);
        ctx.closePath();
        const gradient = ctx.createRadialGradient(cx + ox, cy + oy, innerRadius, cx + ox, cy + oy, radius);
        gradient.addColorStop(0, slice.color); gradient.addColorStop(1, `${slice.color}cc`);
        ctx.fillStyle = gradient; ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(4, 8, 31, 0.8)'; ctx.lineWidth = 2; ctx.stroke();
        ctx.restore();
        startAngle += sweep;
      }

      ctx.beginPath();
      ctx.arc(cx, cy, innerRadius * 0.85, 0, Math.PI * 2);
      const centerGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, innerRadius * 0.85);
      centerGradient.addColorStop(0, '#0c1338'); centerGradient.addColorStop(1, '#04081f');
      ctx.fillStyle = centerGradient; ctx.fill();
      ctx.strokeStyle = 'rgba(255, 122, 24, 0.3)'; ctx.lineWidth = 1.5; ctx.stroke();

      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const hovered = hoveredRef.current;
      if (hovered !== null && animProgress >= 1) {
        const slice = SLICES[hovered];
        ctx.font = 'bold 28px Orbitron, sans-serif'; ctx.fillStyle = slice.color; ctx.fillText(`${slice.pct}%`, cx, cy - 8);
        ctx.font = '14px Rajdhani, sans-serif'; ctx.fillStyle = '#b4d5ff'; ctx.fillText(slice.label.toUpperCase(), cx, cy + 16);
      } else {
        ctx.font = 'bold 22px Orbitron, sans-serif'; ctx.fillStyle = '#e8f4ff'; ctx.fillText('$AVA', cx, cy - 6);
        ctx.font = '12px Share Tech Mono, monospace'; ctx.fillStyle = 'rgba(180, 213, 255, 0.5)'; ctx.fillText('FIXED SUPPLY', cx, cy + 16);
      }
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animRef.current); ro.disconnect(); };
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto">
      <canvas ref={canvasRef} className="w-full h-full cursor-pointer" onMouseMove={handleMouseMove} onMouseLeave={() => { mouseRef.current = null; }} aria-label="Token distribution pie chart" />
    </div>
  );
}
