import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-32 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[101.25rem]">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[3.5rem] overflow-hidden px-8 py-28 text-center shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay Dark Gradients to match the premium theme */}
          <div className="absolute inset-0 bg-black/75 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/40 to-[#09090b] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#09090b]/30 to-[#09090b] pointer-events-none" />

          {/* Ambient Glows */}
          <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(246,86,0,0.15)] pointer-events-none rounded-[3.5rem]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            
            {/* Elegant Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <Compass className="w-4 h-4 text-brand animate-spin-slow" />
              <span className="text-[10px] md:text-xs font-bold text-brand uppercase tracking-[0.25em]">
                Exclusively Zenith
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-none">
              Ready to book your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-orange-400 to-yellow-400 drop-shadow-[0_0_20px_rgba(246,86,0,0.35)]">
                next dream escape?
              </span>
            </h2>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl font-medium leading-relaxed">
              Join thousands of elite travelers exploring the world with Zenith. 
              Book your luxury stay today or get in touch with our concierge team.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link to="/explore" className="w-full sm:w-auto">
                <Button className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand to-orange-500 hover:opacity-95 px-8 h-16 text-white border-none text-base font-bold w-full sm:w-auto shadow-[0_10px_40px_rgba(246,86,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(246,86,0,0.7)]">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Elite Properties
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  {/* Sheen Effect */}
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                    <div className="relative h-full w-8 bg-white/30 blur-[2px]" />
                  </div>
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="outline" className="rounded-2xl h-16 px-8 text-white border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:text-white text-base font-bold w-full sm:w-auto transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.02)] hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]">
                  Contact Concierge
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CallToAction;
