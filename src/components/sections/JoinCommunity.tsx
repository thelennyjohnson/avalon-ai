import { ArrowUpRight, BookOpen, Github, MessageSquareText, MessagesSquare } from 'lucide-react';

const REPO_URL = 'https://github.com/thelennyjohnson/avalon-ai';
const ISSUES_URL = `${REPO_URL}/issues`;
const DISCUSSIONS_URL = `${REPO_URL}/discussions`;
const BRIEF_URL = `${REPO_URL}/blob/main/docs/TECHNICAL_BRIEF.pdf`;

const CONTRIBUTOR_LINKS = [
  { href: ISSUES_URL, icon: MessageSquareText, label: 'SOLVE AN ISSUE', description: 'Browse open tasks, propose concrete fixes, and contribute testable changes.' },
  { href: DISCUSSIONS_URL, icon: MessagesSquare, label: 'JOIN THE DISCUSSION', description: 'Discuss design questions, share ideas, and ask the community.' },
  { href: BRIEF_URL, icon: BookOpen, label: 'READ THE TECHNICAL BRIEF', description: 'Review the proposal and its first prototype scope.' },
];

export default function JoinCommunity() {
  return (
    <section id="community" className="snap-section relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 lg:pl-20 lg:pr-52 pt-16 pb-8">
      <div className="max-w-4xl w-full text-center reveal-stagger">
        <div><div className="inline-flex items-center justify-center w-14 h-14 bg-avalon-orange/10 border border-avalon-orange/30 mb-4 animate-pulse-glow"><Github className="w-7 h-7 text-avalon-orange" /></div></div>
        <div><p className="font-mono text-xs text-avalon-orange/70 tracking-[0.3em] mb-2">OPEN RESEARCH · EARLY STAGE</p></div>
        <div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight"><span className="text-avalon-white">BUILD</span>{' '}<span className="text-avalon-orange text-glow-orange">WITH US</span></h2>
        </div>
        <div>
          <p className="font-body text-base sm:text-lg text-avalon-whiteblue/60 mt-3 max-w-2xl mx-auto">Avalon is a proposal under active design, not production-ready software. Help challenge the security assumptions, define precise behavior, and make results reproducible.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8 text-left">
          {CONTRIBUTOR_LINKS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col bg-avalon-darkalt/60 hover:bg-avalon-orange/5 border border-avalon-blue/30 hover:border-avalon-orange/50 transition-all duration-300 p-5 clip-sharp">
              <link.icon className="w-5 h-5 text-avalon-orange mb-3" />
              <span className="font-display font-bold text-xs text-avalon-white tracking-wider">{link.label}</span>
              <span className="font-body text-sm text-avalon-whiteblue/45 leading-relaxed mt-2">{link.description}</span>
              <ArrowUpRight className="w-4 h-4 text-avalon-orange/60 group-hover:text-avalon-orange mt-3 self-end transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
