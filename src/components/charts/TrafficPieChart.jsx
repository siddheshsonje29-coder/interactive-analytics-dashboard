import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass-panel p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/80 shadow-md text-xs">
        <p className="font-bold text-slate-700 dark:text-slate-300 mb-0.5">{data.name}</p>
        <p className="font-semibold text-brand-600 dark:text-brand-500">
          Visitors: {data.value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

/**
 * TrafficPieChart - Displays traffic distribution.
 * @param {Array} data Traffic source weights.
 */
export const TrafficPieChart = ({ data }) => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={<CustomTooltip />} />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend 
            verticalAlign="bottom" 
            align="center"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '11px', fontWeight: '500', paddingTop: '10px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrafficPieChart;
