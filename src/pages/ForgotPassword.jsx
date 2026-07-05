import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BiEnvelope, BiArrowBack, BiLoaderAlt, BiCheckCircle } from 'react-icons/bi';
import { useNotificationStore } from '../store/notificationStore';

/**
 * ForgotPassword - Forgot password recovery request.
 */
export const ForgotPassword = () => {
  const navigate = useNavigate();
  const addNotification = useNotificationStore((state) => state.addNotification);

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      addNotification(`Reset link successfully sent to ${email}`, 'success');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 relative overflow-hidden select-none">
      {/* Decors background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-panel p-8 rounded-3xl z-10 border border-slate-200/50 dark:border-slate-800/60 shadow-2xl relative"
      >
        <button
          onClick={() => navigate('/login')}
          className="absolute top-6 left-6 text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer"
        >
          <BiArrowBack className="text-base" />
          <span>Back</span>
        </button>

        <div className="text-center mb-8 mt-4">
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Reset Password</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">We will send you instructions to reset your password</p>
        </div>

        {success ? (
          <div className="text-center py-4">
            <BiCheckCircle className="text-5xl text-emerald-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Email Dispatched</h3>
            <p className="text-xs text-slate-500 dark:text-slate-450 mt-2 max-w-sm mx-auto leading-relaxed">
              We have dispatched a verification recovery link to <strong className="text-brand-600">{email}</strong>. Please check your inbox.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="mt-6 w-full py-2.5 px-4 font-bold text-slate-700 dark:text-slate-350 border border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-2xl transition-all cursor-pointer font-sans"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">Email Address</label>
              <div className="relative">
                <BiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-450 text-lg" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 dark:border-slate-800/40 focus:border-brand-500/40 focus:bg-white dark:focus:bg-slate-900 rounded-2xl text-sm focus:outline-none transition-all duration-300 text-slate-700 dark:text-slate-200"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-500 hover:from-brand-700 hover:to-indigo-600 rounded-2xl shadow-xl shadow-brand-500/25 active:scale-95 disabled:scale-100 disabled:opacity-75 transition-all duration-200 cursor-pointer flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <BiLoaderAlt className="animate-spin text-xl" />
                  <span>Sending reset link...</span>
                </>
              ) : (
                <span>Request Recovery Link</span>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
