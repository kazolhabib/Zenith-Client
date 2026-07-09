import React from 'react';
import { motion } from 'framer-motion';
import { Code2, GitBranch, Rocket } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Connect Repository',
    description: 'Link your GitHub, GitLab, or Bitbucket account. We automatically detect your framework and configure the build settings.',
    icon: GitBranch,
    color: 'from-blue-500 to-cyan-400',
    shadow: 'shadow-blue-500/20'
  },
  {
    id: '02',
    title: 'Review & Build',
    description: 'Every push creates a preview deployment. Review changes with your team before merging to production.',
    icon: Code2,
    color: 'from-purple-500 to-pink-500',
    shadow: 'shadow-purple-500/20'
  },
  {
    id: '03',
    title: 'Global Deployment',
    description: 'Merge to main and your code is instantly deployed to our global edge network in milliseconds.',
    icon: Rocket,
    color: 'from-brand to-orange-400',
    shadow: 'shadow-brand/20'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-[#FAFAFA] relative overflow-hidden">
      
      {/* Background Dots Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[101.25rem]">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6"
          >
            From code to global in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-500">seconds.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-500 font-medium"
          >
            A streamlined workflow designed for maximum developer velocity.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-24 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-400 via-purple-500 to-brand opacity-30" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Connecting Line (Mobile) */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden absolute top-32 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-gray-200 to-transparent" />
                )}

                {/* Icon Container */}
                <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${step.color} rounded-[2.5rem] rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20 blur-xl`} />
                  <div className={`w-32 h-32 rounded-[2rem] bg-white border border-gray-100 flex items-center justify-center relative z-10 shadow-xl ${step.shadow} group-hover:-translate-y-2 transition-transform duration-500`}>
                    <step.icon className="w-12 h-12 text-gray-800 group-hover:scale-110 transition-transform duration-500" />
                    
                    {/* Step Number Badge */}
                    <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-sm font-bold text-white shadow-lg rotate-12 group-hover:rotate-0 transition-transform duration-300`}>
                      {step.id}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed max-w-md">
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
