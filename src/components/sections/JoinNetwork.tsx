import { Cpu, Zap, Globe, Activity } from 'lucide-react';

const STATS = [
  { icon: Globe, label: 'Global Nodes', value: '12,847', suffix: '' },
  { icon: Activity, label: 'Network Power', value: '3.2', suffix: ' PFLOPS' },
  { icon: Cpu, label: 'Active Validators', value: '1,203', suffix: '' },
  { icon: Zap, label: 'AVA Distributed', value: '4.8M', suffix: '' },
];

export default function JoinNetwork() {
  return (
    <section
      id="network"
      className="snap-section relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 lg:pl-20 lg:pr-52 pt-16 pb-8"
    >
      <div className="max-w-4xl w-full">
        <div className="text-center mb-6 reveal-stagger">
          <div>
            <p className="font-mono text-xs text-avalon-orange/70 tracking-[0.3em] mb-2">PARTICIPATE</p>
          </div>
          <div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight">
              <span className="text-avalon-white">JOIN THE</span>{' '}
              <span className="text-avalon-orange text-glow-orange">NETWORK</span>
            </h2>
          </div>
          <div>
            <p className="font-body text-base sm:text-lg text-avalon-whiteblue/60 mt-2 max-w-xl mx-auto">
              Become a validator. Power the network. Earn $AVA.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 reveal-stagger">
          {STATS.map((s, i) => (
            <div key={i}>
              <div className="bg-avalon-darkalt/50 backdrop-blur-sm border border-avalon-blue/30 p-4 text-center clip-sharp">
                <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-avalon-orange mx-auto mb-2" />
                <div className="font-display font-bold text-lg sm:text-2xl text-avalon-white tracking-tight">
                  {s.value}
                  <span className="text-avalon-orange text-sm sm:text-base">{s.suffix}</span>
                </div>
                <div className="font-body text-xs sm:text-sm text-avalon-whiteblue/40 tracking-wide mt-0.5">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal-stagger">
          <div className="relative bg-gradient-to-br from-avalon-darkalt/80 to-avalon-mid/80 backdrop-blur-sm border border-avalon-orange/30 p-6 sm:p-7 clip-sharp text-center">
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-avalon-orange" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-avalon-orange" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-avalon-orange" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-avalon-orange" />

            <h3 className="font-display font-bold text-lg sm:text-xl text-avalon-white tracking-wide mb-2">
              READY TO POWER THE NETWORK?
            </h3>
            <p className="font-body text-sm text-avalon-whiteblue/50 mb-4 max-w-md mx-auto">
              Download the Avalon app and see if your device can contribute compute power
              and start earning $AVA tokens today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto">
                <div className="bg-avalon-orange hover:bg-avalon-orangebr transition-colors duration-300 text-avalon-dark font-display font-bold text-sm tracking-wider px-8 py-3.5 btn-glow-orange clip-sharp">
                  DOWNLOAD APP
                </div>
              </button>
              <button className="w-full sm:w-auto">
                <div className="border border-avalon-orange/50 hover:border-avalon-orange hover:bg-avalon-orange/10 transition-all duration-300 text-avalon-orange font-display font-medium text-sm tracking-wider px-8 py-3.5 neon-border clip-sharp">
                  LEARN MORE
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
