import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BiSearch, 
  BiUserPlus, 
  BiEdit, 
  BiTrash, 
  BiShow, 
  BiX, 
  BiEnvelope, 
  BiUser,
  BiUserPin,
  BiCheckCircle,
  BiRadioCircleMarked
} from 'react-icons/bi';
import { useDashboardStore } from '../store/dashboardStore';
import { useNotificationStore } from '../store/notificationStore';
import { useDebounce } from '../hooks/useDebounce';

/**
 * Users - CRUD user management interface.
 */
export const Users = () => {
  const { users, addUser, editUser, deleteUser, toggleUserStatus } = useDashboardStore();
  const { addNotification } = useNotificationStore();

  // Search filter state
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  // Modals state
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  
  // Selected user tracking
  const [selectedUser, setSelectedUser] = useState(null);

  // Form input states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState('Retail User');
  const [formStatus, setFormStatus] = useState('Active');

  // Filter users based on debounced search query
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const q = debouncedSearch.toLowerCase();
      return (
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.role.toLowerCase().includes(q)
      );
    });
  }, [users, debouncedSearch]);

  const resetForm = () => {
    setFormName('');
    setFormEmail('');
    setFormRole('Retail User');
    setFormStatus('Active');
    setSelectedUser(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setAddOpen(true);
  };

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormRole(user.role);
    setFormStatus(user.status);
    setEditOpen(true);
  };

  const handleOpenProfile = (user) => {
    setSelectedUser(user);
    setProfileOpen(true);
  };

  const handleOpenDelete = (user) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.includes('@')) {
      addNotification('Please enter a valid name and email address', 'warning');
      return;
    }
    
    addUser({
      name: formName,
      email: formEmail,
      role: formRole,
      status: formStatus,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${formName}`
    });
    
    setAddOpen(false);
    resetForm();
    addNotification('User created successfully!', 'success');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    if (!formName.trim() || !formEmail.includes('@')) {
      addNotification('Please enter a valid name and email address', 'warning');
      return;
    }

    editUser(selectedUser.id, {
      name: formName,
      email: formEmail,
      role: formRole,
      status: formStatus
    });

    setEditOpen(false);
    resetForm();
    addNotification('User updated successfully!', 'success');
  };

  const handleDeleteConfirm = () => {
    if (!selectedUser) return;
    deleteUser(selectedUser.id);
    setDeleteOpen(false);
    resetForm();
    addNotification('User removed from database', 'success');
  };

  const handleToggleStatus = (id, name) => {
    toggleUserStatus(id);
    const target = users.find(u => u.id === id);
    const nextStatus = target?.status === 'Active' ? 'Inactive' : 'Active';
    addNotification(`User ${name} is now ${nextStatus}`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Users Management</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Add, update, or remove users and audit system access parameters.</p>
        </div>
        
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-500/20 active:scale-95 transition-all cursor-pointer text-xs"
        >
          <BiUserPlus className="text-lg" />
          <span>Add User</span>
        </button>
      </div>

      {/* Filter and search bar */}
      <div className="glass-card p-4 flex gap-4 items-center">
        <div className="relative flex-1">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          <input
            type="text"
            placeholder="Search by username, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-brand-500/40 rounded-xl text-xs focus:outline-none transition-all duration-300 dark:text-slate-200 font-sans"
          />
        </div>
      </div>

      {/* Users Data Table */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-xl border border-slate-200/50 dark:border-slate-800/80">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs font-semibold text-slate-650 dark:text-slate-350">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-250/40 dark:border-slate-850/50 uppercase tracking-wider text-[9px] text-slate-450 dark:text-slate-500">
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Assigned Role</th>
                <th className="px-6 py-4">Total Sales</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 select-none">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-slate-400">
                    No users match your query. Try searching for something else.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="px-6 py-4.5 flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-xl border border-brand-500/10 bg-slate-100 dark:bg-slate-900"
                      />
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-100">{user.name}</p>
                        <p className="text-[9px] font-semibold text-slate-400 dark:text-slate-500">Joined: {user.date}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 font-mono text-slate-600 dark:text-slate-400">{user.email}</td>
                    <td className="px-6 py-4.5 text-slate-700 dark:text-slate-300">{user.role}</td>
                    <td className="px-6 py-4.5 font-mono text-slate-800 dark:text-slate-200">{user.sales} units</td>
                    <td className="px-6 py-4.5 text-center">
                      <button
                        onClick={() => handleToggleStatus(user.id, user.name)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5 ${
                          user.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-transparent'
                        }`}
                        title="Click to toggle status"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        <span>{user.status}</span>
                      </button>
                    </td>
                    <td className="px-6 py-4.5 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleOpenProfile(user)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors cursor-pointer"
                          title="View Profile Detail"
                        >
                          <BiShow className="text-base" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(user)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors cursor-pointer"
                          title="Edit User Details"
                        >
                          <BiEdit className="text-base" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(user)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-550 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                          title="Remove User"
                        >
                          <BiTrash className="text-base" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD Overlay Modals */}
      <AnimatePresence>
        {/* ADD USER MODAL */}
        {addOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setAddOpen(false)}
              className="fixed inset-0 bg-black"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel w-full max-w-md rounded-2xl border border-slate-200/50 dark:border-slate-800/80 shadow-2xl p-6 z-10 relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold text-slate-850 dark:text-slate-100">Add New System User</h3>
                <button onClick={() => setAddOpen(false)} className="text-slate-400 hover:text-slate-650 cursor-pointer"><BiX className="text-2xl" /></button>
              </div>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Full Username</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Liam Parker"
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-brand-500/40 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="liamparker@company.com"
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-brand-500/40 dark:text-slate-200"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">System Role</label>
                    <select
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none text-slate-600 dark:text-slate-300"
                    >
                      <option value="Retail User">Retail User</option>
                      <option value="Premium Client">Premium Client</option>
                      <option value="Enterprise Admin">Enterprise Admin</option>
                      <option value="Free Tier">Free Tier</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Initial Status</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none text-slate-600 dark:text-slate-300"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-lg shadow-brand-500/20 active:scale-95 transition-all cursor-pointer text-xs"
                >
                  Create Account
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* EDIT USER MODAL */}
        {editOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditOpen(false)}
              className="fixed inset-0 bg-black"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel w-full max-w-md rounded-2xl border border-slate-200/50 dark:border-slate-800/80 shadow-2xl p-6 z-10 relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold text-slate-855 dark:text-slate-100">Modify Account Settings</h3>
                <button onClick={() => setEditOpen(false)} className="text-slate-400 hover:text-slate-650 cursor-pointer"><BiX className="text-2xl" /></button>
              </div>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Username</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-brand-500/40 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-brand-500/40 dark:text-slate-200"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Assigned Role</label>
                    <select
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none text-slate-600 dark:text-slate-300"
                    >
                      <option value="Retail User">Retail User</option>
                      <option value="Premium Client">Premium Client</option>
                      <option value="Enterprise Admin">Enterprise Admin</option>
                      <option value="Free Tier">Free Tier</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Status</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none text-slate-600 dark:text-slate-300"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-lg shadow-brand-500/20 active:scale-95 transition-all cursor-pointer text-xs"
                >
                  Save Profile Updates
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* PROFILE DETAIL MODAL */}
        {profileOpen && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setProfileOpen(false)}
              className="fixed inset-0 bg-black"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel w-full max-w-sm rounded-2xl border border-slate-200/50 dark:border-slate-800/80 shadow-2xl p-6 z-10 relative overflow-hidden"
            >
              <button onClick={() => setProfileOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"><BiX className="text-2xl" /></button>
              
              <div className="text-center py-4">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-20 h-20 rounded-2xl border border-brand-500/20 bg-slate-100 dark:bg-slate-900 mx-auto mb-4"
                />
                <h3 className="text-lg font-extrabold text-slate-850 dark:text-slate-100">{selectedUser.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase mt-1 inline-block ${
                  selectedUser.status === 'Active'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 border border-emerald-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-transparent'
                }`}>
                  {selectedUser.status}
                </span>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800/40 pt-4 space-y-3.5 text-xs">
                <div className="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-350 select-text">
                  <BiEnvelope className="text-base text-slate-400" />
                  <span className="truncate">{selectedUser.email}</span>
                </div>
                <div className="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-350">
                  <BiUser className="text-base text-slate-400" />
                  <span>ID: <code className="font-mono bg-slate-50 dark:bg-slate-900 px-1 py-0.5 rounded text-[11px]">{selectedUser.id}</code></span>
                </div>
                <div className="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-350">
                  <BiUserPin className="text-base text-slate-400" />
                  <span>Role: {selectedUser.role}</span>
                </div>
                <div className="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-350">
                  <BiRadioCircleMarked className="text-base text-slate-400" />
                  <span>Purchases: {selectedUser.sales} checkout orders</span>
                </div>
                <div className="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-350">
                  <BiCheckCircle className="text-base text-slate-400" />
                  <span>Joined Date: {selectedUser.date}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {deleteOpen && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteOpen(false)}
              className="fixed inset-0 bg-black"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel w-full max-w-sm rounded-2xl border border-slate-200/50 dark:border-slate-800/80 shadow-2xl p-6 z-10 relative overflow-hidden"
            >
              <h3 className="text-base font-bold text-slate-850 dark:text-slate-100 mb-2">Confirm Delete User</h3>
              <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed mb-6">
                Are you absolutely sure you want to delete <strong className="text-slate-800 dark:text-slate-200">{selectedUser.name}</strong> ({selectedUser.email})? This action is permanent and cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setDeleteOpen(false)}
                  className="flex-1 py-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-500/10 active:scale-95 transition-all cursor-pointer"
                >
                  Remove Record
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Users;
