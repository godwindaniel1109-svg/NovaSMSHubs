import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  Shield,
  Ban,
  CheckCircle,
  XCircle,
  UserPlus,
  Download,
  RefreshCw,
  MoreVertical,
  Wallet
} from 'lucide-react';
import { useNotify } from '../NotificationSystem';
import { useWallet } from '../../services/walletService';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'suspended';
  balance: number;
  registeredAt: string;
  lastLogin: string;
  totalOrders: number;
  totalSpent: number;
  country: string;
  avatar?: string;
}

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [walletAmount, setWalletAmount] = useState('');
  const [walletAction, setWalletAction] = useState<'add' | 'subtract' | 'set'>('add');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const notify = useNotify();

  const mockUsers: User[] = [
    {
      id: 'USR001',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '07012345678',
      balance: 5000,
      status: 'active',
      registeredAt: '2026-01-04T10:00:00Z',
      lastLogin: '2026-01-15T14:30:00Z',
      totalOrders: 23,
      totalSpent: 125000,
      country: 'Nigeria'
    },
    {
      id: 'USR002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '08087654321',
      balance: 12500,
      status: 'active',
      registeredAt: '2026-01-03T15:30:00Z',
      lastLogin: '2026-01-15T09:15:00Z',
      totalOrders: 32,
      totalSpent: 89000,
      country: 'Nigeria'
    },
    {
      id: 'USR003',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '09011223344',
      balance: 500,
      status: 'inactive',
      registeredAt: '2025-12-28T11:00:00Z',
      lastLogin: '2026-01-12T16:45:00Z',
      totalOrders: 8,
      totalSpent: 15000,
      country: 'Nigeria'
    },
    {
      id: 'USR004',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '08155667788',
      balance: 8900,
      status: 'suspended',
      registeredAt: '2025-12-15T14:20:00Z',
      lastLogin: '2026-01-08T12:30:00Z',
      totalOrders: 45,
      totalSpent: 234000,
      country: 'Nigeria'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.phone.includes(searchTerm);
      const matchesFilter = statusFilter === 'all' || user.status === statusFilter;
      return matchesSearch && matchesFilter;
    });
    setFilteredUsers(filtered);
  }, [users, searchTerm, statusFilter]);

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length 
        ? []
        : filteredUsers.map(user => user.id)
    );
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleEditWallet = (user: User) => {
    setSelectedUser(user);
    setWalletAmount(user.balance.toString());
    setShowWalletModal(true);
  };

  const handleWalletUpdate = () => {
    if (!selectedUser || !walletAmount) return;

    const amount = parseFloat(walletAmount);
    if (isNaN(amount)) {
      notify.error('Invalid Amount', 'Please enter a valid number');
      return;
    }

    // For admin updating user wallet, we'll simulate the validation
    let newBalance = selectedUser.balance;
    if (walletAction === 'add') {
      newBalance = selectedUser.balance + amount;
      if (newBalance > 100000) {
        notify.error('Maximum Balance Exceeded', 'Wallet balance cannot exceed ₦100,000');
        return;
      }
    } else if (walletAction === 'subtract') {
      newBalance = Math.max(0, selectedUser.balance - amount);
    } else {
      if (amount > 100000) {
        notify.error('Maximum Balance Exceeded', 'Wallet balance cannot exceed ₦100,000');
        return;
      }
      newBalance = amount;
    }

    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return { ...user, balance: newBalance };
      }
      return user;
    });

    setUsers(updatedUsers);
    setShowWalletModal(false);
    setWalletAmount('');
    
    notify.success(
      'Wallet Updated',
      `${selectedUser.name}'s wallet has been updated to ₦${newBalance.toLocaleString()}`
    );
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
      notify.success('User Deleted', 'User has been deleted successfully');
    }
  };

  const handleStatusChange = (userId: string, newStatus: User['status']) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
    notify.success('Status Updated', `User status has been changed to ${newStatus}`);
  };

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-nova-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <RefreshCw className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wallet Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(user.balance)}
                      </span>
                      <button
                        onClick={() => handleEditWallet(user)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit Wallet"
                      >
                        <Wallet className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user.totalOrders} ({formatCurrency(user.totalSpent)})
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.registeredAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value as User['status'])}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Wallet Edit Modal */}
      {showWalletModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit User Wallet</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Balance: {formatCurrency(selectedUser.balance)}
              </label>
              <select
                value={walletAction}
                onChange={(e) => setWalletAction(e.target.value as 'add' | 'subtract' | 'set')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
              >
                <option value="add">Add Funds</option>
                <option value="subtract">Subtract Funds</option>
                <option value="set">Set Balance</option>
              </select>
              <input
                type="number"
                placeholder="Enter amount"
                value={walletAmount}
                onChange={(e) => setWalletAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleWalletUpdate}
                className="flex-1 px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors"
              >
                Update Wallet
              </button>
              <button
                onClick={() => setShowWalletModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
