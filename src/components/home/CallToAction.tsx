import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[101.25rem]">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-[3rem] overflow-hidden px-6 py-24 text-center shadow-[0_20px_100px_rgba(0,0,0,0.5)] bg-[#121217]/60 backdrop-blur-3xl border border-white/20"
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(246,86,0,0.1)] pointer-events-none rounded-[3rem]" />
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/20 blur-[150px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none mix-blend-screen" />
          
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            
            <div className="w-16 h-16 bg-[#0a0a0c] rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-[0_0_40px_rgba(246,86,0,0.4)] backdrop-blur-md">
              <Zap className="w-8 h-8 text-brand drop-shadow-[0_0_10px_rgba(246,86,0,0.8)]" />
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Ready to scale your <br className="hidden md:block" />
              infrastructure?
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl font-medium drop-shadow-sm">
              Join thousands of developers building the future on Zenith. 
              Get started for free, no credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link to="/register" className="w-full sm:w-auto">
                <Button className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand to-orange-500 hover:opacity-90 px-8 h-16 text-white border-none text-lg font-bold w-full sm:w-auto shadow-[0_10px_40px_rgba(246,86,0,0.6)] transition-all hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(246,86,0,0.8)]">
                  <span className="relative z-10 flex items-center gap-2">
                    Create Free Account
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                    <div className="relative h-full w-8 bg-white/30 blur-[2px]" />
                  </div>
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="outline" className="rounded-2xl h-16 px-8 text-white border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:text-white text-lg font-bold w-full sm:w-auto transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  Talk to Sales
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
