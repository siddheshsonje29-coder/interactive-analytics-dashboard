import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/80 shadow-md text-xs">
        <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">{label} Comparison</p>
        <p className="font-semibold text-slate-500 dark:text-slate-400">
          Last Year: ${payload[0].value.toLocaleString()}
        </p>
        <p className="font-semibold text-brand-600 dark:text-brand-500">
          This Year: ${payload[1].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

/**
 * MonthlyComparisonChart - Side-by-side bar comparing past metrics.
 * @param {Array} data Monthly comparative numbers.
 */
export const MonthlyComparisonChart = ({ data }) => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tickFormatter={(value) => `$${value / 1000}k`}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.05)', radius: 6 }} />
          <Legend 
            verticalAlign="top" 
            align="right"
            height={36} 
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '11px', fontWeight: '500' }}
          />
          <Bar 
            dataKey="lastYear" 
            name="Last Year"
            fill="#94a3b8" 
            radius={[4, 4, 0, 0]}
            maxBarSize={20}
          />
          <Bar 
            dataKey="thisYear" 
            name="This Year"
            fill="#8b5cf6" 
            radius={[4, 4, 0, 0]}
            maxBarSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyComparisonChart;
