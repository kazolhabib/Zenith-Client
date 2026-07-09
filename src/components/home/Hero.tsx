import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#FAFAFA] pt-[7rem] pb-[5rem]">
      
      {/* Modern Mesh Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand/10 blur-[120px] mix-blend-multiply opacity-70 animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-orange-300/20 blur-[120px] mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] rounded-full bg-yellow-200/20 blur-[120px] mix-blend-multiply opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-[101.25rem] flex flex-col items-center text-center">
        
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md text-gray-800 text-sm font-semibold mb-8 border border-white/50 shadow-[0_8px_20px_rgba(0,0,0,0.04)] cursor-default"
        >
          <Sparkles className="w-4 h-4 text-brand" />
          Introducing Zenith 2.0
          <span className="ml-2 pl-2 border-l border-gray-300 text-brand">Read the launch post &rarr;</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-gray-900 max-w-7xl mb-6 leading-[1.1]"
        >
          The Future of <br className="hidden md:block" />
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-brand via-orange-500 to-yellow-500">
              Digital Experience
            </span>
            <div className="absolute bottom-2 left-0 w-full h-[0.3em] bg-brand/20 -z-10 -rotate-1" />
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-xl md:text-2xl text-gray-500 max-w-3xl mb-12 leading-relaxed font-medium"
        >
          Build, scale, and manage your applications with unprecedented speed. 
          Zenith provides all the tools you need in one powerful platform.
        </motion.p>

        {/* Call to Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link to="/get-started" className="w-full sm:w-auto">
            <Button className="group relative overflow-hidden rounded-2xl bg-gray-900 hover:bg-gray-800 px-8 h-14 text-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_40px_rgba(246,86,0,0.3)] hover:-translate-y-1 transition-all duration-300 text-lg w-full">
              <span className="relative z-10 font-bold tracking-wide flex items-center gap-2">
                Start Building Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
          
          <Link to="/demo" className="w-full sm:w-auto">
            <Button variant="outline" className="rounded-2xl h-14 px-8 text-gray-700 bg-white/50 backdrop-blur-sm hover:bg-white border-gray-200 text-lg font-bold transition-all shadow-sm hover:shadow-md w-full">
              Book a Demo
            </Button>
          </Link>
        </motion.div>
        
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
      >
        <span className="text-xs uppercase tracking-widest font-bold">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-gray-300 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
