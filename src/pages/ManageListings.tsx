import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Trash2, MapPin, Star, Plus, AlertTriangle } from 'lucide-react';
import { LISTINGS_DATA } from '@/data/listings';
import { Button } from '@/components/ui/button';
import api from '@/config/api';
import { useAuth } from '@/context/AuthContext';

export const ManageListings = ({ isEmbedded = false }: { isEmbedded?: boolean }) => {
  const { user } = useAuth();
  const [listings, setListings] = useState<any[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<string | number | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const endpoint = user?.role === 'admin' ? '/listings' : '/listings/my';
        const { data } = await api.get(endpoint);
        setListings(data);
      } catch (error) {
        console.warn('API not reachable, falling back to mock data');
        setListings(user?.role === 'admin' ? LISTINGS_DATA : LISTINGS_DATA.slice(0, 3));
      }
    };
    if (user) {
      fetchListings();
    }
  }, [user]);

  const confirmDelete = async () => {
    if (!listingToDelete) return;
    try {
      await api.delete(`/listings/${listingToDelete}`);
      setListings(prev => prev.filter(item => item.id !== listingToDelete && item._id !== listingToDelete));
    } catch (error) {
      console.warn('Delete via API failed, doing locally for mock');
      setListings(prev => prev.filter(item => item.id !== listingToDelete && item._id !== listingToDelete));
    } finally {
      setDeleteModalOpen(false);
      setListingToDelete(null);
    }
  };

  const content = (
    <>
      {/* Header - Only show if not embedded */}
      {!isEmbedded && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
              Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">Listings</span>
            </h1>
            <p className="text-slate-400">View, edit, and delete your property listings.</p>
          </div>
          <Link to="/items/add">
            <Button className="bg-brand hover:bg-orange-600 text-white rounded-xl h-11 px-6 flex items-center gap-2 shadow-[0_0_20px_rgba(246,86,0,0.3)] transition-all">
              <Plus className="w-4 h-4" />
              Add New Listing
            </Button>
          </Link>
        </div>
      )}

      {/* Embedded Header */}
      {isEmbedded && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">My Properties</h2>
          <Link to="/items/add">
            <Button className="bg-brand hover:bg-orange-600 text-white rounded-xl h-10 px-5 flex items-center gap-2 shadow-[0_0_15px_rgba(246,86,0,0.3)] transition-all text-sm">
              <Plus className="w-4 h-4" />
              Add New
            </Button>
          </Link>
        </div>
      )}

        {/* Table (Desktop) / Cards (Mobile & Tablet) */}
        <div className="lg:bg-[#121217]/80 lg:backdrop-blur-2xl lg:border lg:border-white/10 lg:rounded-3xl lg:overflow-hidden lg:shadow-2xl">
          {/* Desktop View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-black/20 text-slate-400 text-sm uppercase tracking-wider">
                  <th className="p-6 font-medium">Property</th>
                  <th className="p-6 font-medium">Location</th>
                  <th className="p-6 font-medium">Price</th>
                  <th className="p-6 font-medium">Rating</th>
                  <th className="p-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {listings.length > 0 ? (
                    listings.map((item) => (
                      <motion.tr 
                        key={item._id || item.id}
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
                              <h3 className="text-white font-bold text-base mb-1 line-clamp-1 group-hover:text-brand transition-colors">{item.title}</h3>
                              <p className="text-slate-500 text-xs line-clamp-1 max-w-[200px] lg:max-w-[300px]">{item.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-1.5 text-slate-300">
                            <MapPin className="w-4 h-4 text-slate-500" />
                            {item.location}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="font-bold text-white">
                            ${item.price} <span className="text-xs text-slate-500 font-normal">/ night</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-1.5 bg-white/5 w-max px-2.5 py-1 rounded-full text-sm font-medium border border-white/5">
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                            {item.rating}
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-2">
                            <Link to={`/listings/${item._id || item.id}`}>
                              <Button variant="outline" className="w-10 h-10 p-0 rounded-xl bg-white/5 border-white/10 hover:bg-white/10 hover:text-white text-slate-400 transition-colors">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setListingToDelete(item._id || item.id);
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
                            <Trash2 className="w-8 h-8 text-slate-600" />
                          </div>
                          <p className="text-lg font-medium text-white mb-1">No listings found</p>
                          <p className="text-sm">You have deleted all your listings.</p>
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
            {listings.length > 0 ? (
              listings.map((item) => (
                <motion.div
                  key={item._id || item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#121217]/90 border border-white/5 hover:border-brand/20 p-5 rounded-2xl flex flex-col gap-4 relative overflow-hidden transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-white mb-1 truncate text-base group-hover:text-brand transition-colors">{item.title}</h3>
                      <p className="text-slate-500 text-xs truncate max-w-full">{item.description}</p>
                    </div>
                  </div>

                  <div className="h-px bg-white/5 w-full" />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500 text-xs block mb-1 font-semibold uppercase tracking-wider">Location</span>
                      <div className="flex items-center gap-1 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs block mb-1 font-semibold uppercase tracking-wider">Price</span>
                      <div className="font-bold text-white">
                        ${item.price} <span className="text-xs text-slate-500 font-normal">/ night</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-white/5 w-full" />

                  <div className="flex items-center justify-between mt-1">
                    <div>
                      <span className="text-slate-500 text-xs block mb-1.5 font-semibold uppercase tracking-wider">Rating</span>
                      <div className="flex items-center gap-1.5 bg-white/5 w-max px-2.5 py-1 rounded-full text-xs font-medium border border-white/5">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        {item.rating}
                      </div>
                    </div>

                    <div className="flex items-end h-full gap-2">
                      <Link to={`/listings/${item._id || item.id}`}>
                        <Button variant="outline" className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-slate-400 transition-colors flex items-center gap-1.5 text-xs font-bold">
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setListingToDelete(item._id || item.id);
                          setDeleteModalOpen(true);
                        }}
                        className="h-10 px-4 rounded-xl bg-red-500/10 border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 transition-colors flex items-center gap-1.5 text-xs font-bold"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-400 bg-[#121217]/50 rounded-2xl border border-white/5">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Trash2 className="w-8 h-8 text-slate-600" />
                  </div>
                  <p className="text-lg font-medium text-white mb-1">No listings found</p>
                  <p className="text-sm">You have deleted all your listings.</p>
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
                    <h3 className="text-xl font-bold text-white">Delete Listing?</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Are you sure you want to delete this listing? This action cannot be undone and the property will be permanently removed.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-8">
                  <Button 
                    variant="outline" 
                    className="bg-transparent border-white/10 text-white hover:bg-white/5 h-10 px-6 rounded-xl"
                    onClick={() => setDeleteModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-red-500 hover:bg-red-600 text-white h-10 px-6 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all"
                    onClick={confirmDelete}
                  >
                    Delete
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

export default ManageListings;
