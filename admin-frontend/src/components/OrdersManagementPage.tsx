import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Download, 
  Calendar,
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  MoreVertical,
  RefreshCw
} from 'lucide-react';

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled' | 'processing';
  assignedAgent: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}

const OrdersManagementPage: React.FC = () => {
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderId: 'ORD-2024-001',
      customerName: 'John Doe',
      customerEmail: 'john.doe@email.com',
      customerPhone: '+2348012345678',
      service: 'WhatsApp Number',
      amount: 5000,
      status: 'pending',
      assignedAgent: 'Agent A',
      createdAt: '2024-03-04 10:30:00',
      updatedAt: '2024-03-04 10:30:00',
      description: 'Purchase of WhatsApp virtual number'
    },
    {
      id: '2',
      orderId: 'ORD-2024-002',
      customerName: 'Jane Smith',
      customerEmail: 'jane.smith@email.com',
      customerPhone: '+2348023456789',
      service: 'Facebook Number',
      amount: 3500,
      status: 'completed',
      assignedAgent: 'Agent B',
      createdAt: '2024-03-04 09:15:00',
      updatedAt: '2024-03-04 11:20:00',
      description: 'Purchase of Facebook virtual number'
    },
    {
      id: '3',
      orderId: 'ORD-2024-003',
      customerName: 'Mike Wilson',
      customerEmail: 'mike.wilson@email.com',
      customerPhone: '+2348034567890',
      service: 'Instagram Number',
      amount: 4500,
      status: 'processing',
      assignedAgent: 'Agent C',
      createdAt: '2024-03-04 08:45:00',
      updatedAt: '2024-03-04 12:00:00',
      description: 'Purchase of Instagram virtual number'
    },
    {
      id: '4',
      orderId: 'ORD-2024-004',
      customerName: 'Sarah Jones',
      customerEmail: 'sarah.jones@email.com',
      customerPhone: '+2348045678901',
      service: 'Twitter Number',
      amount: 2500,
      status: 'cancelled',
      assignedAgent: 'Agent A',
      createdAt: '2024-03-04 07:30:00',
      updatedAt: '2024-03-04 09:00:00',
      description: 'Cancelled Twitter number purchase'
    },
    {
      id: '5',
      orderId: 'ORD-2024-005',
      customerName: 'David Brown',
      customerEmail: 'david.brown@email.com',
      customerPhone: '+2348056789012',
      service: 'Telegram Number',
      amount: 6000,
      status: 'completed',
      assignedAgent: 'Agent B',
      createdAt: '2024-03-04 06:15:00',
      updatedAt: '2024-03-04 08:30:00',
      description: 'Purchase of Telegram virtual number'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'processing':
        return <RefreshCw className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  const handleSelectOrder = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const pendingCount = orders.filter(order => order.status === 'pending').length;
  const completedCount = orders.filter(order => order.status === 'completed').length;
  const cancelledCount = orders.filter(order => order.status === 'cancelled').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600">Manage and monitor all customer orders</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Package className="w-4 h-4" />
          Create Order
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500 rounded-full">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-500 rounded-full">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-500 rounded-full">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-500 rounded-full">
              <XCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">₦{totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders by customer name, email, order ID, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.orderId}</div>
                      <div className="text-xs text-gray-500">{order.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-xs text-gray-500">{order.customerEmail}</div>
                      <div className="text-xs text-gray-400">{order.customerPhone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{order.service}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ₦{order.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-700">{order.assignedAgent[0]}</span>
                      </div>
                      <span className="text-sm text-gray-900">{order.assignedAgent}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">{order.createdAt.split(' ')[0]}</div>
                      <div className="text-xs text-gray-500">{order.createdAt.split(' ')[1]}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Edit className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">
                {selectedOrders.length} order{selectedOrders.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                  Assign Agent
                </button>
                <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm">
                  Mark Complete
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm">
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersManagementPage;
