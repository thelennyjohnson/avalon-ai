import { FileText, Cpu } from 'lucide-react';
import AvalonOrb from '@/components/AvalonOrb';
import { playUiClick, playUiHover } from '@/lib/uiSound';

export default function Hero() {
  return (
    <section
      id="hero"
      className="snap-section relative h-screen w-full flex flex-col items-center justify-center overflow-hidden grid-overlay"
    >
      {/* Orb background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[120vw] h-[120vw] sm:w-[90vw] sm:h-[90vw] md:w-[600px] md:h-[600px] max-w-[600px] max-h-[600px] opacity-90">
          <AvalonOrb />
        </div>
      </div>

      {/* Text overlay */}
      <div className="relative z-10 text-center px-4 max-w-3xl reveal-stagger">
        <div>
          <p className="font-mono text-xs sm:text-sm text-avalon-orange/80 tracking-[0.3em] mb-3">
            DECENTRALISED AI NETWORK
          </p>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none">
          <span className="text-avalon-white text-glow-white">AVALON</span>{' '}
          <span className="text-avalon-orange text-glow-orange">AI</span>
        </h1>

        <p className="font-body text-lg sm:text-xl md:text-2xl text-avalon-whiteblue/80 mt-4 tracking-wide">
          Built for all of us.
        </p>

        <p className="font-body text-sm sm:text-base text-avalon-whiteblue/50 mt-6 max-w-xl mx-auto leading-relaxed">
          We built Avalon because AI shouldn't be in the hands of centralized corporations
          and governments. Avalon exists to create solutions of maximum good for all sentient
          life. Starting with web3 to the rest of the world.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button onClick={playUiClick} onMouseEnter={playUiHover} className="group relative w-full sm:w-auto">
            <div className="relative bg-avalon-orange hover:bg-avalon-orangebr transition-colors duration-300 text-avalon-dark font-display font-bold text-sm tracking-wider px-8 py-4 btn-glow-orange clip-sharp">
              <span className="flex items-center justify-center gap-2">
                <Cpu className="w-4 h-4" />
                DOWNLOAD APP
              </span>
            </div>
          </button>

          <button onClick={playUiClick} onMouseEnter={playUiHover} className="group w-full sm:w-auto">
            <div className="border border-avalon-orange/50 hover:border-avalon-orange hover:bg-avalon-orange/10 transition-all duration-300 text-avalon-orange font-display font-medium text-sm tracking-wider px-8 py-4 neon-border clip-sharp">
              <span className="flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                READ WHITE PAPER
              </span>
            </div>
          </button>
        </div>

        <p className="font-body text-xs sm:text-sm text-avalon-whiteblue/40 mt-4">
          See if your device can power our network and earn $AVA tokens
        </p>
      </div>
    </section>
  );
}
