import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Trash2, MapPin, Star, Plus } from 'lucide-react';
import { LISTINGS_DATA } from '@/data/listings';
import { Button } from '@/components/ui/button';

export const ManageListings = () => {
  const [listings, setListings] = useState(LISTINGS_DATA);

  const handleDelete = (id: number) => {
    // In a real app, this would be an API call
    if (window.confirm('Are you sure you want to delete this listing?')) {
      setListings(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 selection:bg-brand/30 pt-24 pb-20">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[30%] h-[40%] rounded-full bg-brand/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[101.25rem] relative z-10">
        
        {/* Header */}
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

        {/* Table / Grid */}
        <div className="bg-[#121217]/80 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
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
                            <Link to={`/listings/${item.id}`}>
                              <Button variant="outline" className="w-10 h-10 p-0 rounded-xl bg-white/5 border-white/10 hover:bg-white/10 hover:text-white text-slate-400 transition-colors">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button 
                              variant="outline" 
                              onClick={() => handleDelete(item.id)}
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
        </div>
      </div>
    </div>
  );
};

export default ManageListings;
