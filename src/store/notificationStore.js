import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  notifications: [
    {
      id: 'init-1',
      message: 'Welcome to the Interactive Analytics Dashboard!',
      type: 'success',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
      read: false
    },
    {
      id: 'init-2',
      message: 'System performance check completed successfully.',
      type: 'info',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
      read: true
    },
    {
      id: 'init-3',
      message: 'New user registration: Sophia Carter (sophia.c@example.com).',
      type: 'success',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hrs ago
      read: true
    },
    {
      id: 'init-4',
      message: 'Database backup: Warning, memory utilization at 82%.',
      type: 'warning',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hrs ago
      read: true
    }
  ],
  toasts: [],
  
  addNotification: (message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newNotif = { id, message, type, timestamp: new Date(), read: false };
    
    set((state) => ({
      notifications: [newNotif, ...state.notifications].slice(0, 50),
      toasts: [...state.toasts, newNotif],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4000);
  },
  
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
  
  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    }));
  },
  
  clearHistory: () => {
    set({ notifications: [] });
  }
}));
