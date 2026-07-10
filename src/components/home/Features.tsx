import { motion } from 'framer-motion';
import { Shield, Sparkles, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Elite Sanctuaries',
    description: 'Every estate in our collection meets a strict 100-point physical check for architectural grandeur, security, and absolute privacy.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80',
    icon: Compass,
    badge: '100% Verified'
  },
  {
    title: 'Bespoke Concierge',
    description: 'Michelin-starred dining in your villa, private yacht charters, helicopter transfers, and custom local itineraries managed 24/7.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&q=80',
    icon: Sparkles,
    badge: '24/7 Support'
  },
  {
    title: 'Absolute Discretion',
    description: 'End-to-end booking protection, secure escrow payments, and verified hosts ensuring absolute confidentiality and peace of mind.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=80',
    icon: Shield,
    badge: 'Protected'
  }
];

const Features = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-[550px] rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-brand/40 shadow-2xl transition-all duration-700 cursor-pointer flex flex-col justify-between p-8 md:p-10"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-60 group-hover:opacity-80"
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
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand group-hover:to-orange-400 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 text-base leading-relaxed mb-6 font-medium">
                    {feature.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-brand font-bold text-sm tracking-wider uppercase group-hover:translate-x-2 transition-transform">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Glow border overlay */}
                <div className="absolute inset-0 rounded-[2.5rem] border border-transparent group-hover:border-brand/30 transition-all duration-700 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-20">
          <Link to="/explore">
            <Button className="group relative overflow-hidden rounded-full bg-white hover:bg-gray-100 px-10 h-16 text-black shadow-lg hover:scale-105 transition-all duration-300 text-lg font-bold">
              <span className="relative z-10 flex items-center gap-2">
                Browse All Stays
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Features;
