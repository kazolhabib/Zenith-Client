import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What are the check-in and check-out times?',
    answer: 'Standard check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in or late check-out can be requested through your concierge, subject to availability (and is guaranteed for Gold VIP and Platinum Royal members).',
  },
  {
    question: 'How does the property verification work?',
    answer: 'Every listing on Zenith undergoes a rigorous 100-point physical inspection by our luxury travel experts. We verify safety, cleanliness, structural design, amenities, and high-speed Wi-Fi before adding it to our collection.',
  },
  {
    question: 'What is the cancellation and refund policy?',
    answer: 'Cancellations made 14 days or more prior to the check-in date are eligible for a 100% refund. Cancellations made between 7 and 14 days before check-in receive a 50% refund. Cancellations under 7 days are non-refundable.',
  },
  {
    question: 'Is concierge assistance included in bookings?',
    answer: 'Yes! Every booking includes standard guest support. For Gold VIP and Platinum Royal club members, we assign a dedicated personal travel advisor to coordinate private transport, private chefs, and custom excursions.',
  },
  {
    question: 'Are pets allowed in the properties?',
    answer: 'Pet policies vary by estate. You can check the specific amenities and rules listed on the property details page or reach out to our support team before booking.',
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-transparent relative overflow-hidden border-t border-white/5">
      
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6"
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-orange-400 to-yellow-400 drop-shadow-[0_0_15px_rgba(246,86,0,0.3)]">Questions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 font-medium max-w-2xl mx-auto"
          >
            Everything you need to know about Zenith stays, bookings, and VIP privileges.
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`rounded-3xl overflow-hidden transition-all duration-500 backdrop-blur-xl border ${
                  isActive 
                    ? 'bg-gradient-to-r from-brand/5 via-[#121217]/90 to-brand/5 border-brand/35 shadow-xl' 
                    : 'bg-[#121217]/25 hover:bg-[#121217]/50 border-white/5 hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <span className={`text-base md:text-lg font-bold pr-8 transition-colors ${isActive ? 'text-brand' : 'text-white group-hover:text-brand'}`}>
                    {faq.question}
                  </span>
                  
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border ${
                    isActive 
                      ? 'bg-brand/10 border-brand/30 text-brand' 
                      : 'bg-white/5 border-white/10 text-slate-400 group-hover:text-white'
                  }`}>
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </motion.div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
