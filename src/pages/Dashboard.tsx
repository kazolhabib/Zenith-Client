import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Mail, Save, List, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import api from '@/config/api';
import { ManageListings } from './ManageListings';
import { MyReservations } from './MyReservations';
import { AllReservations } from './AllReservations';

export const Dashboard = () => {
  const { user, login } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'listings' | 'reservations' | 'all-reservations'>('profile');
  
  const [name, setName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
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
      // Update local storage and context
      login(data.token, data);
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error('Failed to update profile', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 selection:bg-brand/30 pt-32 md:pt-40 pb-20 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[101.25rem] relative z-10">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">Dashboard</span>
          </h1>
          <p className="text-slate-400">Manage your profile and properties in one place.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-[#121217]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sticky top-32">
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === 'profile' ? 'bg-brand text-white shadow-[0_0_20px_rgba(246,86,0,0.2)]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <div className="flex items-center gap-3 font-medium">
                    <User className="w-5 h-5" />
                    Personal Info
                  </div>
                  {activeTab === 'profile' && <ChevronRight className="w-4 h-4" />}
                </button>
                {user?.role === 'admin' && (
                  <>
                    <button 
                      onClick={() => setActiveTab('listings')}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === 'listings' ? 'bg-brand text-white shadow-[0_0_20px_rgba(246,86,0,0.2)]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                      <div className="flex items-center gap-3 font-medium">
                        <List className="w-5 h-5" />
                        Manage Listings
                      </div>
                      {activeTab === 'listings' && <ChevronRight className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => setActiveTab('all-reservations')}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === 'all-reservations' ? 'bg-brand text-white shadow-[0_0_20px_rgba(246,86,0,0.2)]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                      <div className="flex items-center gap-3 font-medium">
                        <Calendar className="w-5 h-5" />
                        All Reservations
                      </div>
                      {activeTab === 'all-reservations' && <ChevronRight className="w-4 h-4" />}
                    </button>
                  </>
                )}

                {user?.role !== 'admin' && (
                  <>
                    <button 
                      onClick={() => setActiveTab('reservations')}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === 'reservations' ? 'bg-brand text-white shadow-[0_0_20px_rgba(246,86,0,0.2)]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                      <div className="flex items-center gap-3 font-medium">
                        <Calendar className="w-5 h-5" />
                        My Reservations
                      </div>
                      {activeTab === 'reservations' && <ChevronRight className="w-4 h-4" />}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#121217]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                
                <form onSubmit={handleUpdateProfile} className="space-y-8 max-w-2xl">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <div className="relative cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
                      <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-brand overflow-hidden flex items-center justify-center shrink-0 group-hover:opacity-80 transition-opacity">
                        {image ? (
                          <img src={image} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-12 h-12 text-slate-400" />
                        )}
                      </div>
                      <div className="absolute bottom-0 right-0 bg-brand text-white p-1.5 rounded-full border-2 border-[#121217] group-hover:scale-110 transition-transform">
                        <Camera className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Profile Picture</h3>
                      <p className="text-sm text-slate-400 mb-3">Upload a new profile picture.</p>
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
                        className="bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl h-10 px-4"
                      >
                        Choose Image
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                          <User className="h-5 w-5" />
                        </div>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full pl-11 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Email Address (Cannot be changed)</label>
                      <div className="relative opacity-60">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                          <Mail className="h-5 w-5" />
                        </div>
                        <input
                          type="email"
                          value={user?.email || ''}
                          disabled
                          className="block w-full pl-11 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  {successMsg && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl text-sm font-medium">
                      {successMsg}
                    </div>
                  )}

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="bg-brand hover:bg-orange-600 text-white rounded-xl h-12 px-8 flex items-center gap-2 shadow-[0_0_20px_rgba(246,86,0,0.3)] transition-all"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeTab === 'listings' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="md:px-2">
                  <ManageListings isEmbedded={true} />
                </div>
              </motion.div>
            )}

            {activeTab === 'reservations' && user?.role !== 'admin' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="md:px-2">
                  <MyReservations isEmbedded={true} />
                </div>
              </motion.div>
            )}

            {activeTab === 'all-reservations' && user?.role === 'admin' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="md:px-2">
                  <AllReservations isEmbedded={true} />
                </div>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
