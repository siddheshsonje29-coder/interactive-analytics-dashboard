import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BiSolidDashboard, 
  BiLineChart, 
  BiGroup, 
  BiFile, 
  BiCog, 
  BiBell, 
  BiLogOut, 
  BiChevronLeft, 
  BiChevronRight,
  BiX
} from 'react-icons/bi';
import { useAuthStore } from '../../store/authStore';
import { useNotificationStore } from '../../store/notificationStore';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: BiSolidDashboard },
  { path: '/analytics', label: 'Analytics', icon: BiLineChart },
  { path: '/users', label: 'Users', icon: BiGroup },
  { path: '/reports', label: 'Reports', icon: BiFile },
  { path: '/settings', label: 'Settings', icon: BiCog },
  { path: '/notifications', label: 'Notifications', icon: BiBell, badge: true },
];

/**
 * Sidebar - Collapsible navigation sidebar.
 */
export const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const notifications = useNotificationStore((state) => state.notifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarVariants = {
    expanded: { width: 240, transition: { duration: 0.3, ease: 'easeInOut' } },
    collapsed: { width: 72, transition: { duration: 0.3, ease: 'easeInOut' } }
  };

  const content = (
    <div className="flex flex-col h-full py-4 text-slate-700 dark:text-slate-300">
      {/* Brand Logo Header */}
      <div className="flex items-center gap-3 px-5 mb-8 select-none">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white font-extrabold text-lg shadow-lg shadow-brand-500/20 shrink-0">
          N
        </div>
        <AnimatePresence>
          {(!isCollapsed || isMobileOpen) && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-lg font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
            >
              Nexus
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 px-2.5 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group relative
                ${isActive 
                  ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-400'}
              `}
            >
              <Icon className="text-xl shrink-0" />
              {(!isCollapsed || isMobileOpen) && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 truncate"
                >
                  {item.label}
                </motion.span>
              )}
              {item.badge && unreadCount > 0 && (!isCollapsed || isMobileOpen) && (
                <span className="flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-bold text-white bg-rose-500 rounded-full animate-pulse shrink-0">
                  {unreadCount}
                </span>
              )}
              {item.badge && unreadCount > 0 && isCollapsed && !isMobileOpen && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse border border-white dark:border-slate-950" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="px-2.5 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-500/10 hover:text-rose-700 dark:hover:text-rose-400 transition-all duration-200 cursor-pointer"
        >
          <BiLogOut className="text-xl shrink-0" />
          {(!isCollapsed || isMobileOpen) && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Panel */}
      <motion.aside
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        className="hidden md:block glass-panel h-screen sticky top-0 left-0 z-30 shrink-0 border-y-0 border-l-0"
      >
        {content}
        {/* Toggle Arrow Handle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3.5 top-12 flex items-center justify-center w-7 h-7 rounded-full border border-slate-200/50 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-800 dark:hover:text-white shadow-md cursor-pointer z-50 hover:scale-105 transition-transform"
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <BiChevronRight /> : <BiChevronLeft />}
        </button>
      </motion.aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop Mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            {/* Sliding Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 left-0 h-screen w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 z-50 md:hidden"
            >
              {content}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                aria-label="Close Sidebar"
              >
                <BiX className="text-2xl" />
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
