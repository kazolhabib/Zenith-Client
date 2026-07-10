import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Compass, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-brand/5 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-orange-600/5 blur-[100px] mix-blend-screen" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
        
        {/* Animated Compass Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-3xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-8 shadow-lg shadow-brand/10 relative"
        >
          <Compass className="w-12 h-12" />
          <div className="absolute inset-0 rounded-3xl border border-brand/40 animate-ping opacity-25" style={{ animationDuration: '3s' }} />
        </motion.div>

        {/* 404 Large Text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[8rem] md:text-[10rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-800 select-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          404
        </motion.h1>

        {/* Error Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4 mb-10"
        >
          <h2 className="text-3xl font-extrabold text-white">Lost in the Clouds?</h2>
          <p className="text-slate-400 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            The peak you are trying to reach does not exist, or the path has been permanently altered.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
        >
          <Link to="/" className="w-full sm:w-auto">
            <Button className="bg-brand hover:bg-orange-500 text-white rounded-2xl h-14 px-8 flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(246,86,0,0.25)] hover:shadow-[0_15px_40px_rgba(246,86,0,0.4)] transition-all font-bold tracking-wide w-full">
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <Link to="/explore" className="w-full sm:w-auto">
            <Button variant="outline" className="bg-white/5 hover:bg-white/10 text-white border-white/10 rounded-2xl h-14 px-8 flex items-center justify-center gap-2 transition-all font-bold w-full">
              <Search className="w-5 h-5" />
              <span>Explore Listings</span>
            </Button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default NotFound;
