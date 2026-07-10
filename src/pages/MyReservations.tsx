import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Trash2, MapPin, Users, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export const MyReservations = ({ isEmbedded = false }: { isEmbedded?: boolean }) => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<any[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [resToDelete, setResToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = () => {
      const stored = localStorage.getItem('my_reservations');
      if (stored) {
        const allReservations = JSON.parse(stored);
        // Only show reservations belonging to the current user
        const userReservations = allReservations.filter((r: any) => r.userId === user?.id);
        setReservations(userReservations);
      }
    };
    fetchReservations();
  }, [user?.id]);

  const confirmDelete = () => {
    if (!resToDelete) return;
    const stored = localStorage.getItem('my_reservations');
    if (stored) {
      const allReservations = JSON.parse(stored);
      const updatedAll = allReservations.filter((r: any) => r.id !== resToDelete);
      localStorage.setItem('my_reservations', JSON.stringify(updatedAll));
      setReservations(reservations.filter(r => r.id !== resToDelete));
    }
    setDeleteModalOpen(false);
    setResToDelete(null);
  };

  const content = (
    <>
      {/* Table (Desktop) / Cards (Mobile & Tablet) */}
      <div className="lg:bg-[#121217]/80 lg:backdrop-blur-2xl lg:border lg:border-white/10 lg:rounded-3xl lg:overflow-hidden lg:shadow-2xl">
        {/* Desktop View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 bg-black/20 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-6 font-medium">Property</th>
                <th className="p-6 font-medium">Dates</th>
                <th className="p-6 font-medium">Guests</th>
                <th className="p-6 font-medium">Status</th>
                <th className="p-6 font-medium text-right">Actions</th>
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
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-bold text-white mb-1 group-hover:text-brand transition-colors truncate max-w-[200px]">
                              {item.title}
                            </div>
                            <div className="flex items-center gap-1 text-slate-400 text-xs">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate max-w-[180px]">{item.location}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="text-sm text-white font-medium">{item.checkIn}</div>
                        <div className="text-xs text-slate-400">to {item.checkOut}</div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Users className="w-4 h-4 text-slate-500" />
                          {item.guests}
                        </div>
                      </td>
                      <td className="p-6">
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
                              <span className="text-[10px] text-slate-500 max-w-[180px] truncate block italic" title={item.rejectionReason}>
                                Reason: {item.rejectionReason}
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="p-6">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setResToDelete(item.id);
                              setDeleteModalOpen(true);
                            }}
                            className="w-10 h-10 p-0 rounded-xl bg-red-500/10 border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
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
                        <p className="text-lg font-medium text-white mb-1">No reservations found</p>
                        <p className="text-sm">You haven't booked any properties yet.</p>
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
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
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

                <div className="flex flex-col gap-3 mt-1 w-full">
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
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setResToDelete(item.id);
                          setDeleteModalOpen(true);
                        }}
                        className="h-10 px-4 rounded-xl bg-red-500/10 border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 transition-colors flex items-center gap-2 text-xs font-bold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Cancel
                      </Button>
                    </div>
                  </div>

                  {item.status === 'Rejected' && item.rejectionReason && (
                    <div className="text-xs bg-red-500/5 border border-red-500/10 p-2.5 rounded-lg text-slate-400">
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
                <p className="text-lg font-medium text-white mb-1">No reservations found</p>
                <p className="text-sm">You haven't booked any properties yet.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setDeleteModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#121217] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-white">Cancel Reservation?</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Are you sure you want to cancel this reservation? This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <Button 
                  variant="outline" 
                  className="bg-transparent border-white/10 text-white hover:bg-white/5 h-10 px-6 rounded-xl"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Keep
                </Button>
                <Button 
                  className="bg-red-500 hover:bg-red-600 text-white h-10 px-6 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all"
                  onClick={confirmDelete}
                >
                  Cancel Booking
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
        {content}
      </div>
    </div>
  );
};

export default MyReservations;
