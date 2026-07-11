import { useMemo, useState, useEffect, type ComponentType } from 'react';
import { motion } from 'framer-motion';
import api from '@/config/api';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  MapPin, Star, Calendar, DollarSign,
  TrendingUp, Heart, ArrowUpRight, Clock
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

// ─── Custom Tooltip ──────────────────────────────────────────────────────────

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
              {entry.name === 'spent' ? `$${entry.value}` : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Stat Card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub: string;
  delay: number;
}

const StatCard = ({ icon: Icon, label, value, sub, delay }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="relative bg-[#121217]/80 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 overflow-hidden group hover:border-white/10 transition-all duration-500 cursor-default"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    <div className="relative z-10">
      <div className={`w-11 h-11 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shadow-lg mb-4`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-black text-white mb-1">{value}</p>
      <p className="text-xs text-slate-500 font-medium">{sub}</p>
    </div>
  </motion.div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

const UserStats = () => {
  const { user } = useAuth();

  const [rawReservations, setRawReservations] = useState<any[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const { data } = await api.get('/reservations/my');
        setRawReservations(data);
      } catch (err) {
        console.error('Error fetching reservations for stats:', err);
      }
    };
    fetchReservations();
  }, [user?.id]);

  // Pull user's reservations from MongoDB raw state
  const reservations = useMemo(() => {
    return rawReservations.map((r: any) => {
      const pricePerNight = typeof r.price === 'number'
        ? r.price
        : Number(String(r.price || '0').replace(/[^0-9.]/g, '')) || 0;
        
      let nights = 1;
      if (r.checkIn && r.checkOut) {
        const start = new Date(r.checkIn);
        const end = new Date(r.checkOut);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        nights = diffDays || 1;
      }

      let totalPrice = r.totalPrice;
      if (totalPrice === undefined || totalPrice === null || totalPrice === 0) {
        totalPrice = pricePerNight * nights;
      }
      return { ...r, totalPrice, pricePerNight, nights };
    });
  }, [rawReservations]);

  // Compute stats
  const totalTrips      = reservations.length;
  const confirmedTrips  = reservations.filter((r: any) => r.status === 'Confirmed').length;
  const pendingTrips    = reservations.filter((r: any) => r.status === 'Pending').length;
  const totalSpent      = reservations
    .filter((r: any) => r.status !== 'Rejected')
    .reduce((sum: number, r: any) => sum + (r.totalPrice || 0), 0);
  const avgRating       = 4.8; // placeholder
  const uniqueLocations = [...new Set(reservations.map((r: any) => r.location))].length;

  // Monthly activity from reservations (last 6 months)
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const now = new Date();
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const label = monthNames[d.getMonth()];
    const trips = reservations.filter((r: any) => {
      const date = new Date(r.checkIn || r.createdAt || Date.now());
      return date.getMonth() === d.getMonth() && date.getFullYear() === d.getFullYear();
    }).length;
    const spent = reservations
      .filter((r: any) => {
        const date = new Date(r.checkIn || r.createdAt || Date.now());
        return r.status !== 'Rejected' && date.getMonth() === d.getMonth() && date.getFullYear() === d.getFullYear();
      })
      .reduce((s: number, r: any) => s + (r.totalPrice || 0), 0);
    return { month: label, trips, spent };
  });

  // If no trips yet, show demo-style data so charts look non-empty
  const hasData = totalTrips > 0;
  const chartData = hasData ? monthlyData : [
    { month: 'Feb', trips: 0, spent: 0 },
    { month: 'Mar', trips: 0, spent: 0 },
    { month: 'Apr', trips: 0, spent: 0 },
    { month: 'May', trips: 0, spent: 0 },
    { month: 'Jun', trips: 0, spent: 0 },
    { month: 'Jul', trips: 0, spent: 0 },
  ];

  const statCards: Omit<StatCardProps, 'delay'>[] = [
    {
      icon: Calendar,
      label: 'Total Trips',
      value: String(totalTrips),
      sub: `${confirmedTrips} confirmed · ${pendingTrips} pending`,
    },
    {
      icon: DollarSign,
      label: 'Total Spent',
      value: totalSpent > 0 ? `$${totalSpent.toLocaleString()}` : '$0',
      sub: 'Across all bookings',
    },
    {
      icon: MapPin,
      label: 'Destinations',
      value: String(uniqueLocations || 0),
      sub: 'Unique locations visited',
    },
    {
      icon: Star,
      label: 'Avg. Rating Given',
      value: totalTrips > 0 ? avgRating.toFixed(1) : '—',
      sub: 'Based on your reviews',
    },
  ];

  return (
    <div className="space-y-8">

      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shadow-lg shadow-brand/10 shrink-0">
          <TrendingUp className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
            My Activity
          </h2>
          <p className="text-sm text-slate-400">
            Welcome back, <span className="text-brand font-semibold">{user?.name?.split(' ')[0]}</span>! Here's a summary of your travel history.
          </p>
        </div>
      </motion.div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <StatCard key={card.label} {...card} delay={i * 0.08} />
        ))}
      </div>

      {/* ── No trips CTA ── */}
      {!hasData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#121217]/80 backdrop-blur-3xl border border-white/5 rounded-3xl p-10 flex flex-col items-center text-center gap-4"
        >
          <div className="w-20 h-20 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center">
            <Heart className="w-10 h-10 text-brand" />
          </div>
          <h3 className="text-xl font-bold text-white">No trips yet!</h3>
          <p className="text-slate-400 max-w-md text-sm leading-relaxed">
            You haven't booked any properties yet. Explore our listings and find your perfect getaway.
          </p>
          <Link
            to="/explore"
            className="mt-2 bg-brand hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-2xl transition-all hover:scale-105 shadow-[0_8px_25px_rgba(246,86,0,0.3)]"
          >
            Explore Properties
          </Link>
        </motion.div>
      )}

      {/* ── Charts (only if has data) ── */}
      {hasData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Monthly Trips Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="bg-[#121217]/80 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 md:p-8"
          >
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-1">My Trips (Last 6 Months)</h3>
              <p className="text-sm text-slate-500">Number of trips per month</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="tripGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#F65600" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#F65600" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="trips"
                  stroke="#F65600"
                  strokeWidth={3}
                  fill="url(#tripGradient)"
                  dot={{ fill: '#F65600', strokeWidth: 2, r: 4, stroke: '#09090b' }}
                  activeDot={{ r: 7, stroke: '#F65600', strokeWidth: 2, fill: '#fff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Monthly Spend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="bg-[#121217]/80 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 md:p-8"
          >
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-1">My Spending (Last 6 Months)</h3>
              <p className="text-sm text-slate-500">Total amount spent per month</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#F65600" stopOpacity={1} />
                    <stop offset="100%" stopColor="#c2410c" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => v > 0 ? `$${v}` : '0'} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="spent" fill="url(#spendGradient)" radius={[8, 8, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

        </div>
      )}

      {/* ── Recent Trips ── */}
      {hasData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="bg-[#121217]/80 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Recent Trips</h3>
              <p className="text-sm text-slate-500">Your latest bookings at a glance</p>
            </div>
            <Link
              to="/dashboard"
              className="text-sm text-brand hover:text-orange-400 font-bold flex items-center gap-1 transition-colors"
            >
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {reservations.slice(0, 4).map((r: any, i: number) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="flex items-center gap-4 p-4 bg-black/30 border border-white/5 rounded-2xl hover:border-white/10 transition-all"
              >
                {r.image ? (
                  <img src={r.image} alt={r.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-brand" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm truncate">{r.title || 'Property'}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{r.location || 'Unknown location'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <Clock className="w-3 h-3 shrink-0" />
                    <span>{r.checkIn || 'N/A'} → {r.checkOut || 'N/A'}</span>
                  </div>
                </div>
                <div className="text-right shrink-0 flex flex-col items-end">
                  {r.status === 'Rejected' ? (
                    <>
                      <p className="text-emerald-400 font-black text-base">
                        Refunded ${(r.refundAmount || r.totalPrice || 0).toLocaleString()}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium mb-1">Removed from total spent</p>
                    </>
                  ) : (
                    <>
                      <p className="text-white font-black text-base">${(r.totalPrice || 0).toLocaleString()}</p>
                      <p className="text-[10px] text-slate-500 font-medium mb-1">
                        ${r.pricePerNight} × {r.nights} night{r.nights > 1 ? 's' : ''}
                      </p>
                    </>
                  )}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    r.status === 'Confirmed'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                      : r.status === 'Rejected'
                        ? 'bg-red-500/15 text-red-400 border border-red-500/20'
                        : 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20'
                  }`}>
                    {r.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

    </div>
  );
};

export default UserStats;
