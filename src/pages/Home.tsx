import React from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Statistics from '@/components/home/Statistics';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import Pricing from '@/components/home/Pricing';
import FAQ from '@/components/home/FAQ';
import CallToAction from '@/components/home/CallToAction';

const Home = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAFAFA] text-gray-900 selection:bg-brand/20">
      <Hero />
      <Features />
      <Statistics />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CallToAction />
    </div>
  );
};

export default Home;
