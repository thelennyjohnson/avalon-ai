import { ArrowRight, FileText, Github } from 'lucide-react';
import AvalonOrb from '@/components/AvalonOrb';

const REPO_URL = 'https://github.com/thelennyjohnson/avalon-ai';
const BRIEF_URL = `${REPO_URL}/blob/main/docs/TECHNICAL_BRIEF.pdf`;

export default function Hero() {
  return (
    <section
      id="hero"
      className="snap-section relative h-screen w-full flex flex-col items-center justify-center overflow-hidden grid-overlay"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[120vw] h-[120vw] sm:w-[90vw] sm:h-[90vw] md:w-[600px] md:h-[600px] max-w-[600px] max-h-[600px] opacity-90">
          <AvalonOrb />
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl reveal-stagger">
        <div>
          <p className="font-mono text-xs sm:text-sm text-avalon-orange/80 tracking-[0.3em] mb-3">
            OPEN BLOCKCHAIN TRANSACTION SECURITY
          </p>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none">
          <span className="text-avalon-white text-glow-white">AVALON</span>{' '}
          <span className="text-avalon-orange text-glow-orange">AI</span>
        </h1>

        <p className="font-body text-lg sm:text-xl md:text-2xl text-avalon-whiteblue/80 mt-4 tracking-wide">
          Security before execution.
        </p>

        <p className="font-body text-sm sm:text-base text-avalon-whiteblue/60 mt-6 max-w-xl mx-auto leading-relaxed">
          Avalon AI is an open, community-governed transaction-security layer for compatible blockchain wallets and applications. It combines deterministic security policies, transaction simulation, evidence-based threat analysis, and optional AI-assisted risk detection.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <a href={BRIEF_URL} target="_blank" rel="noopener noreferrer" className="group relative w-full sm:w-auto">
            <span className="relative flex items-center justify-center gap-2 bg-avalon-orange hover:bg-avalon-orangebr transition-colors duration-300 text-avalon-dark font-display font-bold text-sm tracking-wider px-8 py-4 btn-glow-orange clip-sharp">
              <FileText className="w-4 h-4" />
              READ THE TECHNICAL BRIEF
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>

          <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="group w-full sm:w-auto">
            <span className="flex items-center justify-center gap-2 border border-avalon-orange/50 hover:border-avalon-orange hover:bg-avalon-orange/10 transition-all duration-300 text-avalon-orange font-display font-medium text-sm tracking-wider px-8 py-4 neon-border clip-sharp">
              <Github className="w-4 h-4" />
              EXPLORE THE REPOSITORY
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}
