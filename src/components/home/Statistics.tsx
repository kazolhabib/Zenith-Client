import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Calendar, Star, Building2 } from 'lucide-react';

const stats = [
  { label: 'Happy Guests', to: 15, suffix: 'K+', decimals: 0, icon: Users, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  { label: 'Booked Nights', to: 42, suffix: 'K+', decimals: 0, icon: Calendar, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  { label: 'Five-Star Reviews', to: 99.4, suffix: '%', decimals: 1, icon: Star, color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
  { label: 'Elite Villas', to: 120, suffix: '+', decimals: 0, icon: Building2, color: 'text-brand bg-brand/10 border-brand/20' },
];

const chartData = [
  { name: 'Jan', bookings: 120 },
  { name: 'Feb', bookings: 180 },
  { name: 'Mar', bookings: 240 },
  { name: 'Apr', bookings: 380 },
  { name: 'May', bookings: 510 },
  { name: 'Jun', bookings: 750 },
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
    <section className="py-32 bg-transparent relative overflow-hidden border-y border-white/5">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-brand/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[101.25rem]">
        
        {/* Section Header (Full Width at Top) */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight"
          >
            Trusted by travelers{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400 drop-shadow-[0_0_15px_rgba(246,86,0,0.25)]">
              worldwide
            </span>.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 font-medium"
          >
            Our platform is rapidly growing to ensure your luxury stays and bookings remain seamless, protected, and exceptional.
          </motion.p>
        </div>

        {/* 2-Column Grid (Level at the Top) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column: Bento Grid Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-[#121217]/35 border border-white/5 hover:border-brand/30 hover:bg-[#121217]/60 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl flex flex-col justify-between transition-all duration-500 group relative overflow-hidden min-h-[180px]"
                >
                  <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex justify-center sm:justify-between items-center relative z-10">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <div className="mt-6 relative z-10 text-center sm:text-left">
                    <div className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
                      <Counter to={stat.to} suffix={stat.suffix} decimals={stat.decimals} />
                    </div>
                    <div className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Premium Chart Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#121217]/20 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 min-h-[380px] lg:h-full shadow-2xl flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="relative z-10 mb-6">
              <h3 className="text-white font-bold text-xl tracking-tight mb-1">Monthly Bookings Growth</h3>
              <p className="text-slate-400 text-xs font-semibold">Live record of reservations completed worldwide.</p>
            </div>

            <div className="flex-1 w-full min-h-[220px] relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f65600" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f65600" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#475569" 
                    axisLine={false} 
                    tickLine={false} 
                    dy={10} 
                    className="text-xs font-semibold"
                  />
                  <YAxis 
                    stroke="#475569" 
                    axisLine={false} 
                    tickLine={false} 
                    dx={-10}
                    className="text-xs font-semibold"
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#121217', borderColor: '#ffffff10', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                    itemStyle={{ color: '#f65600', fontWeight: 'bold' }}
                    labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="#f65600" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorBookings)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Statistics;
