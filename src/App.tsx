import StarField from '@/components/StarField';
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import HowItWorks from '@/components/sections/HowItWorks';
import TokenSection from '@/components/sections/TokenSection';
import Products from '@/components/sections/Products';
import JoinNetwork from '@/components/sections/JoinNetwork';
import JoinCommunity from '@/components/sections/JoinCommunity';

function App() {
  return (
    <div className="relative bg-avalon-dark text-avalon-white">
      <StarField />
      <Navigation />

      <main className="relative z-10">
        <Hero />
        <HowItWorks />
        <TokenSection />
        <Products />
        <JoinNetwork />
        <JoinCommunity />
      </main>
    </div>
  );
}

export default App;
