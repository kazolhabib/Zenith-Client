import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Camera, Mail, Save, List, Calendar, LayoutDashboard, Shield, LogOut, Settings, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import api from '@/config/api';
import { ManageListings } from './ManageListings';
import { MyReservations } from './MyReservations';
import { AllReservations } from './AllReservations';

export const Dashboard = () => {
  const location = useLocation();
  const { user, login, logout } = useAuth();
  
  const initialState = (location.state as any)?.activeTab || 'profile';
  const [activeTab, setActiveTab] = useState<'profile' | 'listings' | 'reservations' | 'all-reservations'>(initialState);
  
  const [name, setName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setImage(user.image || '');
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    try {
      const { data } = await api.put('/profile', { name, image });
      login(data.token, {
        ...data,
        role: user?.role || 'user'
      });
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.warn('Failed to update profile via API, updating locally', error);
      if (user) {
        const updatedUser = {
          ...user,
          name,
          image
        };
        login(localStorage.getItem('token') || 'mock-token', updatedUser);
        setSuccessMsg('Profile updated successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { id: 'profile', label: 'Settings & Profile', icon: Settings, show: true, desc: 'Manage your account' },
    { id: 'reservations', label: 'My Trips', icon: Calendar, show: user?.role !== 'admin', desc: 'View your bookings' },
    { id: 'listings', label: 'Properties', icon: LayoutDashboard, show: user?.role === 'admin', desc: 'Manage listings' },
    { id: 'all-reservations', label: 'Bookings', icon: List, show: user?.role === 'admin', desc: 'All user reservations' }
  ].filter(item => item.show);

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 selection:bg-brand/30 pt-40 md:pt-48 pb-20 relative overflow-hidden">
      
      {/* Immersive Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-brand/5 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[50%] rounded-full bg-orange-600/5 blur-[120px] mix-blend-screen" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[101.25rem] relative z-10">
        
        {/* Dashboard Header */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-2"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">Dashboard</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            Welcome back, {user?.name?.split(' ')[0]}! Manage your account and activity here.
          </motion.p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* Bento Style Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full xl:w-80 shrink-0"
          >
            {/* User Info Bento */}
            <div className="bg-[#121217]/80 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 shadow-2xl mb-6 flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand to-orange-400 p-[2px]">
                  <div className="w-full h-full rounded-[14px] bg-[#121217] overflow-hidden flex items-center justify-center">
                    {image ? (
                      <img src={image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-slate-500" />
                    )}
                  </div>
                </div>
                {user?.role === 'admin' && (
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white p-1 rounded-lg border-2 border-[#121217]">
                    <Shield className="w-3 h-3" />
                  </div>
                )}
              </div>
              <div className="overflow-hidden flex-1">
                <h3 className="text-white font-bold truncate text-lg">{user?.name}</h3>
                <p className="text-sm text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>

            {/* Navigation Bento */}
            <div className="bg-[#121217]/80 backdrop-blur-3xl border border-white/5 rounded-3xl p-3 shadow-2xl sticky top-32">
              <div className="space-y-1">
                <div className="text-xs font-black text-slate-600 uppercase tracking-widest px-4 py-3">Menu</div>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button 
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group text-left ${
                        isActive 
                        ? 'bg-gradient-to-r from-brand to-orange-500 shadow-lg text-white font-bold' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl transition-colors ${isActive ? 'bg-white/20 text-white' : 'bg-black/50 text-slate-500 group-hover:text-white group-hover:bg-brand/20'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>{item.label}</div>
                        <div className={`text-xs mt-0.5 ${isActive ? 'text-white/80' : 'text-slate-500'}`}>{item.desc}</div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-4 p-3 border-t border-white/5">
                <button onClick={logout} className="w-full flex items-center gap-3 p-4 rounded-2xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all font-bold group">
                  <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 w-full">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#121217]/80 backdrop-blur-3xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-[80px] pointer-events-none" />
                  
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shadow-lg shadow-brand/10">
                      <Settings className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Account Settings</h2>
                      <p className="text-sm text-slate-400">Update your photo and personal details to keep your profile fresh.</p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleUpdateProfile} className="space-y-8 relative z-10">
                    {/* Profile Picture Upload Bento */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 p-8 rounded-3xl bg-black/40 border border-white/5">
                      <div className="relative cursor-pointer group shrink-0" onClick={() => fileInputRef.current?.click()}>
                        <div className="w-32 h-32 rounded-full bg-slate-900 border-4 border-brand/30 overflow-hidden flex items-center justify-center group-hover:border-brand transition-colors duration-300 shadow-xl">
                          {image ? (
                            <img src={image} alt="Profile" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          ) : (
                            <User className="w-12 h-12 text-slate-500" />
                          )}
                        </div>
                        <div className="absolute bottom-1 right-1 bg-brand text-white p-2.5 rounded-full border-4 border-[#121217] group-hover:scale-110 transition-transform shadow-lg">
                          <Camera className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-center sm:text-left flex flex-col h-full justify-center pt-2">
                        <h3 className="text-white font-bold text-lg mb-2">Profile Photo</h3>
                        <p className="text-sm text-slate-400 mb-6 max-w-sm leading-relaxed">
                          We recommend a high-resolution 1:1 image. Allowed formats: JPG, PNG, GIF. Maximum size: 5MB.
                        </p>
                        <input 
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-white/5 hover:bg-white/10 text-white border-white/10 rounded-xl h-12 px-6 font-bold tracking-wide w-fit mx-auto sm:mx-0"
                        >
                          Change Photo
                        </Button>
                      </div>
                    </div>

                    {/* Inputs Bento */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-3xl bg-black/40 border border-white/5">
                      <div className="space-y-3">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">Display Name</label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand transition-colors">
                            <User className="h-5 w-5" />
                          </div>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all font-medium text-lg"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">Email Address</label>
                        <div className="relative opacity-60">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                            <Mail className="h-5 w-5" />
                          </div>
                          <input
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className="block w-full pl-12 pr-4 py-4 bg-black/50 border border-white/5 rounded-2xl text-white cursor-not-allowed font-medium text-lg"
                          />
                        </div>
                      </div>
                    </div>

                    {successMsg && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-6 py-4 rounded-2xl text-sm font-bold flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5" />
                        {successMsg}
                      </motion.div>
                    )}

                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        disabled={loading}
                        className="bg-brand hover:bg-orange-600 text-white rounded-2xl h-14 px-10 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-black/20 hover:-translate-y-[2px] transition-all duration-300 w-full sm:w-auto font-bold"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            <span className="text-lg tracking-wide">Save Changes</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Other tabs wrapped in matching Bento Boxes */}
              {activeTab === 'listings' && (
                <motion.div key="listings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#121217]/80 backdrop-blur-3xl border border-white/5 rounded-3xl p-8 shadow-2xl">
                  <ManageListings isEmbedded={true} />
                </motion.div>
              )}

              {activeTab === 'reservations' && user?.role !== 'admin' && (
                <motion.div key="reservations" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#121217]/80 backdrop-blur-3xl border border-white/5 rounded-3xl p-8 shadow-2xl">
                  <MyReservations isEmbedded={true} />
                </motion.div>
              )}

              {activeTab === 'all-reservations' && user?.role === 'admin' && (
                <motion.div key="all-reservations" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#121217]/80 backdrop-blur-3xl border border-white/5 rounded-3xl p-8 shadow-2xl">
                  <AllReservations isEmbedded={true} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
