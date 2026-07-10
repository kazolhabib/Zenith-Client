import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  { label: 'Happy Guests', to: 15, suffix: 'K+', decimals: 0 },
  { label: 'Booked Nights', to: 42, suffix: 'K+', decimals: 0 },
  { label: 'Five-Star Reviews', to: 99.4, suffix: '%', decimals: 1 },
  { label: 'Elite Villas', to: 120, suffix: '+', decimals: 0 },
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
    <section className="py-24 bg-transparent relative overflow-hidden border-y border-white/5">
      
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[101.25rem]">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6"
            >
              Trusted by travelers <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">worldwide</span>.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-400 font-medium mb-12"
            >
              Our platform is rapidly growing to ensure your luxury stays and bookings remain seamless, protected, and exceptional.
            </motion.p>
            
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.1), type: "spring", stiffness: 100 }}
                  className="flex flex-col items-center lg:items-start relative group"
                >
                  <span className="text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-2 tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:from-white group-hover:to-white transition-all duration-300">
                    <Counter to={stat.to} suffix={stat.suffix} decimals={stat.decimals} />
                  </span>
                  <span className="text-xs md:text-sm font-bold text-brand uppercase tracking-widest drop-shadow-[0_0_10px_rgba(246,86,0,0.3)]">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full mt-12 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#121217]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl h-[400px]"
            >
              <h3 className="text-white font-bold mb-6 text-lg">Monthly Bookings Growth</h3>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    axisLine={false} 
                    tickLine={false} 
                    dy={10} 
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    axisLine={false} 
                    tickLine={false} 
                    dx={-10}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#121217', borderColor: '#ffffff20', borderRadius: '12px' }}
                    itemStyle={{ color: '#f97316' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="#f97316" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorBookings)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Statistics;
