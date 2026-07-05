import { create } from 'zustand';

const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
const rememberMe = localStorage.getItem('rememberMe') === 'true';

const initialUser = storedUser ? JSON.parse(storedUser) : null;

export const useAuthStore = create((set) => ({
  user: initialUser,
  isAuthenticated: !!initialUser,
  rememberMe,
  language: localStorage.getItem('language') || 'en',
  
  login: async (email, password, remember) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email.includes('@') || password.length < 4) {
          reject(new Error('Invalid email format or password too short (min 4 characters)'));
          return;
        }
        
        // Mock successful login
        const namePart = email.split('@')[0];
        const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        
        const userData = {
          id: 'admin-01',
          name: formattedName,
          email,
          avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${namePart}`,
          role: 'Super Admin',
          company: 'Nexus Analytics Ltd.'
        };

        localStorage.setItem('rememberMe', remember ? 'true' : 'false');
        if (remember) {
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('user', JSON.stringify(userData));
        }

        set({ user: userData, isAuthenticated: true, rememberMe: remember });
        resolve(userData);
      }, 1000);
    });
  },
  
  logout: () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },
  
  updateProfile: (updates) => {
    set((state) => {
      const updatedUser = { ...state.user, ...updates };
      if (state.rememberMe) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
      }
      return { user: updatedUser };
    });
  },
  
  setLanguage: (lang) => {
    localStorage.setItem('language', lang);
    set({ language: lang });
  }
}));
