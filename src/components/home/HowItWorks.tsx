import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, GitBranch, Rocket } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Connect Repository',
    description: 'Link your GitHub, GitLab, or Bitbucket account. We automatically detect your framework and configure the build settings.',
    icon: GitBranch,
    color: 'from-blue-500 to-cyan-400',
    shadow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]'
  },
  {
    id: '02',
    title: 'Review & Build',
    description: 'Every push creates a preview deployment. Review changes with your team before merging to production.',
    icon: Code2,
    color: 'from-purple-500 to-pink-500',
    shadow: 'shadow-[0_0_30px_rgba(168,85,247,0.3)]'
  },
  {
    id: '03',
    title: 'Global Deployment',
    description: 'Merge to main and your code is instantly deployed to our global edge network in milliseconds.',
    icon: Rocket,
    color: 'from-brand to-orange-400',
    shadow: 'shadow-[0_0_30px_rgba(246,86,0,0.3)]'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      
      {/* Background Dots Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:30px_30px] opacity-70" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[101.25rem]">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6"
          >
            From code to global in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-orange-400 to-yellow-400 drop-shadow-[0_0_10px_rgba(246,86,0,0.5)]">seconds.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-400 font-medium"
          >
            A streamlined workflow designed for maximum developer velocity.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-24 left-[10%] right-[10%] h-[2px] bg-white/5 overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-brand"
              initial={{ x: "-100%" }}
              whileInView={{ x: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.3 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Connecting Line (Mobile) */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden absolute top-32 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/5 overflow-hidden">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500 to-purple-500"
                      initial={{ y: "-100%" }}
                      whileInView={{ y: "0%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
                    />
                  </div>
                )}

                {/* Icon Container */}
                <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${step.color} rounded-[2.5rem] rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20 blur-xl`} />
                  <div className={`w-32 h-32 rounded-[2rem] bg-[#121217] border border-white/10 flex items-center justify-center relative z-10 ${step.shadow} group-hover:-translate-y-2 group-hover:border-white/20 transition-all duration-500 backdrop-blur-xl`}>
                    <step.icon className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                    
                    {/* Step Number Badge */}
                    <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-sm font-bold text-white shadow-[0_0_15px_rgba(255,255,255,0.2)] rotate-12 group-hover:rotate-0 transition-transform duration-300`}>
                      {step.id}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed max-w-md">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
