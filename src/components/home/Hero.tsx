import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Compass, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [activeMockTab, setActiveMockTab] = useState<'overview' | 'bookings' | 'settings'>('overview');

  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#09090b] pt-[8rem] pb-[6rem]">
      
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

      {/* Sleek Dark Mesh Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Vector Grid Pattern with Fade */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#09090b]/60 to-[#09090b]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#09090b_85%)]" />
      </div>

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
          <span className="relative z-10">Introducing Zenith Collections</span>
          <span className="relative z-10 ml-2 pl-2 border-l border-white/20 text-brand flex items-center gap-1 group-hover:gap-2 transition-all">
            Explore new properties <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </motion.div>

        {/* Badges Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-6 mb-2 xl:hidden"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-lg text-[10px] md:text-xs uppercase tracking-wider font-semibold text-slate-300">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
            Verified Properties
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-lg text-[10px] md:text-xs uppercase tracking-wider font-semibold text-slate-300">
            <Shield className="w-3.5 h-3.5 text-brand" />
            Protected Payments
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-lg text-[10px] md:text-xs uppercase tracking-wider font-semibold text-slate-300">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            24/7 Support
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-[6.5rem] font-extrabold tracking-tight text-white max-w-6xl mb-8 leading-[1.05]"
        >
          The Gateway to <br className="hidden md:block" />
          <span className="relative inline-block mt-2">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Extraordinary
            </span>
            {' '}
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-brand via-orange-400 to-yellow-400 drop-shadow-[0_0_30px_rgba(246,86,0,0.4)]">
              Escapes
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
          Discover handpicked luxury villas, cabins, and private estates globally. 
          Experience a new standard of travel with our <span className="text-white">24/7 dedicated</span> concierge service.
        </motion.p>

        {/* Call to Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto z-20 relative"
        >
          <Link to="/explore" className="w-full sm:w-auto">
            <Button className="group relative overflow-hidden rounded-full bg-white hover:bg-gray-100 px-10 h-16 text-black shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300 text-lg w-full">
              <span className="relative z-10 font-bold tracking-wide flex items-center gap-2">
                Explore Elite Villas
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </Link>
          
          <Link to="/contact" className="w-full sm:w-auto">
            <Button variant="outline" className="group rounded-full h-16 px-10 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 border-white/10 hover:border-white/20 text-lg font-bold transition-all w-full shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <span className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                Contact Concierge
              </span>
            </Button>
          </Link>
        </motion.div>
        
        {/* Floating Feature Pills (Desktop Only with Float Animations) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, -12, 0] 
          }}
          transition={{ 
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            },
            default: { duration: 1, delay: 0.8 }
          }}
          className="hidden xl:flex absolute top-[28%] left-10 lg:left-20 flex-col gap-6 pointer-events-none z-10"
        >
          <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#121217]/80 backdrop-blur-md border border-white/10 shadow-2xl">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
            <span className="text-sm font-bold text-slate-200">Verified Properties Only</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#121217]/80 backdrop-blur-md border border-white/10 shadow-2xl ml-12">
            <Shield className="w-5 h-5 text-brand" />
            <span className="text-sm font-bold text-slate-200">Protected Payments</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, 15, 0] 
          }}
          transition={{ 
            y: {
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            },
            default: { duration: 1, delay: 0.9 }
          }}
          className="hidden xl:flex absolute top-[35%] right-10 lg:right-20 flex-col gap-4 pointer-events-none z-10"
        >
          <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#121217]/80 backdrop-blur-md border border-white/10 shadow-2xl">
            <Globe className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-bold text-slate-200">24/7 Premium Guest Support</span>
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
            
            <div className="relative bg-[#0a0a0c]/80 rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[550px] md:h-auto xl:h-[580px]">
              {/* Sidebar */}
              <div className="w-full md:w-20 bg-[#121217]/90 border-b md:border-b-0 md:border-r border-white/5 flex flex-row md:flex-col items-center justify-between py-4 px-6 md:px-0 shrink-0">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand to-orange-500 flex items-center justify-center shadow-lg shadow-brand/20">
                  <span className="text-white font-bold text-lg leading-none">Z</span>
                </div>
                <div className="flex flex-row md:flex-col gap-6">
                  <div 
                    onClick={() => setActiveMockTab('overview')}
                    className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                      activeMockTab === 'overview' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                  </div>
                  <div 
                    onClick={() => setActiveMockTab('bookings')}
                    className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                      activeMockTab === 'bookings' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                  </div>
                  <div 
                    onClick={() => setActiveMockTab('settings')}
                    className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                      activeMockTab === 'settings' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 hidden md:block"></div>
              </div>
              
              {/* Dashboard Content Container */}
              <div className="flex-1 flex flex-col lg:flex-row min-w-0">
                {/* Main Content */}
                <div className="flex-1 p-6 flex flex-col gap-6 min-w-0">
                {activeMockTab === 'overview' && (
                  <>
                    {/* Top Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 lg:gap-4">
                      <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-1">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Active Bookings</span>
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-bold text-white">42</span>
                          <span className="text-green-400 text-xs mb-1 flex items-center">↑ 8%</span>
                        </div>
                      </div>
                      <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-1">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Occupancy Rate</span>
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-bold text-white">94%</span>
                          <span className="text-green-400 text-xs mb-1 flex items-center">↑ 3%</span>
                        </div>
                      </div>
                      <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-1">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total Revenue</span>
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-bold text-white">$182.5K</span>
                          <span className="text-green-400 text-xs mb-1 flex items-center">↑ 12%</span>
                        </div>
                      </div>
                      <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-1">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Avg Guest Rating</span>
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-bold text-white">4.98</span>
                          <span className="text-green-400 text-xs mb-1 flex items-center">★</span>
                        </div>
                      </div>
                      <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-1 relative overflow-hidden group/card">
                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-brand/20 blur-xl rounded-full group-hover/card:bg-brand/30 transition-colors" />
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Destinations</span>
                        <div className="flex items-end gap-2 relative z-10">
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">12</span>
                          <span className="text-slate-500 text-xs mb-1">Active</span>
                        </div>
                      </div>
                    </div>

                    {/* Charts and Data */}
                    <div className="flex-1 flex flex-col lg:flex-row gap-4">
                      {/* Chart Area */}
                      <div className="flex-[2] bg-white/5 border border-white/5 rounded-xl p-5 flex flex-col relative overflow-hidden">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-white text-sm font-semibold">Monthly Bookings Overview</span>
                          <div className="flex gap-2">
                            <span className="px-2 py-1 rounded bg-white/10 text-white text-[10px] font-medium cursor-pointer">30d</span>
                            <span className="px-2 py-1 rounded text-slate-400 hover:text-white text-[10px] font-medium cursor-pointer transition-colors">12m</span>
                          </div>
                        </div>
                        
                        <div className="flex-1 relative mt-4">
                          {/* Fake Chart Lines */}
                          <div className="absolute inset-0 flex items-end justify-between px-2">
                            {[30, 45, 35, 60, 50, 80, 65, 95, 80, 100, 85, 110, 90, 75, 85, 60, 70, 90, 105, 120].map((h, i) => (
                              <motion.div 
                                key={i}
                                initial={{ height: "0%" }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 1.5, delay: i * 0.05, ease: "easeOut" }}
                                className="w-full mx-[2px] md:mx-1 bg-gradient-to-t from-brand/80 to-orange-400/80 rounded-t-sm relative group/bar"
                              >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold py-0.5 px-1.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                  {h} stays
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

                      {/* Secondary Data (Stays Types) */}
                      <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-5 flex flex-col overflow-hidden">
                        <span className="text-white text-sm font-semibold mb-4">Popular Categories</span>
                        <div className="flex flex-col gap-4 flex-1 justify-center">
                          {[
                            { name: "Luxury Villas", value: "45%", color: "bg-brand" },
                            { name: "Beachfront Resorts", value: "25%", color: "bg-orange-400" },
                            { name: "Remote Cabins", value: "18%", color: "bg-blue-400" },
                            { name: "Castles & Mansions", value: "12%", color: "bg-green-400" }
                          ].map((category, i) => (
                            <div key={i} className="flex flex-col gap-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-300 font-medium">{category.name}</span>
                                <span className="text-white font-bold">{category.value}</span>
                              </div>
                              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: category.value }}
                                  transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                                  className={`h-full ${category.color} rounded-full`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeMockTab === 'bookings' && (
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-white font-bold text-lg">System Reservations Log</h3>
                        <p className="text-slate-400 text-xs mt-1">Real-time status of all globally managed client stays.</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold">Live Feed</span>
                    </div>

                    <div className="flex-1 overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-white/5 text-slate-500 font-semibold">
                            <th className="pb-3">PROPERTY / LOCATION</th>
                            <th className="pb-3">STATUS</th>
                            <th className="pb-3 text-right">REVENUE</th>
                            <th className="pb-3 text-right">GUESTS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {[
                            { property: 'Amalfi Sanctuary', location: 'Positano, Italy', status: 'Checked In', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', price: '$24,500', guests: '4 Guests' },
                            { property: 'Nordic Glass Dome', location: 'Tromsø, Norway', status: 'Confirmed', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', price: '$8,200', guests: '2 Guests' },
                            { property: 'Desert Mirror Villa', location: 'Joshua Tree, CA', status: 'Checked Out', color: 'text-slate-400 bg-white/5 border-white/10', price: '$15,000', guests: '6 Guests' },
                            { property: 'Kyoto Heritage House', location: 'Kyoto, Japan', status: 'Pending', color: 'text-brand bg-brand/10 border-brand/20', price: '$6,400', guests: '2 Guests' },
                          ].map((item, idx) => (
                            <tr key={idx} className="group/row hover:bg-white/[0.02] transition-colors">
                              <td className="py-3">
                                <div className="font-semibold text-white group-hover/row:text-brand transition-colors">{item.property}</div>
                                <div className="text-slate-400 text-[10px]">{item.location}</div>
                              </td>
                              <td className="py-3">
                                <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${item.color}`}>
                                  {item.status}
                                </span>
                              </td>
                              <td className="py-3 text-right font-bold text-white">{item.price}</td>
                              <td className="py-3 text-right text-slate-400 font-medium">{item.guests}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeMockTab === 'settings' && (
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-white font-bold text-lg">Zenith System Parameters</h3>
                        <p className="text-slate-400 text-xs mt-1">Platform configuration settings and security standards.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
                        <h4 className="text-slate-200 font-bold text-sm">Platform Core Toggles</h4>
                        <div className="space-y-4">
                          {[
                            { name: '100-Point Physical Verification', desc: 'Mandatory on-site check before publishing.', active: true },
                            { name: 'Smart Key Escrow Integration', desc: 'Automatic digital lock codes on booking confirmation.', active: true },
                            { name: 'Direct Owner Chat', desc: 'Secure encryption between host and traveler.', active: false },
                          ].map((toggle, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                              <div>
                                <div className="text-white text-xs font-semibold">{toggle.name}</div>
                                <div className="text-slate-400 text-[10px]">{toggle.desc}</div>
                              </div>
                              <div className={`w-8 h-4 rounded-full p-[2px] cursor-pointer transition-colors ${toggle.active ? 'bg-brand' : 'bg-slate-700'}`}>
                                <div className={`w-3 h-3 rounded-full bg-white transition-transform ${toggle.active ? 'translate-x-4' : 'translate-x-0'}`} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
                        <h4 className="text-slate-200 font-bold text-sm">Security & API Status</h4>
                        <div className="space-y-4 text-xs">
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span className="text-slate-400 font-medium">Server Uptime</span>
                            <span className="text-emerald-400 font-bold">99.99% Operational</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span className="text-slate-400 font-medium">Payment Protocol</span>
                            <span className="text-white font-bold">Stripe Custom Connect v3</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span className="text-slate-400 font-medium">Encryption Standard</span>
                            <span className="text-brand font-bold">AES-256 GCM</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span className="text-slate-400 font-medium">Escrow Timeout</span>
                            <span className="text-slate-300 font-bold">48 Hours post check-in</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

                {/* Right Panel - Active Bookings & Concierge */}
                <div className="w-full lg:w-80 bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/5 p-6 flex flex-col gap-6 shrink-0">
                
                <div className="flex flex-col gap-4">
                  <span className="text-white text-sm font-semibold">Upcoming Itineraries</span>
                  <div className="flex flex-col gap-3">
                    {/* Stay Item */}
                    <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                          <span className="text-slate-200 text-xs font-medium">Italian Villa</span>
                        </div>
                        <span className="text-slate-500 text-[10px]">Jul 15</span>
                      </div>
                      <div className="text-slate-400 text-[11px] truncate">Tuscany, Italy • 5 Nights</div>
                    </div>

                    {/* Stay Item */}
                    <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                          <span className="text-slate-200 text-xs font-medium">Cyberpunk Studio</span>
                        </div>
                        <span className="text-slate-500 text-[10px]">Aug 20</span>
                      </div>
                      <div className="text-slate-400 text-[11px] truncate">Tokyo, Japan • 3 Nights</div>
                    </div>

                    {/* Stay Item */}
                    <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex flex-col gap-2 opacity-60">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-slate-500" />
                          <span className="text-slate-200 text-xs font-medium">Rustic Farmhouse</span>
                        </div>
                        <span className="text-slate-500 text-[10px]">Sep 12</span>
                      </div>
                      <div className="text-slate-400 text-[11px] truncate">Provence, France • 7 Nights</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-auto">
                  <span className="text-white text-sm font-semibold">Concierge Support</span>
                  <div className="flex items-center justify-between bg-white/5 border border-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-200 text-xs font-medium">Personal Assistant Online</span>
                        <span className="text-slate-500 text-[10px]">Ready to assist you</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5">
                  <Link to="/explore" className="flex items-center gap-2 text-brand text-xs font-medium hover:text-orange-400 cursor-pointer transition-colors">
                    Browse all destinations
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
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
