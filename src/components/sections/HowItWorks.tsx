import { Shield, Coins, Network, Lock } from 'lucide-react';

const STEPS = [
  {
    icon: Network,
    title: 'Contribute Compute',
    desc: 'Your device joins the Avalon network as a node, providing decentralized compute power.',
  },
  {
    icon: Shield,
    title: 'Secure Infrastructure',
    desc: 'Nodes contribute to our security infrastructure — verifying, validating, and protecting the network.',
  },
  {
    icon: Coins,
    title: 'Earn $AVA',
    desc: 'Contributing nodes get paid in AVA tokens for the compute and security they provide.',
  },
  {
    icon: Lock,
    title: 'Decentralized Trust',
    desc: 'No central authority. Trust is distributed across thousands of independent nodes worldwide.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="snap-section relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 lg:pl-20 lg:pr-52 pt-16 pb-8"
    >
      <div className="max-w-5xl w-full">
        <div className="text-center mb-8 reveal-stagger">
          <div>
            <p className="font-mono text-xs text-avalon-orange/70 tracking-[0.3em] mb-2">PROTOCOL</p>
          </div>
          <div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight">
              <span className="text-avalon-white">HOW IT</span>{' '}
              <span className="text-avalon-orange text-glow-orange">WORKS</span>
            </h2>
          </div>
          <div>
            <p className="font-body text-base sm:text-lg text-avalon-whiteblue/60 mt-3 max-w-xl mx-auto">
              Nodes contribute to our security infrastructure and get paid.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 reveal-stagger">
          {STEPS.map((step, i) => (
            <div key={i}>
              <div className="relative group bg-avalon-darkalt/60 backdrop-blur-sm border border-avalon-blue/30 hover:border-avalon-orange/50 transition-all duration-500 p-5 h-full clip-sharp">
                <div className="absolute top-0 right-0 bg-avalon-blue/40 px-3 py-1 font-mono text-xs text-avalon-whiteblue/60">
                  0{i + 1}
                </div>

                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-avalon-orange/10 border border-avalon-orange/30 mb-4 group-hover:bg-avalon-orange/20 transition-colors">
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-avalon-orange" />
                </div>

                <h3 className="font-display font-bold text-sm sm:text-base text-avalon-white tracking-wide mb-2">
                  {step.title.toUpperCase()}
                </h3>
                <p className="font-body text-sm text-avalon-whiteblue/50 leading-relaxed">
                  {step.desc}
                </p>

                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-avalon-orange/30 group-hover:border-avalon-orange/60 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 reveal-stagger">
          <div>
            <button className="group">
              <span className="font-display font-medium text-sm text-avalon-orange border-b border-avalon-orange/40 hover:border-avalon-orange pb-1 tracking-wider transition-all inline-flex items-center gap-2">
                BECOME VALIDATOR
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
