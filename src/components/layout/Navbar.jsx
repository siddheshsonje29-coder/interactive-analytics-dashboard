import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BiSearch, 
  BiBell, 
  BiSun, 
  BiMoon, 
  BiDesktop,
  BiMenuAltLeft, 
  BiChevronDown,
  BiCheck
} from 'react-icons/bi';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { useNotificationStore } from '../../store/notificationStore';

/**
 * Navbar - Navigation top bar.
 */
export const Navbar = ({ setIsMobileOpen }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const { notifications, markAllAsRead } = useNotificationStore();
  
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  
  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const themeRef = useRef(null);

  const unreadNotifications = notifications.filter(n => !n.read);
  const unreadCount = unreadNotifications.length;

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (themeRef.current && !themeRef.current.contains(e.target)) setThemeOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getThemeIcon = () => {
    if (theme === 'dark') return <BiMoon className="text-lg text-violet-500" />;
    if (theme === 'light') return <BiSun className="text-lg text-amber-500" />;
    return <BiDesktop className="text-lg text-slate-500" />;
  };

  return (
    <header className="glass-panel sticky top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-3 border-x-0 border-t-0 select-none">
      {/* Left side actions */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 cursor-pointer"
          aria-label="Open Sidebar Drawer"
        >
          <BiMenuAltLeft className="text-2xl" />
        </button>
        
        {/* Search Input Box */}
        <div className="relative max-w-md w-full hidden sm:block">
          <BiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          <input
            type="text"
            placeholder="Search dashboards, reports, users..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100/80 dark:bg-slate-900/60 border border-transparent focus:border-brand-500/30 focus:bg-white dark:focus:bg-slate-900 rounded-xl text-sm focus:outline-none transition-all duration-300 dark:text-slate-200"
          />
        </div>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-3">
        {/* Theme Settings Selector */}
        <div className="relative" ref={themeRef}>
          <button
            onClick={() => setThemeOpen(!themeOpen)}
            className="p-2.5 bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800/80 rounded-xl text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
            aria-label="Theme Selector"
          >
            {getThemeIcon()}
          </button>
          
          {themeOpen && (
            <div className="absolute right-0 mt-2 w-36 glass-panel rounded-xl shadow-xl p-1.5 border border-slate-200/50 dark:border-slate-800/85">
              <button
                onClick={() => { setTheme('light'); setThemeOpen(false); }}
                className={`flex items-center justify-between w-full px-3 py-2 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left cursor-pointer ${theme === 'light' ? 'text-brand-600 dark:text-brand-400 bg-brand-500/5' : 'text-slate-600 dark:text-slate-400'}`}
              >
                <span className="flex items-center gap-2"><BiSun /> Light</span>
                {theme === 'light' && <BiCheck className="text-base" />}
              </button>
              <button
                onClick={() => { setTheme('dark'); setThemeOpen(false); }}
                className={`flex items-center justify-between w-full px-3 py-2 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left cursor-pointer ${theme === 'dark' ? 'text-brand-600 dark:text-brand-400 bg-brand-500/5' : 'text-slate-600 dark:text-slate-400'}`}
              >
                <span className="flex items-center gap-2"><BiMoon /> Dark</span>
                {theme === 'dark' && <BiCheck className="text-base" />}
              </button>
              <button
                onClick={() => { setTheme('system'); setThemeOpen(false); }}
                className={`flex items-center justify-between w-full px-3 py-2 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left cursor-pointer ${theme === 'system' ? 'text-brand-600 dark:text-brand-400 bg-brand-500/5' : 'text-slate-600 dark:text-slate-400'}`}
              >
                <span className="flex items-center gap-2"><BiDesktop /> System</span>
                {theme === 'system' && <BiCheck className="text-base" />}
              </button>
            </div>
          )}
        </div>

        {/* Notifications Popover Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2.5 bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800/80 rounded-xl text-slate-500 dark:text-slate-400 transition-colors cursor-pointer relative"
            aria-label="Notification Center"
          >
            <BiBell className="text-lg" />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            )}
          </button>
          
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 glass-panel rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/85 overflow-hidden">
              <div className="flex justify-between items-center px-4 py-3 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/40">
                <span className="text-xs font-bold text-slate-850 dark:text-slate-200">Alerts & Logs</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[10px] font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 cursor-pointer"
                  >
                    Clear unread
                  </button>
                )}
              </div>
              
              <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/40">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">No alerts found.</div>
                ) : (
                  notifications.slice(0, 5).map((notif) => (
                    <div key={notif.id} className={`p-3 text-xs leading-normal hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors ${!notif.read ? 'bg-brand-500/5' : ''}`}>
                      <p className="text-slate-700 dark:text-slate-350">{notif.message}</p>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-1">
                        {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))
                )}
              </div>
              
              <div className="p-2.5 border-t border-slate-200/50 dark:border-slate-800/50 text-center">
                <button
                  onClick={() => { setNotifOpen(false); navigate('/notifications'); }}
                  className="text-xs font-bold text-slate-500 dark:text-slate-450 hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer"
                >
                  View all notification history
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Account Controls */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 pl-2 pr-3 py-1 bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800/80 rounded-full cursor-pointer transition-colors"
          >
            <img
              src={user?.avatar || 'https://api.dicebear.com/7.x/adventurer/svg'}
              alt={user?.name}
              className="w-8 h-8 rounded-full border border-brand-500/20"
            />
            <div className="text-left hidden lg:block select-none leading-tight">
              <p className="text-xs font-bold text-slate-850 dark:text-slate-200">{user?.name}</p>
              <p className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">{user?.role}</p>
            </div>
            <BiChevronDown className="text-slate-550 text-sm hidden lg:block" />
          </button>
          
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 glass-panel rounded-2xl shadow-xl p-1.5 border border-slate-200/50 dark:border-slate-800/85">
              <div className="px-3 py-2 border-b border-slate-200/50 dark:border-slate-800/50 text-xs mb-1.5 leading-tight">
                <p className="font-bold text-slate-850 dark:text-slate-200 truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5">{user?.email}</p>
              </div>
              <button
                onClick={() => { setProfileOpen(false); navigate('/settings'); }}
                className="flex items-center w-full px-3 py-2 text-xs font-semibold rounded-lg text-slate-700 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800 text-left cursor-pointer"
              >
                Profile settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-xs font-semibold rounded-lg text-rose-600 hover:bg-rose-500/10 text-left cursor-pointer mt-1"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
