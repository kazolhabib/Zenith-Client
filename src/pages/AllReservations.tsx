import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Trash2, MapPin, Users, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AllReservations = ({ isEmbedded = false }: { isEmbedded?: boolean }) => {
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    const fetchReservations = () => {
      const stored = localStorage.getItem('my_reservations');
      if (stored) {
        setReservations(JSON.parse(stored));
      }
    };
    fetchReservations();
  }, []);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    const updated = reservations.map(r => r.id === id ? { ...r, status: newStatus } : r);
    setReservations(updated);
    localStorage.setItem('my_reservations', JSON.stringify(updated));
  };

  const content = (
    <>
      {isEmbedded && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Manage All Reservations</h2>
          <span className="bg-brand/20 text-brand px-3 py-1 rounded-full text-xs font-bold border border-brand/20">Admin Panel</span>
        </div>
      )}

      {/* Table / Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 bg-black/20 text-slate-400 text-sm uppercase tracking-wider">
              <th className="p-4 md:p-6 font-medium">Property</th>
              <th className="p-4 md:p-6 font-medium">Dates</th>
              <th className="p-4 md:p-6 font-medium">Guests</th>
              <th className="p-4 md:p-6 font-medium">Status</th>
              <th className="p-4 md:p-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {reservations.length > 0 ? (
                reservations.map((item) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="p-4 md:p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-white mb-1 group-hover:text-brand transition-colors truncate max-w-[150px] md:max-w-[200px]">
                            {item.title}
                          </div>
                          <div className="flex items-center gap-1 text-slate-400 text-xs">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate max-w-[120px] md:max-w-[180px]">{item.location}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 md:p-6">
                      <div className="text-sm text-white font-medium">{item.checkIn}</div>
                      <div className="text-xs text-slate-400">to {item.checkOut}</div>
                    </td>
                    <td className="p-4 md:p-6">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Users className="w-4 h-4 text-slate-500" />
                        {item.guests}
                      </div>
                    </td>
                    <td className="p-4 md:p-6">
                      {item.status === 'Pending' && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                          Pending
                        </span>
                      )}
                      {item.status === 'Confirmed' && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Confirmed
                        </span>
                      )}
                      {item.status === 'Rejected' && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="p-4 md:p-6">
                      {item.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="outline" 
                            onClick={() => handleUpdateStatus(item.id, 'Confirmed')}
                            className="w-9 h-9 p-0 rounded-lg bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500 hover:text-white text-emerald-400 transition-colors"
                            title="Accept"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => handleUpdateStatus(item.id, 'Rejected')}
                            className="w-9 h-9 p-0 rounded-lg bg-red-500/10 border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 transition-colors"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end">
                          {item.status === 'Confirmed' ? (
                            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-emerald-400 text-xs font-semibold shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Already Confirmed</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg text-red-400 text-xs font-semibold shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Rejected</span>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <Calendar className="w-8 h-8 text-slate-600" />
                      </div>
                      <p className="text-lg font-medium text-white mb-1">No reservations</p>
                      <p className="text-sm">There are no bookings in the system yet.</p>
                    </div>
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </>
  );

  if (isEmbedded) {
    return <>{content}</>;
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 selection:bg-brand/30 pt-32 md:pt-40 pb-20">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[30%] h-[40%] rounded-full bg-brand/5 blur-[120px]" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[101.25rem] relative z-10">
        <div className="bg-[#121217]/80 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8">
          {content}
        </div>
      </div>
    </div>
  );
};

export default AllReservations;
