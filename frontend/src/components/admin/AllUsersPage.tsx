import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  Shield,
  Ban,
  CheckCircle,
  XCircle,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  Send
} from 'lucide-react';
import { useNotify } from '../NotificationSystem';

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
  avatar?: string;
}

const AllUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageType, setMessageType] = useState<'individual' | 'all'>('individual');
  const [message, setMessage] = useState('');
  const [messageSubject, setMessageSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const notify = useNotify();

  useEffect(() => {
    // Mock data - in production, fetch from API
    const mockUsers: User[] = [
      {
        id: 'USR001',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+2347012345678',
        status: 'active',
        balance: 50000,
        registeredAt: '2024-01-01',
        lastLogin: '2024-01-15T14:30:00Z',
        totalOrders: 15,
        totalSpent: 75000,
        avatar: '/avatars/john.jpg'
      },
      {
        id: 'USR002',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+2348087654321',
        status: 'active',
        balance: 25000,
        registeredAt: '2024-01-05',
        lastLogin: '2024-01-15T12:00:00Z',
        totalOrders: 8,
        totalSpent: 45000,
        avatar: '/avatars/jane.jpg'
      },
      {
        id: 'USR003',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        phone: '+2349012345678',
        status: 'suspended',
        balance: 0,
        registeredAt: '2024-01-08',
        lastLogin: '2024-01-10T09:15:00Z',
        totalOrders: 3,
        totalSpent: 12000,
        avatar: '/avatars/bob.jpg'
      },
      {
        id: 'USR004',
        name: 'Alice Williams',
        email: 'alice@example.com',
        phone: '+2347023456789',
        status: 'inactive',
        balance: 10000,
        registeredAt: '2024-01-10',
        lastLogin: '2024-01-12T16:45:00Z',
        totalOrders: 2,
        totalSpent: 8000,
        avatar: '/avatars/alice.jpg'
      }
    ];
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  useEffect(() => {
    let filtered = users;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, statusFilter]);

  const handleSendMessage = async () => {
    if (!messageSubject || !message) {
      notify.error('Missing Information', 'Please fill in both subject and message');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const recipient = messageType === 'all' ? 'all users' : selectedUser?.name;
      notify.success('Message Sent', `Message sent successfully to ${recipient}`);
      
      setShowMessageModal(false);
      setMessageSubject('');
      setMessage('');
      setSelectedUser(null);
    } catch (error) {
      notify.error('Send Failed', 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId: string, action: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const actionMessages = {
        suspend: 'User suspended successfully',
        activate: 'User activated successfully',
        delete: 'User deleted successfully'
      };
      
      notify.success('Action Successful', actionMessages[action as keyof typeof actionMessages]);
      
      // Update user list
      if (action === 'delete') {
        setUsers(prev => prev.filter(user => user.id !== userId));
      } else {
        setUsers(prev => prev.map(user =>
          user.id === userId
            ? { ...user, status: action === 'suspend' ? 'suspended' : 'active' }
            : user
        ));
      }
    } catch (error) {
      notify.error('Action Failed', 'Failed to perform action');
    }
  };

  const exportUsers = () => {
    // Simulate export functionality
    notify.success('Export Started', 'User data export has been initiated');
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
            <p className="text-gray-600 mt-1">Manage and communicate with all platform users</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMessageType('all')}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="w-4 h-4 mr-2" />
              Message All Users
            </button>
            <button
              onClick={exportUsers}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {filteredUsers.length} of {users.length} users
            </span>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={user.avatar || '/default-avatar.png'}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₦{user.balance.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.totalOrders} orders</div>
                    <div className="text-sm text-gray-500">₦{user.totalSpent.toLocaleString()} spent</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setMessageType('individual');
                          setShowMessageModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleUserAction(user.id, user.status === 'suspended' ? 'activate' : 'suspend')}
                        className={`${
                          user.status === 'suspended' ? 'text-green-600 hover:text-green-900' : 'text-yellow-600 hover:text-yellow-900'
                        }`}
                      >
                        {user.status === 'suspended' ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {messageType === 'all' ? 'Message All Users' : `Message ${selectedUser?.name}`}
                </h2>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                  placeholder="Enter message subject..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                  placeholder="Enter your message..."
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={loading}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsersPage;
