import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  CheckCircle, 
  BarChart3, 
  Shield, 
  Clock, 
  DollarSign, 
  Eye,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface SummaryStats {
  totalUsers: number;
  activeUsers: number;
  totalOrders: number;
  activeServices: number;
  pendingDeposits: number;
  totalRevenue: number;
  totalTransactions: number;
}

const SummaryDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [stats] = useState<SummaryStats>({
    totalUsers: 10016,
    activeUsers: 9964,
    totalOrders: 33599,
    activeServices: 697,
    pendingDeposits: 1,
    totalRevenue: 75192201,
    totalTransactions: 3208
  });

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="w-3 h-3 text-green-600" />
    ) : (
      <TrendingDown className="w-3 h-3 text-red-600" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Quick summary of your platform performance</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm">
            <Eye className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Professional Summary Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Total Users Card */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500 rounded-full">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <button 
              onClick={() => navigate('/admin/users')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
            >
              View All
              <Eye className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total Users</p>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span>+12% this week</span>
              </div>
              <span className="text-gray-500">{stats.activeUsers.toLocaleString()} active</span>
            </div>
          </div>
        </div>

        {/* Active Users Card */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500 rounded-full">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <button 
              onClick={() => navigate('/admin/users')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
            >
              View All
              <Eye className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Active Users</p>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span>99.5% active rate</span>
              </div>
              <span className="text-gray-500">Updated 5m ago</span>
            </div>
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500 rounded-full">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <button 
              onClick={() => navigate('/admin/orders')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
            >
              View All
              <Eye className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total Orders</p>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span>+8% this month</span>
              </div>
              <span className="text-gray-500">142 pending</span>
            </div>
          </div>
        </div>

        {/* Active Services Card */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500 rounded-full">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <button 
              onClick={() => navigate('/admin/services')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
            >
              View All
              <Eye className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.activeServices.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Active Services</p>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span>All operational</span>
              </div>
              <span className="text-gray-500">12 categories</span>
            </div>
          </div>
        </div>

        {/* Pending Deposits Card */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-500 rounded-full">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <button 
              onClick={() => navigate('/admin/transactions')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
            >
              View All
              <Eye className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.pendingDeposits.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Pending Deposits</p>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-yellow-600">
                <Clock className="w-3 h-3" />
                <span>Requires approval</span>
              </div>
              <span className="text-gray-500">₦45,000 total</span>
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-600 rounded-full">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <button 
              onClick={() => navigate('/admin/transactions')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
            >
              View All
              <Eye className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">₦{(stats.totalRevenue / 1000000).toFixed(1)}M</p>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span>+18% this month</span>
              </div>
              <span className="text-gray-500">{stats.totalTransactions} transactions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">99.5%</p>
            <p className="text-sm text-gray-600">User Retention</p>
            <p className="text-xs text-green-600 mt-1">Excellent</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">96.8%</p>
            <p className="text-sm text-gray-600">Transaction Success</p>
            <p className="text-xs text-green-600 mt-1">Good</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">2.3s</p>
            <p className="text-sm text-gray-600">Avg Response Time</p>
            <p className="text-xs text-green-600 mt-1">Fast</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">4.8</p>
            <p className="text-sm text-gray-600">User Rating</p>
            <p className="text-xs text-green-600 mt-1">Excellent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDashboardPage;
