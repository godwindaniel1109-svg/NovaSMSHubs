import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  Edit, 
  Trash2, 
  Shield, 
  DollarSign,
  Eye,
  Download,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  VolumeX,
  Volume2,
  AlertTriangle,
  Activity,
  Wifi,
  WifiOff,
  UserCheck,
  UserX,
  RefreshCw
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'suspended' | 'muted';
  balance: number;
  joinDate: string;
  lastActive: string;
  role: 'user' | 'premium' | 'vip';
  totalSpent: number;
  numbersOwned: number;
  location?: string;
  device?: string;
  ip?: string;
  isOnline?: boolean;
  muteExpiry?: string;
  suspendExpiry?: string;
  recentActivity?: string[];
  profileImage?: string;
}

interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  details: string;
  ip: string;
  device: string;
}

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+2348012345678',
      status: 'active',
      balance: 5000,
      joinDate: '2024-01-15',
      lastActive: '2 minutes ago',
      role: 'premium',
      totalSpent: 15000,
      numbersOwned: 3,
      location: 'Lagos, Nigeria',
      device: 'Chrome on Windows',
      ip: '192.168.1.100',
      isOnline: true,
      profileImage: '/images/user1.jpg',
      recentActivity: [
        'Purchased WhatsApp number',
        'Updated profile',
        'Funded wallet'
      ]
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+2348023456789',
      status: 'muted',
      balance: 2500,
      joinDate: '2024-02-01',
      lastActive: '5 minutes ago',
      role: 'user',
      totalSpent: 7500,
      numbersOwned: 2,
      location: 'Abuja, Nigeria',
      device: 'Safari on iPhone',
      ip: '192.168.1.105',
      isOnline: true,
      muteExpiry: '2024-03-10 18:00',
      profileImage: '/images/user2.jpg',
      recentActivity: [
        'Muted by admin',
        'Attempted to send message',
        'Logged in'
      ]
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      phone: '+2348034567890',
      status: 'suspended',
      balance: 0,
      joinDate: '2024-01-20',
      lastActive: '3 days ago',
      role: 'user',
      totalSpent: 3000,
      numbersOwned: 1,
      location: 'Port Harcourt, Nigeria',
      device: 'Firefox on Android',
      ip: '192.168.1.102',
      isOnline: false,
      suspendExpiry: '2024-03-20 23:59',
      profileImage: '/images/user3.jpg',
      recentActivity: [
        'Account suspended',
        'Violation detected',
        'Last login attempt'
      ]
    },
    {
      id: '4',
      name: 'Sarah Jones',
      email: 'sarah.jones@email.com',
      phone: '+2348045678901',
      status: 'active',
      balance: 10000,
      joinDate: '2024-02-15',
      lastActive: '1 hour ago',
      role: 'vip',
      totalSpent: 25000,
      numbersOwned: 5,
      location: 'Kano, Nigeria',
      device: 'Edge on Windows',
      ip: '192.168.1.101',
      isOnline: false,
      profileImage: '/images/user4.jpg',
      recentActivity: [
        'Purchased multiple numbers',
        'Upgraded to VIP',
        'Large deposit'
      ]
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@email.com',
      phone: '+2348056789012',
      status: 'active',
      balance: 7500,
      joinDate: '2024-01-10',
      lastActive: '30 minutes ago',
      role: 'premium',
      totalSpent: 12000,
      numbersOwned: 4,
      location: 'Ibadan, Nigeria',
      device: 'Chrome on Mac',
      ip: '192.168.1.108',
      isOnline: true,
      profileImage: '/images/user5.jpg',
      recentActivity: [
        'Active in chat',
        'Viewed services',
        'Checked balance'
      ]
    }
  ]);

  const [activityLogs] = useState<ActivityLog[]>([
    {
      id: '1',
      userId: '1',
      action: 'Login',
      timestamp: new Date().toISOString(),
      details: 'User logged in successfully',
      ip: '192.168.1.100',
      device: 'Chrome on Windows'
    },
    {
      id: '2',
      userId: '2',
      action: 'Message Sent',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      details: 'Attempted to send message but was muted',
      ip: '192.168.1.105',
      device: 'Safari on iPhone'
    },
    {
      id: '3',
      userId: '3',
      action: 'Suspension',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      details: 'Account suspended for policy violation',
      ip: '192.168.1.102',
      device: 'Firefox on Android'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers(prev => prev.map(user => ({
        ...user,
        lastActive: Math.random() > 0.7 ? 'Just now' : user.lastActive,
        isOnline: Math.random() > 0.3
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'muted':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <UserCheck className="w-4 h-4 text-green-500" />;
      case 'inactive':
        return <UserX className="w-4 h-4 text-gray-500" />;
      case 'suspended':
        return <Ban className="w-4 h-4 text-red-500" />;
      case 'muted':
        return <VolumeX className="w-4 h-4 text-yellow-500" />;
      default:
        return <Users className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'vip':
        return 'bg-purple-100 text-purple-800';
      case 'premium':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSuspend = async (userId: string, duration: '1day' | '3days' | '1week' | 'permanent') => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const expiryDate = duration === 'permanent' ? 'Permanent' : 
        duration === '1day' ? new Date(Date.now() + 86400000).toLocaleString() :
        duration === '3days' ? new Date(Date.now() + 259200000).toLocaleString() :
        new Date(Date.now() + 604800000).toLocaleString();

      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, status: 'suspended' as const, suspendExpiry: expiryDate }
          : user
      ));
      
      setSuccessMessage(`User suspended for ${duration}!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to suspend user');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleMute = async (userId: string, duration: '1hour' | '6hours' | '1day' | '3days') => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const expiryDate = new Date(Date.now() + 
        (duration === '1hour' ? 3600000 :
         duration === '6hours' ? 21600000 :
         duration === '1day' ? 86400000 : 259200000)).toLocaleString();

      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, status: 'muted' as const, muteExpiry: expiryDate }
          : user
      ));
      
      setSuccessMessage(`User muted for ${duration}!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to mute user');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleUnmute = async (userId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, status: 'active' as const, muteExpiry: undefined }
          : user
      ));
      
      setSuccessMessage('User unmuted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to unmute user');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleUnsuspend = async (userId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, status: 'active' as const, suspendExpiry: undefined }
          : user
      ));
      
      setSuccessMessage('User unsuspended successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to unsuspend user');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const onlineUsers = users.filter(u => u.isOnline).length;
  const activeUsers = users.filter(u => u.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
          <span className="text-green-700 font-medium">{successMessage}</span>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
          <span className="text-red-700 font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage and monitor all user accounts in real-time</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Activity className="w-4 h-4" />
            <span>Live: {onlineUsers} online</span>
          </div>
          <button className="px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add New User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-nova-primary rounded-full">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-500 rounded-full">
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{onlineUsers}</p>
              <p className="text-sm text-gray-600">Online Now</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-500 rounded-full">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-500 rounded-full">
              <VolumeX className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'muted').length}
              </p>
              <p className="text-sm text-gray-600">Muted Users</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-500 rounded-full">
              <Ban className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'suspended').length}
              </p>
              <p className="text-sm text-gray-600">Suspended</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent text-sm"
              />
            </div>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="muted">Muted</option>
            <option value="suspended">Suspended</option>
          </select>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent text-sm"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="premium">Premium</option>
            <option value="vip">VIP</option>
          </select>

          <button className="px-3 py-2 sm:px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
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
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-nova-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        {user.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-400">{user.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(user.status)}
                      <div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                        {(user.muteExpiry || user.suspendExpiry) && (
                          <div className="text-xs text-gray-500">
                            {user.muteExpiry && `Muted until: ${user.muteExpiry}`}
                            {user.suspendExpiry && `Suspended until: ${user.suspendExpiry}`}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ₦{user.balance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>{user.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{user.lastActive}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserDetails(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded transition-colors" 
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedUser(user);
                          setShowActivityLog(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded transition-colors" 
                        title="View Activity"
                      >
                        <Activity className="w-4 h-4 text-gray-400" />
                      </button>
                      
                      {user.status === 'active' && (
                        <>
                          <div className="relative group">
                            <button className="p-1 hover:bg-yellow-100 rounded transition-colors" title="Mute User">
                              <VolumeX className="w-4 h-4 text-yellow-500" />
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 hidden group-hover:block">
                              <button 
                                onClick={() => handleMute(user.id, '1hour')}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                              >
                                Mute for 1 hour
                              </button>
                              <button 
                                onClick={() => handleMute(user.id, '6hours')}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                              >
                                Mute for 6 hours
                              </button>
                              <button 
                                onClick={() => handleMute(user.id, '1day')}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                              >
                                Mute for 1 day
                              </button>
                              <button 
                                onClick={() => handleMute(user.id, '3days')}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                              >
                                Mute for 3 days
                              </button>
                            </div>
                          </div>
                          
                          <div className="relative group">
                            <button className="p-1 hover:bg-red-100 rounded transition-colors" title="Suspend User">
                              <Ban className="w-4 h-4 text-red-500" />
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 hidden group-hover:block">
                              <button 
                                onClick={() => handleSuspend(user.id, '1day')}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                              >
                                Suspend for 1 day
                              </button>
                              <button 
                                onClick={() => handleSuspend(user.id, '3days')}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                              >
                                Suspend for 3 days
                              </button>
                              <button 
                                onClick={() => handleSuspend(user.id, '1week')}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                              >
                                Suspend for 1 week
                              </button>
                              <button 
                                onClick={() => handleSuspend(user.id, 'permanent')}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600"
                              >
                                Permanent suspension
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                      
                      {user.status === 'muted' && (
                        <button 
                          onClick={() => handleUnmute(user.id)}
                          className="p-1 hover:bg-green-100 rounded transition-colors" 
                          title="Unmute User"
                        >
                          <Volume2 className="w-4 h-4 text-green-500" />
                        </button>
                      )}
                      
                      {user.status === 'suspended' && (
                        <button 
                          onClick={() => handleUnsuspend(user.id)}
                          className="p-1 hover:bg-green-100 rounded transition-colors" 
                          title="Unsuspend User"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">User Details</h2>
              <button 
                onClick={() => setShowUserDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-nova-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {selectedUser.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h3>
                    <p className="text-sm text-gray-500">{selectedUser.email}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      {getStatusIcon(selectedUser.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(selectedUser.role)}`}>
                        {selectedUser.role}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{selectedUser.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{selectedUser.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">Joined: {selectedUser.joinDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Account Statistics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Balance:</span>
                      <span className="text-sm font-medium text-gray-900">₦{selectedUser.balance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Spent:</span>
                      <span className="text-sm font-medium text-gray-900">₦{selectedUser.totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Numbers Owned:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedUser.numbersOwned}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    {selectedUser.recentActivity?.map((activity, index) => (
                      <div key={index} className="text-sm text-gray-600">• {activity}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Log Modal */}
      {showActivityLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Activity Log</h2>
              <button 
                onClick={() => setShowActivityLog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {activityLogs.map((log) => (
                <div key={log.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Activity className="w-4 h-4 text-nova-primary" />
                        <span className="font-medium text-gray-900">{log.action}</span>
                        <span className="text-sm text-gray-500">• {new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{log.details}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>IP: {log.ip}</span>
                        <span>Device: {log.device}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
