import { useState, type ComponentType } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  TrendingUp, DollarSign, Star, Home, Users,
  ArrowUpRight, ArrowDownRight, Calendar
} from 'lucide-react';

// ─── Mock Data ───────────────────────────────────────────────────────────────

const bookingTrendData = [
  { month: 'Jan', bookings: 12, revenue: 8400 },
  { month: 'Feb', bookings: 19, revenue: 13300 },
  { month: 'Mar', bookings: 15, revenue: 10500 },
  { month: 'Apr', bookings: 28, revenue: 19600 },
  { month: 'May', bookings: 22, revenue: 15400 },
  { month: 'Jun', bookings: 35, revenue: 24500 },
  { month: 'Jul', bookings: 42, revenue: 29400 },
  { month: 'Aug', bookings: 38, revenue: 26600 },
  { month: 'Sep', bookings: 30, revenue: 21000 },
  { month: 'Oct', bookings: 45, revenue: 31500 },
  { month: 'Nov', bookings: 52, revenue: 36400 },
  { month: 'Dec', bookings: 60, revenue: 42000 },
];

const propertyTypeData = [
  { name: 'Beachfront', value: 32, color: '#F65600' },
  { name: 'Mountain', value: 24, color: '#fb923c' },
  { name: 'City Loft', value: 20, color: '#fdba74' },
  { name: 'Countryside', value: 14, color: '#c2410c' },
  { name: 'Luxury Villa', value: 10, color: '#ea580c' },
];

const weeklyData = [
  { day: 'Mon', guests: 18 },
  { day: 'Tue', guests: 25 },
  { day: 'Wed', guests: 22 },
  { day: 'Thu', guests: 30 },
  { day: 'Fri', guests: 45 },
  { day: 'Sat', guests: 58 },
  { day: 'Sun', guests: 42 },
];

// ─── Custom Tooltip Components ───────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a24]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{label}</p>
        {payload.map((entry: any, i: number) => (
          <div key={i} className="flex items-center gap-2 text-sm font-bold">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-300 capitalize">{entry.name}:</span>
            <span className="text-white">
              {entry.name === 'revenue' ? `$${entry.value.toLocaleString()}` : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a24]/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-2xl">
        <p className="text-white font-bold text-sm">{payload[0].name}</p>
        <p className="text-brand font-black text-lg">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

// ─── Stat Card Component ─────────────────────────────────────────────────────

interface StatCardProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  change: string;
  isUp: boolean;
  delay: number;
}

const StatCard = ({ icon: Icon, label, value, change, isUp, delay }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="relative bg-[#121217]/80 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 overflow-hidden group hover:border-brand/20 transition-all duration-500 cursor-default"
  >
    {/* Hover glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

    <div className="relative z-10 flex items-start justify-between">
      <div className="flex-1 min-w-0">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">{label}</p>
        <p className="text-2xl md:text-3xl font-black text-white mb-2 truncate">{value}</p>
        <div className={`flex items-center gap-1 text-xs font-bold ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
          {isUp
            ? <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            : <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
          }
          <span className="truncate">{change} vs last month</span>
        </div>
      </div>
      <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shadow-lg shadow-brand/10 shrink-0 ml-3">
        <Icon className="w-5 h-5 md:w-6 md:h-6" />
      </div>
    </div>
  </motion.div>
);

// ─── Main DashboardStats Component ──────────────────────────────────────────

type ChartView = 'bookings' | 'revenue';

const DashboardStats = () => {
  const [chartView, setChartView] = useState<ChartView>('bookings');

  const statCards: Omit<StatCardProps, 'delay'>[] = [
    { icon: DollarSign, label: 'Total Revenue',   value: '$278,400', change: '+22.4%', isUp: true  },
    { icon: Calendar,   label: 'Total Bookings',  value: '418',      change: '+15.2%', isUp: true  },
    { icon: Star,       label: 'Avg. Rating',     value: '4.87',     change: '+0.3%',  isUp: true  },
    { icon: Home,       label: 'Active Listings', value: '24',       change: '-2.1%',  isUp: false },
    { icon: Users,      label: 'Total Guests',    value: '1,240',    change: '+31.8%', isUp: true  },
    { icon: TrendingUp, label: 'Occupancy Rate',  value: '73%',      change: '+8.5%',  isUp: true  },
  ];

  return (
    <div className="space-y-8">

      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-2"
      >
        <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shadow-lg shadow-brand/10 shrink-0">
          <TrendingUp className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Analytics Overview</h2>
          <p className="text-sm text-slate-400">Track your property performance with real-time insights.</p>
        </div>
      </motion.div>

      {/* ── KPI Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, i) => (
          <StatCard key={card.label} {...card} delay={i * 0.07} />
        ))}
      </div>

      {/* ── Annual Performance Area Chart ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.42 }}
        className="bg-[#121217]/80 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 md:p-8 overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Annual Performance</h3>
            <p className="text-sm text-slate-500">Tracking your 12-month growth trajectory</p>
          </div>
          {/* Toggle between Bookings and Revenue */}
          <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-2xl p-1.5 shrink-0">
            {(['bookings', 'revenue'] as ChartView[]).map((v) => (
              <button
                key={v}
                onClick={() => setChartView(v)}
                className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all duration-300 ${
                  chartView === v
                    ? 'bg-brand text-white shadow-[0_4px_15px_rgba(246,86,0,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={bookingTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBrand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#F65600" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#F65600" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#fb923c" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                chartView === 'revenue' ? `$${(v / 1000).toFixed(0)}k` : String(v)
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={chartView}
              stroke={chartView === 'bookings' ? '#F65600' : '#fb923c'}
              strokeWidth={3}
              fill={chartView === 'bookings' ? 'url(#colorBrand)' : 'url(#colorOrange)'}
              dot={{
                fill: chartView === 'bookings' ? '#F65600' : '#fb923c',
                strokeWidth: 2, r: 4, stroke: '#09090b'
              }}
              activeDot={{ r: 7, stroke: '#F65600', strokeWidth: 2, fill: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ── Bottom Row: Bar + Pie ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Weekly Guests Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="bg-[#121217]/80 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 md:p-8"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-1">Weekly Guest Activity</h3>
            <p className="text-sm text-slate-500">Guests checked in this week</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#F65600" stopOpacity={1} />
                  <stop offset="100%" stopColor="#c2410c" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="guests" fill="url(#barGradient)" radius={[8, 8, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Property Type Donut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="bg-[#121217]/80 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 md:p-8"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-1">Property Type Distribution</h3>
            <p className="text-sm text-slate-500">Breakdown of your listing portfolio</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="shrink-0">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    data={propertyTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {propertyTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend with progress bars */}
            <div className="flex-1 space-y-3 w-full">
              {propertyTypeData.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 shrink-0 min-w-0">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-slate-300 font-medium truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="h-1.5 rounded-full bg-white/5 w-16 md:w-20 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${item.value}%`, backgroundColor: item.color }}
                      />
                    </div>
                    <span className="text-sm font-bold text-white w-8 text-right">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default DashboardStats;
