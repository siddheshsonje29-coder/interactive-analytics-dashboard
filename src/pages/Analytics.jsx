import React, { useState, useEffect } from 'react';
import { 
  BiDevices, 
  BiGlobe, 
  BiTrendingUp, 
  BiStopwatch, 
  BiLogOutCircle, 
  BiDesktop, 
  BiMobile, 
  BiLaptop
} from 'react-icons/bi';
import { useDashboardStore } from '../store/dashboardStore';
import UserGrowthAreaChart from '../components/charts/UserGrowthAreaChart';
import TrafficPieChart from '../components/charts/TrafficPieChart';
import { ChartSkeleton, MetricSkeleton } from '../components/ui/LoadingSkeleton';
import { mockDataService } from '../services/api';

/**
 * Analytics - Granular reports on website visitors.
 */
export const Analytics = () => {
  const store = useDashboardStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockDataService.fetchRecentLogs().then(() => setLoading(false));
  }, []);

  const deviceDistribution = [
    { type: 'Desktop Devices', value: '54.2%', count: '13,490', icon: BiDesktop, color: 'bg-brand-500' },
    { type: 'Mobile Phones', value: '38.6%', count: '9,607', icon: BiMobile, color: 'bg-emerald-500' },
    { type: 'Tablet Displays', value: '7.2%', count: '1,793', icon: BiLaptop, color: 'bg-amber-500' }
  ];

  const browserAnalytics = [
    { name: 'Google Chrome', users: '12,450', percentage: 50.1 },
    { name: 'Apple Safari', users: '6,200', percentage: 24.9 },
    { name: 'Mozilla Firefox', users: '2,980', percentage: 12.0 },
    { name: 'Microsoft Edge', users: '2,150', percentage: 8.6 },
    { name: 'Opera Browser', users: '1,110', percentage: 4.4 }
  ];

  const geographicTraffic = [
    { country: 'United States', flag: '🇺🇸', code: 'USA', traffic: '8,450', share: '33.9%' },
    { country: 'United Kingdom', flag: '🇬🇧', code: 'GBR', traffic: '3,200', share: '12.8%' },
    { country: 'Germany', flag: '🇩🇪', code: 'DEU', traffic: '2,400', share: '9.6%' },
    { country: 'Japan', flag: '🇯🇵', code: 'JPN', traffic: '1,890', share: '7.6%' },
    { country: 'India', flag: '🇮🇳', code: 'IND', traffic: '1,740', share: '7.0%' },
    { country: 'France', flag: '🇫🇷', code: 'FRA', traffic: '1,450', share: '5.8%' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Analytics</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">In-depth audit of site traffic, geographic distributions, and visitor sessions.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <MetricSkeleton key={i} />)
        ) : (
          <>
            <div className="glass-card p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Session Duration</span>
                <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500"><BiStopwatch className="text-lg" /></div>
              </div>
              <h4 className="text-2xl font-extrabold text-slate-850 dark:text-slate-100 font-mono">4m 32s</h4>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-2">+1.8% vs last week</p>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Bounce Rate</span>
                <div className="p-2 bg-rose-500/10 rounded-xl text-rose-500"><BiLogOutCircle className="text-lg" /></div>
              </div>
              <h4 className="text-2xl font-extrabold text-slate-850 dark:text-slate-100 font-mono">42.8%</h4>
              <p className="text-[10px] text-rose-600 dark:text-rose-450 font-bold mt-2">-0.5% vs last week</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Pageviews / Visit</span>
                <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500"><BiDevices className="text-lg" /></div>
              </div>
              <h4 className="text-2xl font-extrabold text-slate-850 dark:text-slate-100 font-mono">3.82</h4>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-2">+4.2% vs last week</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Estimated Visitors</span>
                <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500"><BiGlobe className="text-lg" /></div>
              </div>
              <h4 className="text-2xl font-extrabold text-slate-850 dark:text-slate-100 font-mono">24,890</h4>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-2">+8.3% vs last week</p>
            </div>
          </>
        )}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {loading ? (
            <ChartSkeleton height={360} />
          ) : (
            <div className="glass-card p-6">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-6">Audience Growth Timeline</h3>
              <UserGrowthAreaChart data={store.chartsData.userGrowth} />
            </div>
          )}
        </div>
        
        <div>
          {loading ? (
            <ChartSkeleton height={360} />
          ) : (
            <div className="glass-card p-6">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-6">Acquisition Channels</h3>
              <TrafficPieChart data={store.chartsData.trafficSources} />
            </div>
          )}
        </div>
      </div>

      {/* Split Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Metrics */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800/40 pb-3 mb-4 flex items-center gap-2">
              <BiDevices className="text-slate-500" /> Device Distribution
            </h3>
            <div className="space-y-4">
              {deviceDistribution.map((device, idx) => {
                const Icon = device.icon;
                return (
                  <div key={idx} className="space-y-1.5 select-none">
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-350">
                      <span className="flex items-center gap-2"><Icon /> {device.type}</span>
                      <span>{device.count} <strong className="text-slate-400 dark:text-slate-500 text-[10px]">({device.value})</strong></span>
                    </div>
                    {/* Styled progress bar container */}
                    <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-2 overflow-hidden">
                      <div className={`h-full ${device.color} rounded-full`} style={{ width: device.value }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium mt-4 bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg">
            Analytics tracked across 24,890 active sessions.
          </div>
        </div>

        {/* Browser usage */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800/40 pb-3 mb-4 flex items-center gap-2">
              <BiGlobe className="text-slate-500" /> Browsers Analytics
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800/40">
              {browserAnalytics.map((browser, idx) => (
                <div key={idx} className="flex justify-between items-center py-2.5 text-xs font-bold text-slate-700 dark:text-slate-350 first:pt-0 last:pb-0 select-none">
                  <span>{browser.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-400 dark:text-slate-500 text-[10px]">{browser.users} users</span>
                    <span className="w-12 text-right text-brand-600 dark:text-brand-500">{browser.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium mt-4 bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg">
            Aggregated by user agent signatures.
          </div>
        </div>

        {/* Geographics */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800/40 pb-3 mb-4 flex items-center gap-2">
              <BiGlobe className="text-slate-500" /> Geographic Traffic
            </h3>
            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
              {geographicTraffic.map((country, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-350 select-none">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg leading-none">{country.flag}</span>
                    <div>
                      <p>{country.country}</p>
                      <p className="text-[8px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">{country.code}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p>{country.traffic}</p>
                    <p className="text-[9px] text-brand-600 dark:text-brand-500 font-semibold">{country.share}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium mt-4 bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg">
            Determined by client IP geolocation records.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
