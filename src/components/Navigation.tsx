import { useEffect, useState } from 'react';
import { Sword, Menu, X, Globe, Cpu, ShieldCheck, Boxes, FlaskConical, Users } from 'lucide-react';
import { playUiClick, playUiHover } from '@/lib/uiSound';

export const SECTIONS = [
  { id: 'hero', label: 'Avalon AI', sub: 'Technical Proposal', icon: Globe },
  { id: 'how', label: 'How It Works', sub: 'Proposed Flow', icon: Cpu },
  { id: 'token', label: 'Outcomes', sub: 'Allow / Hold / Block', icon: ShieldCheck },
  { id: 'products', label: 'Architecture', sub: 'Security Layers', icon: Boxes },
  { id: 'network', label: 'First Milestone', sub: 'Testnet Prototype', icon: FlaskConical },
  { id: 'community', label: 'Contribute', sub: 'Issues & Discussions', icon: Users },
];

export default function Navigation() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  const scrollTo = (index: number) => {
    playUiClick();
    const el = document.getElementById(SECTIONS[index].id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTIONS.findIndex((section) => section.id === entry.target.id);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold: 0.35 }
    );
    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-avalon-dark/70 backdrop-blur-md border-b border-avalon-orange/15">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <button onClick={() => scrollTo(0)} onMouseEnter={playUiHover} className="flex items-center gap-2 group" aria-label="Avalon AI home">
            <Sword className="w-5 h-5 text-avalon-orange group-hover:scale-110 transition-transform rotate-[-135deg]" />
            <span className="font-display font-bold text-sm sm:text-base tracking-widest text-avalon-white">AVALON<span className="text-avalon-orange"> AI</span></span>
          </button>
          <button className="lg:hidden text-avalon-white p-1" onClick={() => { playUiClick(); setOpen(!open); }} onMouseEnter={playUiHover} aria-label="Toggle menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden bg-avalon-dark/95 backdrop-blur-lg flex flex-col items-center justify-center gap-4 animate-fade-in">
          {SECTIONS.map((section, index) => (
            <button key={section.id} onClick={() => scrollTo(index)} onMouseEnter={playUiHover} className={`font-display text-xl tracking-widest transition-all ${index === active ? 'text-avalon-orange text-glow-orange' : 'text-avalon-whiteblue'}`}>
              {section.label.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      <div className="hidden lg:flex fixed right-0 top-0 bottom-0 z-40 flex-col justify-center pr-3">
        <div className="relative flex flex-col gap-1.5">
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-avalon-orange/40 via-avalon-blue/30 to-avalon-orange/40" />
          <div className="mb-2 ml-12"><p className="font-mono text-[10px] text-avalon-orange/50 tracking-[0.25em] uppercase">Select Section</p></div>
          {SECTIONS.map((section, index) => {
            const isActive = index === active;
            const isHovered = hovered === index;
            return (
              <button key={section.id} onClick={() => scrollTo(index)} onMouseEnter={() => { setHovered(index); playUiHover(); }} onMouseLeave={() => setHovered(null)} className={`group relative flex items-center gap-3 transition-transform duration-300 ease-out ${isHovered ? '-translate-x-2 scale-[1.04]' : ''}`}>
                <div className={`relative z-10 w-8 h-8 flex items-center justify-center border transition-all duration-300 clip-sharp ${isActive ? 'bg-avalon-orange border-avalon-orange text-avalon-dark' : isHovered ? 'bg-avalon-darkalt border-avalon-orange/60 text-avalon-orange' : 'bg-avalon-darkalt/80 border-avalon-blue/40 text-avalon-whiteblue/80'}`} style={{ boxShadow: isActive ? '0 0 20px rgba(255, 122, 24, 0.6)' : isHovered ? '0 0 12px rgba(255, 122, 24, 0.3)' : 'none' }}>
                  <section.icon className="w-3.5 h-3.5" />
                </div>
                <div className="overflow-hidden max-w-[200px] opacity-100 transition-all duration-300">
                  <div className="whitespace-nowrap pr-3">
                    <div className={`font-display tracking-wider transition-colors duration-300 ${isActive ? 'font-bold text-xs text-avalon-orange text-glow-orange' : isHovered ? 'font-semibold text-[11px] text-avalon-white' : 'font-medium text-[10px] text-avalon-white/65'}`}>{section.label.toUpperCase()}</div>
                    <div className={`font-mono tracking-widest transition-colors duration-300 ${isActive ? 'text-[10px] text-avalon-whiteblue/50' : isHovered ? 'text-[9px] text-avalon-whiteblue/60' : 'text-[9px] text-avalon-whiteblue/40'}`}>{section.sub.toUpperCase()}</div>
                  </div>
                </div>
                {isActive && <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-1 h-6 bg-avalon-orange rounded-full" style={{ boxShadow: '0 0 10px rgba(255, 122, 24, 0.8)' }} />}
              </button>
            );
          })}
          <div className="mt-2 ml-12"><p className="font-mono text-[10px] text-avalon-whiteblue/20 tracking-widest">{String(active + 1).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')}</p></div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 z-40 font-mono text-xs text-avalon-whiteblue/30 tracking-widest lg:hidden">{String(active + 1).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')}</div>
    </>
  );
}
