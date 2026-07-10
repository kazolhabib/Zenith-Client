import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Sliders, ChevronLeft, ChevronRight, Star, Mail, Sparkles } from 'lucide-react';
import { LISTINGS_DATA } from '@/data/listings';
import { ListingCard } from '@/components/listings/ListingCard';
import api from '@/config/api';
import CallToAction from '@/components/home/CallToAction';

const ITEMS_PER_PAGE = 12;

export const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [minRating, setMinRating] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState('recommended');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [allListings, setAllListings] = useState<any[]>([]);

  // Fetch listings on mount
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await api.get('/listings');
        setAllListings(data);
      } catch (error) {
        console.warn('API not reachable, falling back to mock data');
        setAllListings(LISTINGS_DATA);
      } finally {
        setLoading(false);
      }
    };
    
    window.scrollTo(0, 0);
    fetchListings();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, maxPrice, minRating, sortBy]);

  // Derived state for filtered and sorted data
  const filteredData = useMemo(() => {
    let result = allListings;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(lowerSearch) || 
        item.location.toLowerCase().includes(lowerSearch)
      );
    }

    if (maxPrice !== '') {
      result = result.filter(item => item.price <= maxPrice);
    }

    if (minRating !== '') {
      result = result.filter(item => item.rating >= minRating);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'recommended' - just keep default order
        break;
    }

    return result;
  }, [allListings, searchTerm, maxPrice, minRating, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 selection:bg-brand/30 pt-40 md:pt-48 pb-20">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-10%] w-[30%] h-[40%] rounded-full bg-brand/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[101.25rem] relative z-10">
        
        {/* Header Area */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">Properties</span>
          </h1>
          <p className="text-slate-400 text-lg">Find the perfect place for your next adventure.</p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-[#121217]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 mb-12 shadow-2xl flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          {/* Search */}
          <div className="relative w-full lg:w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by title or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-brand/50 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <select 
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
                className="bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white appearance-none focus:outline-none focus:border-brand/50 cursor-pointer"
              >
                <option value="">Any Price</option>
                <option value="200">Under $200</option>
                <option value="500">Under $500</option>
                <option value="1000">Under $1000</option>
                <option value="2000">Under $2000</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-slate-400" />
              <select 
                value={minRating}
                onChange={(e) => setMinRating(e.target.value ? Number(e.target.value) : '')}
                className="bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white appearance-none focus:outline-none focus:border-brand/50 cursor-pointer"
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.8">4.8+ Stars</option>
                <option value="4.9">4.9+ Stars</option>
              </select>
            </div>

            <div className="flex items-center gap-2 lg:ml-auto">
              <Sliders className="w-5 h-5 text-slate-400" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white appearance-none focus:outline-none focus:border-brand/50 cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8 text-slate-400 font-medium">
          Showing {currentData.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} of {filteredData.length} listings
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : currentData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-12">
            {currentData.map((item, index) => (
              <ListingCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No listings found</h3>
            <p className="text-slate-400">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => { setSearchTerm(''); setMaxPrice(''); setMinRating(''); setSortBy('recommended'); }}
              className="mt-6 text-brand hover:text-orange-400 font-medium transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 hover:border-brand/50 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    currentPage === i + 1 
                      ? 'bg-brand text-white shadow-[0_0_20px_rgba(246,86,0,0.4)]' 
                      : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 hover:border-brand/50 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Newsletter / CTA Section */}
        <div className="mt-24 md:mt-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-brand/20 to-orange-500/20 rounded-[3rem] blur-2xl opacity-50" />
          <div className="relative bg-[#121217]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 md:p-16 lg:p-20 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />
            
            <div className="flex-1 max-w-2xl relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand text-sm font-bold tracking-wide uppercase mb-6">
                <Sparkles className="w-4 h-4" />
                Unlock Secret Deals
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                Get up to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">50% off</span> your next adventure
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Subscribe to our newsletter and be the first to know about exclusive member-only discounts, new luxury properties, and travel inspiration.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto md:mx-0">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all font-medium"
                  />
                </div>
                <button className="bg-gradient-to-r from-brand to-orange-500 text-white font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(246,86,0,0.3)] shrink-0">
                  Subscribe Now
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-4 font-medium">We care about your data. Read our Privacy Policy.</p>
            </div>
            
            <div className="flex-1 hidden lg:flex justify-end relative z-10">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand to-orange-400 rounded-full blur-3xl opacity-20 animate-pulse" />
                <img 
                  src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80" 
                  alt="Travel Inspiration" 
                  className="w-full h-full object-cover rounded-[2.5rem] border-4 border-[#121217] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
                />
                <div className="absolute -bottom-6 -left-6 bg-[#121217] border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Star className="w-5 h-5 fill-emerald-400" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">4.9/5 Rating</div>
                    <div className="text-slate-400 text-xs">Based on 10k+ reviews</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
      </div>

      {/* Call to Action */}
      <CallToAction />
    </div>
  );
};
