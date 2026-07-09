import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'How fast is the setup process?',
    answer: 'You can connect your repository and have your first deployment live in under 3 minutes. Our zero-config deployment engine handles all the complexity for standard frameworks.',
  },
  {
    question: 'Do you offer a free tier?',
    answer: 'Yes! Our Hobby tier is completely free forever. It includes 1 project and 100k API requests per month, which is perfect for side projects and learning.',
  },
  {
    question: 'Can I use a custom domain?',
    answer: 'Absolutely. Custom domains with free automatic SSL certificates are included in our Pro and Enterprise plans.',
  },
  {
    question: 'What kind of support do you provide?',
    answer: 'Hobby users have access to our community forum. Pro users get priority email support, and Enterprise customers receive 24/7 phone support and a dedicated success manager.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Security is our top priority. All data is encrypted at rest and in transit. We are SOC2 compliant and undergo regular third-party security audits.',
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
      
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6"
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">Questions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 font-medium max-w-3xl mx-auto"
          >
            Everything you need to know about the product and billing. Can't find the answer you're looking for? Please chat to our friendly team.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`border border-gray-200/60 rounded-[1.5rem] overflow-hidden transition-all duration-300 ${isActive ? 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-gray-200' : 'bg-[#FAFAFA] hover:bg-white hover:border-gray-300'}`}
              >
                <button
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <span className={`text-lg md:text-xl font-bold pr-8 ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-brand text-white shadow-md' : 'bg-gray-200 text-gray-600'}`}>
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      {isActive ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
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
                      <div className="px-6 md:px-8 pb-6 md:pb-8 text-gray-500 text-lg leading-relaxed font-medium">
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
