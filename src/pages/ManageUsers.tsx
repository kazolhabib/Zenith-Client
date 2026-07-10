import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Trash2, Shield, Mail, Key, Sparkles, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/config/api';
import { useAuth } from '@/context/AuthContext';

interface UserItem {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  provider?: string;
}

export const ManageUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Initial Seed Mock Users
  const mockUsers: UserItem[] = [
    { id: 'admin-1', name: 'System Admin', email: 'admin@example.com', role: 'admin', provider: 'Email' },
    { id: 'user-1', name: 'Demo User', email: 'user@example.com', role: 'user', provider: 'Email' },
    { id: 'user-2', name: 'Jessica W.', email: 'jessica@example.com', role: 'user', provider: 'Google' },
    { id: 'user-3', name: 'Michael T.', email: 'michael@example.com', role: 'user', provider: 'Google' },
    { id: 'user-4', name: 'Robert & Emma', email: 'robert@example.com', role: 'user', provider: 'Email' },
  ];

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/auth/users');
      // Normalize ids
      const normalized = data.map((u: any) => ({
        ...u,
        id: u._id || u.id,
        provider: u.email.includes('example.com') ? 'Email' : 'Google'
      }));
      setUsers(normalized);
    } catch (error) {
      console.warn('API connection failed, falling back to mock users from localStorage');
      const stored = localStorage.getItem('zenith_users');
      if (stored) {
        setUsers(JSON.parse(stored));
      } else {
        localStorage.setItem('zenith_users', JSON.stringify(mockUsers));
        setUsers(mockUsers);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    setErrorMsg('');

    const targetUser = users.find(u => u.id === userToDelete || u._id === userToDelete);
    if (targetUser?.email === 'admin@example.com') {
      setErrorMsg('Cannot delete the primary admin user');
      setDeleteModalOpen(false);
      return;
    }
    if (targetUser?.email === currentUser?.email) {
      setErrorMsg('Cannot delete your own logged-in account');
      setDeleteModalOpen(false);
      return;
    }

    try {
      await api.delete(`/auth/users/${userToDelete}`);
      setUsers(prev => prev.filter(u => u.id !== userToDelete && u._id !== userToDelete));
      // Sync local storage mock just in case
      const stored = localStorage.getItem('zenith_users');
      if (stored) {
        const parsed = JSON.parse(stored);
        const filtered = parsed.filter((u: any) => u.id !== userToDelete && u._id !== userToDelete);
        localStorage.setItem('zenith_users', JSON.stringify(filtered));
      }
    } catch (error) {
      console.warn('API delete failed, performing local delete');
      const updated = users.filter(u => u.id !== userToDelete && u._id !== userToDelete);
      setUsers(updated);
      localStorage.setItem('zenith_users', JSON.stringify(updated));
    } finally {
      setDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Users className="w-6 h-6 text-brand" />
            Registered Accounts
          </h2>
          <p className="text-slate-400 text-sm mt-1">Manage users who registered on the platform or signed up with Google.</p>
        </div>
        <span className="bg-brand/20 text-brand px-3 py-1 rounded-full text-xs font-bold border border-brand/20">Admin Panel</span>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Table (Desktop) / Cards (Mobile & Tablet) */}
      <div className="lg:bg-[#121217]/80 lg:backdrop-blur-2xl lg:border lg:border-white/10 lg:rounded-3xl lg:overflow-hidden lg:shadow-2xl">
        {/* Desktop View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/20 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-6 font-medium">User Details</th>
                <th className="p-6 font-medium">Email Address</th>
                <th className="p-6 font-medium">Role</th>
                <th className="p-6 font-medium">Sign-In Method</th>
                <th className="p-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {users.length > 0 ? (
                  users.map((item) => {
                    const id = item.id || item._id;
                    const isAdmin = item.role === 'admin';
                    const isSelf = item.email === currentUser?.email;
                    return (
                      <motion.tr 
                        key={id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-gradient-to-tr from-brand to-orange-400 p-[1px]">
                              <div className="w-full h-full rounded-[11px] bg-[#121217] overflow-hidden flex items-center justify-center font-bold text-white text-lg">
                                {item.image ? (
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                  item.name.charAt(0)
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-white font-bold text-base mb-0.5">{item.name}</h4>
                              {isSelf && <span className="text-[10px] bg-brand/10 text-brand border border-brand/20 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">You</span>}
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-slate-300 font-medium">{item.email}</td>
                        <td className="p-6">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            isAdmin 
                              ? 'bg-brand/10 text-brand border border-brand/20' 
                              : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                          }`}>
                            {isAdmin ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                            {item.provider === 'Google' ? (
                              <>
                                <Sparkles className="w-4 h-4 text-orange-400" />
                                <span>Google Auth</span>
                              </>
                            ) : (
                              <>
                                <Key className="w-4 h-4 text-slate-500" />
                                <span>Password</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <Button 
                            variant="outline" 
                            disabled={item.email === 'admin@example.com' || isSelf}
                            onClick={() => {
                              setUserToDelete(id!);
                              setDeleteModalOpen(true);
                            }}
                            className="w-10 h-10 p-0 rounded-xl bg-red-500/10 border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center">
                        <Users className="w-12 h-12 text-slate-600 mb-4" />
                        <p className="text-lg font-medium text-white mb-1">No users found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden space-y-4">
          {users.length > 0 ? (
            users.map((item) => {
              const id = item.id || item._id;
              const isAdmin = item.role === 'admin';
              const isSelf = item.email === currentUser?.email;
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#121217]/90 border border-white/5 hover:border-brand/20 p-5 rounded-2xl flex flex-col gap-4 relative overflow-hidden transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-gradient-to-tr from-brand to-orange-400 p-[1px]">
                      <div className="w-full h-full rounded-[13px] bg-[#121217] overflow-hidden flex items-center justify-center font-bold text-white text-lg">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          item.name.charAt(0)
                        )}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white truncate text-base">{item.name}</h4>
                        {isSelf && <span className="text-[9px] bg-brand/10 text-brand border border-brand/20 px-1 py-0.2 rounded font-bold uppercase tracking-wider">You</span>}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-0.5">
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{item.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-white/5 w-full" />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500 text-xs block mb-1 font-semibold uppercase tracking-wider">Role</span>
                      <span className={`px-2.5 py-0.5 w-fit block rounded-full text-[10px] font-bold ${
                        isAdmin 
                          ? 'bg-brand/10 text-brand border border-brand/20' 
                          : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                      }`}>
                        {isAdmin ? 'Admin' : 'User'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs block mb-1 font-semibold uppercase tracking-wider">Sign-in</span>
                      <div className="flex items-center gap-1.5 text-slate-300 text-xs">
                        {item.provider === 'Google' ? (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                            <span>Google Auth</span>
                          </>
                        ) : (
                          <>
                            <Key className="w-3.5 h-3.5 text-slate-500" />
                            <span>Password</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-white/5 w-full" />

                  <div className="flex items-center justify-end mt-1">
                    <Button 
                      variant="outline" 
                      disabled={item.email === 'admin@example.com' || isSelf}
                      onClick={() => {
                        setUserToDelete(id!);
                        setDeleteModalOpen(true);
                      }}
                      className="h-10 px-4 rounded-xl bg-red-500/10 border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 transition-colors flex items-center gap-2 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete Account
                    </Button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="p-12 text-center text-slate-400 bg-[#121217]/50 rounded-2xl border border-white/5">
              <p className="text-lg font-medium text-white mb-1">No users found</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setDeleteModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#121217] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-white">Delete User Account?</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Are you sure you want to delete this user? This action cannot be undone and they will lose all access.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <Button 
                  variant="outline" 
                  className="bg-transparent border-white/10 text-white hover:bg-white/5 h-10 px-6 rounded-xl"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-red-500 hover:bg-red-600 text-white h-10 px-6 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all"
                  onClick={handleDeleteUser}
                >
                  Delete User
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
