import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';

const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;

const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-32 pb-12 relative overflow-hidden border-t border-white/5">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[101.25rem] relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
          
          {/* Brand & Newsletter (Spans 5 cols) */}
          <div className="lg:col-span-5 pr-0 lg:pr-12">
            <Link to="/" className="flex items-center gap-[0.75rem] group cursor-pointer mb-8 inline-flex">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand to-orange-400 p-[2px] shadow-[0_0_20px_rgba(246,86,0,0.3)] group-hover:shadow-[0_0_30px_rgba(246,86,0,0.5)] transition-all duration-300">
                <div className="w-full h-full rounded-[14px] bg-[#121217] flex items-center justify-center">
                  <Mountain className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <span className="text-3xl font-black tracking-tight text-white">
                Zenith
              </span>
            </Link>
            
            <p className="text-slate-400 font-medium leading-relaxed mb-10 text-lg max-w-md">
              Elevating the standard of luxury living. Discover, book, and experience the world's most extraordinary properties.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 h-14 rounded-2xl border border-white/10 bg-black/40 px-6 text-white focus:outline-none focus:ring-1 focus:ring-brand/50 focus:border-brand/50 transition-all placeholder:text-slate-600 font-medium"
              />
              <button className="h-14 px-8 rounded-2xl bg-gradient-to-r from-brand to-orange-500 text-white font-bold hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(246,86,0,0.3)]">
                Subscribe
              </button>
            </div>
          </div>

          {/* Spacer for large screens */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Links Grid (Spans 6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Product Links */}
            <div>
              <h4 className="font-bold text-white mb-6 text-lg uppercase tracking-wider text-sm">Destinations</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/explore" className="group flex items-center text-slate-400 hover:text-white font-medium transition-colors">
                    North America
                    <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 -translate-y-1 -translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-brand" />
                  </Link>
                </li>
                <li>
                  <Link to="/explore" className="group flex items-center text-slate-400 hover:text-white font-medium transition-colors">
                    Europe
                  </Link>
                </li>
                <li>
                  <Link to="/explore" className="group flex items-center text-slate-400 hover:text-white font-medium transition-colors">
                    Asia Pacific
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-[0.65rem] font-bold uppercase tracking-wider">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/explore" className="group flex items-center text-slate-400 hover:text-white font-medium transition-colors">
                    South America
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-bold text-white mb-6 text-lg uppercase tracking-wider text-sm">Company</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/about" className="text-slate-400 hover:text-white font-medium transition-colors">About Us</Link>
                </li>
                <li>
                  <Link to="/about" className="text-slate-400 hover:text-white font-medium transition-colors">Careers</Link>
                </li>
                <li>
                  <Link to="/about" className="text-slate-400 hover:text-white font-medium transition-colors">Press</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-slate-400 hover:text-white font-medium transition-colors">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-bold text-white mb-6 text-lg uppercase tracking-wider text-sm">Connect</h4>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:hello@zenith.com" className="group flex items-center gap-3 text-slate-400 hover:text-white font-medium transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand/20 group-hover:border-brand/30 transition-colors">
                      <Mail className="w-4 h-4 text-slate-400 group-hover:text-brand transition-colors" />
                    </div>
                    Email Us
                  </a>
                </li>
                <li>
                  <a href="tel:+18005550199" className="group flex items-center gap-3 text-slate-400 hover:text-white font-medium transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand/20 group-hover:border-brand/30 transition-colors">
                      <Phone className="w-4 h-4 text-slate-400 group-hover:text-brand transition-colors" />
                    </div>
                    Call Us
                  </a>
                </li>
                <li>
                  <div className="flex gap-3 mt-8">
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand hover:border-brand hover:shadow-[0_0_20px_rgba(246,86,0,0.4)] transition-all hover:-translate-y-1">
                      <TwitterIcon />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1">
                      <GithubIcon />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-1">
                      <LinkedinIcon />
                    </a>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span className="text-slate-300 font-medium text-sm">All systems operational</span>
          </div>

          <p className="text-slate-500 font-medium text-sm">
            © {new Date().getFullYear()} Zenith Properties. All rights reserved.
          </p>
          
          <div className="flex items-center gap-8 text-sm font-medium">
            <Link to="/about" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/about" className="text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>

      {/* Massive Background Typography */}
      <div className="absolute bottom-[-8%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0 overflow-hidden flex justify-center">
        <span className="text-[25vw] font-black tracking-tighter text-white opacity-[0.015] leading-none whitespace-nowrap">
          ZENITH
        </span>
      </div>

    </footer>
  );
};

export default Footer;
