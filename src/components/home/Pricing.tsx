import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Hobby',
    price: '$0',
    description: 'Perfect for side projects and learning.',
    features: ['1 Project', '100k API Requests', 'Community Support', 'Basic Analytics'],
    isPopular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'For professional developers and small teams.',
    features: ['Unlimited Projects', '10M API Requests', 'Priority Support', 'Advanced Analytics', 'Custom Domains'],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large scale organizations and high traffic.',
    features: ['Unlimited Everything', 'Dedicated Success Manager', '24/7 Phone Support', 'Custom SLA', 'On-premise deployment'],
    isPopular: false,
  },
];

const Pricing = () => {
  return (
    <section className="py-24 bg-[#FAFAFA] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[101.25rem]">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6"
          >
            Simple, transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">pricing</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-500 font-medium"
          >
            No hidden fees. No surprise charges. Choose the plan that best fits your needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col rounded-[2.5rem] p-10 transition-all duration-500 hover:-translate-y-2 ${
                plan.isPopular 
                  ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-[0_20px_40px_rgba(0,0,0,0.2)] scale-105 z-10 border border-gray-700' 
                  : 'bg-white text-gray-900 border border-gray-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-brand to-orange-500 text-white text-sm font-bold tracking-wide shadow-[0_8px_20px_rgba(246,86,0,0.3)] flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
                <p className={plan.isPopular ? 'text-gray-400' : 'text-gray-500'}>{plan.description}</p>
              </div>
              
              <div className="mb-8 flex items-baseline">
                <span className="text-6xl font-black tracking-tighter">{plan.price}</span>
                {plan.price !== 'Custom' && <span className={`ml-2 font-medium ${plan.isPopular ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>}
              </div>

              <ul className="flex-1 space-y-5 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${plan.isPopular ? 'bg-brand/20' : 'bg-brand/10'}`}>
                      <Check className={`w-3.5 h-3.5 ${plan.isPopular ? 'text-brand' : 'text-brand'}`} />
                    </div>
                    <span className={`font-medium ${plan.isPopular ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.isPopular ? 'default' : 'outline'} 
                className={`w-full h-14 rounded-2xl text-lg font-bold transition-all duration-300 ${
                  plan.isPopular 
                    ? 'bg-gradient-to-r from-brand to-orange-500 hover:opacity-90 text-white border-none shadow-[0_10px_25px_rgba(246,86,0,0.4)] hover:shadow-[0_15px_35px_rgba(246,86,0,0.5)]' 
                    : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
