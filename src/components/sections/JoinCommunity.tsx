import { Send, Twitter, Zap } from 'lucide-react';

export default function JoinCommunity() {
  return (
    <section
      id="community"
      className="snap-section relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 lg:pl-20 lg:pr-52 pt-16 pb-8"
    >
      <div className="max-w-3xl w-full text-center reveal-stagger">
        <div>
          <div className="inline-flex items-center justify-center w-14 h-14 bg-avalon-orange/10 border border-avalon-orange/30 mb-4 animate-pulse-glow">
            <Zap className="w-7 h-7 text-avalon-orange" fill="currentColor" />
          </div>
        </div>

        <div>
          <p className="font-mono text-xs text-avalon-orange/70 tracking-[0.3em] mb-2">CONNECT</p>
        </div>

        <div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight">
            <span className="text-avalon-white">JOIN THE</span>{' '}
            <span className="text-avalon-orange text-glow-orange">COMMUNITY</span>
          </h2>
        </div>

        <div>
          <p className="font-body text-base sm:text-lg text-avalon-whiteblue/60 mt-3 max-w-md mx-auto">
            Be part of the movement. Decentralised AI, built for all of us.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <a href="#" className="group w-full sm:w-auto">
            <div className="flex items-center justify-center gap-3 bg-avalon-darkalt/60 hover:bg-avalon-orange/10 border border-avalon-orange/30 hover:border-avalon-orange transition-all duration-300 px-8 py-4 clip-sharp neon-border w-full sm:w-auto">
              <Send className="w-5 h-5 text-avalon-orange" />
              <span className="font-display font-bold text-sm text-avalon-white tracking-wider">
                TELEGRAM
              </span>
            </div>
          </a>

          <a href="#" className="group w-full sm:w-auto">
            <div className="flex items-center justify-center gap-3 bg-avalon-darkalt/60 hover:bg-avalon-blue/10 border border-avalon-blue/40 hover:border-avalon-glow transition-all duration-300 px-8 py-4 clip-sharp neon-border-blue w-full sm:w-auto">
              <Twitter className="w-5 h-5 text-avalon-whiteblue" />
              <span className="font-display font-bold text-sm text-avalon-white tracking-wider">
                X / TWITTER
              </span>
            </div>
          </a>
        </div>

        <div className="border-t border-avalon-blue/20 pt-6 mt-8">
          <p className="font-display font-bold text-sm text-avalon-white tracking-widest mb-2">
            AVALON<span className="text-avalon-orange"> AI</span>
          </p>
          <p className="font-body text-sm text-avalon-whiteblue/40 max-w-lg mx-auto leading-relaxed">
            Built for all sentient life. Starting with web3 to the rest of the world.
          </p>
          <p className="font-mono text-xs text-avalon-whiteblue/20 mt-4 tracking-wide">
            © 2026 AVALON AI — DECENTRALISED BY DESIGN
          </p>
        </div>
      </div>
    </section>
  );
}
