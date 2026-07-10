import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'CTO at TechFlow',
    content: 'Zenith has completely transformed how we deploy our applications. The speed and reliability are simply unmatched.',
    image: 'https://i.pravatar.cc/150?u=sarah',
    color: 'bg-blue-500',
    shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]'
  },
  {
    name: 'David Chen',
    role: 'Lead Developer',
    content: 'The best developer experience I have ever had. The UI is gorgeous and everything just works out of the box.',
    image: 'https://i.pravatar.cc/150?u=david',
    color: 'bg-brand',
    shadow: 'shadow-[0_0_15px_rgba(246,86,0,0.5)]'
  },
  {
    name: 'Emma Watson',
    role: 'Product Manager',
    content: 'We cut our deployment time by 80%. The analytics dashboard gives us exactly the insights we need.',
    image: 'https://i.pravatar.cc/150?u=emma',
    color: 'bg-purple-500',
    shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.5)]'
  },
  {
    name: 'Michael Ross',
    role: 'System Architect',
    content: 'Global edge network scaling used to be our biggest headache. Zenith made it a one-click process.',
    image: 'https://i.pravatar.cc/150?u=michael',
    color: 'bg-green-500',
    shadow: 'shadow-[0_0_15px_rgba(34,197,94,0.5)]'
  },
  {
    name: 'Lisa Ray',
    role: 'Frontend Engineer',
    content: 'I love how intuitive the platform is. The Framer Motion integration examples helped us a lot.',
    image: 'https://i.pravatar.cc/150?u=lisa',
    color: 'bg-orange-400',
    shadow: 'shadow-[0_0_15px_rgba(251,146,60,0.5)]'
  },
];

const duplicatedTestimonials = [...testimonials, ...testimonials];

const Testimonials = () => {
  return (
    <section className="py-24 bg-transparent overflow-hidden relative border-y border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[101.25rem] mb-16 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-white"
        >
          Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-orange-400 to-yellow-400">engineers</span>
        </motion.h2>
      </div>

      <div className="relative w-full flex overflow-x-hidden z-10">
        
        {/* Left/Right Fade Gradients matching the global dark background */}
        <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-[#09090b] via-[#09090b]/80 to-transparent z-20 pointer-events-none" />

        {/* Marquee Animation */}
        <motion.div
          animate={{ x: [0, -1700] }} 
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
          className="flex gap-6 whitespace-nowrap px-4 py-8"
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="w-[320px] min-h-[400px] shrink-0 bg-[#121217]/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-white/10 hover:border-white/30 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Colorful Top Accent */}
              <div className={`absolute top-0 left-0 w-full h-1.5 ${testimonial.color} opacity-80 group-hover:opacity-100 group-hover:shadow-[0_0_20px_currentColor] transition-all`} />
              
              <div>
                <svg className="w-10 h-10 text-white/10 mb-6 group-hover:text-white/20 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                <p className="text-slate-300 whitespace-normal leading-relaxed text-lg font-medium group-hover:text-white transition-colors">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
                <div className={`relative rounded-full ${testimonial.shadow}`}>
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#121217]"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500 font-medium">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
