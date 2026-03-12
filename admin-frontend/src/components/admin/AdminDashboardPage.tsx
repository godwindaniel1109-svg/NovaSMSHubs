import React, { useState, useEffect } from 'react';
import { Users, CreditCard, TrendingUp, DollarSign, Bell, MessageSquare, Eye, Loader, AlertCircle, Activity, ArrowUp, ArrowDown, MoreHorizontal, Calendar, Filter } from 'lucide-react';
import adminApiService from '../../services/adminApi';

const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await adminApiService.getDashboardStats();
      
      if (response.error) {
        setError(response.error);
      } else {
        setStats(response.stats || []);
        setRecentTransactions(response.recentTransactions || []);
        setRecentUsers(response.recentUsers || []);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: 'bg-yellow-100 text-yellow-800',
      complete: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${statusConfig[status as keyof typeof statusConfig]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header with Gradient */}
      <div className="bg-gradient-to-r from-nova-primary via-nova-primary to-nova-secondary rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-white/90 text-lg">Welcome back! Here's what's happening with NovaSMSHubs today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-white/80">Last Updated</p>
              <p className="text-white font-medium">{new Date().toLocaleTimeString()}</p>
            </div>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="relative">
            <Loader className="w-12 h-12 animate-spin text-nova-primary" />
            <div className="absolute inset-0 w-12 h-12 animate-ping bg-nova-primary/20 rounded-full"></div>
          </div>
          <span className="mt-4 text-gray-600 font-medium">Loading dashboard data...</span>
          <span className="text-sm text-gray-500 mt-1">This should only take a moment</span>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="bg-red-100 rounded-full p-3 mr-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-red-800 font-semibold mb-1">Unable to load dashboard</h3>
              <p className="text-red-700">{error}</p>
            </div>
            <button 
              onClick={fetchDashboardData}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.change?.includes('+') || stat.change?.includes('up');
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center space-x-1">
                    {isPositive ? (
                      <ArrowUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <Activity className="w-3 h-3 mr-1" />
                    <span>Real-time data</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Recent Transactions */}
      {!isLoading && !error && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
              <p className="text-sm text-gray-600 mt-1">Latest financial activity across the platform</p>
            </div>
            <button className="text-nova-primary hover:text-nova-secondary font-medium text-sm flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>View All</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-nova-primary/10 rounded-full flex items-center justify-center mr-3">
                          <span className="text-nova-primary font-semibold text-xs">
                            {transaction.user?.split(' ').map((n: string) => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{transaction.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">{transaction.amount}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{transaction.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(transaction.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Users */}
      {!isLoading && !error && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Recent Users</h2>
              <p className="text-sm text-gray-600 mt-1">New members who joined recently</p>
            </div>
            <button className="text-nova-primary hover:text-nova-secondary font-medium text-sm flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>View All</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-nova-primary/10 rounded-full flex items-center justify-center mr-3">
                          <span className="text-nova-primary font-semibold text-xs">
                            {user.name?.split(' ').map((n: string) => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(user.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
