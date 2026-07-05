import React, { useState, useMemo } from 'react';
import { 
  BiSearch, 
  BiDownload, 
  BiFilterAlt, 
  BiChevronLeft, 
  BiChevronRight,
  BiSort,
  BiSortUp,
  BiSortDown,
  BiCheckCircle,
  BiFile
} from 'react-icons/bi';
import { useDashboardStore } from '../store/dashboardStore';
import { useNotificationStore } from '../store/notificationStore';
import MonthlyComparisonChart from '../components/charts/MonthlyComparisonChart';
import { exportToCSV } from '../utils/csvExport';
import { exportToPDF } from '../utils/pdfExport';
import { useDebounce } from '../hooks/useDebounce';

/**
 * Reports - Advanced data analysis and exports.
 */
export const Reports = () => {
  const store = useDashboardStore();
  const { addNotification } = useNotificationStore();

  // Search & Filters state
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Sorting state
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc'); // 'asc' or 'desc'

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Row Selection state
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [exportLoading, setExportLoading] = useState(false);

  // Sort and filter user list
  const processedUsers = useMemo(() => {
    let list = [...store.users];

    // 1. Search Query
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(
        u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q)
      );
    }

    // 2. Role Filter
    if (roleFilter !== 'All') {
      list = list.filter(u => u.role === roleFilter);
    }

    // 3. Status Filter
    if (statusFilter !== 'All') {
      list = list.filter(u => u.status === statusFilter);
    }

    // 4. Sorting
    list.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // Safe check for string/number types
      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return list;
  }, [store.users, debouncedSearch, roleFilter, statusFilter, sortField, sortDirection]);

  // Paginated subset
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedUsers.slice(start, start + pageSize);
  }, [processedUsers, currentPage, pageSize]);

  const totalPages = Math.ceil(processedUsers.length / pageSize) || 1;

  // Selection handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const pageIds = paginatedUsers.map(u => u.id);
      setSelectedIds(new Set([...selectedIds, ...pageIds]));
    } else {
      const pageIds = paginatedUsers.map(u => u.id);
      const nextSelection = new Set(selectedIds);
      pageIds.forEach(id => nextSelection.delete(id));
      setSelectedIds(nextSelection);
    }
  };

  const handleSelectRow = (id) => {
    const nextSelection = new Set(selectedIds);
    if (nextSelection.has(id)) {
      nextSelection.delete(id);
    } else {
      nextSelection.add(id);
    }
    setSelectedIds(nextSelection);
  };

  const isPageAllSelected = useMemo(() => {
    if (!paginatedUsers.length) return false;
    return paginatedUsers.every(u => selectedIds.has(u.id));
  }, [paginatedUsers, selectedIds]);

  // Sorting controller
  const triggerSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return <BiSort className="text-slate-400 opacity-60 text-xs shrink-0" />;
    return sortDirection === 'asc' 
      ? <BiSortUp className="text-brand-600 dark:text-brand-400 text-xs shrink-0" />
      : <BiSortDown className="text-brand-600 dark:text-brand-400 text-xs shrink-0" />;
  };

  // Export handlers
  const handleExportCSV = () => {
    let dataToExport = store.users;
    let filename = 'nexus-users-report.csv';

    if (selectedIds.size > 0) {
      dataToExport = store.users.filter(u => selectedIds.has(u.id));
      filename = 'nexus-selected-users-report.csv';
    }

    // Format exportable payload (omit avatar)
    const sanitized = dataToExport.map(({ id, name, email, sales, status, role, date }) => ({
      id, name, email, sales, status, role, date
    }));

    exportToCSV(sanitized, filename);
    addNotification(`Exported CSV successfully containing ${sanitized.length} records.`, 'success');
  };

  const handleExportPDF = async () => {
    setExportLoading(true);
    addNotification('Rendering PDF layout report, please wait...', 'info');
    try {
      await exportToPDF('reports-container-print', 'nexus-financials-report.pdf');
      addNotification('PDF report downloaded successfully.', 'success');
    } catch (err) {
      console.error(err);
      addNotification('Failed to export PDF layout.', 'error');
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <div className="space-y-6" id="reports-container-print">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Financial Reports</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Export custom client records and compile year-on-year sales comparison charts.</p>
        </div>
        
        {/* Export actions */}
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handleExportCSV}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800/80 text-slate-650 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer text-xs transition-colors"
          >
            <BiDownload className="text-base" />
            <span>CSV Export {selectedIds.size > 0 ? `(${selectedIds.size})` : ''}</span>
          </button>
          
          <button
            onClick={handleExportPDF}
            disabled={exportLoading}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 cursor-pointer text-xs transition-all disabled:opacity-50"
          >
            <BiFile className="text-base" />
            <span>{exportLoading ? 'Compiling PDF...' : 'Print PDF Layout'}</span>
          </button>
        </div>
      </div>

      {/* Visual Analytics Segment */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-bold text-slate-850 dark:text-slate-100 mb-6">Year-on-Year Revenue Comparison</h3>
        <MonthlyComparisonChart data={store.chartsData.comparison} />
      </div>

      {/* Table search + filter wrapper */}
      <div className="glass-card p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <BiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          <input
            type="text"
            placeholder="Search records by ID, username, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-brand-500/40 rounded-xl text-xs focus:outline-none transition-all duration-300 dark:text-slate-200"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <BiFilterAlt className="text-slate-400 text-sm" />
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
              className="text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1 font-semibold text-slate-600 dark:text-slate-350 focus:outline-none cursor-pointer"
            >
              <option value="All">All Roles</option>
              <option value="Retail User">Retail User</option>
              <option value="Premium Client">Premium Client</option>
              <option value="Enterprise Admin">Enterprise Admin</option>
              <option value="Free Tier">Free Tier</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1 font-semibold text-slate-600 dark:text-slate-350 focus:outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Advanced reports list table */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-xl border border-slate-200/50 dark:border-slate-800/80">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs font-semibold text-slate-650 dark:text-slate-350">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-250/40 dark:border-slate-850/50 uppercase tracking-wider text-[9px] text-slate-450 dark:text-slate-500 select-none">
                <th className="px-6 py-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={isPageAllSelected}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded accent-brand-500 border-slate-300 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4 cursor-pointer" onClick={() => triggerSort('id')}>
                  <span className="flex items-center gap-1">User ID {renderSortIcon('id')}</span>
                </th>
                <th className="px-6 py-4 cursor-pointer" onClick={() => triggerSort('name')}>
                  <span className="flex items-center gap-1">Customer {renderSortIcon('name')}</span>
                </th>
                <th className="px-6 py-4 cursor-pointer" onClick={() => triggerSort('email')}>
                  <span className="flex items-center gap-1">Email {renderSortIcon('email')}</span>
                </th>
                <th className="px-6 py-4 cursor-pointer" onClick={() => triggerSort('sales')}>
                  <span className="flex items-center gap-1">Sales count {renderSortIcon('sales')}</span>
                </th>
                <th className="px-6 py-4 cursor-pointer text-center" onClick={() => triggerSort('status')}>
                  <span className="flex items-center gap-1 justify-center">Status {renderSortIcon('status')}</span>
                </th>
                <th className="px-6 py-4 cursor-pointer text-right" onClick={() => triggerSort('date')}>
                  <span className="flex items-center gap-1 justify-end">Created Date {renderSortIcon('date')}</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-slate-400">
                    No matching ledger accounts found.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    className={`transition-colors cursor-pointer ${
                      selectedIds.has(user.id) 
                        ? 'bg-brand-500/5 hover:bg-brand-500/10' 
                        : 'hover:bg-slate-50/40 dark:hover:bg-slate-900/30'
                    }`}
                    onClick={() => handleSelectRow(user.id)}
                  >
                    <td className="px-6 py-4.5 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedIds.has(user.id)}
                        onChange={() => handleSelectRow(user.id)}
                        className="w-4 h-4 rounded accent-brand-500 border-slate-300 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4.5 font-mono text-[10px] text-slate-400 dark:text-slate-550">{user.id}</td>
                    <td className="px-6 py-4.5 font-bold text-slate-800 dark:text-slate-100">{user.name}</td>
                    <td className="px-6 py-4.5 font-mono text-[11px] text-slate-600 dark:text-slate-450">{user.email}</td>
                    <td className="px-6 py-4.5 font-mono text-slate-800 dark:text-slate-200">{user.sales} units</td>
                    <td className="px-6 py-4.5 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase inline-flex items-center gap-1 ${
                        user.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-450'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-right font-mono text-[11px] text-slate-500 dark:text-slate-400">{user.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination and page size bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-250/30 dark:border-slate-850/40 select-none">
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Show size:</span>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
              className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-1.5 text-slate-600 dark:text-slate-350 focus:outline-none cursor-pointer"
            >
              <option value={3}>3 rows</option>
              <option value={5}>5 rows</option>
              <option value={10}>10 rows</option>
              <option value={20}>20 rows</option>
            </select>
            <span>Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, processedUsers.length)} of {processedUsers.length}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <BiChevronLeft className="text-xl" />
            </button>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-350 px-2">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <BiChevronRight className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
