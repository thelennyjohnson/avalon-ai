import { ArrowRight, FlaskConical, Network, ShieldCheck, Wallet } from 'lucide-react';

const MILESTONE = [
  { icon: Network, title: 'One EVM test network', text: 'Choose a single test network and define the first supported transaction classes.' },
  { icon: Wallet, title: 'One protected wallet', text: 'Compare wallet or vault designs where policy can be enforced with clear owner recovery.' },
  { icon: FlaskConical, title: 'A replayable benchmark', text: 'Build reproducible benign and malicious fixtures, then report false positives, misses, latency, and cost.' },
  { icon: ShieldCheck, title: 'One independent verifier', text: 'Make selected checks reproducible outside a single analysis service.' },
];

const ROADMAP_URL = 'https://github.com/thelennyjohnson/avalon-ai/blob/main/docs/ROADMAP.md';
const ISSUES_URL = 'https://github.com/thelennyjohnson/avalon-ai/issues';

export default function JoinNetwork() {
  return (
    <section id="network" className="snap-section relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 lg:pl-20 lg:pr-52 pt-16 pb-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-6 reveal-stagger">
          <div><p className="font-mono text-xs text-avalon-orange/70 tracking-[0.3em] mb-2">FIRST MILESTONE</p></div>
          <div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight"><span className="text-avalon-white">WE START</span>{' '}<span className="text-avalon-orange text-glow-orange">HERE</span></h2>
          </div>
          <div><p className="font-body text-base sm:text-lg text-avalon-whiteblue/60 mt-2 max-w-xl mx-auto">A focused testnet prototype—not a live decentralized network.</p></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 reveal-stagger">
          {MILESTONE.map((item) => (
            <article key={item.title} className="flex items-start gap-3 bg-avalon-darkalt/50 backdrop-blur-sm border border-avalon-blue/30 p-4 clip-sharp">
              <item.icon className="w-5 h-5 shrink-0 text-avalon-orange mt-0.5" />
              <div><h3 className="font-display font-bold text-xs sm:text-sm text-avalon-white tracking-wide mb-1">{item.title}</h3><p className="font-body text-xs sm:text-sm text-avalon-whiteblue/50 leading-relaxed">{item.text}</p></div>
            </article>
          ))}
        </div>

        <div className="reveal-stagger">
          <div className="relative bg-gradient-to-br from-avalon-darkalt/80 to-avalon-mid/80 backdrop-blur-sm border border-avalon-orange/30 p-5 sm:p-6 clip-sharp text-center">
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-avalon-orange" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-avalon-orange" />
            <h3 className="font-display font-bold text-base sm:text-lg text-avalon-white tracking-wide mb-2">HELP MAKE THE PROPOSAL TESTABLE</h3>
            <p className="font-body text-sm text-avalon-whiteblue/55 mb-4 max-w-2xl mx-auto">Review the threat model, propose wallet-enforcement designs, contribute replayable test cases, or help define policy and attestation formats.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-avalon-orange hover:bg-avalon-orangebr transition-colors text-avalon-dark font-display font-bold text-xs tracking-wider px-6 py-3 btn-glow-orange clip-sharp">BROWSE CONTRIBUTOR ISSUES <ArrowRight className="w-4 h-4" /></a>
              <a href={ROADMAP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-avalon-orange/50 hover:bg-avalon-orange/10 text-avalon-orange font-display font-medium text-xs tracking-wider px-6 py-3 neon-border clip-sharp">VIEW THE ROADMAP</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
