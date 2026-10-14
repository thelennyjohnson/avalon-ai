import { ArrowUpRight, GitFork, ShieldCheck, Lock, HeartHandshake, Umbrella, Gem } from 'lucide-react';

const PRODUCTS = [
  {
    icon: GitFork,
    name: 'Avalon Bridge',
    tag: 'Multichain',
    desc: 'Decentralised AI multichain bridge. Connect assets across chains with AI-powered routing.',
  },
  {
    icon: ShieldCheck,
    name: 'Avalon Guard',
    tag: 'Security',
    desc: 'Decentralised AI fraud check for DeFi, RegFi, and beyond. Real-time threat detection.',
  },
  {
    icon: Lock,
    name: 'Avalon Vault',
    tag: 'Locking',
    desc: 'Token lock and vesting. Secure your commitments with on-chain transparency.',
  },
  {
    icon: Gem,
    name: 'Avalon Inheritance',
    tag: 'Legacy',
    desc: 'Pass on to the next generation. Secure digital asset inheritance, decentralized.',
  },
  {
    icon: Umbrella,
    name: 'Avalon Insurance',
    tag: 'Protection',
    desc: 'Give your users peace of mind. Decentralised coverage powered by AI risk assessment.',
  },
];

export default function Products() {
  return (
    <section
      id="products"
      className="snap-section relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 lg:pl-20 lg:pr-52 pt-16 pb-8"
    >
      <div className="max-w-5xl w-full">
        <div className="text-center mb-6 reveal-stagger">
          <div>
            <p className="font-mono text-xs text-avalon-orange/70 tracking-[0.3em] mb-2">ECOSYSTEM</p>
          </div>
          <div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight">
              <span className="text-avalon-white">DECENTRALISED</span>{' '}
              <span className="text-avalon-orange text-glow-orange">COMPUTE</span>
            </h2>
          </div>
          <div>
            <p className="font-body text-base sm:text-lg text-avalon-whiteblue/60 mt-2">
              Compute you can trust. View our products:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 reveal-stagger">
          {PRODUCTS.map((p, i) => (
            <div key={i}>
              <div className="group relative bg-avalon-darkalt/50 backdrop-blur-sm border border-avalon-blue/30 hover:border-avalon-orange/50 transition-all duration-500 p-4 clip-sharp cursor-pointer h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-avalon-orange/10 border border-avalon-orange/30 group-hover:bg-avalon-orange/20 transition-colors">
                    <p.icon className="w-4 h-4 text-avalon-orange" />
                  </div>
                  <span className="font-mono text-[10px] text-avalon-whiteblue/40 tracking-widest uppercase border border-avalon-blue/30 px-2 py-0.5">
                    {p.tag}
                  </span>
                </div>

                <h3 className="font-display font-bold text-sm text-avalon-white tracking-wide mb-1 group-hover:text-avalon-orangebr transition-colors">
                  {p.name.toUpperCase()}
                </h3>
                <p className="font-body text-xs sm:text-sm text-avalon-whiteblue/45 leading-relaxed">
                  {p.desc}
                </p>

                <div className="flex items-center gap-1 mt-3 text-avalon-orange/60 group-hover:text-avalon-orange transition-colors">
                  <span className="font-mono text-xs tracking-wider">EXPLORE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                <div className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 border-avalon-orange/20 group-hover:border-avalon-orange/50 transition-colors" />
              </div>
            </div>
          ))}

          <div>
            <div className="group relative bg-gradient-to-br from-avalon-orange/10 to-avalon-blue/10 backdrop-blur-sm border border-avalon-orange/30 p-4 clip-sharp flex flex-col items-center justify-center text-center h-full">
              <HeartHandshake className="w-7 h-7 text-avalon-orange mb-2" />
              <h3 className="font-display font-bold text-sm text-avalon-white tracking-wide">
                MORE COMING SOON
              </h3>
              <p className="font-body text-sm text-avalon-whiteblue/40 mt-1">
                The ecosystem grows with every node.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
