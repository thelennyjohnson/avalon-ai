import { ArrowUpRight, FileText, Github, MessageSquareText } from 'lucide-react';

const REPO_URL = 'https://github.com/thelennyjohnson/avalon-ai';
const BRIEF_URL = `${REPO_URL}/blob/main/docs/TECHNICAL_BRIEF.pdf`;
const ISSUES_URL = `${REPO_URL}/issues`;

export default function Footer() {
  return (
    <footer id="footer" className="snap-section relative z-10 overflow-hidden border-t border-avalon-orange/20 bg-[#030617] px-6 py-12 sm:py-16">
      <div className="absolute inset-0 grid-overlay opacity-25 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <img src="/avalon-logo.svg" alt="" aria-hidden="true" className="h-9 w-8 object-contain" />
              <p className="font-display font-bold text-base tracking-[0.16em] text-avalon-white m-0">
                AVALON<span className="text-avalon-orange"> AI</span>
              </p>
            </div>
            <p className="font-body text-sm sm:text-base text-avalon-whiteblue/60 leading-relaxed m-0">
              Designed to make transaction-security decisions transparent, bounded, testable, and independently verifiable. It does not guarantee safety or replace the wallet owner’s authorization.
            </p>
          </div>

          <nav aria-label="Footer links" className="flex flex-col items-start gap-3 md:pt-1">
            <a href={BRIEF_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-display text-xs tracking-wider text-avalon-white/70 hover:text-avalon-orange transition-colors">
              <FileText className="h-4 w-4" /> TECHNICAL BRIEF <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-display text-xs tracking-wider text-avalon-white/70 hover:text-avalon-orange transition-colors">
              <Github className="h-4 w-4" /> CONTRIBUTOR ISSUES <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a href={`${REPO_URL}/discussions`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-display text-xs tracking-wider text-avalon-white/70 hover:text-avalon-orange transition-colors">
              <MessageSquareText className="h-4 w-4" /> DISCUSSIONS <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </nav>
        </div>

        <div className="mt-9 border-t border-avalon-blue/20 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[10px] text-avalon-whiteblue/30 tracking-wider m-0">© {new Date().getFullYear()} AVALON AI · APACHE-2.0</p>
        </div>
      </div>
    </footer>
  );
}
