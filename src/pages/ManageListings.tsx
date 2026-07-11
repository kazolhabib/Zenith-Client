import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Trash2, MapPin, Star, Plus, AlertTriangle, Edit, Image as ImageIcon, DollarSign, Calendar, Type, AlignLeft, X } from 'lucide-react';
import { LISTINGS_DATA } from '@/data/listings';
import { Button } from '@/components/ui/button';
import api from '@/config/api';
import { useAuth } from '@/context/AuthContext';

export const ManageListings = ({ isEmbedded = false }: { isEmbedded?: boolean }) => {
  const { user } = useAuth();
  const [listings, setListings] = useState<any[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<string | number | null>(null);

  // Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editListingId, setEditListingId] = useState<string | number | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editFormData, setEditFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    location: '',
    date: '',
    imageUrl: '',
    image2Url: '',
    image3Url: '',
    image4Url: '',
    guests: '4',
    bedrooms: '2',
    beds: '2',
    baths: '1',
  });

  const handleEditChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenEdit = async (item: any) => {
    const id = item._id || item.id;
    setEditListingId(id);
    
    // Immediate pre-population
    setEditFormData({
      title: item.title || '',
      shortDescription: item.description || '',
      fullDescription: item.fullDescription || '',
      price: String(item.price || ''),
      location: item.location || '',
      date: item.date || '',
      imageUrl: item.image || '',
      image2Url: item.images?.[1] || '',
      image3Url: item.images?.[2] || '',
      image4Url: item.images?.[3] || '',
      guests: String(item.specs?.guests || '4'),
      bedrooms: String(item.specs?.bedrooms || '2'),
      beds: String(item.specs?.beds || '2'),
      baths: String(item.specs?.baths || '1'),
    });
    setEditModalOpen(true);

    // Fetch fresh database details in background
    try {
      const { data } = await api.get(`/listings/${id}`);
      setEditFormData({
        title: data.title || '',
        shortDescription: data.description || '',
        fullDescription: data.fullDescription || '',
        price: String(data.price || ''),
        location: data.location || '',
        date: data.date || '',
        imageUrl: data.image || '',
        image2Url: data.images?.[1] || '',
        image3Url: data.images?.[2] || '',
        image4Url: data.images?.[3] || '',
        guests: String(data.specs?.guests || '4'),
        bedrooms: String(data.specs?.bedrooms || '2'),
        beds: String(data.specs?.beds || '2'),
        baths: String(data.specs?.baths || '1'),
      });
    } catch (error) {
      console.warn('Could not fetch fresh listing details, using current listings state');
    }
  };

  const handleSaveEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editListingId) return;
    setEditLoading(true);
    try {
      const payload = {
        title: editFormData.title,
        description: editFormData.shortDescription,
        fullDescription: editFormData.fullDescription,
        price: Number(editFormData.price),
        location: editFormData.location,
        date: editFormData.date,
        image: editFormData.imageUrl,
        images: [
          editFormData.imageUrl,
          editFormData.image2Url || editFormData.imageUrl,
          editFormData.image3Url || editFormData.imageUrl,
          editFormData.image4Url || editFormData.imageUrl
        ],
        specs: {
          guests: Number(editFormData.guests) || 4,
          bedrooms: Number(editFormData.bedrooms) || 2,
          beds: Number(editFormData.beds) || 2,
          baths: Number(editFormData.baths) || 1
        }
      };

      const { data } = await api.put(`/listings/${editListingId}`, payload);
      
      // Update local state list instantly
      setListings(prev => prev.map(item => (item.id === editListingId || item._id === editListingId) ? data : item));
      setEditModalOpen(false);
      setEditListingId(null);
    } catch (error) {
      console.error('Error updating listing:', error);
      alert('Failed to update listing');
    } finally {
      setEditLoading(false);
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const endpoint = user?.role === 'admin' ? '/listings' : '/listings/my';
        const { data } = await api.get(endpoint);
        setListings(data);
      } catch (error) {
        console.warn('API not reachable, falling back to mock data');
        setListings(user?.role === 'admin' ? LISTINGS_DATA : LISTINGS_DATA.slice(0, 3));
      } finally {
        setLoading(false);
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
                              <Button variant="outline" className="w-10 h-10 p-0 rounded-xl bg-white/5 border-white/10 hover:bg-white/10 hover:text-white text-slate-400 transition-colors" title="View Details">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                             <Button 
                               variant="outline" 
                               onClick={() => handleOpenEdit(item)}
                               className="w-10 h-10 p-0 rounded-xl bg-white/5 border-white/10 hover:bg-white/10 hover:text-white text-slate-400 transition-colors"
                               title="Edit Property"
                             >
                               <Edit className="w-4 h-4" />
                             </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setListingToDelete(item._id || item.id);
                                setDeleteModalOpen(true);
                              }}
                              className="w-10 h-10 p-0 rounded-xl bg-red-500/10 border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 transition-colors"
                              title="Delete Property"
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

                  <div className="flex flex-col gap-4 mt-2">
                     <div className="flex items-center justify-between">
                       <div>
                         <span className="text-slate-500 text-[10px] block mb-1 font-semibold uppercase tracking-wider">Rating</span>
                         <div className="flex items-center gap-1.5 bg-white/5 w-max px-2.5 py-1 rounded-full text-xs font-medium border border-white/5">
                           <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                           {item.rating}
                         </div>
                       </div>
                     </div>

                     <div className="grid grid-cols-3 gap-2 w-full">
                       <Link to={`/listings/${item._id || item.id}`}>
                         <Button variant="outline" className="w-full h-10 px-0 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-slate-400 transition-colors flex items-center justify-center gap-1 text-[11px] font-bold">
                           <Eye className="w-3.5 h-3.5" />
                           View
                         </Button>
                       </Link>
                       <Button 
                         variant="outline" 
                         onClick={() => handleOpenEdit(item)}
                         className="w-full h-10 px-0 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-slate-400 transition-colors flex items-center justify-center gap-1 text-[11px] font-bold"
                       >
                         <Edit className="w-3.5 h-3.5" />
                         Edit
                       </Button>
                       <Button 
                         variant="outline" 
                         onClick={() => {
                           setListingToDelete(item._id || item.id);
                           setDeleteModalOpen(true);
                         }}
                         className="w-full h-10 px-0 rounded-xl bg-red-500/10 border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 transition-colors flex items-center justify-center gap-1 text-[11px] font-bold"
                       >
                         <Trash2 className="w-3.5 h-3.5" />
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
        {createPortal(
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
          </AnimatePresence>,
          document.body
        )}

        {/* Edit Property Details Modal */}
        {createPortal(
          <AnimatePresence>
            {editModalOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/70 backdrop-blur-md"
                  onClick={() => setEditModalOpen(false)}
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative bg-[#121217] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-3xl shadow-2xl overflow-y-auto max-h-[90vh] z-10 text-left"
                >
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand to-orange-500" />
                  
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Edit Property</h3>
                      <p className="text-slate-400 text-xs mt-1">Modify your listing information and save changes below.</p>
                    </div>
                    <button 
                      onClick={() => setEditModalOpen(false)}
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:bg-white/10"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveEdit} className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Listing Title *</label>
                      <div className="relative">
                        <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          type="text" 
                          name="title"
                          required
                          value={editFormData.title}
                          onChange={handleEditChange}
                          placeholder="e.g. Luxury Beachfront Villa"
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* Short Description */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Short Description *</label>
                      <div className="relative">
                        <AlignLeft className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          type="text" 
                          name="shortDescription"
                          required
                          value={editFormData.shortDescription}
                          onChange={handleEditChange}
                          placeholder="A brief summary for the listing card..."
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* Full Description */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Description *</label>
                      <textarea 
                        name="fullDescription"
                        required
                        value={editFormData.fullDescription}
                        onChange={handleEditChange}
                        placeholder="Detailed description about the property..."
                        rows={4}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all resize-none text-sm"
                      ></textarea>
                    </div>

                    {/* Price, Location, Date Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Price (per night) *</label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input 
                            type="number" 
                            name="price"
                            required
                            value={editFormData.price}
                            onChange={handleEditChange}
                            placeholder="250"
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all text-sm"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Location *</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input 
                            type="text" 
                            name="location"
                            required
                            value={editFormData.location}
                            onChange={handleEditChange}
                            placeholder="e.g. Bali, Indonesia"
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Availability Date *</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input 
                            type="date" 
                            name="date"
                            required
                            value={editFormData.date}
                            onChange={handleEditChange}
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all [color-scheme:dark] text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Max Guests</label>
                        <input 
                          type="number" 
                          name="guests"
                          value={editFormData.guests}
                          onChange={handleEditChange}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Bedrooms</label>
                        <input 
                          type="number" 
                          name="bedrooms"
                          value={editFormData.bedrooms}
                          onChange={handleEditChange}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Beds</label>
                        <input 
                          type="number" 
                          name="beds"
                          value={editFormData.beds}
                          onChange={handleEditChange}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Bathrooms</label>
                        <input 
                          type="number" 
                          name="baths"
                          step="0.5"
                          value={editFormData.baths}
                          onChange={handleEditChange}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* Multiple Images Grid */}
                    <div className="space-y-4">
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Property Images (URLs)</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Image 1 (Cover) *</label>
                          <div className="relative">
                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                            <input 
                              type="url" 
                              name="imageUrl"
                              required
                              value={editFormData.imageUrl}
                              onChange={handleEditChange}
                              className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-10 pr-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all text-xs"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Image 2 (Gallery)</label>
                          <div className="relative">
                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                            <input 
                              type="url" 
                              name="image2Url"
                              value={editFormData.image2Url}
                              onChange={handleEditChange}
                              className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-10 pr-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all text-xs"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Image 3 (Gallery)</label>
                          <div className="relative">
                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                            <input 
                              type="url" 
                              name="image3Url"
                              value={editFormData.image3Url}
                              onChange={handleEditChange}
                              className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-10 pr-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all text-xs"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Image 4 (Gallery)</label>
                          <div className="relative">
                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                            <input 
                              type="url" 
                              name="image4Url"
                              value={editFormData.image4Url}
                              onChange={handleEditChange}
                              className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-10 pr-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-white/5 mt-8">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="bg-transparent border-white/10 text-white hover:bg-white/5 h-12 px-6 rounded-xl"
                        onClick={() => setEditModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        disabled={editLoading}
                        className="bg-brand hover:bg-orange-600 text-white h-12 px-8 rounded-xl shadow-[0_0_15px_rgba(246,86,0,0.3)] transition-all font-bold flex items-center justify-center gap-2"
                      >
                        {editLoading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Plus className="w-5 h-5" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </>
    );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[300px]">
        <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 text-sm font-medium">Loading properties...</p>
      </div>
    );
  }

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
