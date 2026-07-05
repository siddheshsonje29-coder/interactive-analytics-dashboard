import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

/**
 * AppLayout - Wraps protected view pages with Navigation and Header.
 */
export const AppLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-55 dark:bg-slate-950 text-slate-850 dark:text-slate-100">
      {/* Lateral navigation pane */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
      />

      {/* Primary viewport wrapper */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Navbar setIsMobileOpen={setIsMobileOpen} />

        {/* Scrollable page content area */}
        <main className="flex-1 overflow-y-auto p-5 md:p-8 bg-slate-50/30 dark:bg-slate-950/10">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
