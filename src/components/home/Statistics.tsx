import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Active Users', value: '1M+' },
  { label: 'Deployments', value: '50M+' },
  { label: 'Uptime', value: '99.99%' },
  { label: 'Countries', value: '150+' },
];

const Statistics = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-y border-gray-100">
      
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[101.25rem]">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          <div className="lg:w-1/3 text-center lg:text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6"
            >
              Trusted by developers <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">worldwide</span>.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-500 font-medium"
            >
              Our platform operates at a massive scale to ensure your applications stay fast, reliable, and secure.
            </motion.p>
          </div>

          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (index * 0.1), type: "spring", stiffness: 100 }}
                className="flex flex-col items-center lg:items-start relative"
              >
                {/* Vertical Divider line except first */}
                {index !== 0 && index !== 2 && (
                  <div className="hidden md:block absolute left-[-2rem] top-1/2 -translate-y-1/2 w-px h-16 bg-gray-200" />
                )}
                
                <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 mb-2 tracking-tighter">
                  {stat.value}
                </span>
                <span className="text-sm md:text-base font-bold text-brand uppercase tracking-widest">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Statistics;
