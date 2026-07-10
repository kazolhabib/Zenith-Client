import { motion } from 'framer-motion';
import { Building2, Users, Globe2, ShieldCheck, Star, HeadphonesIcon, Sparkles } from 'lucide-react';
import CallToAction from '@/components/home/CallToAction';

export const About = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 selection:bg-brand/30 pt-40 md:pt-48 pb-20 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-brand/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[40%] rounded-full bg-orange-500/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[101.25rem] relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              Redefining the way you <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">explore</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
              At Zenith, we believe that finding your perfect stay shouldn't be a hassle. 
              We curate the world's most premium properties and deliver a seamless booking experience 
              tailored to your unique lifestyle.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-24">
          {[
            { value: "10K+", label: "Premium Properties", icon: Building2 },
            { value: "2.5M", label: "Happy Travelers", icon: Users },
            { value: "120+", label: "Countries Covered", icon: Globe2 },
            { value: "100%", label: "Verified Listings", icon: ShieldCheck }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#121217]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 text-center hover:border-brand/30 transition-colors group"
            >
              <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                <stat.icon className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-slate-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Story Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Our Story" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-80" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-slate-400 mb-6 text-lg leading-relaxed">
              Founded in 2026, Zenith was born out of a simple frustration: the sheer difficulty of finding truly premium, reliable, and stunning accommodations online. We realized that travelers were spending hours sifting through subpar options.
            </p>
            <p className="text-slate-400 mb-8 text-lg leading-relaxed">
              We set out to create a platform that prioritizes quality over quantity. Every property on Zenith is handpicked, verified, and held to the highest standard of luxury and comfort.
            </p>
            <div className="flex items-center gap-4 border-l-4 border-brand pl-6">
              <div>
                <p className="text-white font-bold text-lg">Alex Morrison</p>
                <p className="text-brand">Founder & CEO</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global Presence Section */}
        <div className="mt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Global Presence</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-16">
              From the bustling streets of Tokyo to the serene beaches of Malibu, we are everywhere you want to be.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { city: "New York", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
              { city: "Paris", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
              { city: "Tokyo", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
            ].map((loc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative rounded-3xl overflow-hidden h-72 group border border-white/10"
              >
                <img src={loc.image} alt={loc.city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white">{loc.city}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Choose Zenith</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Our commitment to excellence ensures that every stay is nothing short of extraordinary.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Uncompromised Quality", desc: "Every property undergoes a rigorous 50-point inspection before being listed on our platform.", icon: Star },
              { title: "24/7 Concierge", desc: "Our dedicated support team is available around the clock to assist you with any requests.", icon: Star }, // Note: changed from HeadphonesIcon since Star is also safe or standard
              { title: "Seamless Booking", desc: "Experience a frictionless booking process with instant confirmations and secure payments.", icon: Sparkles }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-[#121217]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a24] hover:border-brand/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand/20 transition-all">
                  <value.icon className="w-7 h-7 text-brand" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-slate-400 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Meet the Visionaries</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              The passionate minds behind Zenith, dedicated to revolutionizing the way you travel.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Alex Morrison", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" },
              { name: "Sarah Jenkins", role: "Head of Curation", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" },
              { name: "David Chen", role: "Chief Technology Officer", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" },
              { name: "Elena Rodriguez", role: "VP of Guest Experience", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80" }
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#121217]/40 p-4 transition-all duration-500 hover:border-brand/40 hover:bg-[#121217]/65 shadow-xl flex flex-col justify-between"
              >
                {/* Photo frame */}
                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* User Details */}
                <div className="mt-6 text-left px-2 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-brand transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>
                  
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-brand/10 group-hover:border-brand/35 transition-all duration-300 scale-90 group-hover:scale-100">
                    <Sparkles className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-32 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">What Our Guests Say</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Don't just take our word for it. Read the experiences of travelers who have chosen Zenith.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "An absolutely flawless experience from start to finish. The property exceeded all expectations.", author: "Michael T.", location: "Stayed in Paris" },
              { quote: "Zenith has ruined other booking platforms for me. The level of luxury and attention to detail is unmatched.", author: "Jessica W.", location: "Stayed in Tokyo" },
              { quote: "The 24/7 concierge helped us secure reservations at a fully booked Michelin star restaurant. Incredible service.", author: "Robert & Emma", location: "Stayed in New York" }
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-[#121217]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative hover:border-brand/30 transition-colors"
              >
                <div className="absolute -top-4 -left-2 text-6xl text-brand/20 font-serif font-bold">"</div>
                <p className="text-slate-300 text-lg italic mb-6 relative z-10 leading-relaxed">
                  {review.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(246,86,0,0.3)]">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{review.author}</h4>
                    <p className="text-sm text-slate-500">{review.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <CallToAction />

      </div>
    </div>
  );
};

export default About;
