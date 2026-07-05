import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BiEnvelope, BiLockAlt, BiLoaderAlt, BiErrorCircle } from 'react-icons/bi';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';

/**
 * Login - Secure login form.
 */
export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const addNotification = useNotificationStore((state) => state.addNotification);

  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');
  const [remember, setRemember] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password, remember);
      addNotification(`Welcome back, ${email.split('@')[0]}!`, 'success');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
      addNotification(err.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 relative overflow-hidden select-none">
      {/* Ambient backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-panel p-8 rounded-3xl z-10 border border-slate-200/50 dark:border-slate-800/60 shadow-2xl relative"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white font-extrabold text-2xl shadow-xl shadow-brand-500/25 mb-4">
            N
          </div>
          <h2 className="text-2xl font-extrabold text-slate-850 dark:text-slate-100">Welcome to Nexus</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Enter credentials to access your console</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-450 text-xs font-semibold rounded-2xl mb-6">
            <BiErrorCircle className="text-lg shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
                className="w-full pl-11 pr-4 py-3 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 dark:border-slate-800/40 focus:border-brand-500/40 focus:bg-white dark:focus:bg-slate-900 focus:outline-none rounded-2xl text-sm transition-all duration-300 text-slate-700 dark:text-slate-200"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Password</label>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-xs font-bold text-brand-600 dark:text-brand-500 hover:underline cursor-pointer"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <BiLockAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-450 text-lg" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 dark:border-slate-800/40 focus:border-brand-500/40 focus:bg-white dark:focus:bg-slate-900 focus:outline-none rounded-2xl text-sm transition-all duration-300 text-slate-700 dark:text-slate-200"
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-1">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-450 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4.5 h-4.5 accent-brand-500 rounded border-slate-350 dark:border-slate-800 dark:bg-slate-900 cursor-pointer"
              />
              <span>Remember Me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-500 hover:from-brand-700 hover:to-indigo-600 rounded-2xl shadow-xl shadow-brand-500/25 active:scale-95 disabled:scale-100 disabled:opacity-75 transition-all duration-200 cursor-pointer flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <BiLoaderAlt className="animate-spin text-xl" />
                <span>Signing you in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-[11px] text-slate-400">
            For testing: <code className="bg-slate-150 dark:bg-slate-900 px-1.5 py-0.5 rounded text-brand-600">demo@example.com</code> / <code className="bg-slate-150 dark:bg-slate-900 px-1.5 py-0.5 rounded text-brand-600">password123</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
