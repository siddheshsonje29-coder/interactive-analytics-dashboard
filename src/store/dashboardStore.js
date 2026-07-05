import { create } from 'zustand';

// Sample visual sparkline data generator
const generateSparkline = (points, base, variance) => {
  return Array.from({ length: points }, (_, i) => ({
    value: Math.floor(base + Math.random() * variance * 2 - variance)
  }));
};

export const useDashboardStore = create((set, get) => ({
  isLoading: false,
  
  // Dashboard Widget Layout Order
  widgetOrder: ['revenue', 'users', 'orders', 'conversion', 'activeUsers'],
  
  // KPI Metrics
  kpis: {
    revenue: {
      title: 'Total Revenue',
      value: '$124,560.00',
      change: '+14.2%',
      isPositive: true,
      sparkline: generateSparkline(10, 12000, 1500)
    },
    users: {
      title: 'Total Users',
      value: '24,890',
      change: '+8.3%',
      isPositive: true,
      sparkline: generateSparkline(10, 2400, 200)
    },
    orders: {
      title: 'Total Orders',
      value: '12,430',
      change: '-2.1%',
      isPositive: false,
      sparkline: generateSparkline(10, 1200, 150)
    },
    conversion: {
      title: 'Conversion Rate',
      value: '3.62%',
      change: '+4.7%',
      isPositive: true,
      sparkline: generateSparkline(10, 3.5, 0.4)
    },
    activeUsers: {
      title: 'Active Users',
      value: '1,482',
      change: '+18.9%',
      isPositive: true,
      sparkline: generateSparkline(10, 1400, 100)
    }
  },

  // Recharts Datasets
  chartsData: {
    revenue: [
      { name: 'Jan', revenue: 64000, expenses: 48000 },
      { name: 'Feb', revenue: 72000, expenses: 51000 },
      { name: 'Mar', revenue: 89000, expenses: 58000 },
      { name: 'Apr', revenue: 84000, expenses: 53000 },
      { name: 'May', revenue: 98000, expenses: 62000 },
      { name: 'Jun', revenue: 112000, expenses: 69000 },
      { name: 'Jul', revenue: 124560, expenses: 78000 }
    ],
    sales: [
      { name: 'Mon', sales: 420 },
      { name: 'Tue', sales: 580 },
      { name: 'Wed', sales: 810 },
      { name: 'Thu', sales: 640 },
      { name: 'Fri', sales: 980 },
      { name: 'Sat', sales: 1200 },
      { name: 'Sun', sales: 1100 }
    ],
    userGrowth: [
      { name: 'Jan', active: 12000, new: 1800 },
      { name: 'Feb', active: 13500, new: 2200 },
      { name: 'Mar', active: 15400, new: 2800 },
      { name: 'Apr', active: 17200, new: 2400 },
      { name: 'May', active: 19800, new: 3100 },
      { name: 'Jun', active: 22400, new: 3500 },
      { name: 'Jul', active: 24890, new: 3900 }
    ],
    trafficSources: [
      { name: 'Direct', value: 4200, color: '#3b82f6' },
      { name: 'Organic Search', value: 6800, color: '#8b5cf6' },
      { name: 'Referral', value: 2400, color: '#10b981' },
      { name: 'Social Media', value: 1800, color: '#f59e0b' },
      { name: 'Email Campaigns', value: 1100, color: '#ef4444' }
    ],
    comparison: [
      { month: 'Mar', lastYear: 78000, thisYear: 89000 },
      { month: 'Apr', lastYear: 81000, thisYear: 84000 },
      { month: 'May', lastYear: 85000, thisYear: 98000 },
      { month: 'Jun', lastYear: 95000, thisYear: 112000 },
      { month: 'Jul', lastYear: 104000, thisYear: 124560 }
    ]
  },

  // Users Database (CRUD Interface)
  users: [
    { id: 'usr-101', name: 'Alexander Wright', email: 'alex.wright@example.com', sales: 42, status: 'Active', role: 'Premium Client', date: '2026-01-14' },
    { id: 'usr-102', name: 'Sophia Martinez', email: 's.martinez@example.com', sales: 18, status: 'Active', role: 'Retail User', date: '2026-02-09' },
    { id: 'usr-103', name: 'Benjamin Cole', email: 'b.cole@example.com', sales: 0, status: 'Inactive', role: 'Free Tier', date: '2026-03-22' },
    { id: 'usr-104', name: 'Emma Watson', email: 'emma.w@example.com', sales: 88, status: 'Active', role: 'Enterprise Admin', date: '2025-11-05' },
    { id: 'usr-105', name: 'Lucas Sterling', email: 'lucas.s@example.com', sales: 125, status: 'Active', role: 'Partner Agency', date: '2025-08-30' },
    { id: 'usr-106', name: 'Chloe Laurent', email: 'chloe.l@example.com', sales: 5, status: 'Inactive', role: 'Retail User', date: '2026-04-01' },
    { id: 'usr-107', name: 'Daniel Brooks', email: 'd.brooks@example.com', sales: 52, status: 'Active', role: 'Premium Client', date: '2026-05-18' }
  ],

  // Task Manager Checklist
  tasks: [
    { id: 't-1', text: 'Review visual QA comments on Analytics layout', completed: true },
    { id: 't-2', text: 'Prepare CSV template for export systems', completed: false },
    { id: 't-3', text: 'Sync theme changes with local system settings', completed: false },
    { id: 't-4', text: 'Deploy beta build to staging preview', completed: false }
  ],

  // Calendar Event Scheduler
  events: [
    { id: 'e-1', title: 'Q2 Performance Sync', date: '2026-07-06', color: 'purple' },
    { id: 'e-2', title: 'Product Launch Review', date: '2026-07-10', color: 'blue' },
    { id: 'e-3', title: 'Client Analytics Walkthrough', date: '2026-07-15', color: 'green' }
  ],

  // Interactive Mock Weather Widget
  weather: {
    city: 'New York',
    temperature: 24,
    condition: 'Partly Cloudy',
    humidity: 55,
    wind: 12
  },

  // Recent Activities
  activities: [
    { id: 'act-1', text: 'User Emma Watson upgraded to Enterprise Tier', time: '10 mins ago', category: 'billing' },
    { id: 'act-2', text: 'System backup succeeded: 4.8GB compressed', time: '1 hr ago', category: 'system' },
    { id: 'act-3', text: 'API token regenerated for client "VercelDeployer"', time: '3 hrs ago', category: 'security' },
    { id: 'act-4', text: 'Lucas Sterling registered new order #884321', time: '5 hrs ago', category: 'sales' }
  ],

  // Reorder Dashboard Widget Layout
  setWidgetOrder: (newOrder) => {
    set({ widgetOrder: newOrder });
  },

  // Users CRUD operations
  addUser: (newUser) => {
    set((state) => {
      const user = {
        id: `usr-${Date.now().toString().slice(-3)}`,
        date: new Date().toISOString().split('T')[0],
        sales: 0,
        ...newUser
      };
      const updatedUsers = [user, ...state.users];
      
      // Update activity feed
      const activity = {
        id: `act-${Date.now()}`,
        text: `New user ${user.name} added to the system`,
        time: 'Just now',
        category: 'user'
      };
      
      return { 
        users: updatedUsers,
        activities: [activity, ...state.activities].slice(0, 10)
      };
    });
  },

  editUser: (id, updatedFields) => {
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...updatedFields } : u))
    }));
  },

  deleteUser: (id) => {
    set((state) => {
      const targetUser = state.users.find(u => u.id === id);
      const updatedUsers = state.users.filter((u) => u.id !== id);
      
      const activity = {
        id: `act-${Date.now()}`,
        text: `User ${targetUser ? targetUser.name : id} was deleted`,
        time: 'Just now',
        category: 'user'
      };
      
      return { 
        users: updatedUsers,
        activities: [activity, ...state.activities].slice(0, 10)
      };
    });
  },

  toggleUserStatus: (id) => {
    set((state) => ({
      users: state.users.map((u) => 
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
      )
    }));
  },

  // Task Actions
  addTask: (text) => {
    if (!text.trim()) return;
    set((state) => ({
      tasks: [...state.tasks, { id: `t-${Date.now()}`, text, completed: false }]
    }));
  },

  toggleTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    }));
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id)
    }));
  },

  // Event Actions
  addEvent: (event) => {
    set((state) => ({
      events: [...state.events, { id: `e-${Date.now()}`, ...event }]
    }));
  },

  deleteEvent: (id) => {
    set((state) => ({
      events: state.events.filter((e) => e.id !== id)
    }));
  },

  // Weather Customizer
  updateWeather: (city) => {
    const citiesWeather = {
      'New York': { city: 'New York', temperature: 24, condition: 'Partly Cloudy', humidity: 55, wind: 12 },
      'San Francisco': { city: 'San Francisco', temperature: 18, condition: 'Foggy & Cool', humidity: 80, wind: 15 },
      'London': { city: 'London', temperature: 16, condition: 'Light Rain', humidity: 88, wind: 20 },
      'Tokyo': { city: 'Tokyo', temperature: 28, condition: 'Sunny & Warm', humidity: 60, wind: 8 },
      'Mumbai': { city: 'Mumbai', temperature: 32, condition: 'Monsoon Showers', humidity: 90, wind: 25 }
    };
    
    if (citiesWeather[city]) {
      set({ weather: citiesWeather[city] });
    }
  }
}));
