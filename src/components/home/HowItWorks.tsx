import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Shield, Sparkles } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Explore Collections',
    description: 'Browse our curated collection of verified premium properties, tropical villas, and alpine chalets to find your perfect oasis.',
    icon: Compass,
    color: 'from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30'
  },
  {
    id: '02',
    title: 'Reserve Seamlessly',
    description: 'Secure your dates with our instant, fully protected payment system. Concierge coordination starts immediately.',
    icon: Shield,
    color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30'
  },
  {
    id: '03',
    title: 'Arrive & Indulge',
    description: 'Arrive to a fully prepared villa. Enjoy 24/7 personal butler service, custom excursions, and absolute luxury.',
    icon: Sparkles,
    color: 'from-brand/20 to-orange-500/20 text-brand border-brand/30'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-32 bg-transparent relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[101.25rem]">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6"
          >
            Your luxury getaway in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-orange-400 to-yellow-400 drop-shadow-[0_0_15px_rgba(246,86,0,0.35)]">three simple steps.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-400 font-medium"
          >
            A seamless booking and concierge experience tailored for elite travelers.
          </motion.p>
        </div>

        {/* Floating Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#121217]/20 border border-white/5 hover:border-brand/40 hover:bg-[#121217]/40 backdrop-blur-xl rounded-[2.5rem] p-10 h-[380px] flex flex-col justify-between transition-all duration-500 relative overflow-hidden group"
              >
                {/* Huge Background Number */}
                <div className="absolute right-8 top-4 text-[10rem] font-black text-white/[0.02] group-hover:text-white/[0.04] group-hover:scale-105 select-none pointer-events-none transition-all duration-500 leading-none">
                  {step.id}
                </div>

                {/* Glowing light indicator on hover */}
                <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top Section: Icon */}
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${step.color} border flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Bottom Section: Text Content */}
                <div className="relative z-10 mt-auto">
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-brand transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 font-medium leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Border glowing layer */}
                <div className="absolute inset-0 rounded-[2.5rem] border border-transparent group-hover:border-brand/20 transition-all duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default HowItWorks;
