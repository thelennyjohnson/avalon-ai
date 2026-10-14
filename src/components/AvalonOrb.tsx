import { useEffect, useRef } from 'react';

interface OrbNode {
  angle: number;
  dist: number;
  radius: number;
  speed: number;
  pulse: number;
  pulseSpeed: number;
  color: string;
}

interface Signal {
  fromAngle: number;
  fromDist: number;
  progress: number;
  speed: number;
  thickness: number;
}

export default function AvalonOrb() {
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

    const nodes: OrbNode[] = [];
    const ringConfigs = [
      { count: 3, dist: 0.28, speed: 0.0008, size: 7, color: '#ffa726' },
      { count: 5, dist: 0.42, speed: -0.0005, size: 5, color: '#ff7a18' },
      { count: 4, dist: 0.58, speed: 0.00035, size: 8, color: '#3b4fff' },
      { count: 6, dist: 0.72, speed: -0.00025, size: 4, color: '#b4d5ff' },
    ];

    ringConfigs.forEach((ring) => {
      for (let i = 0; i < ring.count; i++) {
        nodes.push({
          angle: (i / ring.count) * Math.PI * 2 + Math.random() * 0.3,
          dist: ring.dist,
          radius: ring.size,
          speed: ring.speed,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.001 + Math.random() * 0.002,
          color: ring.color,
        });
      }
    });

    const signals: Signal[] = [];
    let lastT = 0;

    const draw = (t: number) => {
      const dt = Math.min(50, t - lastT);
      lastT = t;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const minDim = Math.min(w, h);
      const scale = minDim / 2;

      // Orbital rings
      const ringRadii = [0.28, 0.42, 0.58, 0.72];
      ringRadii.forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r * scale, 0, Math.PI * 2);
        ctx.strokeStyle = i < 2 ? 'rgba(255, 122, 24, 0.08)' : 'rgba(59, 79, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Update nodes
      nodes.forEach((n) => {
        n.angle += n.speed * dt;
        n.pulse += n.pulseSpeed * dt;
      });

      // Randomly emit signals
      if (Math.random() < 0.04) {
        const n = nodes[Math.floor(Math.random() * nodes.length)];
        signals.push({
          fromAngle: n.angle,
          fromDist: n.dist,
          progress: 0,
          speed: 0.003 + Math.random() * 0.004,
          thickness: 1 + Math.random() * 2,
        });
      }

      // Draw signals
      for (let i = signals.length - 1; i >= 0; i--) {
        const sig = signals[i];
        sig.progress += sig.speed * dt;
        if (sig.progress >= 1) {
          signals.splice(i, 1);
          continue;
        }
        const sx = cx + Math.cos(sig.fromAngle) * sig.fromDist * scale;
        const sy = cy + Math.sin(sig.fromAngle) * sig.fromDist * scale;
        const px = sx + (cx - sx) * sig.progress;
        const py = sy + (cy - sy) * sig.progress;

        const grad = ctx.createLinearGradient(sx, sy, px, py);
        grad.addColorStop(0, 'rgba(255, 167, 38, 0)');
        grad.addColorStop(0.5, 'rgba(255, 167, 38, 0.6)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.9)');

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = grad;
        ctx.lineWidth = sig.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Draw nodes
      nodes.forEach((n) => {
        const nx = cx + Math.cos(n.angle) * n.dist * scale;
        const ny = cy + Math.sin(n.angle) * n.dist * scale;
        const pulse = (Math.sin(n.pulse) + 1) * 0.5;
        const r = n.radius + pulse * 2;

        // Glow
        const gGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, r * 4);
        gGrad.addColorStop(0, n.color);
        gGrad.addColorStop(0.3, n.color.replace(')', ', 0.3)').replace('rgb', 'rgba').replace('#', ''));
        gGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gGrad;
        ctx.beginPath();
        ctx.arc(nx, ny, r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(nx, ny, r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
      });

      // Central orb — blue sun
      const orbR = scale * 0.14;
      const pulseAmt = 1 + Math.sin(t * 0.001) * 0.04;

      // Outer glow layers
      for (let i = 4; i >= 1; i--) {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbR * i * 1.5);
        grad.addColorStop(0, `rgba(59, 79, 255, ${0.15 / i})`);
        grad.addColorStop(0.4, `rgba(30, 42, 94, ${0.08 / i})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, orbR * i * 1.5 * pulseAmt, 0, Math.PI * 2);
        ctx.fill();
      }

      // Core blue glow
      const coreGrad = ctx.createRadialGradient(cx - orbR * 0.3, cy - orbR * 0.3, 0, cx, cy, orbR * pulseAmt);
      coreGrad.addColorStop(0, '#e8f4ff');
      coreGrad.addColorStop(0.2, '#b4d5ff');
      coreGrad.addColorStop(0.5, '#3b4fff');
      coreGrad.addColorStop(0.8, '#1e2a5e');
      coreGrad.addColorStop(1, '#0c1338');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, orbR * pulseAmt, 0, Math.PI * 2);
      ctx.fill();

      // Inner bright spot
      const spotGrad = ctx.createRadialGradient(cx - orbR * 0.25, cy - orbR * 0.25, 0, cx - orbR * 0.25, cy - orbR * 0.25, orbR * 0.5);
      spotGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      spotGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.arc(cx - orbR * 0.25, cy - orbR * 0.25, orbR * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Rotating energy ring around orb
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.0003);
      ctx.beginPath();
      ctx.arc(0, 0, orbR * 1.8, 0, Math.PI * 1.5);
      ctx.strokeStyle = 'rgba(255, 122, 24, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-t * 0.0002);
      ctx.beginPath();
      ctx.arc(0, 0, orbR * 2.2, Math.PI * 0.3, Math.PI * 1.8);
      ctx.strokeStyle = 'rgba(59, 79, 255, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

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
