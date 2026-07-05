import React from 'react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

/**
 * MetricSparkline - Mini sparkline chart for card components.
 * @param {Array<{value: number}>} data Array of points.
 * @param {boolean} isPositive Flag for growth trend.
 */
export const MetricSparkline = ({ data, isPositive }) => {
  const strokeColor = isPositive ? '#10b981' : '#ef4444';
  const fillColor = isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';

  return (
    <div className="w-24 h-10 select-none">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <Area
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            fill={fillColor}
            strokeWidth={1.5}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricSparkline;
