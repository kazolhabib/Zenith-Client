import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Rocket, Cloud, LayoutTemplate, ArrowRight, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <section className="py-32 bg-transparent relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-brand/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[101.25rem]">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]"
          >
            Everything you need to <br className="hidden md:block" />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-brand via-orange-400 to-yellow-400 drop-shadow-[0_0_20px_rgba(246,86,0,0.3)]">
                build faster.
              </span>
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto"
          >
            A complete set of tools designed to help you ship products in record time without compromising on quality or security.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 auto-rows-[300px]">
          
          {/* Card 1: Large Featured */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-[2.5rem] bg-[#121217]/80 backdrop-blur-2xl border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:border-white/20 hover:shadow-[0_20px_80px_rgba(246,86,0,0.15)] transition-all duration-700 group flex flex-col justify-end p-10 lg:p-12"
          >
            {/* Animated Glow Behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none rounded-full" />
            
            {/* Faux UI Element / Dashboard Mockup */}
            <div className="absolute top-10 right-10 w-2/3 h-[120%] bg-[#0a0a0c]/90 backdrop-blur-xl rounded-2xl shadow-[0_30px_100px_-10px_rgba(0,0,0,0.9)] border border-white/10 overflow-hidden transform rotate-3 group-hover:rotate-0 transition-all duration-700 ease-[0.16,1,0.3,1] translate-x-12 -translate-y-4 group-hover:-translate-y-8 group-hover:shadow-[0_30px_100px_rgba(246,86,0,0.2)]">
              
              {/* Dashboard Header */}
              <div className="w-full h-12 bg-white/5 border-b border-white/5 flex items-center px-4 justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-xs font-mono text-slate-500">metrics.dashboard</div>
              </div>
              
              {/* Dashboard Content */}
              <div className="p-8 h-full flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div className="w-1/2 h-6 bg-white/10 rounded-md" />
                  <div className="w-1/4 h-8 bg-brand/20 rounded-full border border-brand/30" />
                </div>
                
                {/* Graph Lines */}
                <div className="flex items-end gap-3 h-32 mt-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand/10 to-transparent rounded-lg" />
                  {[40, 65, 45, 80, 55, 90, 75, 100].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: "10%" }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: 0.2 + (i * 0.1), type: 'spring' }}
                      viewport={{ once: true }}
                      className="flex-1 bg-gradient-to-t from-brand to-orange-400 rounded-t-sm"
                    />
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <div className="h-16 bg-white/5 rounded-xl border border-white/5 flex flex-col justify-center px-4">
                    <span className="text-xs text-slate-500">Latency</span>
                    <span className="text-sm font-mono text-green-400">12ms</span>
                  </div>
                  <div className="h-16 bg-white/5 rounded-xl border border-white/5 flex flex-col justify-center px-4">
                    <span className="text-xs text-slate-500">Uptime</span>
                    <span className="text-sm font-mono text-brand">99.99%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 w-full md:w-1/2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#121217] to-[#1a1a24] border border-white/10 flex items-center justify-center mb-8 shadow-xl shadow-black/50 group-hover:border-brand/50 transition-colors duration-500">
                <Zap className="w-6 h-6 text-brand drop-shadow-[0_0_10px_rgba(246,86,0,0.8)]" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Lightning Fast Edge Network</h3>
              <p className="text-slate-400 font-medium leading-relaxed text-lg">Deploy globally in milliseconds. Our optimized infrastructure ensures your users never have to wait.</p>
            </div>
          </motion.div>

          {/* Card 2: Small */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="md:col-span-1 md:row-span-1 relative overflow-hidden rounded-[2.5rem] bg-[#121217]/80 backdrop-blur-2xl border border-white/5 hover:border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500 group p-10 flex flex-col"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/20 blur-[60px] rounded-full group-hover:bg-orange-500/30 transition-colors duration-500" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#121217] to-[#1a1a24] border border-white/10 flex items-center justify-center mb-auto shadow-xl group-hover:border-orange-500/50 transition-colors duration-500">
              <Shield className="w-6 h-6 text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
            </div>
            <div className="relative z-10 mt-8">
              <h3 className="text-2xl font-bold text-white mb-3">Bank-Grade Security</h3>
              <p className="text-slate-400 text-base font-medium leading-relaxed">Automated SSL, DDoS protection, and end-to-end encryption by default.</p>
            </div>
          </motion.div>

          {/* Card 3: Small Accent (Animated Gradient) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="md:col-span-1 md:row-span-1 relative overflow-hidden rounded-[2.5rem] border border-brand/50 shadow-[0_0_40px_rgba(246,86,0,0.3)] hover:shadow-[0_0_60px_rgba(246,86,0,0.5)] hover:-translate-y-1 transition-all duration-500 group p-10 flex flex-col text-white"
          >
            {/* Moving Gradient Background */}
            <motion.div 
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[length:200%_200%] bg-gradient-to-br from-brand via-orange-500 to-yellow-500 -z-10"
            />
            
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 blur-[50px] rounded-full mix-blend-overlay" />
            
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-auto border border-white/30 backdrop-blur-md shadow-lg shadow-black/20">
              <Rocket className="w-7 h-7 text-white drop-shadow-md" />
            </div>
            <div className="relative z-10 mt-8">
              <h3 className="text-2xl font-bold mb-3 drop-shadow-sm">Infinite Scaling</h3>
              <p className="text-white/90 text-base font-medium leading-relaxed drop-shadow-sm">Traffic spikes? No problem. We autoscale your resources instantly.</p>
            </div>
          </motion.div>

          {/* Card 4: Medium Horizontal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="md:col-span-2 md:row-span-1 relative overflow-hidden rounded-[2.5rem] bg-[#121217]/80 backdrop-blur-2xl border border-white/5 hover:border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_80px_rgba(59,130,246,0.15)] transition-all duration-700 group flex items-center p-10 lg:p-12"
          >
            <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-blue-600/10 to-transparent -z-10 group-hover:from-blue-600/20 transition-colors duration-700" />
            <div className="flex-1 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#121217] to-[#1a1a24] border border-white/10 flex items-center justify-center mb-6 shadow-xl group-hover:border-blue-500/50 transition-colors duration-500">
                <Server className="w-6 h-6 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">Cloud Native Architecture</h3>
              <p className="text-slate-400 text-base font-medium max-w-md leading-relaxed">Built from the ground up with Kubernetes and microservices to integrate perfectly with modern cloud ecosystems.</p>
            </div>
            
            {/* 3D Graphic */}
            <div className="hidden md:flex flex-1 justify-end relative z-10 perspective-1000">
              <div className="relative w-48 h-48 flex items-center justify-center transform-gpu group-hover:rotate-y-12 transition-transform duration-700 ease-out">
                {/* Orbit Rings */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-dashed border-blue-500/30 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border border-blue-500/20 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 border border-dashed border-blue-400/40 rounded-full"
                />
                
                {/* Center Core */}
                <div className="relative w-24 h-24 bg-gradient-to-br from-[#0a0a0c] to-[#1a1a24] rounded-full border border-blue-500/50 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.4)] backdrop-blur-md">
                  <Cloud className="w-10 h-10 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,1)]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Small */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="md:col-span-1 md:row-span-1 relative overflow-hidden rounded-[2.5rem] bg-[#121217]/80 backdrop-blur-2xl border border-white/5 hover:border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500 group p-10 flex flex-col justify-center items-center text-center text-white hover:bg-white/5"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand/10 group-hover:border-brand/30 transition-all duration-500">
              <LayoutTemplate className="w-7 h-7 text-slate-400 group-hover:text-brand drop-shadow-[0_0_10px_rgba(246,86,0,0)] group-hover:drop-shadow-[0_0_15px_rgba(246,86,0,0.8)] transition-all duration-500" />
            </div>
            <h3 className="text-2xl font-bold mb-3">100+ Templates</h3>
            <p className="text-slate-400 text-base font-medium mb-8">Start your next project in seconds with pre-configured stacks.</p>
            <Link to="/explore">
              <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white rounded-full px-8 h-12 flex items-center gap-2 group-hover:text-brand transition-colors">
                Browse Library
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Features;
