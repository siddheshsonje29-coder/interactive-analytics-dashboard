import React from 'react';
import { motion } from 'framer-motion';
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi';
import MetricSparkline from '../charts/MetricSparkline';

/**
 * MetricCard - Animated KPI dashboard card.
 * @param {string} title KPI Title.
 * @param {string} value Formatted metric value.
 * @param {string} change Growth percentage.
 * @param {boolean} isPositive Growth sign.
 * @param {Array} sparkline Points for sparkline.
 * @param {React.Component} icon Icon element.
 * @param {function} onClick Card click action.
 */
export const MetricCard = ({ title, value, change, isPositive, sparkline, icon: Icon, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="glass-card p-6 flex flex-col justify-between glow-purple relative overflow-hidden group cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-brand-500/5 group-hover:bg-brand-500/10 blur-xl transition-all duration-300" />
      
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{title}</span>
          <div className="p-2 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-brand-600 dark:text-brand-500 group-hover:scale-115 transition-transform duration-300">
            {Icon && <Icon className="text-lg" />}
          </div>
        </div>
        
        <h4 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-none mb-4">
          {value}
        </h4>
      </div>

      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1 text-[11px] font-semibold">
          <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full w-fit ${
            isPositive 
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
          }`}>
            {isPositive ? <BiTrendingUp className="text-sm" /> : <BiTrendingDown className="text-sm" />}
            {change}
          </span>
          <span className="text-slate-400 dark:text-slate-500 font-medium">vs last month</span>
        </div>
        
        {sparkline && <MetricSparkline data={sparkline} isPositive={isPositive} />}
      </div>
    </motion.div>
  );
};

export default MetricCard;
