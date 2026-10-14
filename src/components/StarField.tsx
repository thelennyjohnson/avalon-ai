import { useEffect, useRef } from 'react';

interface Star { x: number; y: number; z: number; size: number; tw: number; twSpeed: number; }
interface ShootingStar { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; length: number; }
interface Planet {
  x: number; y: number; radius: number; color: string; glowColor: string; z: number;
  hasRings: boolean; ringColor: string; ringTilt: number; blur: number; bands: string[];
  rotation: number; rotSpeed: number;
}

const PLANET_COLORS = [
  { color: '#b97842', glow: 'rgba(201,127,58,0.16)', bands: ['#75411f', '#d89b5a', '#8d542d'] },
  { color: '#3d69b4', glow: 'rgba(58,111,201,0.14)', bands: ['#203b75', '#6998e3', '#28477f'] },
  { color: '#8750b2', glow: 'rgba(156,79,209,0.12)', bands: ['#542c78', '#c07be8', '#6e3b92'] },
  { color: '#c88555', glow: 'rgba(232,160,96,0.14)', bands: ['#8e4d2b', '#f0bd82', '#9f6138'] },
  { color: '#398f86', glow: 'rgba(79,179,163,0.12)', bands: ['#205b58', '#69d1bd', '#2c756d'] },
  { color: '#bd8585', glow: 'rgba(212,160,160,0.1)', bands: ['#784d55', '#edc0bc', '#955c61'] },
];

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const planetsRef = useRef<Planet[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    let w = 0;
    let h = 0;
    let lastT = 0;
    let shootingTimer = 0;

    const createPlanets = () => {
      const planets: Planet[] = [];
      const count = 6;
      const anchors = [
        [0.12, 0.18], [0.86, 0.16], [0.08, 0.52],
        [0.92, 0.5], [0.2, 0.84], [0.82, 0.83],
      ];
      for (let i = 0; i < count; i++) {
        const palette = PLANET_COLORS[Math.floor(Math.random() * PLANET_COLORS.length)];
        const z = 0.18 + Math.random() * 0.82;
        const radius = (14 + Math.pow(Math.random(), 1.8) * 76) * (0.65 + z * 0.35);
        const [anchorX, anchorY] = anchors[i];
        const x = Math.max(radius * 1.2, Math.min(w - radius * 1.2, w * anchorX + (Math.random() - 0.5) * w * 0.12));
        const y = Math.max(radius * 1.2, Math.min(h - radius * 1.2, h * anchorY + (Math.random() - 0.5) * h * 0.12));
        planets.push({
          x, y, radius, z, color: palette.color, glowColor: palette.glow, bands: palette.bands,
          hasRings: i < 2, ringColor: palette.bands[0], ringTilt: Math.random() * 0.6 - 0.3,
          blur: (1 - z) * 3.5 + 0.25, rotation: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.00012,
        });
      }
      planetsRef.current = planets;
    };

    const resize = () => {
      const nextW = window.innerWidth;
      const nextH = window.innerHeight;
      const changed = nextW !== w || nextH !== h;
      w = canvas.width = nextW;
      h = canvas.height = nextH;
      if (changed) {
        const count = Math.min(220, Math.floor((w * h) / 7500));
        starsRef.current = Array.from({ length: count }, () => ({
          x: Math.random() * w, y: Math.random() * h, z: Math.random() * 0.8 + 0.2,
          size: Math.random() * 1.35 + 0.3, tw: Math.random() * Math.PI * 2,
          twSpeed: Math.random() * 0.0011 + 0.00035,
        }));
        createPlanets();
      }
    };

    const spawnShootingStar = () => {
      const fromLeft = Math.random() < 0.5;
      const angle = fromLeft ? 0.18 + Math.random() * 0.16 : 2.95 + Math.random() * 0.16;
      const speed = 0.18 + Math.random() * 0.18;
      shootingStarsRef.current.push({
        x: fromLeft ? -50 : w + 50, y: Math.random() * h * 0.55,
        vx: Math.cos(angle) * (fromLeft ? speed : -speed), vy: Math.sin(angle) * speed,
        life: 0, maxLife: 100 + Math.random() * 60, length: 55 + Math.random() * 80,
      });
    };

    const draw = (t: number) => {
      const dt = Math.min(50, t - lastT || 16);
      lastT = t;
      ctx.clearRect(0, 0, w, h);

      for (const p of planetsRef.current) {
        p.rotation += p.rotSpeed * dt;
        if (p.y + p.radius * 3 < 0 || p.y - p.radius * 3 > h) continue;
        const depthAlpha = 0.45 + p.z * 0.55;
        const glowR = p.radius * (2.2 + (1 - p.z) * 1.2);
        const glow = ctx.createRadialGradient(p.x, p.y, p.radius * 0.55, p.x, p.y, glowR);
        glow.addColorStop(0, p.glowColor);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2); ctx.fill();

        ctx.save();
        ctx.filter = `blur(${p.blur}px)`;
        const body = ctx.createRadialGradient(p.x - p.radius * 0.38, p.y - p.radius * 0.4, p.radius * 0.05, p.x, p.y, p.radius * 1.05);
        body.addColorStop(0, p.bands[1]); body.addColorStop(0.42, p.color); body.addColorStop(1, p.bands[2]);
        ctx.globalAlpha = depthAlpha;
        ctx.fillStyle = body;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();

        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.clip();
        for (let b = 0; b < 4; b++) {
          const bandY = p.y + (b - 1.5) * p.radius * 0.34 + Math.sin(p.rotation + b) * p.radius * 0.05;
          ctx.fillStyle = `${p.bands[b % p.bands.length]}55`;
          ctx.fillRect(p.x - p.radius, bandY - p.radius * 0.09, p.radius * 2, p.radius * 0.18);
        }
        ctx.restore();

        const shadow = ctx.createRadialGradient(p.x - p.radius * 0.35, p.y - p.radius * 0.35, p.radius * 0.15, p.x + p.radius * 0.35, p.y + p.radius * 0.28, p.radius * 1.2);
        shadow.addColorStop(0, 'rgba(0,0,0,0)'); shadow.addColorStop(0.58, 'rgba(2,5,22,0.08)'); shadow.addColorStop(1, 'rgba(2,5,22,0.72)');
        ctx.fillStyle = shadow; ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();

        if (p.hasRings) {
          ctx.save(); ctx.globalAlpha = depthAlpha * 0.7; ctx.filter = `blur(${p.blur * 0.5}px)`;
          ctx.translate(p.x, p.y); ctx.rotate(p.ringTilt); ctx.scale(1, 0.28);
          for (let r = 0; r < 3; r++) { ctx.beginPath(); ctx.arc(0, 0, p.radius * (1.35 + r * 0.24), 0, Math.PI * 2); ctx.strokeStyle = `${p.ringColor}${r === 1 ? '70' : '35'}`; ctx.lineWidth = Math.max(1, p.radius * 0.055); ctx.stroke(); }
          ctx.restore();
        }
      }

      for (const s of starsRef.current) {
        s.tw += s.twSpeed * dt;
        const tw = (Math.sin(s.tw) + 1) * 0.5;
        const alpha = 0.16 + tw * 0.3 * s.z;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size * s.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 213, 255, ${alpha})`; ctx.fill();
        if (s.size > 1.1 && tw > 0.92) { ctx.beginPath(); ctx.arc(s.x, s.y, s.size * s.z * 2, 0, Math.PI * 2); ctx.fillStyle = `rgba(180, 213, 255, ${alpha * 0.08})`; ctx.fill(); }
      }

      shootingTimer += dt;
      if (shootingTimer > 6500 + Math.random() * 7000) { shootingTimer = 0; spawnShootingStar(); }
      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const star = shootingStarsRef.current[i]; star.x += star.vx * dt; star.y += star.vy * dt; star.life += dt * 0.045;
        if (star.life >= star.maxLife || star.x < -120 || star.x > w + 120 || star.y > h + 120) { shootingStarsRef.current.splice(i, 1); continue; }
        const ratio = star.life / star.maxLife; const fade = ratio < 0.2 ? ratio / 0.2 : ratio > 0.8 ? (1 - ratio) / 0.2 : 1;
        const tailX = star.x - star.vx * star.length; const tailY = star.y - star.vy * star.length;
        const gradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y); gradient.addColorStop(0, 'rgba(180,213,255,0)'); gradient.addColorStop(0.75, `rgba(180,213,255,${fade * 0.25})`); gradient.addColorStop(1, `rgba(255,255,255,${fade * 0.8})`);
        ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(star.x, star.y); ctx.strokeStyle = gradient; ctx.lineWidth = 1.5; ctx.lineCap = 'round'; ctx.stroke();
      }
      animRef.current = requestAnimationFrame(draw);
    };

    resize(); window.addEventListener('resize', resize); animRef.current = requestAnimationFrame(draw);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animRef.current); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />;
}
