import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'CTO at TechFlow',
    content: 'Zenith has completely transformed how we deploy our applications. The speed and reliability are simply unmatched.',
    image: 'https://i.pravatar.cc/150?u=sarah',
    color: 'bg-blue-500'
  },
  {
    name: 'David Chen',
    role: 'Lead Developer',
    content: 'The best developer experience I have ever had. The UI is gorgeous and everything just works out of the box.',
    image: 'https://i.pravatar.cc/150?u=david',
    color: 'bg-brand'
  },
  {
    name: 'Emma Watson',
    role: 'Product Manager',
    content: 'We cut our deployment time by 80%. The analytics dashboard gives us exactly the insights we need.',
    image: 'https://i.pravatar.cc/150?u=emma',
    color: 'bg-purple-500'
  },
  {
    name: 'Michael Ross',
    role: 'System Architect',
    content: 'Global edge network scaling used to be our biggest headache. Zenith made it a one-click process.',
    image: 'https://i.pravatar.cc/150?u=michael',
    color: 'bg-green-500'
  },
  {
    name: 'Lisa Ray',
    role: 'Frontend Engineer',
    content: 'I love how intuitive the platform is. The Framer Motion integration examples helped us a lot.',
    image: 'https://i.pravatar.cc/150?u=lisa',
    color: 'bg-orange-400'
  },
];

const duplicatedTestimonials = [...testimonials, ...testimonials];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white overflow-hidden relative border-y border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[101.25rem] mb-16 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900"
        >
          Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">engineers</span>
        </motion.h2>
      </div>

      <div className="relative w-full flex overflow-x-hidden z-10">
        
        {/* Left/Right Fade Gradients */}
        <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

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
              className="w-[340px] shrink-0 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Colorful Top Accent */}
              <div className={`absolute top-0 left-0 w-full h-1 ${testimonial.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 font-medium">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 whitespace-normal leading-relaxed text-base">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
