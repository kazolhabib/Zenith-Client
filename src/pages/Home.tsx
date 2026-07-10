import React from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Listings from '@/components/home/Listings';
import Statistics from '@/components/home/Statistics';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import Pricing from '@/components/home/Pricing';
import FAQ from '@/components/home/FAQ';
import CallToAction from '@/components/home/CallToAction';

const Home = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#09090b] text-slate-200 selection:bg-brand/30 selection:text-white relative overflow-hidden">
      {/* Global Background Glow Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col w-full">
        <Hero />
        <Features />
        <Listings />
        <Statistics />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CallToAction />
      </div>
    </div>
  );
};

export default Home;
