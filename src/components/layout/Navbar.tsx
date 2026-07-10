import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Mountain, Menu, X, Plus, LayoutDashboard, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const routes = [
  { name: 'Explore', path: '/explore' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ 
          y: scrolled ? 10 : 0,
          scale: scrolled ? 0.98 : 1,
          opacity: 1
        }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100, damping: 20 }}
        className={`w-full max-w-[101.25rem] transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-white/80 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/60 py-[0.5rem]'
            : 'bg-transparent border border-transparent py-[1rem]'
        } rounded-[2rem] px-[1.5rem]`}
      >
        <div className="flex justify-between items-center w-full gap-4 md:gap-8">
          
          {/* Logo & Links Container */}
          <div className="flex items-center gap-[1.5rem] lg:gap-[2.5rem] shrink-0">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-[0.75rem] group cursor-pointer shrink-0">
              <div className="w-[2.5rem] h-[2.5rem] rounded-[0.75rem] bg-gradient-to-br from-brand to-orange-400 flex items-center justify-center shadow-[0_4px_15px_rgba(246,86,0,0.3)] group-hover:shadow-[0_8px_25px_rgba(246,86,0,0.5)] transition-all duration-300 group-hover:-translate-y-[2px]">
                <Mountain className="w-[1.25rem] h-[1.25rem] text-white transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className={`text-[1.25rem] font-bold tracking-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                Zenith
              </span>
            </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center gap-[0.25rem] p-[0.25rem] rounded-[1.5rem] transition-colors duration-500 ${scrolled ? 'bg-gray-500/5' : 'bg-transparent'}`}>
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`group relative overflow-hidden px-[1.25rem] py-[0.5rem] rounded-[1.25rem] text-[0.875rem] font-medium transition-all duration-300 border ${
                  isActive(route.path)
                    ? 'bg-white text-brand border-brand/20 shadow-[0_0.25rem_0.75rem_rgba(246,86,0,0.15)]'
                    : `bg-transparent border-transparent hover:bg-white hover:border-gray-200/60 hover:text-gray-900 hover:shadow-sm hover:-translate-y-[1px] ${scrolled ? 'text-gray-600' : 'text-slate-200'}`
                }`}
              >
                <span className="relative z-10">{route.name}</span>
                {!isActive(route.path) && (
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                    <div className="relative h-full w-[1.25rem] bg-brand/30 blur-[2px]" />
                  </div>
                )}
              </Link>
            ))}
          </div>
          </div>

          {/* Horizontal Connecting Line */}
          <div className={`hidden md:block flex-1 h-px transition-all duration-500 ${scrolled ? 'bg-gray-200' : 'bg-transparent'}`} />

          {/* Actions */}
          <div className="hidden md:flex items-center shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center gap-[1rem]">
                <Link to="/dashboard" className={`text-[0.875rem] font-medium hover:text-brand transition-colors mr-2 ${scrolled ? 'text-gray-500' : 'text-slate-300'}`}>
                  Dashboard
                </Link>
                <Link to="/items/add">
                  <Button className="bg-white/5 hover:bg-brand text-white border border-white/10 hover:border-brand rounded-xl h-[2.75rem] px-[1.25rem] shadow-lg flex items-center gap-2 transition-all group">
                    <Plus className="w-4 h-4" />
                    <span className="font-semibold">Add Listing</span>
                  </Button>
                </Link>
                <Link to="/dashboard">
                  {user?.image ? (
                    <img src={user.image} alt="User" className="w-[2.75rem] h-[2.75rem] rounded-[1.25rem] border border-white/10 object-cover hover:border-brand transition-all cursor-pointer" />
                  ) : (
                    <div className="w-[2.75rem] h-[2.75rem] rounded-[1.25rem] bg-slate-800 border border-white/10 flex items-center justify-center hover:border-brand transition-all cursor-pointer">
                      <User className="w-5 h-5 text-slate-400" />
                    </div>
                  )}
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={logout}
                  className="rounded-[1.25rem] h-[2.75rem] px-[1.25rem] text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-[1rem]">
                <Link to="/login" className={`text-[0.875rem] font-medium hover:text-brand transition-colors ${scrolled ? 'text-gray-500' : 'text-slate-300'}`}>
                  Sign In
                </Link>
                <Link to="/register">
                  <Button className="group relative overflow-hidden rounded-[1.25rem] bg-gray-900 hover:bg-gray-800 px-[1.75rem] h-[2.75rem] text-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_rgba(246,86,0,0.25)] hover:border-brand/30 hover:-translate-y-[2px] transition-all duration-300 border border-transparent">
                    <span className="relative z-10 font-bold tracking-wide">Get Started</span>
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                      <div className="relative h-full w-[1.5rem] bg-white/20 blur-[2px]" />
                    </div>
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-[0.5rem] rounded-[1rem] transition-colors ${scrolled ? 'hover:bg-gray-100 text-gray-900' : 'hover:bg-white/10 text-white'}`}
          >
            {isOpen ? <X className="w-[1.5rem] h-[1.5rem]" /> : <Menu className="w-[1.5rem] h-[1.5rem]" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[25rem] opacity-100 mt-[1rem]' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="absolute top-[4.5rem] left-0 w-full bg-white/95 backdrop-blur-2xl border border-gray-200/50 rounded-[1.5rem] mt-[0.5rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
            {routes.map((route) => (
               <Link
               key={route.path}
               to={route.path}
               onClick={() => setIsOpen(false)}
               className={`block px-[1.25rem] py-[0.75rem] text-[0.875rem] font-medium transition-all ${
                 isActive(route.path)
                   ? 'bg-brand/5 text-brand border-l-2 border-brand'
                   : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
               }`}
             >
               {route.name}
             </Link>
            ))}
            
            <div className="p-[1rem] border-t border-gray-100">
              {isAuthenticated ? (
                <div className="flex flex-col gap-[0.75rem]">
                  <Link to="/dashboard" className="w-full">
                    <Button variant="outline" className="w-full justify-center rounded-[1rem] h-[3rem] flex items-center gap-2 border-white/10 text-white hover:bg-white/5">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/items/add" className="w-full">
                    <Button className="w-full justify-center rounded-[1rem] bg-brand hover:bg-brand/90 text-white h-[3rem] flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Listing
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    onClick={logout}
                    className="w-full justify-center rounded-[1rem] text-red-600 hover:bg-red-50 h-[3rem]"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-[0.75rem]">
                  <Link to="/login" className="w-full">
                    <Button variant="outline" className="w-full rounded-[1rem] h-[3rem] border-gray-200 hover:bg-gray-50">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" className="w-full">
                    <Button className="w-full rounded-[1rem] bg-gray-900 hover:bg-gray-800 h-[3rem]">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;
