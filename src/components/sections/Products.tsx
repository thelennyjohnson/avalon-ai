import { ArrowUpRight, BrainCircuit, CheckCheck, FileCheck2, Gauge, KeyRound, ScanSearch, Shield } from 'lucide-react';

const COMPONENTS = [
  { icon: KeyRound, name: 'Owner-defined policy', tag: 'ENFORCEMENT', desc: 'Explore spend limits, approved destinations, and contract or function permissions enforced at the wallet.' },
  { icon: ScanSearch, name: 'Transaction simulation', tag: 'EVIDENCE', desc: 'Estimate transaction effects against a recorded chain-state reference, with assumptions and limits made explicit.' },
  { icon: FileCheck2, name: 'Decision evidence', tag: 'AUDITABILITY', desc: 'Bind reasons and attestations to the exact chain, wallet, transaction, policy version, and state reference.' },
  { icon: CheckCheck, name: 'Independent verification', tag: 'REPRODUCIBILITY', desc: 'Let independently operated verifiers check defined facts and policy compliance.' },
  { icon: BrainCircuit, name: 'Optional AI analysis', tag: 'EXPERIMENTAL', desc: 'Measure whether AI-assisted interpretation adds value over deterministic rules and simulation.' },
];

export default function Products() {
  return (
    <section id="products" className="snap-section relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 lg:pl-20 lg:pr-52 pt-16 pb-8">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-6 reveal-stagger">
          <div><p className="font-mono text-xs text-avalon-orange/70 tracking-[0.3em] mb-2">PROPOSED ARCHITECTURE</p></div>
          <div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight">
              <span className="text-avalon-white">SECURITY</span>{' '}
              <span className="text-avalon-orange text-glow-orange">LAYERS</span>
            </h2>
          </div>
          <div><p className="font-body text-base sm:text-lg text-avalon-whiteblue/60 mt-2">A small, inspectable system—each layer with a defined role.</p></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 reveal-stagger">
          {COMPONENTS.map((component) => (
            <article key={component.name} className="group relative bg-avalon-darkalt/50 backdrop-blur-sm border border-avalon-blue/30 hover:border-avalon-orange/50 transition-all duration-500 p-4 clip-sharp h-full">
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 flex items-center justify-center bg-avalon-orange/10 border border-avalon-orange/30 group-hover:bg-avalon-orange/20 transition-colors"><component.icon className="w-4 h-4 text-avalon-orange" /></div>
                <span className="font-mono text-[10px] text-avalon-whiteblue/40 tracking-widest uppercase border border-avalon-blue/30 px-2 py-0.5">{component.tag}</span>
              </div>
              <h3 className="font-display font-bold text-sm text-avalon-white tracking-wide mb-1">{component.name.toUpperCase()}</h3>
              <p className="font-body text-xs sm:text-sm text-avalon-whiteblue/50 leading-relaxed">{component.desc}</p>
              <div className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 border-avalon-orange/20 group-hover:border-avalon-orange/50 transition-colors" />
            </article>
          ))}
          <article className="relative bg-gradient-to-br from-avalon-orange/10 to-avalon-blue/10 backdrop-blur-sm border border-avalon-orange/30 p-4 clip-sharp flex flex-col items-center justify-center text-center h-full">
            <Gauge className="w-7 h-7 text-avalon-orange mb-2" />
            <h3 className="font-display font-bold text-sm text-avalon-white tracking-wide">MEASURE BEFORE EXPANDING</h3>
            <p className="font-body text-sm text-avalon-whiteblue/45 mt-1">Compare detection, misses, false positives, latency, and cost. Keep AI only if it adds measured value.</p>
            <a href="https://github.com/thelennyjohnson/avalon-ai/blob/main/docs/TECHNICAL_BRIEF.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 mt-3 text-avalon-orange/80 hover:text-avalon-orange transition-colors font-mono text-xs">READ THE BRIEF <ArrowUpRight className="w-3.5 h-3.5" /></a>
          </article>
        </div>
        <p className="font-body text-xs text-avalon-whiteblue/35 text-center mt-4">These are proposed capabilities, not claims that the features are implemented.</p>
      </div>
    </section>
  );
}
