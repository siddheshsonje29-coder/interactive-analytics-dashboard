import React from 'react';
import { 
  BiCheckCircle, 
  BiInfoCircle, 
  BiErrorCircle, 
  BiNotification,
  BiTrash,
  BiPlusCircle,
  BiCheckSquare
} from 'react-icons/bi';
import { useNotificationStore } from '../store/notificationStore';

/**
 * Notifications - In-app logs and toast alert testing console.
 */
export const Notifications = () => {
  const { notifications, addNotification, clearHistory, markAllAsRead } = useNotificationStore();

  const triggerMockToast = (type) => {
    switch (type) {
      case 'success':
        addNotification('Export compilation finished successfully. PDF ready for download.', 'success');
        break;
      case 'warning':
        addNotification('System warning: Client bandwidth usage at 85% capacity threshold.', 'warning');
        break;
      case 'error':
        addNotification('Database transaction failed: Out of disk memory blocks.', 'error');
        break;
      case 'info':
        addNotification('Session log: Admin verified API keys regeneration request.', 'info');
        break;
      default:
        addNotification('Default notification message trigger.', 'info');
    }
  };

  const getNotifClass = (type) => {
    switch (type) {
      case 'success': return 'border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400';
      case 'warning': return 'border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400';
      case 'error': return 'border-rose-500/20 bg-rose-500/5 text-rose-600 dark:text-rose-455';
      default: return 'border-indigo-500/20 bg-indigo-500/5 text-indigo-650 dark:text-indigo-400';
    }
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case 'success': return <BiCheckCircle className="text-lg" />;
      case 'warning': return <BiErrorCircle className="text-lg text-amber-500" />;
      case 'error': return <BiErrorCircle className="text-lg text-rose-500" />;
      default: return <BiInfoCircle className="text-lg" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">System Notifications</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Audit logs, event timelines, and simulate live user notification triggers.</p>
        </div>
        
        {/* Bulk Action Controls */}
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={markAllAsRead}
            disabled={notifications.length === 0}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-150 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800/80 text-slate-650 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer text-xs disabled:opacity-50"
          >
            <BiCheckSquare className="text-base" />
            <span>Mark read</span>
          </button>
          
          <button
            onClick={clearHistory}
            disabled={notifications.length === 0}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-650 dark:text-rose-400 font-bold rounded-xl cursor-pointer text-xs disabled:opacity-50"
          >
            <BiTrash className="text-base" />
            <span>Clear timeline</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main Notifications Log */}
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800/40 pb-3 mb-5 flex items-center gap-2">
            <BiNotification className="text-slate-500" /> Notifications Log
          </h3>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs select-none">
                No notification history found. Timeline cleared.
              </div>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`flex gap-3.5 p-3.5 rounded-2xl border text-xs font-semibold select-none leading-relaxed ${getNotifClass(notif.type)} ${
                    !notif.read ? 'ring-1 ring-brand-500/30' : ''
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{getNotifIcon(notif.type)}</div>
                  <div className="flex-1">
                    <p className="text-slate-800 dark:text-slate-200">{notif.message}</p>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-1">
                      {new Date(notif.timestamp).toLocaleString()} {!notif.read && <strong className="text-brand-500 ml-1.5">• New</strong>}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Live Simulator Panel */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800/40 pb-3 mb-5 flex items-center gap-2">
            <BiPlusCircle className="text-slate-500" /> Real-time Simulator
          </h3>
          <p className="text-xs text-slate-455 mb-6 leading-relaxed">
            Click a button below to trigger and test different levels of system toast notifications inside the admin panel.
          </p>

          <div className="space-y-3 font-bold text-xs">
            <button
              onClick={() => triggerMockToast('success')}
              className="w-full py-2.5 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl cursor-pointer text-left transition-colors flex items-center gap-2.5"
            >
              <BiCheckCircle className="text-lg shrink-0" />
              <span>Simulate Success Toast</span>
            </button>

            <button
              onClick={() => triggerMockToast('info')}
              className="w-full py-2.5 px-4 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-650 dark:text-indigo-400 rounded-xl cursor-pointer text-left transition-colors flex items-center gap-2.5"
            >
              <BiInfoCircle className="text-lg shrink-0" />
              <span>Simulate Informational Toast</span>
            </button>

            <button
              onClick={() => triggerMockToast('warning')}
              className="w-full py-2.5 px-4 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl cursor-pointer text-left transition-colors flex items-center gap-2.5"
            >
              <BiErrorCircle className="text-lg shrink-0 text-amber-500" />
              <span>Simulate Warning Alert</span>
            </button>

            <button
              onClick={() => triggerMockToast('error')}
              className="w-full py-2.5 px-4 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-455 rounded-xl cursor-pointer text-left transition-colors flex items-center gap-2.5"
            >
              <BiErrorCircle className="text-lg shrink-0 text-rose-550" />
              <span>Simulate Failure Toast</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
