import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/80 shadow-md text-xs">
        <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">{label}</p>
        {payload.map((item, index) => (
          <p key={index} style={{ color: item.color }} className="font-semibold">
            {item.name}: ${item.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * RevenueLineChart - Displays revenue versus expenses.
 * @param {Array} data Monthly datasets.
 */
export const RevenueLineChart = ({ data }) => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
            tickFormatter={(value) => `$${value / 1000}k`}
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
          <Line 
            type="monotone" 
            dataKey="revenue" 
            name="Revenue"
            stroke="#8b5cf6" 
            strokeWidth={3.5}
            dot={{ r: 4, strokeWidth: 1, fill: '#8b5cf6' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line 
            type="monotone" 
            dataKey="expenses" 
            name="Expenses"
            stroke="#10b981" 
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueLineChart;
