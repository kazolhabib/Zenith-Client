import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal, Cpu, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#09090b] pt-[8rem] pb-[8rem]">
      
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-brand/20 blur-[120px] mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-purple-600/20 blur-[130px] mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            y: [0, 50, 0],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-blue-600/20 blur-[100px] mix-blend-screen"
        />
      </div>

      {/* Grid Pattern with Fade */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-[101.25rem] flex flex-col items-center text-center mt-12">
        
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl text-slate-300 text-sm font-semibold mb-10 border border-white/10 hover:bg-white/10 transition-all cursor-pointer shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_0_20px_rgba(246,86,0,0.2)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset,0_0_30px_rgba(246,86,0,0.4)]"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand/20 via-orange-400/20 to-yellow-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          <Sparkles className="w-4 h-4 text-brand relative z-10" />
          <span className="relative z-10">Introducing Zenith 2.0</span>
          <span className="relative z-10 ml-2 pl-2 border-l border-white/20 text-brand flex items-center gap-1 group-hover:gap-2 transition-all">
            Read launch post <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-[6.5rem] font-extrabold tracking-tight text-white max-w-6xl mb-8 leading-[1.05]"
        >
          The Engine for <br className="hidden md:block" />
          <span className="relative inline-block mt-2">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Modern
            </span>
            {' '}
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-brand via-orange-400 to-yellow-400 drop-shadow-[0_0_30px_rgba(246,86,0,0.4)]">
              Engineering
            </span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-slate-400 max-w-3xl mb-12 leading-relaxed font-medium"
        >
          Deploy your applications globally in milliseconds. 
          Experience zero-config scaling with our <span className="text-white">next-generation</span> edge infrastructure.
        </motion.p>

        {/* Call to Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto z-20 relative"
        >
          <Link to="/register" className="w-full sm:w-auto">
            <Button className="group relative overflow-hidden rounded-full bg-white hover:bg-gray-100 px-10 h-16 text-black shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300 text-lg w-full">
              <span className="relative z-10 font-bold tracking-wide flex items-center gap-2">
                Start Building Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </Link>
          
          <Link to="/explore" className="w-full sm:w-auto">
            <Button variant="outline" className="group rounded-full h-16 px-10 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 border-white/10 hover:border-white/20 text-lg font-bold transition-all w-full shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <span className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                View Documentation
              </span>
            </Button>
          </Link>
        </motion.div>
        
        {/* Floating Feature Pills */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="hidden md:flex absolute top-1/4 left-10 flex-col gap-4 pointer-events-none"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#121217]/80 backdrop-blur-md border border-white/10 shadow-xl">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-slate-300">Global Edge Network</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#121217]/80 backdrop-blur-md border border-white/10 shadow-xl ml-8">
            <Cpu className="w-4 h-4 text-brand" />
            <span className="text-sm font-medium text-slate-300">Auto-scaling Compute</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="hidden md:flex absolute top-1/3 right-10 flex-col gap-4 pointer-events-none"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#121217]/80 backdrop-blur-md border border-white/10 shadow-xl">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-slate-300">99.99% Uptime SLA</span>
          </div>
        </motion.div>

        {/* 3D Dashboard Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 w-full max-w-[1400px] mx-auto relative group perspective-[2000px] px-4 md:px-8"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotateX: [5, 2, 5]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative rounded-2xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] bg-[#0d1117]/90 backdrop-blur-3xl border border-white/10 text-left transform-gpu"
          >
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand/5 via-transparent to-blue-500/5 pointer-events-none" />
            
            {/* Subtle glowing effect behind the dashboard */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-brand/30 via-purple-500/30 to-brand/30 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition duration-500 -z-10" />
            
            <div className="relative bg-[#0a0a0c]/80 rounded-2xl overflow-hidden flex flex-col md:flex-row h-full md:h-[550px]">
              {/* Sidebar */}
              <div className="w-full md:w-20 bg-[#121217]/90 border-r border-white/5 flex flex-row md:flex-col items-center justify-between py-4 px-4 md:px-0">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand to-orange-500 flex items-center justify-center shadow-lg shadow-brand/20">
                  <span className="text-white font-bold text-lg leading-none">Z</span>
                </div>
                <div className="flex flex-row md:flex-col gap-6">
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                  </div>
                  <div className="w-6 h-6 rounded-md flex items-center justify-center text-slate-500 hover:text-white transition-colors cursor-pointer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                  </div>
                  <div className="w-6 h-6 rounded-md flex items-center justify-center text-slate-500 hover:text-white transition-colors cursor-pointer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 hidden md:block"></div>
              </div>
              
              {/* Main Content */}
              <div className="flex-1 p-6 flex flex-col gap-6">
                
                {/* Top Stats */}
                {/* Top Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-1">
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total Requests</span>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-white">2.4B</span>
                      <span className="text-green-400 text-xs mb-1 flex items-center">↑ 12%</span>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-1">
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Avg Latency</span>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-white">12ms</span>
                      <span className="text-green-400 text-xs mb-1 flex items-center">↓ 4ms</span>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-1">
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Bandwidth</span>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-white">42.5 TB</span>
                      <span className="text-green-400 text-xs mb-1 flex items-center">↑ 8%</span>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-1">
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Cache Hit Rate</span>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-white">99.8%</span>
                      <span className="text-green-400 text-xs mb-1 flex items-center">↑ 0.2%</span>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-1 relative overflow-hidden group/card">
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-brand/20 blur-xl rounded-full group-hover/card:bg-brand/30 transition-colors" />
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Active Nodes</span>
                    <div className="flex items-end gap-2 relative z-10">
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">142</span>
                      <span className="text-slate-500 text-xs mb-1">Global</span>
                    </div>
                  </div>
                </div>

                {/* Charts and Data */}
                <div className="flex-1 flex flex-col lg:flex-row gap-4">
                  {/* Chart Area */}
                  <div className="flex-[2] bg-white/5 border border-white/5 rounded-xl p-5 flex flex-col relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-white text-sm font-semibold">Global Traffic</span>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 rounded bg-white/10 text-white text-[10px] font-medium cursor-pointer">24h</span>
                        <span className="px-2 py-1 rounded text-slate-400 hover:text-white text-[10px] font-medium cursor-pointer transition-colors">7d</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 relative mt-4">
                      {/* Fake Chart Lines */}
                      <div className="absolute inset-0 flex items-end justify-between px-2">
                        {[30, 45, 35, 60, 50, 80, 65, 95, 80, 100, 85, 110, 90, 75, 85, 60, 70, 90, 105, 80].map((h, i) => (
                          <motion.div 
                            key={i}
                            initial={{ height: "0%" }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1.5, delay: i * 0.05, ease: "easeOut" }}
                            className="w-full mx-[2px] md:mx-1 bg-gradient-to-t from-brand/80 to-orange-400/80 rounded-t-sm relative group/bar"
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold py-0.5 px-1.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                              {h}k reqs
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      {/* Grid lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                        <div className="w-full border-b border-dashed border-slate-500"></div>
                        <div className="w-full border-b border-dashed border-slate-500"></div>
                        <div className="w-full border-b border-dashed border-slate-500"></div>
                        <div className="w-full border-b border-dashed border-slate-500"></div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Data (Regions) */}
                  <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-5 flex flex-col overflow-hidden">
                    <span className="text-white text-sm font-semibold mb-4">Top Edge Regions</span>
                    <div className="flex flex-col gap-4 flex-1 justify-center">
                      {[
                        { name: "US East (N. Virginia)", value: "32%", color: "bg-brand" },
                        { name: "Europe (Frankfurt)", value: "24%", color: "bg-orange-400" },
                        { name: "Asia Pacific (Tokyo)", value: "18%", color: "bg-blue-400" },
                        { name: "South America (São Paulo)", value: "12%", color: "bg-green-400" }
                      ].map((region, i) => (
                        <div key={i} className="flex flex-col gap-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-300 font-medium">{region.name}</span>
                            <span className="text-white font-bold">{region.value}</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: region.value }}
                              transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                              className={`h-full ${region.color} rounded-full`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Active Deployments & Health */}
              <div className="w-full md:w-80 bg-white/[0.02] border-l border-white/5 p-6 flex flex-col gap-6">
                
                <div className="flex flex-col gap-4">
                  <span className="text-white text-sm font-semibold">Live Deployments</span>
                  <div className="flex flex-col gap-3">
                    {/* Deployment Item */}
                    <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                          <span className="text-slate-200 text-xs font-medium">Production</span>
                        </div>
                        <span className="text-slate-500 text-[10px]">2m ago</span>
                      </div>
                      <div className="text-slate-400 text-[11px] font-mono truncate">fc8d1a2 • Add authentication</div>
                    </div>

                    {/* Deployment Item */}
                    <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                          <span className="text-slate-200 text-xs font-medium">Staging</span>
                        </div>
                        <span className="text-slate-500 text-[10px]">1h ago</span>
                      </div>
                      <div className="text-slate-400 text-[11px] font-mono truncate">a2b9c3f • Update hero copy</div>
                    </div>

                    {/* Deployment Item */}
                    <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex flex-col gap-2 opacity-60">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-slate-500" />
                          <span className="text-slate-200 text-xs font-medium">Preview</span>
                        </div>
                        <span className="text-slate-500 text-[10px]">5h ago</span>
                      </div>
                      <div className="text-slate-400 text-[11px] font-mono truncate">e4f5g6h • Fix layout bug</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-auto">
                  <span className="text-white text-sm font-semibold">System Health</span>
                  <div className="flex items-center justify-between bg-white/5 border border-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-200 text-xs font-medium">All Systems Operational</span>
                        <span className="text-slate-500 text-[10px]">Updated just now</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-brand text-xs font-medium hover:text-orange-400 cursor-pointer transition-colors">
                    View all environments
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Reflection */}
          <div className="absolute -bottom-24 left-10 right-10 h-32 bg-gradient-to-t from-transparent to-[#0d1117]/50 blur-2xl transform scale-y-[-1] opacity-50" />
        </motion.div>
        
      </div>
    </section>
  );
};

export default Hero;
