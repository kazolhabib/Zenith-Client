import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const getReservationTotal = (reservation: any) => {
  const savedTotal = Number(reservation.totalPrice);
  if (Number.isFinite(savedTotal) && savedTotal > 0) {
    return savedTotal;
  }

  const pricePerNight = typeof reservation.price === 'number'
    ? reservation.price
    : Number(String(reservation.price || '0').replace(/[^0-9.]/g, '')) || 0;

  const checkIn = new Date(reservation.checkIn);
  const checkOut = new Date(reservation.checkOut);
  const nights = reservation.checkIn && reservation.checkOut
    ? Math.max(1, Math.ceil(Math.abs(checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)))
    : 1;

  return pricePerNight * nights;
};

export const AllReservations = ({ isEmbedded = false }: { isEmbedded?: boolean }) => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [resToReject, setResToReject] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const templateReasons = [
    "Property undergoing maintenance on requested dates.",
    "The property is fully booked during this period.",
    "Minimum stay requirement not met for this listing.",
    "Scheduled property renovation and upgrades."
  ];

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

  const confirmRejection = () => {
    if (!resToReject) return;
    const finalReason = rejectionReason.trim() || "No specific reason provided.";
    const updated = reservations.map(r => 
      r.id === resToReject 
        ? {
            ...r,
            status: 'Rejected',
            rejectionReason: finalReason,
            refundAmount: getReservationTotal(r),
            refundedAt: new Date().toISOString(),
          }
        : r
    );
    setReservations(updated);
    localStorage.setItem('my_reservations', JSON.stringify(updated));
    setRejectModalOpen(false);
    setResToReject(null);
    setRejectionReason('');
  };

  const content = (
    <>
      {isEmbedded && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Manage All Reservations</h2>
          <span className="bg-brand/20 text-brand px-3 py-1 rounded-full text-xs font-bold border border-brand/20">Admin Panel</span>
        </div>
      )}

      {/* Table (Desktop) / Cards (Mobile & Tablet) */}
      <div className="lg:bg-[#121217]/80 lg:backdrop-blur-2xl lg:border lg:border-white/10 lg:rounded-3xl lg:overflow-hidden lg:shadow-2xl">
        {/* Desktop View */}
        <div className="hidden lg:block overflow-x-auto">
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
                              <MapPin className="w-3.5 h-3.5" />
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
                          <div className="flex flex-col gap-1 items-start">
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                              Rejected
                            </span>
                            {item.rejectionReason && (
                              <span className="text-xs text-slate-400 mt-1 block italic max-w-[220px] whitespace-normal leading-relaxed" title={item.rejectionReason}>
                                Reason: {item.rejectionReason}
                              </span>
                            )}
                          </div>
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
                              onClick={() => {
                                setResToReject(item.id);
                                setRejectModalOpen(true);
                              }}
                              className="w-9 h-9 p-0 rounded-lg bg-red-500/10 border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 transition-colors"
                              title="Reject with Reason"
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
                              <div className="flex flex-col items-end gap-1">
                                <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg text-red-400 text-xs font-semibold shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>Rejected</span>
                                </div>
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

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden space-y-4">
          {reservations.length > 0 ? (
            reservations.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#121217]/90 border border-white/5 hover:border-brand/20 p-5 rounded-2xl flex flex-col gap-4 relative overflow-hidden transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white mb-1 truncate text-base">{item.title}</h4>
                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-white/5 w-full" />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500 text-xs block mb-1 font-semibold uppercase tracking-wider">Dates</span>
                    <span className="text-slate-200 font-medium block">{item.checkIn}</span>
                    <span className="text-slate-400 text-xs block">to {item.checkOut}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block mb-1 font-semibold uppercase tracking-wider">Guests</span>
                    <div className="flex items-center gap-2 text-slate-200 font-medium">
                      <Users className="w-4 h-4 text-slate-500" />
                      {item.guests} Stays
                    </div>
                  </div>
                </div>

                <div className="h-px bg-white/5 w-full" />

                <div className="flex flex-col gap-3 mt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-500 text-xs block mb-1.5 font-semibold uppercase tracking-wider">Status</span>
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
                    </div>

                    <div className="flex items-end h-full">
                      {item.status === 'Pending' ? (
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            onClick={() => handleUpdateStatus(item.id, 'Confirmed')}
                            className="h-10 px-4 rounded-xl bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500 hover:text-white text-emerald-400 transition-colors flex items-center gap-1.5 text-xs font-bold"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            Accept
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setResToReject(item.id);
                              setRejectModalOpen(true);
                            }}
                            className="h-10 px-4 rounded-xl bg-red-500/10 border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 transition-colors flex items-center gap-1.5 text-xs font-bold"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <div>
                          {item.status === 'Confirmed' ? (
                            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-emerald-400 text-xs font-semibold">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Confirmed</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg text-red-400 text-xs font-semibold">
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Rejected</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {item.status === 'Rejected' && item.rejectionReason && (
                    <div className="text-sm bg-red-500/5 border border-red-500/10 p-3.5 rounded-xl text-slate-300 leading-relaxed">
                      <span className="font-bold text-red-400">Rejection Reason:</span> {item.rejectionReason}
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-12 text-center text-slate-400 bg-[#121217]/50 rounded-2xl border border-white/5">
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-slate-600" />
                </div>
                <p className="text-lg font-medium text-white mb-1">No reservations</p>
                <p className="text-sm">There are no bookings in the system yet.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reject Reservation Reason Modal */}
      <AnimatePresence>
        {rejectModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setRejectModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#121217] border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold text-white">Provide Rejection Reason</h3>
                  <p className="text-sm text-slate-400">
                    Explain to the user why their reservation cannot be accepted.
                  </p>
                </div>
              </div>

              {/* Quick Template Reasons */}
              <div className="mb-6">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">Quick Templates:</span>
                <div className="flex flex-wrap gap-2">
                  {templateReasons.map((t, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRejectionReason(t)}
                      className="text-xs bg-white/5 border border-white/10 hover:border-brand/40 hover:bg-brand/5 text-slate-300 rounded-lg px-3 py-2 transition-all text-left"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reason Input */}
              <div className="space-y-2 mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Custom Reason:</label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter rejection details..."
                  rows={3}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all resize-none text-sm"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  className="bg-transparent border-white/10 text-white hover:bg-white/5 h-10 px-6 rounded-xl"
                  onClick={() => {
                    setRejectModalOpen(false);
                    setResToReject(null);
                    setRejectionReason('');
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-red-500 hover:bg-red-600 text-white h-10 px-6 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all font-bold"
                  onClick={confirmRejection}
                >
                  Confirm Rejection
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
