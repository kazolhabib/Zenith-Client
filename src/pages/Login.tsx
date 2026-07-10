import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import api from '@/config/api';
import { auth, googleProvider } from '@/config/firebase';
import { signInWithPopup } from 'firebase/auth';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (email === 'admin@example.com' && password === 'admin123') {
      setTimeout(() => {
        login('demo-admin-token', {
          id: 'admin-1',
          name: 'System Admin',
          email: 'admin@example.com',
          role: 'admin'
        });
        setLoading(false);
        navigate('/dashboard');
      }, 1000);
      return;
    }

    if (email === 'user@example.com' && password === 'user123') {
      setTimeout(() => {
        login('demo-user-token', {
          id: 'user-1',
          name: 'Demo User',
          email: 'user@example.com',
          role: 'user'
        });
        setLoading(false);
        navigate('/dashboard');
      }, 1000);
      return;
    }

    try {
      const response = await api.post('/auth/login', { email, password });
      
      setLoading(false);
      login(response.data.token, {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        image: response.data.image,
        role: response.data.role || 'user'
      }); 
      
      navigate('/dashboard');
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleDemoUserLogin = () => {
    setEmail('user@example.com');
    setPassword('user123');
    setError('');
  };

  const handleDemoAdminLogin = () => {
    setEmail('admin@example.com');
    setPassword('admin123');
    setError('');
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await signInWithPopup(auth, googleProvider);
      
      const response = await api.post('/auth/google', {
        email: result.user.email,
        name: result.user.displayName || 'Google User',
        image: result.user.photoURL || ''
      });
      
      login(response.data.token, {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        image: response.data.image,
        role: 'user'
      });
      
      navigate('/explore');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Google Sign-In failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center relative overflow-hidden pt-32 md:pt-40 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-brand/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] rounded-full bg-orange-400/10 blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#121217]/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 sm:p-10">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white mb-2">Welcome Back</h2>
            <p className="text-slate-400">Sign in to continue to Zenith</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 flex items-start gap-3 mb-6"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-300">Password</label>
                <Link to="#" className="text-xs text-brand hover:text-orange-400 transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-brand hover:bg-orange-600 text-white border-0 rounded-xl h-12 flex items-center justify-center gap-2 font-bold shadow-[0_0_20px_rgba(246,86,0,0.3)] hover:shadow-[0_0_30px_rgba(246,86,0,0.5)] transition-all group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 mb-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#121217] text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={handleGoogleSignIn} disabled={loading} variant="outline" className="h-11 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-11 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </Button>
          </div>

          {/* Demo Login Shortcut */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-slate-400 mb-3">Demo Credentials for Evaluation</p>
            <div className="flex gap-3">
              <Button 
                onClick={handleDemoUserLogin}
                variant="outline"
                className="flex-1 bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white rounded-xl h-11"
              >
                Login as User
              </Button>
              <Button 
                onClick={handleDemoAdminLogin}
                variant="outline"
                className="flex-1 bg-brand/10 border-brand/20 text-brand hover:bg-brand/20 hover:text-orange-400 hover:border-brand/40 rounded-xl h-11"
              >
                Login as Admin
              </Button>
            </div>
          </div>

          <p className="text-center text-sm text-slate-400 mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-white font-semibold hover:text-brand transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
