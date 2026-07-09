import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[101.25rem]">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-[3rem] overflow-hidden px-6 py-24 text-center shadow-[0_20px_60px_rgba(246,86,0,0.2)] bg-gradient-to-br from-brand via-orange-500 to-yellow-500"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/10 blur-[80px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
          
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/30 shadow-lg">
              <Zap className="w-8 h-8 text-white drop-shadow-md" />
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-sm">
              Ready to scale your <br className="hidden md:block" />
              infrastructure?
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl font-medium drop-shadow-sm">
              Join thousands of developers building the future on Zenith. 
              Get started for free, no credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button className="group relative overflow-hidden rounded-2xl bg-white hover:bg-gray-50 px-8 h-16 text-gray-900 border-none text-lg font-bold w-full sm:w-auto shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl">
                <span className="relative z-10 flex items-center gap-2">
                  Create Free Account
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                  <div className="relative h-full w-8 bg-gray-200/50 blur-[2px]" />
                </div>
              </Button>
              <Button variant="outline" className="rounded-2xl h-16 px-8 text-white border-white/30 bg-white/10 hover:bg-white/20 text-lg font-bold w-full sm:w-auto backdrop-blur-md transition-all">
                Talk to Sales
              </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CallToAction;
