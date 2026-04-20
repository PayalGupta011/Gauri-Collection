import React from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 md:p-14 border border-softBrown/5"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-softBrown rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3 group hover:rotate-0 transition-transform duration-500">
            <Lock className="text-white" size={32} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-serif text-softBrown">Boutique Admin</h1>
          <p className="text-gray-400 mt-2 text-[10px] uppercase tracking-[0.3em] font-bold">Gauri Collection Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-softBrown/40 uppercase tracking-widest ml-1">Administrator ID</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-softBrown/40" size={18} />
              <input 
                type="text" 
                defaultValue="admin_gauri"
                className="w-full bg-beige/30 border border-softBrown/10 p-4 pl-12 rounded-2xl focus:outline-none focus:border-goldenYellow text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-softBrown/40 uppercase tracking-widest ml-1">Secure Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-softBrown/40" size={18} />
              <input 
                type="password" 
                defaultValue="••••••••"
                className="w-full bg-beige/30 border border-softBrown/10 p-4 pl-12 rounded-2xl focus:outline-none focus:border-goldenYellow text-sm font-medium transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full gold-shimmer btn-premium py-5 text-white text-xs font-bold tracking-[0.3em] uppercase rounded-2xl shadow-xl flex items-center justify-center gap-2 group"
          >
            Authenticate
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 text-center">
          <button onClick={() => navigate('/')} className="text-xs text-softBrown/30 hover:text-softBrown transition-colors font-bold uppercase tracking-widest">
            Back to Storefront
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
