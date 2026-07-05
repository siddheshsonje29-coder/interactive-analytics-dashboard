import React, { useEffect } from 'react';
import AppRoutes from './routes';
import { useThemeStore } from './store/themeStore';
import { useNotificationStore } from './store/notificationStore';
import { motion, AnimatePresence } from 'framer-motion';
import { BiCheckCircle, BiInfoCircle, BiErrorCircle, BiX } from 'react-icons/bi';

// Sliding alert cards popup overlay
const ToastContainer = () => {
  const { toasts, removeToast } = useNotificationStore();

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <BiCheckCircle className="text-xl text-emerald-500" />;
      case 'warning': return <BiErrorCircle className="text-xl text-amber-500" />;
      case 'error': return <BiErrorCircle className="text-xl text-rose-500" />;
      default: return <BiInfoCircle className="text-xl text-indigo-500" />;
    }
  };

  const getBorder = (type) => {
    switch (type) {
      case 'success': return 'border-emerald-500/20 bg-emerald-50/95 dark:bg-emerald-950/95 shadow-emerald-500/5';
      case 'warning': return 'border-amber-500/20 bg-amber-50/95 dark:bg-amber-950/95 shadow-amber-500/5';
      case 'error': return 'border-rose-500/20 bg-rose-50/95 dark:bg-rose-950/95 shadow-rose-500/5';
      default: return 'border-indigo-500/20 bg-indigo-50/95 dark:bg-indigo-950/95 shadow-indigo-500/5';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-55 flex flex-col gap-3 max-w-sm w-[calc(100vw-3rem)] pointer-events-none select-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 12, transition: { duration: 0.15 } }}
            className={`flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-md shadow-xl pointer-events-auto text-xs font-bold leading-normal text-slate-850 dark:text-slate-200 ${getBorder(toast.type)}`}
          >
            <div className="shrink-0">{getIcon(toast.type)}</div>
            <div className="flex-1">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-450 hover:text-slate-650 cursor-pointer p-0.5 shrink-0"
              aria-label="Dismiss Alert"
            >
              <BiX className="text-base" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const applyTheme = useThemeStore((state) => state.applyTheme);

  useEffect(() => {
    // Synchronize document classes on bootstrap
    applyTheme();
    
    // Listen for theme mutations in systems
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      const currentTheme = useThemeStore.getState().theme;
      if (currentTheme === 'system') {
        applyTheme();
      }
    };
    
    media.addEventListener('change', handleSystemThemeChange);
    return () => media.removeEventListener('change', handleSystemThemeChange);
  }, [applyTheme]);

  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}
