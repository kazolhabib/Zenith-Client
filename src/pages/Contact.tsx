import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-brand/30 flex flex-col lg:flex-row pt-20 lg:pt-0">
      
      {/* Left Side - Visual / Hero Area */}
      <div className="lg:w-1/2 relative min-h-[40vh] lg:min-h-screen flex items-center justify-center p-8 lg:p-16 xl:p-24 overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80" 
            alt="Luxury Architecture" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          {/* Gradient Overlays for blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent lg:bg-gradient-to-r lg:from-[#050505]/40 lg:to-[#050505] mix-blend-multiply" />
          <div className="absolute inset-0 bg-brand/10 mix-blend-overlay" />
        </div>

        <div className="relative z-10 w-full max-w-lg mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-16 h-1 bg-brand mb-8 rounded-full" />
            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              Start a <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">Conversation</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-md font-light">
              Whether you're looking to book a luxury escape or have questions about our exclusive properties, our team is ready to assist you in crafting the perfect experience.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form Area */}
      <div className="lg:w-1/2 relative flex items-center justify-center px-8 pt-8 pb-24 md:pb-32 lg:p-16 xl:p-24 bg-[#050505]">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brand/5 blur-[150px]" />
        </div>

        <div className="w-full max-w-lg relative z-10">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-start"
              >
                <div className="w-20 h-20 bg-brand/10 border border-brand/20 rounded-full flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 bg-brand/20 rounded-full blur-xl animate-pulse" />
                  <CheckCircle2 className="w-10 h-10 text-brand relative z-10" />
                </div>
                <h3 className="text-4xl font-black text-white mb-4 tracking-tight">We've got it.</h3>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">
                  Thank you for reaching out. One of our dedicated concierge members will review your message and reply to the email provided shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="flex items-center gap-3 text-brand hover:text-orange-400 font-bold group transition-colors"
                >
                  Send another message
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit} 
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Send an Inquiry</h2>
                  <p className="text-slate-400 text-sm">Fill out the form below and we'll be in touch.</p>
                </div>

                <div className="space-y-6">
                  {/* Floating Label Inputs for a cleaner, more modern look */}
                  <div className="relative">
                    <input 
                      type="text" 
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full px-0 py-4 text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer text-lg font-medium transition-colors"
                      placeholder=" "
                    />
                    <label 
                      htmlFor="name" 
                      className="absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold uppercase tracking-widest"
                    >
                      Your Name
                    </label>
                  </div>

                  <div className="relative">
                    <input 
                      type="email" 
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full px-0 py-4 text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer text-lg font-medium transition-colors"
                      placeholder=" "
                    />
                    <label 
                      htmlFor="email" 
                      className="absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold uppercase tracking-widest"
                    >
                      Email Address
                    </label>
                  </div>

                  <div className="relative">
                    <input 
                      type="text" 
                      name="subject"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="block w-full px-0 py-4 text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer text-lg font-medium transition-colors"
                      placeholder=" "
                    />
                    <label 
                      htmlFor="subject" 
                      className="absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold uppercase tracking-widest"
                    >
                      Subject
                    </label>
                  </div>

                  <div className="relative pt-2">
                    <textarea 
                      name="message"
                      id="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="block w-full px-0 py-4 text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer text-lg font-medium transition-colors resize-none"
                      placeholder=" "
                    />
                    <label 
                      htmlFor="message" 
                      className="absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold uppercase tracking-widest"
                    >
                      Your Message
                    </label>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full group relative overflow-hidden bg-white text-black font-bold h-16 rounded-none flex items-center justify-between px-8 transition-all hover:bg-brand hover:text-white"
                  >
                    <span className="text-lg uppercase tracking-wider relative z-10">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black group-hover:border-white/30 group-hover:border-t-white rounded-full animate-spin relative z-10" />
                    ) : (
                      <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Contact;
