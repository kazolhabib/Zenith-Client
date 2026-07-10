import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';

const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;

const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12 relative overflow-hidden border-t border-gray-100">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-400/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[101.25rem] relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-24 mb-20">
          
          {/* Brand & Newsletter (Spans 5 cols) */}
          <div className="lg:col-span-5 pr-0 lg:pr-12">
            <Link to="/" className="flex items-center gap-[0.75rem] group cursor-pointer mb-6 inline-flex">
              <div className="w-[3rem] h-[3rem] rounded-[1rem] bg-gradient-to-br from-brand to-orange-400 flex items-center justify-center shadow-[0_4px_15px_rgba(246,86,0,0.3)] group-hover:shadow-[0_8px_25px_rgba(246,86,0,0.5)] group-hover:-translate-y-1 transition-all duration-300">
                <Mountain className="w-[1.5rem] h-[1.5rem] text-white transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="text-3xl font-black tracking-tight text-gray-900">
                Zenith
              </span>
            </Link>
            
            <p className="text-gray-500 font-medium leading-relaxed mb-8 text-lg">
              Empowering the next generation of builders. Scale your ideas to infinity with our modern ecosystem.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 h-12 rounded-xl border border-gray-200 bg-gray-50/50 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/50 transition-all placeholder:text-gray-400"
              />
              <button className="h-12 px-6 rounded-xl bg-gray-900 text-white font-bold hover:bg-brand transition-colors whitespace-nowrap shadow-md">
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
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Product</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/products" className="group flex items-center text-gray-500 hover:text-brand font-medium transition-colors">
                    Features
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 -translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="group flex items-center text-gray-500 hover:text-brand font-medium transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link to="/" className="group flex items-center text-gray-500 hover:text-brand font-medium transition-colors">
                    Pricing
                    <span className="ml-2 px-2 py-0.5 rounded-md bg-brand/10 text-brand text-[0.65rem] font-bold uppercase tracking-wider">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="group flex items-center text-gray-500 hover:text-brand font-medium transition-colors">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Company</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/about" className="text-gray-500 hover:text-brand font-medium transition-colors">About Us</Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-500 hover:text-brand font-medium transition-colors">Careers</Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-500 hover:text-brand font-medium transition-colors">Blog</Link>
                </li>
                <li>
                  <Link to="/login" className="text-gray-500 hover:text-brand font-medium transition-colors">Customer Login</Link>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Connect</h4>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:hello@zenith.com" className="group flex items-center gap-2 text-gray-500 hover:text-brand font-medium transition-colors">
                    <Mail className="w-4 h-4 text-gray-400 group-hover:text-brand transition-colors" />
                    Email Us
                  </a>
                </li>
                <li>
                  <a href="tel:+18005550199" className="group flex items-center gap-2 text-gray-500 hover:text-brand font-medium transition-colors">
                    <Phone className="w-4 h-4 text-gray-400 group-hover:text-brand transition-colors" />
                    Call Us
                  </a>
                </li>
                <li>
                  <div className="flex gap-3 mt-6">
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-brand hover:border-brand/30 hover:bg-brand/5 hover:shadow-md transition-all hover:-translate-y-1">
                      <TwitterIcon />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
                      <GithubIcon />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md transition-all hover:-translate-y-1">
                      <LinkedinIcon />
                    </a>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200/60 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-gray-600 font-medium text-sm">All systems operational</span>
          </div>

          <p className="text-gray-400 font-medium text-sm">
            © {new Date().getFullYear()} Zenith Platforms Inc. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link to="/about" className="text-gray-400 hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <Link to="/about" className="text-gray-400 hover:text-gray-900 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>

      {/* Massive Background Typography */}
      <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0 overflow-hidden flex justify-center">
        <span className="text-[20vw] font-black tracking-tighter text-gray-900 opacity-[0.02] leading-none whitespace-nowrap">
          ZENITH
        </span>
      </div>

    </footer>
  );
};

export default Footer;
