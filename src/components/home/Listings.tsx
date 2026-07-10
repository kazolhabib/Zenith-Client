import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LISTINGS_DATA } from '@/data/listings';
import { ListingCard } from '@/components/listings/ListingCard';
import api from '@/config/api';

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="flex flex-col h-full bg-[#121217]/80 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-lg animate-pulse">
    <div className="w-full h-48 bg-white/5" />
    <div className="p-6 flex flex-col flex-grow">
      <div className="w-3/4 h-6 bg-white/10 rounded-md mb-3" />
      <div className="w-full h-4 bg-white/5 rounded-md mb-2" />
      <div className="w-5/6 h-4 bg-white/5 rounded-md mb-6" />
      
      <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
        <div className="h-4 w-20 bg-white/5 rounded-md" />
        <div className="h-4 w-24 bg-white/5 rounded-md justify-self-end" />
        <div className="h-4 w-32 bg-white/5 rounded-md col-span-2" />
      </div>
      
      <div className="w-full h-12 bg-white/10 rounded-xl mt-auto" />
    </div>
  </div>
);

export const Listings = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get('/listings');
        setData(res.data);
      } catch (error) {
        console.warn('API not reachable, falling back to mock data');
        setData(LISTINGS_DATA);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[101.25rem]">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6"
          >
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-orange-400 to-yellow-400">Featured Listings</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 font-medium"
          >
            Discover our top-rated properties, beautifully designed for your next adventure.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
          {loading ? (
            // Show 4 Skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            // Show Actual Data
            data.slice(0, 4).map((item, index) => (
              <ListingCard key={item.id} item={item} index={index} />
            ))
          )}
        </div>
        
      </div>
    </section>
  );
};

export default Listings;
