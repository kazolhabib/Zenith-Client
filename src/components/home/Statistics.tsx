import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { label: 'Active Users', to: 1, suffix: 'M+', decimals: 0 },
  { label: 'Deployments', to: 50, suffix: 'M+', decimals: 0 },
  { label: 'Uptime', to: 99.99, suffix: '%', decimals: 2 },
  { label: 'Countries', to: 150, suffix: '+', decimals: 0 },
];

const Counter = ({ to, suffix, decimals = 0 }: { to: number, suffix: string, decimals?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setValue(start + (to - start) * easeProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(to);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, to]);

  return <span ref={ref}>{value.toFixed(decimals)}{suffix}</span>;
};

const Statistics = () => {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden border-y border-white/5">
      
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[101.25rem]">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          <div className="lg:w-1/3 text-center lg:text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6"
            >
              Trusted by developers <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">worldwide</span>.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-400 font-medium"
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
                className="flex flex-col items-center lg:items-start relative group"
              >
                {/* Vertical Divider line except first */}
                {index !== 0 && index !== 2 && (
                  <div className="hidden md:block absolute left-[-2rem] top-1/2 -translate-y-1/2 w-px h-16 bg-white/10" />
                )}
                
                <span className="text-5xl md:text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-2 tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:from-white group-hover:to-white transition-all duration-300">
                  <Counter to={stat.to} suffix={stat.suffix} decimals={stat.decimals} />
                </span>
                <span className="text-sm md:text-base font-bold text-brand uppercase tracking-widest drop-shadow-[0_0_10px_rgba(246,86,0,0.3)]">
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
