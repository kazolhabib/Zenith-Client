import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Rocket, BarChart3, Cloud, LayoutTemplate, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Features = () => {
  return (
    <section className="py-24 bg-[#FAFAFA] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-brand/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-orange-400/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[101.25rem]">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6"
          >
            Everything you need to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-500">build faster.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-500 font-medium"
          >
            A complete set of tools designed to help you ship products in record time without compromising on quality or security.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-8 auto-rows-[280px]">
          
          {/* Card 1: Large Featured */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-[2.5rem] bg-white border border-gray-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(246,86,0,0.08)] transition-all duration-500 group flex flex-col justify-end p-10 lg:p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white -z-10" />
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
            
            {/* Faux UI Element */}
            <div className="absolute top-8 right-8 w-2/3 h-2/3 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform rotate-2 group-hover:rotate-0 transition-transform duration-500 delay-100 translate-x-8 -translate-y-4">
              <div className="w-full h-12 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="p-6">
                <div className="w-full h-4 bg-gray-100 rounded-full mb-4" />
                <div className="w-3/4 h-4 bg-gray-100 rounded-full mb-8" />
                <div className="w-full h-32 bg-brand/10 rounded-xl border border-brand/20 flex items-center justify-center">
                  <BarChart3 className="w-12 h-12 text-brand opacity-50" />
                </div>
              </div>
            </div>

            <div className="relative z-10 w-full md:w-1/2">
              <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Lightning Fast Edge Network</h3>
              <p className="text-gray-500 font-medium">Deploy globally in milliseconds. Our optimized infrastructure ensures your users never have to wait.</p>
            </div>
          </motion.div>

          {/* Card 2: Small */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 md:row-span-1 relative overflow-hidden rounded-[2.5rem] bg-white border border-gray-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-500 group p-10 lg:p-12 flex flex-col"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-auto">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bank-Grade Security</h3>
              <p className="text-gray-500 text-sm font-medium">Automated SSL, DDoS protection, and end-to-end encryption by default.</p>
            </div>
          </motion.div>

          {/* Card 3: Small Accent */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-1 md:row-span-1 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand to-orange-500 shadow-[0_10px_30px_rgba(246,86,0,0.3)] hover:shadow-[0_15px_40px_rgba(246,86,0,0.4)] transition-all duration-500 group p-10 lg:p-12 flex flex-col text-white"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-[50px] rounded-full" />
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-auto border border-white/30 backdrop-blur-sm">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Infinite Scaling</h3>
              <p className="text-white/80 text-sm font-medium">Traffic spikes? No problem. We autoscale instantly.</p>
            </div>
          </motion.div>

          {/* Card 4: Medium Horizontal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 md:row-span-1 relative overflow-hidden rounded-[2.5rem] bg-white border border-gray-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-500 group flex items-center p-10 lg:p-12"
          >
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-gray-50 to-transparent -z-10" />
            <div className="flex-1">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cloud Native Architecture</h3>
              <p className="text-gray-500 text-sm font-medium max-w-sm">Built from the ground up to integrate perfectly with modern cloud ecosystems.</p>
            </div>
            
            {/* Graphic */}
            <div className="hidden md:flex flex-1 justify-end">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-4 bg-blue-500/20 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                <div className="absolute inset-8 bg-blue-50 rounded-full border border-blue-100 flex items-center justify-center shadow-lg">
                  <Cloud className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Small */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="md:col-span-1 md:row-span-1 relative overflow-hidden rounded-[2.5rem] bg-gray-900 border border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-xl transition-all duration-500 group p-10 lg:p-12 flex flex-col justify-center items-center text-center text-white"
          >
            <LayoutTemplate className="w-10 h-10 text-gray-400 mb-4 group-hover:text-brand transition-colors" />
            <h3 className="text-xl font-bold mb-2">100+ Templates</h3>
            <p className="text-gray-400 text-sm font-medium mb-6">Start your next project in seconds.</p>
            <Button variant="ghost" className="text-brand hover:text-brand hover:bg-brand/10 rounded-full px-6 flex items-center gap-2">
              Browse
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Features;
