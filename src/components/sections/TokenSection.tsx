import { Ban, CheckCircle2, Clock3, ShieldCheck } from 'lucide-react';

const OUTCOMES = [
  {
    icon: CheckCircle2,
    label: 'ALLOW',
    color: '#4ade80',
    description: 'Owner authorization and deterministic requirements pass, with no configured hold condition.',
  },
  {
    icon: Clock3,
    label: 'HOLD',
    color: '#ffa726',
    description: 'A configured condition triggers a bounded delay or owner-approved review path.',
  },
  {
    icon: Ban,
    label: 'BLOCK',
    color: '#fb7185',
    description: 'An explicit hard policy is violated, or reproducible evidence meets a published block rule.',
  },
];

export default function TokenSection() {
  return (
    <section id="token" className="snap-section relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 lg:pl-20 lg:pr-52 pt-16 pb-8">
      <div className="max-w-7xl w-full grid lg:grid-cols-[0.75fr_1.25fr] gap-8 lg:gap-12 items-center reveal-stagger">
        <div className="text-center lg:text-left">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto lg:mx-0 mb-6 flex items-center justify-center rounded-full border border-avalon-orange/30 bg-avalon-orange/5">
            <div className="absolute inset-3 rounded-full border border-avalon-blue/50" />
            <ShieldCheck className="w-16 h-16 sm:w-20 sm:h-20 text-avalon-orange" />
            <span className="absolute -bottom-2 bg-avalon-dark px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-avalon-orange/80">WALLET POLICY</span>
          </div>
          <p className="font-mono text-xs text-avalon-orange/70 tracking-[0.3em] mb-2">PROPOSED OUTCOMES</p>
          <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight mb-3">
            <span className="text-avalon-white">OWNER</span>{' '}
            <span className="text-avalon-orange text-glow-orange">CONTROL</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-avalon-whiteblue/55 leading-relaxed max-w-md mx-auto lg:mx-0">
            A policy decision is enforced by the protected wallet. Avalon analysis cannot authorize a transfer or turn a denied action into an allowed one.
          </p>
        </div>

        <div className="w-full space-y-3">
          {OUTCOMES.map((outcome, index) => (
            <article key={outcome.label} className="group relative flex items-start gap-4 bg-avalon-darkalt/60 backdrop-blur-sm border border-avalon-blue/30 hover:border-avalon-orange/40 transition-all duration-300 p-4 sm:p-5 clip-sharp">
              <div className="w-10 h-10 flex shrink-0 items-center justify-center border" style={{ color: outcome.color, borderColor: `${outcome.color}55`, backgroundColor: `${outcome.color}12` }}>
                <outcome.icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-display font-bold text-sm tracking-widest" style={{ color: outcome.color }}>{outcome.label}</span>
                  <span className="font-mono text-[10px] text-avalon-whiteblue/30">0{index + 1}</span>
                </div>
                <p className="font-body text-sm text-avalon-whiteblue/55 leading-relaxed">{outcome.description}</p>
              </div>
            </article>
          ))}
          <p className="font-body text-xs text-avalon-whiteblue/40 leading-relaxed pt-2">
            These are proposed semantics. Precise behavior, limits, expiry, and recovery must be defined before any real-fund use.
          </p>
        </div>
      </div>
    </section>
  );
}
