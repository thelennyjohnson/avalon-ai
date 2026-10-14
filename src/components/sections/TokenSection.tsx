import AvalonToken from '@/components/AvalonToken';
import TokenPieChart from '@/components/TokenPieChart';

const DISTRIBUTION = [
  { label: 'Community', pct: 65, color: '#ff7a18' },
  { label: 'Team', pct: 15, color: '#3b4fff' },
  { label: 'Airdrop', pct: 15, color: '#ffa726' },
  { label: 'Investors', pct: 5, color: '#b4d5ff' },
];

export default function TokenSection() {
  return (
    <section id="token" className="snap-section relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 lg:pl-20 lg:pr-52 pt-16 pb-8">
      <div className="max-w-7xl w-full grid lg:grid-cols-[0.8fr_1fr_1.1fr] gap-6 lg:gap-10 items-center reveal-stagger">
        <div>
          <div className="relative w-full aspect-square max-w-xs sm:max-w-sm mx-auto">
            <AvalonToken />
          </div>
        </div>

        <div className="text-center lg:text-left">
          <p className="font-mono text-xs text-avalon-orange/70 tracking-[0.3em] mb-2">GOVERNANCE</p>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight mb-2">
            <span className="text-avalon-white">AVALON</span>{' '}
            <span className="text-avalon-orange text-glow-orange">TOKEN</span>
          </h2>
          <p className="font-display font-bold text-lg sm:text-xl text-avalon-whiteblue/70 tracking-wide mb-3">One token to rule them all.</p>
          <p className="font-body text-sm sm:text-base text-avalon-whiteblue/50 leading-relaxed mb-5 max-w-md mx-auto lg:mx-0">
            The governance token. Rights. Fixed supply. Distributed to those who power the network.
          </p>
          <button className="group">
            <span className="font-display font-medium text-sm text-avalon-orange border-b border-avalon-orange/40 hover:border-avalon-orange pb-1 tracking-wider transition-all inline-flex items-center gap-2">
              STAKE $AVA <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </span>
          </button>
        </div>

        <div className="w-full">
          <TokenPieChart />
          <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto mt-1">
            {DISTRIBUTION.map((distribution) => (
              <div key={distribution.label} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5" style={{ backgroundColor: distribution.color, boxShadow: `0 0 8px ${distribution.color}80` }} />
                <span className="font-body text-sm text-avalon-white/80">{distribution.label}</span>
                <span className="font-mono text-sm text-avalon-orange ml-auto">{distribution.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
