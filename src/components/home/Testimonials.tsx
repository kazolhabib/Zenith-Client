import React from 'react';
import { motion } from 'framer-motion';
import { Star, Check, Building, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Luxury Travel Writer',
    content: 'Zenith has completely transformed how we book our retreats. The properties are stunning and the service is unmatched.',
    image: 'https://i.pravatar.cc/150?u=sarah',
    color: 'from-blue-500 to-cyan-400',
    shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]',
    rating: 5,
    stayedAt: 'Amalfi Sanctuary',
    verified: true
  },
  {
    name: 'David Chen',
    role: 'Frequent Traveler',
    content: 'The best booking experience I have ever had. The villas are gorgeous and everything from check-in to check-out is seamless.',
    image: 'https://i.pravatar.cc/150?u=david',
    color: 'from-brand to-orange-400',
    shadow: 'shadow-[0_0_15px_rgba(246,86,0,0.3)]',
    rating: 5,
    stayedAt: 'Cyberpunk Studio',
    verified: true
  },
  {
    name: 'Emma Watson',
    role: 'Lifestyle Consultant',
    content: 'The 24/7 concierge service is phenomenal. They arranged a private chef and excursions that made our trip unforgettable.',
    image: 'https://i.pravatar.cc/150?u=emma',
    color: 'from-purple-500 to-pink-500',
    shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    rating: 5,
    stayedAt: 'Desert Mirror Villa',
    verified: true
  },
  {
    name: 'Michael Ross',
    role: 'Elite Club Member',
    content: 'Finding premium villas was always a headache. Zenith made it a simple, verified, and luxurious process.',
    image: 'https://i.pravatar.cc/150?u=michael',
    color: 'from-emerald-500 to-teal-400',
    shadow: 'shadow-[0_0_15px_rgba(34,197,94,0.3)]',
    rating: 5,
    stayedAt: 'Kyoto Heritage House',
    verified: true
  },
  {
    name: 'Lisa Ray',
    role: 'Travel Photographer',
    content: 'Every property is a design masterpiece. The aesthetic of the stays is absolutely breathtaking and perfect for content creation.',
    image: 'https://i.pravatar.cc/150?u=lisa',
    color: 'from-orange-400 to-yellow-300',
    shadow: 'shadow-[0_0_15px_rgba(251,146,60,0.3)]',
    rating: 5,
    stayedAt: 'Alpine Chalet Retreat',
    verified: true
  },
];

const duplicatedTestimonials = [...testimonials, ...testimonials];

const Testimonials = () => {
  return (
    <section className="py-32 bg-transparent overflow-hidden relative border-y border-white/5">
      
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[101.25rem] mb-20 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-white"
        >
          Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-orange-400 to-yellow-400">global travelers</span>
        </motion.h2>
      </div>

      <div className="relative w-full flex overflow-x-hidden z-10">
        
        {/* Left/Right Fade Gradients matching the global dark background */}
        <div className="absolute top-0 left-0 w-32 md:w-60 h-full bg-gradient-to-r from-[#09090b] via-[#09090b]/60 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 md:w-60 h-full bg-gradient-to-l from-[#09090b] via-[#09090b]/60 to-transparent z-20 pointer-events-none" />

        {/* Marquee Animation - Perfect 0% to -50% Loop */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }} 
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 28,
          }}
          className="flex gap-8 whitespace-nowrap px-4 py-8"
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="w-[360px] min-h-[440px] shrink-0 bg-[#121217]/50 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-white/5 hover:border-brand/30 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Subtle top gradient accent on hover */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-brand/50 transition-all duration-500" />
              
              <div>
                {/* Top Row: Stars and Quote Icon */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-white/5 group-hover:text-brand/20 transition-colors duration-500" />
                </div>

                {/* Review Content */}
                <p className="text-slate-300 whitespace-normal leading-relaxed text-base font-medium group-hover:text-white transition-colors duration-300 mb-6">
                  "{testimonial.content}"
                </p>

                {/* Stay Info */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] font-bold text-slate-400 group-hover:text-brand-light group-hover:border-brand/20 transition-all">
                  <Building className="w-3.5 h-3.5" />
                  <span>Stayed at {testimonial.stayedAt}</span>
                </div>
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
                <div className={`relative rounded-full p-[2px] bg-gradient-to-br ${testimonial.color} shadow-lg`}>
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#121217]"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                    {testimonial.name}
                    {testimonial.verified && (
                      <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400">
                        <Check className="w-2.5 h-2.5" /> Verified
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-500 font-bold tracking-wider uppercase mt-0.5">{testimonial.role}</p>
                </div>
              </div>

              {/* Corner Glow Overlay */}
              <div className="absolute -right-12 -bottom-12 w-24 h-24 bg-brand/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
