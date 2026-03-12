import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Calendar,
  Users,
  ShoppingCart,
  CreditCard,
  FileText,
  Download,
  RefreshCw,
  X,
  ChevronDown,
  Check
} from 'lucide-react';
import { useNotify } from './NotificationSystem';

interface SearchFilters {
  query: string;
  dateRange: {
    start: string;
    end: string;
  };
  status: string[];
  category: string;
  minAmount: number;
  maxAmount: number;
  userRole: string;
  paymentMethod: string;
  country: string;
}

interface SearchResult {
  id: string;
  type: 'user' | 'order' | 'transaction' | 'payment-proof';
  title: string;
  description: string;
  status: string;
  date: string;
  amount?: number;
  user?: string;
  metadata: Record<string, any>;
}

const AdvancedSearchPage: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    dateRange: {
      start: '',
      end: ''
    },
    status: [],
    category: 'all',
    minAmount: 0,
    maxAmount: 0,
    userRole: 'all',
    paymentMethod: 'all',
    country: 'all'
  });

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['user', 'order', 'transaction', 'payment-proof']);
  const notify = useNotify();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'virtual-number', label: 'Virtual Numbers' },
    { value: 'sms-service', label: 'SMS Services' },
    { value: 'verification', label: 'Verification' }
  ];

  const statuses = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const userRoles = [
    { value: 'all', label: 'All Roles' },
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
    { value: 'validator', label: 'Validator' },
    { value: 'moderator', label: 'Moderator' }
  ];

  const paymentMethods = [
    { value: 'all', label: 'All Methods' },
    { value: 'paystack', label: 'Paystack' },
    { value: 'flutterwave', label: 'Flutterwave' },
    { value: 'bank-transfer', label: 'Bank Transfer' },
    { value: 'wallet', label: 'Wallet' }
  ];

  const countries = [
    { value: 'all', label: 'All Countries' },
    { value: 'nigeria', label: 'Nigeria' },
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'canada', label: 'Canada' }
  ];

  const searchTypes = [
    { value: 'user', label: 'Users', icon: Users },
    { value: 'order', label: 'Orders', icon: ShoppingCart },
    { value: 'transaction', label: 'Transactions', icon: CreditCard },
    { value: 'payment-proof', label: 'Payment Proofs', icon: FileText }
  ];

  useEffect(() => {
    // Auto-search when filters change (with debounce)
    const timer = setTimeout(() => {
      if (filters.query || filters.dateRange.start || filters.dateRange.end) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock search results
      const mockResults: SearchResult[] = [
        {
          id: 'USR001',
          type: 'user',
          title: 'John Doe',
          description: 'john@example.com | +2347012345678',
          status: 'active',
          date: '2024-01-15',
          user: 'John Doe',
          metadata: { balance: 50000, totalOrders: 15 }
        },
        {
          id: 'ORD001',
          type: 'order',
          title: 'Order #ORD001',
          description: 'Nigeria Virtual Number',
          status: 'completed',
          date: '2024-01-14',
          amount: 3500,
          user: 'John Doe',
          metadata: { service: 'Nigeria Virtual Number', provider: '5sim' }
        },
        {
          id: 'TXN001',
          type: 'transaction',
          title: 'Transaction #TXN001',
          description: 'Payment via Paystack',
          status: 'completed',
          date: '2024-01-13',
          amount: 10000,
          user: 'Jane Smith',
          metadata: { method: 'paystack', reference: 'PAY_123456' }
        },
        {
          id: 'PROOF001',
          type: 'payment-proof',
          title: 'Payment Proof #PROOF001',
          description: 'Bank transfer proof',
          status: 'pending',
          date: '2024-01-12',
          amount: 25000,
          user: 'Bob Johnson',
          metadata: { method: 'bank-transfer', uploadedAt: '2024-01-12T10:30:00Z' }
        }
      ];

      // Filter results based on selected types
      const filteredResults = mockResults.filter(result => 
        selectedTypes.includes(result.type)
      );

      setResults(filteredResults);
    } catch (error) {
      notify.error('Search Failed', 'Failed to perform search');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleStatusToggle = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      dateRange: { start: '', end: '' },
      status: [],
      category: 'all',
      minAmount: 0,
      maxAmount: 0,
      userRole: 'all',
      paymentMethod: 'all',
      country: 'all'
    });
    setResults([]);
  };

  const exportResults = () => {
    // Simulate export functionality
    notify.success('Export Started', 'Search results export has been initiated');
  };

  const getTypeIcon = (type: string) => {
    const searchType = searchTypes.find(t => t.value === type);
    return searchType ? React.createElement(searchType.icon, { className: "w-4 h-4" }) : null;
  };

  const getStatusBadge = (status: string, type: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    
    if (type === 'user') {
      const userStyles = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-gray-100 text-gray-800',
        suspended: 'bg-red-100 text-red-800'
      };
      return <span className={`${baseClasses} ${userStyles[status as keyof typeof userStyles]}`}>{status}</span>;
    }
    
    const generalStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    };
    
    return <span className={`${baseClasses} ${generalStyles[status as keyof typeof generalStyles] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Advanced Search</h1>
            <p className="text-gray-600 mt-1">Search across users, orders, transactions, and payment proofs</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={exportResults}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button
              onClick={clearFilters}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="space-y-4">
          {/* Main Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={filters.query}
              onChange={(e) => handleFilterChange('query', e.target.value)}
              placeholder="Search by name, email, phone, order ID, transaction ID..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
            />
          </div>

          {/* Search Types */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Search in:</span>
            <div className="flex items-center space-x-2">
              {searchTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => {
                    setSelectedTypes(prev =>
                      prev.includes(type.value)
                        ? prev.filter(t => t !== type.value)
                        : [...prev, type.value]
                    );
                  }}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    selectedTypes.includes(type.value)
                      ? 'bg-nova-primary text-black'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {React.createElement(type.icon, { className: "w-4 h-4 mr-2" })}
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showFilters ? 'Hide' : 'Show'} Advanced Filters
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Filters</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                />
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* User Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User Role</label>
              <select
                value={filters.userRole}
                onChange={(e) => handleFilterChange('userRole', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
              >
                {userRoles.map(role => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
            </div>

            {/* Amount Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount Range</label>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Min amount"
                  value={filters.minAmount || ''}
                  onChange={(e) => handleFilterChange('minAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max amount"
                  value={filters.maxAmount || ''}
                  onChange={(e) => handleFilterChange('maxAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <select
                value={filters.paymentMethod}
                onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
              >
                {paymentMethods.map(method => (
                  <option key={method.value} value={method.value}>{method.label}</option>
                ))}
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select
                value={filters.country}
                onChange={(e) => handleFilterChange('country', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
              >
                {countries.map(country => (
                  <option key={country.value} value={country.value}>{country.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Status Filters */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="flex flex-wrap gap-2">
              {statuses.map(status => (
                <button
                  key={status.value}
                  onClick={() => handleStatusToggle(status.value)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.status.includes(status.value)
                      ? 'bg-nova-primary text-black'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filters.status.includes(status.value) && <Check className="w-3 h-3 mr-1" />}
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Search Results {results.length > 0 && `(${results.length})`}
            </h3>
            {loading && (
              <div className="flex items-center text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></div>
                Searching...
              </div>
            )}
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {results.length === 0 && !loading ? (
            <div className="p-12 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            results.map((result) => (
              <div key={result.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {getTypeIcon(result.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{result.title}</h4>
                        {getStatusBadge(result.status, result.type)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{result.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{result.date}</span>
                        {result.user && <span>User: {result.user}</span>}
                        {result.amount && <span>Amount: ₦{result.amount.toLocaleString()}</span>}
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchPage;
