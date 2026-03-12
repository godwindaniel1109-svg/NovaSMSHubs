import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Eye,
  RefreshCw,
  Check,
  X,
  DollarSign,
  Wallet
} from 'lucide-react';

interface Transaction {
  id: string;
  user: string;
  email: string;
  type: 'number_purchase' | 'wallet_funding' | 'refund' | 'penalty';
  amount: number;
  status: 'success' | 'pending' | 'failed' | 'refunded';
  service?: string;
  date: string;
  time: string;
  reference: string;
  paymentMethod: string;
  description: string;
}

const TransactionManagementPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'TXN001',
      user: 'John Doe',
      email: 'john.doe@email.com',
      type: 'number_purchase',
      amount: 500,
      status: 'success',
      service: 'WhatsApp',
      date: '2024-03-04',
      time: '14:23:45',
      reference: 'REF-20240304-001',
      paymentMethod: 'Paystack',
      description: 'Purchase of WhatsApp number +1234567890'
    },
    {
      id: 'TXN002',
      user: 'Jane Smith',
      email: 'jane.smith@email.com',
      type: 'wallet_funding',
      amount: 1000,
      status: 'success',
      date: '2024-03-04',
      time: '14:15:32',
      reference: 'REF-20240304-002',
      paymentMethod: 'Flutterwave',
      description: 'Wallet funding via Flutterwave'
    },
    {
      id: 'TXN003',
      user: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      type: 'wallet_funding',
      amount: 2000,
      status: 'pending',
      date: '2024-03-04',
      time: '14:08:21',
      reference: 'REF-20240304-003',
      paymentMethod: 'Paystack',
      description: 'Wallet funding via Paystack'
    },
    {
      id: 'TXN004',
      user: 'Sarah Jones',
      email: 'sarah.jones@email.com',
      type: 'number_purchase',
      amount: 750,
      status: 'pending',
      service: 'Facebook',
      date: '2024-03-04',
      time: '14:08:21',
      reference: 'REF-20240304-003',
      paymentMethod: 'Paystack',
      description: 'Purchase of Facebook number +0987654321'
    },
    {
      id: 'TXN005',
      user: 'David Brown',
      email: 'david.brown@email.com',
      type: 'number_purchase',
      amount: 300,
      status: 'failed',
      service: 'Instagram',
      date: '2024-03-04',
      time: '13:55:18',
      reference: 'REF-20240304-004',
      paymentMethod: 'Flutterwave',
      description: 'Purchase of Instagram number +1122334455'
    },
    {
      id: 'TXN006',
      user: 'Emily Davis',
      email: 'emily.davis@email.com',
      type: 'wallet_funding',
      amount: 5000,
      status: 'pending',
      date: '2024-03-04',
      time: '13:45:12',
      reference: 'REF-20240304-005',
      paymentMethod: 'Bank Transfer',
      description: 'Wallet funding via Bank Transfer'
    },
    {
      id: 'TXN007',
      user: 'Robert Wilson',
      email: 'robert.wilson@email.com',
      type: 'refund',
      amount: 500,
      status: 'refunded',
      service: 'Twitter',
      date: '2024-03-04',
      time: '13:45:12',
      reference: 'REF-20240304-005',
      paymentMethod: 'Paystack',
      description: 'Refund for failed Twitter number purchase'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle transaction approval
  const handleApprove = async (transactionId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTransactions(prev => prev.map(tx => 
        tx.id === transactionId 
          ? { ...tx, status: 'success' as const }
          : tx
      ));
      
      setSuccessMessage(`Transaction ${transactionId} approved successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to approve transaction');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  // Handle transaction rejection
  const handleReject = async (transactionId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTransactions(prev => prev.map(tx => 
        tx.id === transactionId 
          ? { ...tx, status: 'failed' as const }
          : tx
      ));
      
      setSuccessMessage(`Transaction ${transactionId} rejected!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to reject transaction');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'refunded':
        return <RefreshCw className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'number_purchase':
        return 'bg-nova-primary/20 text-nova-navy';
      case 'wallet_funding':
        return 'bg-green-100 text-green-800';
      case 'refund':
        return 'bg-blue-100 text-blue-800';
      case 'penalty':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'number_purchase':
        return <CreditCard className="w-4 h-4 text-nova-primary" />;
      case 'wallet_funding':
        return <Wallet className="w-4 h-4 text-green-500" />;
      case 'refund':
        return <RefreshCw className="w-4 h-4 text-blue-500" />;
      case 'penalty':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (transaction.service && transaction.service.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalRevenue = transactions
    .filter(t => t.status === 'success')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingRevenue = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const failedRevenue = transactions
    .filter(t => t.status === 'failed')
    .reduce((sum, t) => sum + t.amount, 0);

  const refundedAmount = transactions
    .filter(t => t.status === 'refunded')
    .reduce((sum, t) => sum + t.amount, 0);

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
          <h1 className="text-2xl font-bold text-gray-900">Transaction Management</h1>
          <p className="text-gray-600">Monitor and manage all financial transactions</p>
        </div>
        <button className="px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500 rounded-full">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">₦{totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
            </div>
            <div className="flex items-center text-green-600 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +18%
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-yellow-500 rounded-full">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">₦{pendingRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
            <div className="flex items-center text-yellow-600 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {transactions.filter(t => t.status === 'pending').length}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-red-500 rounded-full">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">₦{failedRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Failed</p>
              </div>
            </div>
            <div className="flex items-center text-red-600 text-sm">
              <XCircle className="w-4 h-4 mr-1" />
              {transactions.filter(t => t.status === 'failed').length}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500 rounded-full">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">₦{refundedAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Refunded</p>
              </div>
            </div>
            <div className="flex items-center text-blue-600 text-sm">
              <RefreshCw className="w-4 h-4 mr-1" />
              {transactions.filter(t => t.status === 'refunded').length}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search transactions by user, email, reference, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="number_purchase">Number Purchase</option>
            <option value="wallet_funding">Wallet Funding</option>
            <option value="refund">Refund</option>
            <option value="penalty">Penalty</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
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
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(transaction.type)}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{transaction.reference}</div>
                        <div className="text-xs text-gray-500">{transaction.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{transaction.user}</div>
                      <div className="text-xs text-gray-500">{transaction.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(transaction.type)}`}>
                      {transaction.type.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">₦{transaction.amount.toLocaleString()}</div>
                    {transaction.service && (
                      <div className="text-xs text-gray-500">{transaction.service}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transaction.paymentMethod}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">{transaction.date}</div>
                      <div className="text-xs text-gray-500">{transaction.time}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="View Details">
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      {transaction.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleApprove(transaction.id)}
                            className="p-1 hover:bg-green-100 rounded transition-colors" 
                            title="Approve Transaction"
                          >
                            <Check className="w-4 h-4 text-green-500" />
                          </button>
                          <button 
                            onClick={() => handleReject(transaction.id)}
                            className="p-1 hover:bg-red-100 rounded transition-colors" 
                            title="Reject Transaction"
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionManagementPage;
