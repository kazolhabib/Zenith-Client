import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Compass, ArrowRight, X, Check } from 'lucide-react';

const features = [
  {
    id: 'sanctuaries',
    title: 'Elite Sanctuaries',
    description: 'Every estate in our collection meets a strict 100-point physical check for architectural grandeur, security, and absolute privacy.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80',
    icon: Compass,
    badge: '100% Verified',
    extendedDetails: {
      headline: 'Vetted by Global Curators',
      paragraphs: [
        'Our properties are not just houses; they are architectural landmarks. Each estate goes through a rigorous inspection by our curators to ensure the highest standards of safety, building materials, and interior design.',
        'We evaluate everything from private infinity pools, wellness rooms, state-of-the-art kitchen equipment, to sound insulation and security borders.'
      ],
      points: [
        'In-person verification check',
        'Top-tier security and privacy borders',
        'Infinity pools & wellness amenities',
        'Elite locations in secure postcodes'
      ]
    }
  },
  {
    id: 'concierge',
    title: 'Bespoke Concierge',
    description: 'Michelin-starred dining in your villa, private yacht charters, helicopter transfers, and custom local itineraries managed 24/7.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&q=80',
    icon: Sparkles,
    badge: '24/7 Support',
    extendedDetails: {
      headline: 'Your Personal Concierge Team',
      paragraphs: [
        'Unlock experiences that cannot be booked anywhere else. Our local travel coordinators are connected to top-tier service providers globally to craft memories designed just for you.',
        'Whether you want a private vineyard tour with the owner, a Michelin-starred chef cooking a multi-course dinner in your villa kitchen, or direct helicopter transfer, we handle every detail.'
      ],
      points: [
        'Michelin-starred private chefs',
        'Private jet, yacht, & yacht charters',
        'Premium EV chauffeur transfers',
        'Exclusive local access & VIP entries'
      ]
    }
  },
  {
    id: 'discretion',
    title: 'Absolute Discretion',
    description: 'End-to-end booking protection, secure escrow payments, and verified hosts ensuring absolute confidentiality and peace of mind.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=80',
    icon: Shield,
    badge: 'Protected',
    extendedDetails: {
      headline: 'Confidentiality & Secure Booking',
      paragraphs: [
        'We value your privacy and security above all. Our transactions are completely secure, leveraging escrow accounts so hosts are paid only after a successful check-in.',
        'We offer complete NDA compliance options for high-profile individuals, contact-free check-ins, and on-demand premium security guard options at selected estates.'
      ],
      points: [
        'Escrow-based booking payments',
        'Optional NDA compliance for guests',
        'Contact-free secure check-ins',
        'On-demand estate security guards'
      ]
    }
  }
];

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);

  return (
    <section className="py-32 bg-[#09090b] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-brand/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[101.25rem]">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]"
          >
            Everything you need for an <br className="hidden md:block" />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-brand via-orange-400 to-yellow-400 drop-shadow-[0_0_20px_rgba(246,86,0,0.3)]">
                unforgettable stay.
              </span>
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto"
          >
            A carefully curated ecosystem of luxury properties, bespoke experiences, and unparalleled concierge services.
          </motion.p>
        </div>

        {/* Luxury Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isFullWidth = index === 2; // The 3rd card
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedFeature(feature)}
                className={`group relative rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-brand/40 shadow-2xl transition-all duration-700 cursor-pointer flex flex-col justify-between p-8 md:p-10 ${
                  isFullWidth ? 'h-[400px] md:col-span-2' : 'h-[500px] col-span-1'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-60 group-hover:opacity-80"
                  />
                  {/* Luxury Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />
                </div>

                {/* Top Badge & Icon */}
                <div className="relative z-10 flex justify-between items-start w-full">
                  <div className="w-14 h-14 rounded-2xl bg-[#121217]/90 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg group-hover:border-brand/40 transition-colors">
                    <Icon className="w-6 h-6 text-brand" />
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-bold text-slate-300 uppercase tracking-widest">
                    {feature.badge}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 max-w-2xl">
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand group-hover:to-orange-400 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 text-base leading-relaxed mb-6 font-medium">
                    {feature.description}
                  </p>
                  <button className="inline-flex items-center gap-2 text-brand font-bold text-sm tracking-wider uppercase group-hover:translate-x-2 transition-transform">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Glow border overlay */}
                <div className="absolute inset-0 rounded-[2.5rem] border border-transparent group-hover:border-brand/30 transition-all duration-700 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Feature Details Modal (Popup) */}
      <AnimatePresence>
        {selectedFeature && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="relative w-full max-w-4xl bg-[#121217] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
            >
              
              {/* Left Column - Visual Image */}
              <div className="md:w-1/2 relative min-h-[250px] md:min-h-full">
                <img 
                  src={selectedFeature.image} 
                  alt={selectedFeature.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="px-4 py-1.5 rounded-full bg-brand text-xs font-bold text-white uppercase tracking-widest">
                    {selectedFeature.badge}
                  </span>
                </div>
              </div>

              {/* Right Column - Text Details */}
              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[60vh] md:max-h-[80vh]">
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedFeature(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-6">
                    {React.createElement(selectedFeature.icon, { className: "w-6 h-6 text-brand" })}
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
                    {selectedFeature.title}
                  </h3>
                  <h4 className="text-sm font-semibold text-brand uppercase tracking-wider mb-6">
                    {selectedFeature.extendedDetails.headline}
                  </h4>

                  <div className="space-y-4 mb-8">
                    {selectedFeature.extendedDetails.paragraphs.map((p, i) => (
                      <p key={i} className="text-slate-300 text-sm leading-relaxed font-medium">
                        {p}
                      </p>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Highlights</h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedFeature.extendedDetails.points.map((pt, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-slate-400 text-sm font-medium">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-emerald-400" />
                          </div>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Features;
