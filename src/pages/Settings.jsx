import React, { useState } from 'react';
import { 
  BiUser, 
  BiEnvelope, 
  BiKey, 
  BiBell, 
  BiGlobe, 
  BiSun, 
  BiMoon, 
  BiDesktop,
  BiCheckCircle,
  BiBadgeCheck
} from 'react-icons/bi';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useNotificationStore } from '../store/notificationStore';

/**
 * Settings - User profile settings and theme config page.
 */
export const Settings = () => {
  const { user, updateProfile, language, setLanguage } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const { addNotification } = useNotificationStore();

  // Local Profile input states
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [company, setCompany] = useState(user?.company || '');

  // Local Password input states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Local Notifications state
  const [emailBilling, setEmailBilling] = useState(true);
  const [emailSignups, setEmailSignups] = useState(false);
  const [systemSecurity, setSystemSecurity] = useState(true);
  const [systemPerf, setSystemPerf] = useState(true);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@')) {
      addNotification('Invalid profile details.', 'warning');
      return;
    }
    updateProfile({ name, email, company });
    addNotification('Profile parameters saved successfully.', 'success');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      addNotification('New password must be at least 6 characters.', 'warning');
      return;
    }
    if (newPassword !== confirmPassword) {
      addNotification('Passwords do not match.', 'error');
      return;
    }
    
    // Mock success
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    addNotification('Account password updated successfully.', 'success');
  };

  const handleNotificationsSubmit = (e) => {
    e.preventDefault();
    addNotification('Notification preferences saved.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Settings</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">Manage account details, security credentials, language profiles, and themes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Profile Card & Avatar */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile settings */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800/40 pb-3 mb-5 flex items-center gap-2">
              <BiUser className="text-slate-500" /> Account Profile
            </h3>
            
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4.5 pb-4 mb-2">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-16 h-16 rounded-2xl border border-brand-500/20 bg-slate-100 dark:bg-slate-900"
                />
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Avatar Seed Icon</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase mt-0.5 tracking-wider">{user?.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Username</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-brand-500/45 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-brand-500/45 dark:text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-brand-500/45 dark:text-slate-200"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-lg shadow-brand-500/20 active:scale-95 transition-all cursor-pointer text-xs flex items-center gap-1.5"
              >
                <BiBadgeCheck className="text-base" />
                <span>Save Profile settings</span>
              </button>
            </form>
          </div>

          {/* Password update settings */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800/40 pb-3 mb-5 flex items-center gap-2">
              <BiKey className="text-slate-500" /> Security Credentials
            </h3>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-brand-500/45 dark:text-slate-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-brand-500/45 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-brand-500/45 dark:text-slate-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 font-bold text-white bg-slate-800 hover:bg-slate-900 dark:bg-slate-900 dark:hover:bg-slate-850 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 active:scale-95 transition-all cursor-pointer text-xs"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>

        {/* Theme, Languages, Notifications sidebar */}
        <div className="space-y-6">
          {/* Theme panel */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800/40 pb-3 mb-5 flex items-center gap-2">
              <BiSun className="text-slate-500" /> Color Themes
            </h3>
            
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-slate-650 dark:text-slate-350 select-none">
              <button
                onClick={() => setTheme('light')}
                className={`flex flex-col items-center gap-2 p-3.5 border rounded-xl cursor-pointer transition-colors ${
                  theme === 'light' 
                    ? 'border-brand-500/50 bg-brand-500/5 text-brand-600' 
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <BiSun className="text-xl text-amber-500" />
                <span>Light</span>
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`flex flex-col items-center gap-2 p-3.5 border rounded-xl cursor-pointer transition-colors ${
                  theme === 'dark' 
                    ? 'border-brand-500/50 bg-brand-500/5 text-brand-600' 
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <BiMoon className="text-xl text-violet-500" />
                <span>Dark</span>
              </button>

              <button
                onClick={() => setTheme('system')}
                className={`flex flex-col items-center gap-2 p-3.5 border rounded-xl cursor-pointer transition-colors ${
                  theme === 'system' 
                    ? 'border-brand-500/50 bg-brand-500/5 text-brand-600' 
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <BiDesktop className="text-xl text-slate-500" />
                <span>System</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-455 mt-3 leading-relaxed">System option matches browser and operating system settings automatically.</p>
          </div>

          {/* Languages panel */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800/40 pb-3 mb-5 flex items-center gap-2">
              <BiGlobe className="text-slate-500" /> Language Preferences
            </h3>
            
            <div className="space-y-3.5 text-xs font-semibold">
              <select
                value={language}
                onChange={(e) => { setLanguage(e.target.value); addNotification('Language updated (mock translations applied)', 'info'); }}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 font-semibold text-slate-650 dark:text-slate-350 focus:outline-none cursor-pointer"
              >
                <option value="en">English (US)</option>
                <option value="es">Español (ES)</option>
                <option value="fr">Français (FR)</option>
                <option value="ja">日本語 (JP)</option>
              </select>
              <p className="text-[10px] text-slate-455 leading-relaxed">Language parameters affect client report configurations and email newsletters.</p>
            </div>
          </div>

          {/* Notifications config */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800/40 pb-3 mb-5 flex items-center gap-2">
              <BiBell className="text-slate-500" /> Alerts Preferences
            </h3>
            
            <form onSubmit={handleNotificationsSubmit} className="space-y-3.5 select-none text-xs font-semibold text-slate-700 dark:text-slate-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailBilling}
                  onChange={(e) => setEmailBilling(e.target.checked)}
                  className="w-4 h-4 rounded accent-brand-500 dark:bg-slate-900 border-slate-350 dark:border-slate-800"
                />
                <span>Email me billing alerts</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailSignups}
                  onChange={(e) => setEmailSignups(e.target.checked)}
                  className="w-4 h-4 rounded accent-brand-500 dark:bg-slate-900 border-slate-350 dark:border-slate-800"
                />
                <span>Email me user registrations</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={systemSecurity}
                  onChange={(e) => setSystemSecurity(e.target.checked)}
                  className="w-4 h-4 rounded accent-brand-500 dark:bg-slate-900 border-slate-350 dark:border-slate-800"
                />
                <span>Real-time security logs</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={systemPerf}
                  onChange={(e) => setSystemPerf(e.target.checked)}
                  className="w-4 h-4 rounded accent-brand-500 dark:bg-slate-900 border-slate-350 dark:border-slate-800"
                />
                <span>Performance health checks</span>
              </label>

              <button
                type="submit"
                className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold cursor-pointer transition-colors"
              >
                Save Alerts Preferences
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
