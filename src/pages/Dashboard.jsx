import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BiDollar, 
  BiUser, 
  BiCart, 
  BiTargetLock, 
  BiPulse, 
  BiTimeFive,
  BiSun,
  BiCloudRain,
  BiCloud,
  BiWind,
  BiWater,
  BiPlus,
  BiTrash,
  BiCalendarEvent,
  BiRightArrowAlt,
  BiInfoCircle,
  BiBug,
  BiCheckCircle,
  BiChevronLeft,
  BiChevronRight
} from 'react-icons/bi';
import { useDashboardStore } from '../store/dashboardStore';
import { useNotificationStore } from '../store/notificationStore';
import { mockDataService, getApiErrorStatus, toggleApiErrorSimulation } from '../services/api';
import MetricCard from '../components/ui/MetricCard';
import RevenueLineChart from '../components/charts/RevenueLineChart';
import SalesBarChart from '../components/charts/SalesBarChart';
import { MetricSkeleton, ChartSkeleton } from '../components/ui/LoadingSkeleton';

/**
 * Dashboard - Admin portal landing page.
 */
export const Dashboard = () => {
  const store = useDashboardStore();
  const { addNotification } = useNotificationStore();
  
  // Local state for page loading
  const [pageLoading, setPageLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [errorDetails, setErrorDetails] = useState('');
  
  // Real-time Clock state
  const [time, setTime] = useState(new Date());

  // Task Input state
  const [newTaskText, setNewTaskText] = useState('');

  // Event Input state
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventColor, setNewEventColor] = useState('purple');

  // Trigger loading simulation on mount
  useEffect(() => {
    loadDashboardData();
    
    // Real-time clock interval
    const clockTimer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(clockTimer);
  }, []);

  const loadDashboardData = async () => {
    setPageLoading(true);
    setApiError(false);
    setErrorDetails('');
    try {
      await mockDataService.fetchDashboardKPIs();
      setPageLoading(false);
    } catch (err) {
      console.error(err);
      setApiError(true);
      setErrorDetails(err.message || 'Error occurred.');
      setPageLoading(false);
    }
  };

  const handleToggleApiErrorSimulation = () => {
    const nextState = !getApiErrorStatus();
    toggleApiErrorSimulation(nextState);
    addNotification(
      `Simulated API errors turned ${nextState ? 'ON' : 'OFF'}. Reload data to test.`,
      nextState ? 'warning' : 'success'
    );
  };

  const getKPIIcon = (key) => {
    switch (key) {
      case 'revenue': return BiDollar;
      case 'users': return BiUser;
      case 'orders': return BiCart;
      case 'conversion': return BiTargetLock;
      case 'activeUsers': return BiPulse;
      default: return BiPulse;
    }
  };

  const getWeatherIcon = (condition) => {
    const lower = condition.toLowerCase();
    if (lower.includes('sunny')) return <BiSun className="text-amber-500 text-3xl animate-spin-slow" />;
    if (lower.includes('rain')) return <BiCloudRain className="text-blue-500 text-3xl animate-bounce" />;
    return <BiCloud className="text-slate-400 text-3xl animate-pulse" />;
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    store.addTask(newTaskText);
    setNewTaskText('');
    addNotification('Checklist item added', 'info');
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim() || !newEventDate) return;
    store.addEvent({
      title: newEventTitle,
      date: newEventDate,
      color: newEventColor
    });
    setNewEventTitle('');
    setNewEventDate('');
    addNotification('Meeting scheduled on calendar', 'success');
  };

  // Reordering controls
  const moveWidget = (index, direction) => {
    const newOrder = [...store.widgetOrder];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    
    // Swap elements
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;
    store.setWidgetOrder(newOrder);
    addNotification('Dashboard widgets layout updated', 'info');
  };

  if (apiError) {
    // We will throw error to let Error Boundary catch it if simulation is active
    throw new Error(errorDetails);
  }

  return (
    <div className="space-y-6">
      {/* Header section with simulated controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Overview</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Real-time SaaS health analytics and widget summaries.</p>
        </div>
        
        {/* API Error Toggle Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={loadDashboardData}
            disabled={pageLoading}
            className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            Refetch data
          </button>
          
          <button
            onClick={handleToggleApiErrorSimulation}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
              getApiErrorStatus()
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 border border-transparent'
            }`}
          >
            <BiBug className="text-sm" />
            <span>Simulate API Failures: {getApiErrorStatus() ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* KPI Section */}
      {pageLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {Array.from({ length: 5 }).map((_, i) => <MetricSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {store.widgetOrder.map((key, index) => {
            const kpi = store.kpis[key];
            if (!kpi) return null;
            return (
              <div key={key} className="relative group">
                <MetricCard
                  title={kpi.title}
                  value={kpi.value}
                  change={kpi.change}
                  isPositive={kpi.isPositive}
                  sparkline={kpi.sparkline}
                  icon={getKPIIcon(key)}
                />
                
                {/* Reordering helper arrows shown on hover */}
                <div className="absolute top-2 right-12 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-white/90 dark:bg-slate-900/90 rounded-md p-1 shadow border border-slate-200/50 dark:border-slate-800/80 z-10">
                  <button
                    onClick={(e) => { e.stopPropagation(); moveWidget(index, -1); }}
                    disabled={index === 0}
                    className="p-0.5 text-slate-500 hover:text-brand-500 disabled:opacity-30 cursor-pointer"
                    title="Move Left"
                  >
                    <BiChevronLeft />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); moveWidget(index, 1); }}
                    disabled={index === store.widgetOrder.length - 1}
                    className="p-0.5 text-slate-500 hover:text-brand-500 disabled:opacity-30 cursor-pointer"
                    title="Move Right"
                  >
                    <BiChevronRight />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pageLoading ? (
          <ChartSkeleton height={360} />
        ) : (
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-850 dark:text-slate-100">Revenue Heartbeat</h3>
                <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Gross revenue vs overhead expenses</p>
              </div>
            </div>
            <RevenueLineChart data={store.chartsData.revenue} />
          </div>
        )}

        {pageLoading ? (
          <ChartSkeleton height={360} />
        ) : (
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-850 dark:text-slate-100">Transacted Units</h3>
                <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Weekly checkout volume distribution</p>
              </div>
            </div>
            <SalesBarChart data={store.chartsData.sales} />
          </div>
        )}
      </div>

      {/* Interactive Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Real-time Clock widget */}
        <div className="glass-card p-6 flex flex-col justify-between min-h-[220px]">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/40 pb-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Terminal Clock</h3>
            <BiTimeFive className="text-slate-400 text-lg" />
          </div>
          <div className="py-4 text-center select-all">
            <p className="text-3xl font-extrabold tracking-widest bg-gradient-to-r from-brand-600 to-indigo-500 bg-clip-text text-transparent font-mono">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
            <p className="text-xs font-semibold text-slate-450 dark:text-slate-500 mt-2">
              {time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
            </p>
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg text-center font-medium">
            System Local Time (UTC+05:30)
          </div>
        </div>

        {/* Dynamic Weather widget */}
        <div className="glass-card p-6 flex flex-col justify-between min-h-[220px]">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/40 pb-2">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Local Weather</h3>
            <select
              value={store.weather.city}
              onChange={(e) => store.updateWeather(e.target.value)}
              className="text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1 font-semibold text-slate-600 dark:text-slate-300 focus:outline-none"
            >
              <option value="New York">New York</option>
              <option value="San Francisco">San Francisco</option>
              <option value="London">London</option>
              <option value="Tokyo">Tokyo</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>
          
          <div className="flex items-center justify-around py-3">
            {getWeatherIcon(store.weather.condition)}
            <div className="text-left">
              <span className="text-3xl font-black text-slate-850 dark:text-slate-100 font-mono">{store.weather.temperature}°C</span>
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">{store.weather.condition}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/40">
            <span className="flex items-center gap-1"><BiWind /> {store.weather.wind} km/h</span>
            <span className="flex items-center gap-1"><BiWater /> {store.weather.humidity}% Hum</span>
          </div>
        </div>

        {/* Tasks Checklist */}
        <div className="glass-card p-6 flex flex-col min-h-[220px]">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800/40 pb-3 mb-3">Checklist Planner</h3>
          
          {/* Checklist Area */}
          <div className="flex-1 max-h-32 overflow-y-auto space-y-2 mb-3">
            {store.tasks.map((task) => (
              <div key={task.id} className="flex justify-between items-center group/task text-xs select-none">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => store.toggleTask(task.id)}
                    className="w-4 h-4 rounded accent-brand-500 dark:bg-slate-900 border-slate-350 dark:border-slate-800"
                  />
                  <span className={`font-semibold ${task.completed ? 'line-through text-slate-400 dark:text-slate-650' : 'text-slate-700 dark:text-slate-300'}`}>
                    {task.text}
                  </span>
                </label>
                <button
                  onClick={() => store.deleteTask(task.id)}
                  className="text-slate-400 hover:text-rose-600 opacity-0 group-hover/task:opacity-100 transition-opacity cursor-pointer p-0.5"
                >
                  <BiTrash />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddTask} className="flex gap-2">
            <input
              type="text"
              required
              placeholder="Add checklist item..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-brand-500/45 dark:text-slate-200"
            />
            <button
              type="submit"
              className="p-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl cursor-pointer"
            >
              <BiPlus className="text-sm" />
            </button>
          </form>
        </div>

        {/* Calendar Quick Events Scheduler */}
        <div className="glass-card p-6 flex flex-col min-h-[220px]">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800/40 pb-3 mb-3">Meetings Calendar</h3>
          
          <div className="flex-1 max-h-32 overflow-y-auto space-y-2 mb-3">
            {store.events.map((event) => (
              <div key={event.id} className="flex items-center justify-between text-xs group/event select-none">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    event.color === 'green' ? 'bg-emerald-500' : event.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'
                  }`} />
                  <div>
                    <p className="font-bold text-slate-700 dark:text-slate-350">{event.title}</p>
                    <p className="text-[9px] text-slate-400 dark:text-slate-550 font-medium">{event.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => store.deleteEvent(event.id)}
                  className="text-slate-450 hover:text-rose-600 opacity-0 group-hover/event:opacity-100 transition-opacity cursor-pointer p-0.5"
                >
                  <BiTrash />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddEvent} className="space-y-1.5">
            <input
              type="text"
              required
              placeholder="Meeting agenda..."
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              className="w-full px-2.5 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] focus:outline-none dark:text-slate-200"
            />
            <div className="flex gap-1.5">
              <input
                type="date"
                required
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
                className="flex-1 px-2.5 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] focus:outline-none dark:text-slate-200 font-mono"
              />
              <button
                type="submit"
                className="px-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-[10px] font-bold cursor-pointer"
              >
                Schedule
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Recent Activity Timeline & Details */}
      <div className="glass-card p-6">
        <h3 className="text-base font-bold text-slate-850 dark:text-slate-100 mb-6">Security & Transaction Activity Logs</h3>
        <div className="relative border-l border-slate-200 dark:border-slate-800/80 pl-6 ml-4 space-y-6">
          {store.activities.map((act) => (
            <div key={act.id} className="relative select-none text-xs">
              {/* Dot icon */}
              <span className={`absolute -left-[30px] top-0.5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center ${
                act.category === 'billing' ? 'bg-emerald-500' : act.category === 'security' ? 'bg-amber-500' : 'bg-brand-500'
              }`} />
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{act.text}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold shrink-0">{act.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
