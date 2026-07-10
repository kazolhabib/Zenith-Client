import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Star, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ListingCardProps {
  item: any;
  index: number;
}

export const ListingCard: React.FC<ListingCardProps> = ({ item, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative flex flex-col h-full bg-[#121217]/90 backdrop-blur-2xl border border-white/5 hover:border-brand/30 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(246,86,0,0.15)] transition-all duration-500 group transform hover:-translate-y-1"
    >
      {/* Glow Effect Behind Card */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image */}
      <div className="relative w-full h-56 overflow-hidden bg-slate-900 shrink-0">
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-xl text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 flex items-center gap-1.5 border border-white/10 shadow-lg">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          {item.rating}
        </div>
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-[#121217]/20 to-transparent opacity-90 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow relative z-10">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">{item.title}</h3>
        <p className="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed">{item.description}</p>
        
        {/* Meta Info Grid */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-8 mt-auto text-xs font-medium text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400 font-extrabold text-lg leading-none">${item.price}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">/ night</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span className="truncate">{item.location.split(',')[0]}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2 pt-3 border-t border-white/5">
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <span className="text-slate-400">{item.date}</span>
          </div>
        </div>
        
        {/* Action Button */}
        <Link to={`/listings/${item.id}`} className="w-full mt-auto shrink-0 relative z-20">
          <Button className="w-full bg-white/5 hover:bg-brand text-white border border-white/10 hover:border-brand rounded-xl h-12 flex items-center justify-center gap-2 group/btn transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(246,86,0,0.4)]">
            <span className="font-semibold">View Details</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
