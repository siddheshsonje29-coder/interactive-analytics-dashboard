import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/80 shadow-md text-xs">
        <p className="font-bold text-slate-700 dark:text-slate-300 mb-0.5">{label}</p>
        <p className="font-semibold text-brand-600 dark:text-brand-500">
          Sales: {payload[0].value.toLocaleString()} units
        </p>
      </div>
    );
  }
  return null;
};

/**
 * SalesBarChart - Displays daily or weekly transactions metrics.
 * @param {Array} data Array containing transaction points.
 */
export const SalesBarChart = ({ data }) => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124, 58, 237, 0.05)', radius: 8 }} />
          <Bar 
            dataKey="sales" 
            fill="#7c3aed" 
            radius={[6, 6, 0, 0]}
            maxBarSize={45}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesBarChart;
