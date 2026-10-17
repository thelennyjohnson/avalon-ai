import { FileText, KeyRound, ScanSearch, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    icon: FileText,
    title: 'Propose',
    desc: 'A user or autonomous agent proposes a transaction. Its intent and exact payload should be available for inspection.',
  },
  {
    icon: KeyRound,
    title: 'Authorize',
    desc: "The protected wallet uses its normal owner-authorization process. Avalon cannot create authorization or originate a transfer.",
  },
  {
    icon: ScanSearch,
    title: 'Evaluate',
    desc: 'Owner-defined rules, simulation, evidence-based analysis, optional AI, and selected independent checks assess the proposal.',
  },
  {
    icon: ShieldCheck,
    title: 'Enforce',
    desc: 'The wallet applies its configured outcome and records the decision with a defined recovery path.',
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
          <div><p className="font-mono text-xs text-avalon-orange/70 tracking-[0.3em] mb-2">PROPOSED FLOW</p></div>
          <div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight">
              <span className="text-avalon-white">HOW IT</span>{' '}
              <span className="text-avalon-orange text-glow-orange">WORKS</span>
            </h2>
          </div>
          <div>
            <p className="font-body text-base sm:text-lg text-avalon-whiteblue/60 mt-3 max-w-xl mx-auto">
              A testable security pipeline. The wallet—not an analysis service—enforces policy.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 reveal-stagger">
          {STEPS.map((step, index) => (
            <div key={step.title}>
              <div className="relative group bg-avalon-darkalt/60 backdrop-blur-sm border border-avalon-blue/30 hover:border-avalon-orange/50 transition-all duration-500 p-5 h-full clip-sharp">
                <div className="absolute top-0 right-0 bg-avalon-blue/40 px-3 py-1 font-mono text-xs text-avalon-whiteblue/60">0{index + 1}</div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-avalon-orange/10 border border-avalon-orange/30 mb-4 group-hover:bg-avalon-orange/20 transition-colors">
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-avalon-orange" />
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-avalon-white tracking-wide mb-2">{step.title.toUpperCase()}</h3>
                <p className="font-body text-sm text-avalon-whiteblue/55 leading-relaxed">{step.desc}</p>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-avalon-orange/30 group-hover:border-avalon-orange/60 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <p className="font-body text-xs sm:text-sm text-avalon-whiteblue/40 text-center mt-5 max-w-3xl mx-auto">
          Proposed architecture, not an implemented or production-ready protection system.
        </p>
      </div>
    </section>
  );
}
