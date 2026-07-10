import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
    <section className="py-24 bg-transparent relative overflow-hidden">
      
      {/* Background glow for pricing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand/10 blur-[150px] pointer-events-none rounded-[100%]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[101.25rem]">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6"
          >
            Simple, transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-orange-400 to-yellow-400 drop-shadow-[0_0_10px_rgba(246,86,0,0.5)]">pricing</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-400 font-medium"
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
              className={`relative flex flex-col rounded-[2.5rem] p-10 transition-all duration-500 hover:-translate-y-2 backdrop-blur-xl ${
                plan.isPopular 
                  ? 'bg-gradient-to-b from-brand/10 to-[#121217]/90 text-white shadow-[0_0_50px_rgba(246,86,0,0.15)] scale-105 z-10 border border-brand/50' 
                  : 'bg-[#121217]/80 text-white border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-white/20'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-brand to-orange-500 text-white text-sm font-bold tracking-wide shadow-[0_8px_20px_rgba(246,86,0,0.4)] flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
                <p className={plan.isPopular ? 'text-brand/80' : 'text-slate-400'}>{plan.description}</p>
              </div>
              
              <div className="mb-8 flex items-baseline">
                <span className="text-6xl font-black tracking-tighter drop-shadow-md">{plan.price}</span>
                {plan.price !== 'Custom' && <span className={`ml-2 font-medium ${plan.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>/month</span>}
              </div>

              <ul className="flex-1 space-y-5 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${plan.isPopular ? 'bg-brand/20 border border-brand/30' : 'bg-white/5 border border-white/10'}`}>
                      <Check className={`w-3.5 h-3.5 ${plan.isPopular ? 'text-brand drop-shadow-[0_0_5px_rgba(246,86,0,0.8)]' : 'text-slate-300'}`} />
                    </div>
                    <span className={`font-medium ${plan.isPopular ? 'text-white' : 'text-slate-300'}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to={plan.price === 'Custom' ? '/contact' : '/register'} className="w-full">
                <Button 
                  variant={plan.isPopular ? 'default' : 'outline'} 
                  className={`w-full h-14 rounded-2xl text-lg font-bold transition-all duration-300 ${
                    plan.isPopular 
                      ? 'bg-gradient-to-r from-brand to-orange-500 hover:opacity-90 text-white border-none shadow-[0_0_30px_rgba(246,86,0,0.4)] hover:shadow-[0_0_40px_rgba(246,86,0,0.6)]' 
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
