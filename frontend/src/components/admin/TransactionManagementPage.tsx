import React, { useState, useEffect } from 'react';
import {
  FileText,
  Search,
  Filter,
  Eye,
  Download,
  RefreshCw,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  User,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { useNotify } from '../NotificationSystem';

interface Transaction {
  id: string;
  transactionId: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: 'deposit' | 'withdrawal' | 'payment' | 'refund';
  amount: number;
  fee: number;
  netAmount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  method: string;
  gateway?: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  reference?: string;
  proofStatus?: 'pending' | 'approved' | 'rejected';
}

const TransactionManagementPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const notify = useNotify();

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, searchTerm, typeFilter, statusFilter]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      // Mock API call - in production, this would fetch from backend
      const mockTransactions: Transaction[] = [
        {
          id: '1',
          transactionId: 'TXN-1640995200001',
          userId: 'user123',
          userName: 'John Doe',
          userEmail: 'john@example.com',
          type: 'deposit',
          amount: 5000,
          fee: 50,
          netAmount: 4950,
          status: 'completed',
          method: 'Paystack',
          gateway: 'paystack',
          description: 'Wallet funding via Paystack',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:35:00Z',
          reference: 'PAYSTACK_REF_001'
        },
        {
          id: '2',
          transactionId: 'TXN-1640995200002',
          userId: 'user456',
          userName: 'Jane Smith',
          userEmail: 'jane@example.com',
          type: 'payment',
          amount: 3500,
          fee: 35,
          netAmount: 3465,
          status: 'completed',
          method: 'Wallet Balance',
          description: 'Payment for USA Number order',
          createdAt: '2024-01-15T09:15:00Z',
          updatedAt: '2024-01-15T09:20:00Z',
          reference: 'ORD-1640995200002'
        },
        {
          id: '3',
          transactionId: 'TXN-1640995200003',
          userId: 'user789',
          userName: 'Mike Johnson',
          userEmail: 'mike@example.com',
          type: 'deposit',
          amount: 10000,
          fee: 100,
          netAmount: 9900,
          status: 'pending',
          method: 'Bank Transfer',
          description: 'Manual wallet funding',
          createdAt: '2024-01-15T08:45:00Z',
          updatedAt: '2024-01-15T08:45:00Z',
          proofStatus: 'pending'
        },
        {
          id: '4',
          transactionId: 'TXN-1640995200004',
          userId: 'user101',
          userName: 'Sarah Wilson',
          userEmail: 'sarah@example.com',
          type: 'refund',
          amount: 4000,
          fee: 0,
          netAmount: 4000,
          status: 'completed',
          method: 'System',
          description: 'Refund for cancelled order',
          createdAt: '2024-01-14T16:20:00Z',
          updatedAt: '2024-01-14T16:25:00Z',
          reference: 'REF-1640995200004'
        }
      ];

      setTransactions(mockTransactions);
      setTotalPages(Math.ceil(mockTransactions.length / 10));
    } catch (error) {
      notify.error('Error', 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const filterTransactions = () => {
    let filtered = transactions;

    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.type === typeFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.status === statusFilter);
    }

    setFilteredTransactions(filtered);
  };

  const handleTransactionAction = async (action: string, transactionId: string) => {
    try {
      switch (action) {
        case 'approve':
          setTransactions(prev => prev.map(transaction =>
            transaction.id === transactionId ? { ...transaction, status: 'completed' } : transaction
          ));
          notify.success('Transaction Approved', 'Transaction has been approved successfully');
          break;
        case 'reject':
          if (window.confirm('Are you sure you want to reject this transaction?')) {
            setTransactions(prev => prev.map(transaction =>
              transaction.id === transactionId ? { ...transaction, status: 'failed' } : transaction
            ));
            notify.success('Transaction Rejected', 'Transaction has been rejected successfully');
          }
          break;
        case 'cancel':
          if (window.confirm('Are you sure you want to cancel this transaction?')) {
            setTransactions(prev => prev.map(transaction =>
              transaction.id === transactionId ? { ...transaction, status: 'cancelled' } : transaction
            ));
            notify.success('Transaction Cancelled', 'Transaction has been cancelled successfully');
          }
          break;
      }
    } catch (error) {
      notify.error('Action Failed', 'Failed to perform transaction action');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'withdrawal':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'payment':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'refund':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const exportTransactions = () => {
    // CSV export functionality
    const csvContent = [
      ['Transaction ID', 'User', 'Type', 'Amount', 'Fee', 'Net Amount', 'Status', 'Method', 'Date'],
      ...filteredTransactions.map(t => [
        t.transactionId,
        t.userName,
        t.type,
        t.amount.toString(),
        t.fee.toString(),
        t.netAmount.toString(),
        t.status,
        t.method,
        new Date(t.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    notify.success('Export Successful', 'Transactions exported successfully');
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
          <h1 className="text-2xl font-bold text-gray-900">Transaction Management</h1>
          <p className="text-gray-600">Manage all financial transactions</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportTransactions}
            className="flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button
            onClick={fetchTransactions}
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
              <p className="text-sm font-medium text-gray-600">Total Volume</p>
              <p className="text-2xl font-bold text-gray-900">
                ₦{transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Fees</p>
              <p className="text-2xl font-bold text-red-600">
                ₦{transactions.reduce((sum, t) => sum + t.fee, 0).toLocaleString()}
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Revenue</p>
              <p className="text-2xl font-bold text-green-600">
                ₦{transactions.reduce((sum, t) => sum + t.netAmount, 0).toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {transactions.filter(t => t.status === 'pending').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
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
                placeholder="Search transactions by ID, user, description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="deposit">Deposits</option>
              <option value="withdrawal">Withdrawals</option>
              <option value="payment">Payments</option>
              <option value="refund">Refunds</option>
            </select>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">{transaction.transactionId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{transaction.userName}</div>
                      <div className="text-gray-500">{transaction.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeBadge(transaction.type)}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₦{transaction.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-red-600">
                      -₦{transaction.fee.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₦{transaction.netAmount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(transaction.status)}`}>
                      {transaction.status === 'completed' && <CheckCircle className="w-4 h-4" />}
                      {transaction.status === 'pending' && <AlertTriangle className="w-4 h-4" />}
                      {transaction.status === 'failed' && <XCircle className="w-4 h-4" />}
                      {transaction.status === 'cancelled' && <XCircle className="w-4 h-4" />}
                      <span className="ml-1">{transaction.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{transaction.method}</div>
                      {transaction.gateway && (
                        <div className="text-gray-500">{transaction.gateway}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setShowDetailsModal(true);
                        }}
                        className="text-nova-primary hover:text-nova-secondary"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      {transaction.status === 'pending' && (
                        <button
                          onClick={() => handleTransactionAction('approve', transaction.id)}
                          className="text-green-600 hover:text-green-700"
                          title="Approve Transaction"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      
                      {transaction.status === 'pending' && (
                        <button
                          onClick={() => handleTransactionAction('reject', transaction.id)}
                          className="text-red-600 hover:text-red-700"
                          title="Reject Transaction"
                        >
                          <XCircle className="w-4 h-4" />
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

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white px-6 py-4 border-t border-gray-200">
        <div className="text-sm text-gray-700">
          Showing {filteredTransactions.length} of {transactions.length} transactions
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

      {/* Transaction Details Modal */}
      {showDetailsModal && selectedTransaction && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
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
                    <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                    <p className="mt-1 text-sm font-mono text-gray-900">{selectedTransaction.transactionId}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">User</label>
                    <div className="mt-1 text-sm text-gray-900">
                      <p className="font-medium">{selectedTransaction.userName}</p>
                      <p>{selectedTransaction.userEmail}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getTypeBadge(selectedTransaction.type)}`}>
                      {selectedTransaction.type}
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Method</label>
                    <div className="mt-1 text-sm text-gray-900">
                      <p className="font-medium">{selectedTransaction.method}</p>
                      {selectedTransaction.gateway && (
                        <p className="text-gray-500">{selectedTransaction.gateway}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <p className="mt-1 text-lg font-bold text-gray-900">
                      ₦{selectedTransaction.amount.toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fee</label>
                    <p className="mt-1 text-lg font-bold text-red-600">
                      -₦{selectedTransaction.fee.toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Net Amount</label>
                    <p className="mt-1 text-lg font-bold text-green-600">
                      ₦{selectedTransaction.netAmount.toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(selectedTransaction.status)}`}>
                      {selectedTransaction.status === 'completed' && <CheckCircle className="w-4 h-4" />}
                      {selectedTransaction.status === 'pending' && <AlertTriangle className="w-4 h-4" />}
                      {selectedTransaction.status === 'failed' && <XCircle className="w-4 h-4" />}
                      {selectedTransaction.status === 'cancelled' && <XCircle className="w-4 h-4" />}
                      <span className="ml-2">{selectedTransaction.status}</span>
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedTransaction.description}</p>
                  </div>
                  
                  {selectedTransaction.reference && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Reference</label>
                      <p className="mt-1 text-sm font-mono text-gray-900">{selectedTransaction.reference}</p>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Created</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedTransaction.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionManagementPage;
