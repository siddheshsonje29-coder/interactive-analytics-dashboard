import React from 'react';

export const MetricSkeleton = () => {
  return (
    <div className="glass-card p-6 animate-pulse select-none">
      <div className="flex justify-between items-start mb-4">
        <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
      </div>
      <div className="h-8 w-36 bg-slate-200 dark:bg-slate-800 rounded-md mb-3"></div>
      <div className="flex justify-between items-end">
        <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="h-8 w-24 bg-slate-100 dark:bg-slate-900/60 rounded-md"></div>
      </div>
    </div>
  );
};

export const ChartSkeleton = ({ height = 300 }) => {
  return (
    <div className="glass-card p-6 animate-pulse select-none" style={{ height }}>
      <div className="flex justify-between items-center mb-6">
        <div className="h-5 w-40 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
      </div>
      <div className="flex items-end justify-between gap-2 h-[calc(100%-3rem)] pt-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i} 
            className="w-full bg-slate-200 dark:bg-slate-800 rounded-t"
            style={{ height: `${Math.max(10, Math.floor(Math.random() * 80))}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export const TableSkeleton = ({ rows = 5, cols = 6 }) => {
  return (
    <div className="glass-card p-6 animate-pulse overflow-hidden select-none">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
          <div className="h-8 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        </div>
      </div>
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-4 items-center border-b border-slate-100 dark:border-slate-800/40 pb-4 last:border-0 last:pb-0">
            {Array.from({ length: cols }).map((_, c) => (
              <div 
                key={c} 
                className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md"
                style={{ width: c === 0 ? '8%' : c === 1 ? '22%' : '14%' }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
