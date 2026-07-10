import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Star, Calendar, ArrowRight, CheckCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export interface ListingCardProps {
  item: any;
  index: number;
}

export const ListingCard: React.FC<ListingCardProps> = ({ item, index }) => {
  const { user } = useAuth();
  const [isConfirmed, setIsConfirmed] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      const stored = localStorage.getItem('my_reservations');
      if (stored) {
        const reservations = JSON.parse(stored);
        const hasConfirmed = reservations.some(
          (r: any) => r.userId === user.id && r.listingId === item.id && r.status === 'Confirmed'
        );
        setIsConfirmed(hasConfirmed);
      }
    } else {
      setIsConfirmed(false);
    }
  }, [user, item.id]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, type: 'spring', bounce: 0.4 }}
      className="group relative flex flex-col h-full bg-[#121217]/60 backdrop-blur-3xl border border-white/5 hover:border-brand/40 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_rgba(246,86,0,0.15)] transition-all duration-500"
    >
      {/* Glow Effect Behind Card */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Image Area - Taller and more immersive */}
      <div className="relative w-full h-64 overflow-hidden bg-slate-900 shrink-0">
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          <div className="bg-black/60 backdrop-blur-xl text-white text-[11px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10 shadow-lg w-fit">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            {item.rating} {item.rating >= 4.9 && <span className="ml-1 text-slate-300 font-medium">· Top Rated</span>}
          </div>
          {isConfirmed && (
            <div className="bg-emerald-500/90 backdrop-blur-xl text-white text-[11px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)] w-fit animate-in fade-in slide-in-from-top-2">
              <CheckCircle className="w-3.5 h-3.5" />
              Booked
            </div>
          )}
        </div>

        <button className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 border border-white/10 transition-colors group/heart">
          <Heart className="w-4 h-4 text-white group-hover/heart:fill-red-500 group-hover/heart:text-red-500 transition-all duration-300" />
        </button>
        
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
        />
        
        {/* Soft gradient from bottom of image to blend with content */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#121217] via-[#121217]/60 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Content Area - Shifted slightly up over the image gradient */}
      <div className="px-6 pb-6 pt-2 flex flex-col flex-grow relative z-20 -mt-6">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="text-xl font-extrabold text-white line-clamp-1 group-hover:text-brand transition-colors drop-shadow-md">
            {item.title}
          </h3>
          <div className="flex items-center gap-1 text-slate-300 bg-white/5 px-2 py-1 rounded-md border border-white/5 whitespace-nowrap shrink-0">
            <MapPin className="w-3.5 h-3.5 text-brand" />
            <span className="text-xs font-semibold">{item.location.split(',')[0]}</span>
          </div>
        </div>
        
        <p className="text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        <div className="flex items-center gap-3 text-xs font-medium text-slate-400 mb-6 border-b border-white/5 pb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{item.date}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <div className="flex items-center gap-1.5">
            <span className="text-brand">Instant Book</span>
          </div>
        </div>
        
        {/* Price & Details Row */}
        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Price</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 group-hover:from-brand group-hover:to-orange-400 transition-all">${item.price}</span>
              <span className="text-xs font-medium text-slate-500">/ night</span>
            </div>
          </div>
          
          <Link to={`/listings/${item.id}`} className="relative z-30">
            <Button className="bg-brand hover:bg-orange-500 text-white border-0 shadow-[0_5px_20px_rgba(246,86,0,0.3)] hover:shadow-[0_8px_25px_rgba(246,86,0,0.5)] rounded-xl h-12 w-12 p-0 flex items-center justify-center group/btn transition-all duration-300">
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
