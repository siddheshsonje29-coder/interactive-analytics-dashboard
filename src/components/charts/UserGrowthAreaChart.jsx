import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/80 shadow-md text-xs">
        <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">{label}</p>
        {payload.map((item, index) => (
          <p key={index} style={{ color: item.color }} className="font-semibold">
            {item.name}: {item.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * UserGrowthAreaChart - Graph displaying monthly growth.
 * @param {Array} data User stats per month.
 */
export const UserGrowthAreaChart = ({ data }) => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            align="right"
            height={36} 
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '11px', fontWeight: '500' }}
          />
          <Area 
            type="monotone" 
            dataKey="active" 
            name="Active Users" 
            stroke="#3b82f6" 
            fillOpacity={1} 
            fill="url(#colorActive)" 
            strokeWidth={2.5}
          />
          <Area 
            type="monotone" 
            dataKey="new" 
            name="New Signups" 
            stroke="#8b5cf6" 
            fillOpacity={1} 
            fill="url(#colorNew)" 
            strokeWidth={2.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserGrowthAreaChart;
