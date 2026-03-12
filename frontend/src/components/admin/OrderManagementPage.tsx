import React, { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Download,
  Calendar,
  User,
  Phone,
  Globe,
  DollarSign,
  Package,
  AlertTriangle
} from 'lucide-react';
import { useNotify } from '../NotificationSystem';

interface Order {
  id: string;
  orderId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  service: string;
  country: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  smsCode?: string;
  phoneNumber?: string;
  expiresAt?: string;
}

const OrderManagementPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const notify = useNotify();

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Mock API call - in production, this would fetch from backend
      const mockOrders: Order[] = [
        {
          id: '1',
          orderId: 'ORD-1640995200001',
          userId: 'user123',
          userName: 'John Doe',
          userEmail: 'john@example.com',
          userPhone: '+2348012345678',
          service: 'USA Number',
          country: 'United States',
          amount: 5000,
          status: 'completed',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T11:45:00Z',
          smsCode: '123456',
          phoneNumber: '+1234567890',
          expiresAt: '2024-02-15T10:30:00Z'
        },
        {
          id: '2',
          orderId: 'ORD-1640995200002',
          userId: 'user456',
          userName: 'Jane Smith',
          userEmail: 'jane@example.com',
          userPhone: '+2349012345678',
          service: 'UK Number',
          country: 'United Kingdom',
          amount: 3500,
          status: 'processing',
          createdAt: '2024-01-15T09:15:00Z',
          updatedAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '3',
          orderId: 'ORD-1640995200003',
          userId: 'user789',
          userName: 'Mike Johnson',
          userEmail: 'mike@example.com',
          userPhone: '+2347012345678',
          service: 'Canada Number',
          country: 'Canada',
          amount: 4000,
          status: 'pending',
          createdAt: '2024-01-15T08:45:00Z',
          updatedAt: '2024-01-15T08:45:00Z'
        },
        {
          id: '4',
          orderId: 'ORD-1640995200004',
          userId: 'user101',
          userName: 'Sarah Wilson',
          userEmail: 'sarah@example.com',
          userPhone: '+2348012345679',
          service: 'Germany Number',
          country: 'Germany',
          amount: 6000,
          status: 'failed',
          createdAt: '2024-01-14T16:20:00Z',
          updatedAt: '2024-01-14T17:30:00Z'
        }
      ];

      setOrders(mockOrders);
      setTotalPages(Math.ceil(mockOrders.length / 10));
    } catch (error) {
      notify.error('Error', 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.service.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const handleOrderAction = async (action: string, orderId: string) => {
    try {
      switch (action) {
        case 'cancel':
          setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status: 'cancelled' } : order
          ));
          notify.success('Order Cancelled', 'Order has been cancelled successfully');
          break;
        case 'refund':
          if (window.confirm('Are you sure you want to refund this order?')) {
            setOrders(prev => prev.map(order =>
              order.id === orderId ? { ...order, status: 'failed' } : order
            ));
            notify.success('Order Refunded', 'Order has been refunded successfully');
          }
          break;
        case 'delete':
          if (window.confirm('Are you sure you want to delete this order?')) {
            setOrders(prev => prev.filter(order => order.id !== orderId));
            notify.success('Order Deleted', 'Order has been deleted successfully');
          }
          break;
      }
    } catch (error) {
      notify.error('Action Failed', 'Failed to perform order action');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nova-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">Manage all user orders</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchOrders}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {orders.filter(o => o.status === 'pending').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Processing</p>
              <p className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'processing').length}
              </p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === 'completed').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by ID, user, service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOrders(filteredOrders.map(o => o.id));
                      } else {
                        setSelectedOrders([]);
                      }
                    }}
                    className="rounded border-gray-300 text-nova-primary focus:ring-nova-primary"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrders([...selectedOrders, order.id]);
                        } else {
                          setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                        }
                      }}
                      className="rounded border-gray-300 text-nova-primary focus:ring-nova-primary"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">{order.orderId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{order.userName}</div>
                      <div className="text-gray-500">{order.userEmail}</div>
                      <div className="text-gray-500">{order.userPhone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{order.service}</div>
                      <div className="text-gray-500 flex items-center">
                        <Globe className="w-3 h-3 mr-1" />
                        {order.country}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₦{order.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowDetailsModal(true);
                        }}
                        className="text-nova-primary hover:text-nova-secondary"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleOrderAction('cancel', order.id)}
                          className="text-yellow-600 hover:text-yellow-700"
                          title="Cancel Order"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                      
                      {(order.status === 'failed' || order.status === 'cancelled') && (
                        <button
                          onClick={() => handleOrderAction('refund', order.id)}
                          className="text-green-600 hover:text-green-700"
                          title="Refund Order"
                        >
                          <DollarSign className="w-4 h-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleOrderAction('delete', order.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Delete Order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white px-6 py-4 border-t border-gray-200">
        <div className="text-sm text-gray-700">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Order ID</label>
                    <p className="mt-1 text-sm font-mono text-gray-900">{selectedOrder.orderId}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Customer</label>
                    <div className="mt-1 text-sm text-gray-900">
                      <p className="font-medium">{selectedOrder.userName}</p>
                      <p>{selectedOrder.userEmail}</p>
                      <p>{selectedOrder.userPhone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Service</label>
                    <div className="mt-1 text-sm text-gray-900">
                      <p className="font-medium">{selectedOrder.service}</p>
                      <p className="text-gray-500">{selectedOrder.country}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <p className="mt-1 text-lg font-bold text-gray-900">
                      ₦{selectedOrder.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      <span className="ml-2">{selectedOrder.status}</span>
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Created</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedOrder.updatedAt).toLocaleString()}
                    </p>
                  </div>
                  
                  {selectedOrder.smsCode && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">SMS Code</label>
                      <p className="mt-1 text-lg font-bold text-blue-600 font-mono">
                        {selectedOrder.smsCode}
                      </p>
                    </div>
                  )}
                  
                  {selectedOrder.phoneNumber && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <p className="mt-1 text-lg font-bold text-gray-900">
                        {selectedOrder.phoneNumber}
                      </p>
                    </div>
                  )}
                  
                  {selectedOrder.expiresAt && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Expires</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(selectedOrder.expiresAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagementPage;
