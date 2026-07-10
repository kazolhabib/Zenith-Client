import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Globe2, ShieldCheck } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 selection:bg-brand/30 pt-24 pb-20 overflow-hidden">
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
      </div>
    </div>
  );
};

export default About;
