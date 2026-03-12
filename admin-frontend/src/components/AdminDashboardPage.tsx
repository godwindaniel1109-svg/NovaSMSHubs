import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  Bell, 
  TrendingUp, 
  Shield,
  DollarSign,
  Activity,
  UserPlus,
  UserMinus,
  Eye,
  Download,
  Calendar,
  Filter,
  Search,
  MoreVertical,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface RecentTransaction {
  id: string;
  user: string;
  amount: string;
  type: string;
  status: 'success' | 'pending' | 'failed';
  date: string;
  service: string;
}

interface SystemAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  time: string;
}

interface UserActivity {
  id: string;
  user: string;
  action: string;
  time: string;
  status: 'online' | 'offline';
}

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('7d');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const [stats, setStats] = useState({
    totalUsers: 10016,
    activeUsers: 9964,
    totalOrders: 33599,
    activeServices: 697,
    pendingDeposits: 1,
    totalRevenue: 75192201,
    totalTransactions: 3208,
    serverLoad: 45,
    systemUptime: 99.9,
    failedTransactions: 12,
    pendingTransactions: 8,
    monthlyRevenue: 8500000,
    newUsers: 156
  });

  // Advanced Analytics Data
  const [analytics, setAnalytics] = useState({
    revenueTrends: [
      { day: 'Mon', revenue: 45000, orders: 45 },
      { day: 'Tue', revenue: 52000, orders: 52 },
      { day: 'Wed', revenue: 48000, orders: 48 },
      { day: 'Thu', revenue: 61000, orders: 61 },
      { day: 'Fri', revenue: 58000, orders: 58 },
      { day: 'Sat', revenue: 72000, orders: 72 },
      { day: 'Sun', revenue: 68000, orders: 68 }
    ],
    servicePerformance: [
      { name: 'WhatsApp', revenue: 850000, orders: 850, growth: 12.5 },
      { name: 'Facebook', revenue: 620000, orders: 620, growth: 8.3 },
      { name: 'Instagram', revenue: 480000, orders: 480, growth: -2.1 },
      { name: 'Twitter', revenue: 320000, orders: 320, growth: 15.7 },
      { name: 'Telegram', revenue: 186789, orders: 151, growth: 22.3 }
    ],
    userActivity: [
      { date: '2024-03-04', newUsers: 12, activeUsers: 892, retention: 94.2 },
      { date: '2024-03-03', newUsers: 8, activeUsers: 880, retention: 93.8 },
      { date: '2024-03-02', newUsers: 15, activeUsers: 872, retention: 95.1 },
      { date: '2024-03-01', newUsers: 10, activeUsers: 865, retention: 92.7 }
    ],
    transactionHealth: {
      successRate: 96.5,
      failureRate: 3.5,
      avgTransactionValue: 718,
      processingTime: 2.3
    },
    agentPerformance: [
      { name: 'Agent A', orders: 156, revenue: 156000, approvalTime: 1.2, pending: 2 },
      { name: 'Agent B', orders: 142, revenue: 142000, approvalTime: 1.8, pending: 5 },
      { name: 'Agent C', orders: 128, revenue: 128000, approvalTime: 2.1, pending: 3 }
    ]
  });

  const [recentTransactions] = useState<RecentTransaction[]>([
    {
      id: '1',
      user: 'john.doe@email.com',
      amount: '₦500',
      type: 'Number Purchase',
      status: 'success',
      date: '2024-03-04 14:23:45',
      service: 'WhatsApp'
    },
    {
      id: '2',
      user: 'jane.smith@email.com',
      amount: '₦1000',
      type: 'Wallet Funding',
      status: 'success',
      date: '2024-03-04 14:15:32',
      service: 'Wallet'
    },
    {
      id: '3',
      user: 'mike.wilson@email.com',
      amount: '₦750',
      type: 'Number Purchase',
      status: 'pending',
      date: '2024-03-04 14:08:21',
      service: 'Facebook'
    },
    {
      id: '4',
      user: 'sarah.jones@email.com',
      amount: '₦300',
      type: 'Number Purchase',
      status: 'failed',
      date: '2024-03-04 13:55:18',
      service: 'Instagram'
    }
  ]);

  const [systemAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'warning',
      message: 'High server load detected on US servers',
      time: '5 minutes ago'
    },
    {
      id: '2',
      type: 'error',
      message: 'Payment gateway timeout for 3 transactions',
      time: '12 minutes ago'
    },
    {
      id: '3',
      type: 'info',
      message: 'System backup completed successfully',
      time: '1 hour ago'
    }
  ]);

  const [userActivities] = useState<UserActivity[]>([
    {
      id: '1',
      user: 'john.doe@email.com',
      action: 'Purchased WhatsApp number',
      time: '2 minutes ago',
      status: 'online'
    },
    {
      id: '2',
      user: 'jane.smith@email.com',
      action: 'Funded wallet with ₦1000',
      time: '8 minutes ago',
      status: 'online'
    },
    {
      id: '3',
      user: 'mike.wilson@email.com',
      action: 'Registered new account',
      time: '15 minutes ago',
      status: 'offline'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'info':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-nova-primary focus:border-transparent flex-1 sm:flex-none"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="px-3 py-2 sm:px-4 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors flex items-center gap-2 text-sm flex-1 sm:flex-none justify-center">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>

      {/* Admin Dashboard Hero Section */}
      <div className="bg-gradient-to-r from-nova-primary/10 to-nova-secondary/10 rounded-xl p-4 sm:p-6 lg:p-8 mb-6 border border-nova-primary/20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 lg:mb-4">
              Welcome to NovaSMSHub Admin Panel
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 lg:mb-6">
              Manage your SMS platform with powerful tools and real-time insights
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/admin/users')}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                Manage Users
              </button>
              <button 
                onClick={() => navigate('/admin/statistics')}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                View Analytics
              </button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <img 
              src="/images/smshubimg.png" 
              alt="NovaSMSHub Admin Dashboard"
              className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-xl shadow-xl object-cover border-4 border-white"
            />
          </div>
        </div>
      </div>

      {/* Advanced Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Revenue Trends */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">📈 Revenue Trends (7 Days)</h3>
            <button 
              onClick={() => navigate('/admin/statistics')}
              className="text-nova-primary hover:text-nova-secondary text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {analytics.revenueTrends.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-nova-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{day.day[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">₦{day.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{day.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    ₦{Math.round(day.revenue / day.orders).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">avg/order</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Weekly Total</span>
              <span className="text-lg font-bold text-green-600">
                ₦{analytics.revenueTrends.reduce((sum, day) => sum + day.revenue, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Service Performance */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">🛠 Service Performance</h3>
            <button 
              onClick={() => navigate('/admin/statistics')}
              className="text-nova-primary hover:text-nova-secondary text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {analytics.servicePerformance.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-nova-primary to-nova-secondary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{service.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{service.name}</p>
                    <p className="text-xs text-gray-500">{service.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    ₦{(service.revenue / 1000).toFixed(0)}K
                  </p>
                  <p className={`text-xs font-medium ${
                    service.growth > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {service.growth > 0 ? '+' : ''}{service.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Activity & Transaction Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* User Activity Insights */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">👥 User Activity Insights</h3>
            <button 
              onClick={() => navigate('/admin/users')}
              className="text-nova-primary hover:text-nova-secondary text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {analytics.userActivity.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{day.date}</p>
                  <p className="text-xs text-gray-500">
                    {day.newUsers} new • {day.activeUsers} active
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{day.retention}%</p>
                  <p className="text-xs text-gray-500">retention</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Retention</span>
              <span className="text-lg font-bold text-green-600">
                {(analytics.userActivity.reduce((sum, day) => sum + day.retention, 0) / analytics.userActivity.length).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Transaction Health */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">💳 Transaction Health</h3>
            <button 
              onClick={() => navigate('/admin/transactions')}
              className="text-nova-primary hover:text-nova-secondary text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{analytics.transactionHealth.successRate}%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{analytics.transactionHealth.failureRate}%</p>
              <p className="text-sm text-gray-600">Failure Rate</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">₦{analytics.transactionHealth.avgTransactionValue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Avg Transaction</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{analytics.transactionHealth.processingTime}s</p>
              <p className="text-sm text-gray-600">Processing Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Performance */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">👤 Agent Performance</h3>
          <button className="text-nova-primary hover:text-nova-secondary text-sm font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pending</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analytics.agentPerformance.map((agent, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{agent.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{agent.orders}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">₦{agent.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{agent.approvalTime}s</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{agent.pending}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(agent.orders / Math.max(...analytics.agentPerformance.map(a => a.orders))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{Math.round((agent.orders / Math.max(...analytics.agentPerformance.map(a => a.orders))) * 100)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-nova-primary rounded-full">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
            </div>
            <div className="flex items-center text-green-600 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12%
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600">Active: {stats.activeUsers.toLocaleString()}</span>
            <span className="text-green-600">+{stats.newUsers} new</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-nova-secondary rounded-full">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">₦{stats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
            </div>
            <div className="flex items-center text-green-600 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8%
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600">This month: ₦{stats.monthlyRevenue.toLocaleString()}</span>
            <span className="text-green-600">+15%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500 rounded-full">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTransactions.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Transactions</p>
              </div>
            </div>
            <div className="flex items-center text-green-600 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +24%
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600">Pending: {stats.pendingTransactions}</span>
            <span className="text-red-600">Failed: {stats.failedTransactions}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-nova-navy rounded-full">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.systemUptime}%</p>
                <p className="text-sm text-gray-600">System Uptime</p>
              </div>
            </div>
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircle className="w-4 h-4 mr-1" />
              Healthy
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600">Server Load: {stats.serverLoad}%</span>
            <span className="text-green-600">Normal</span>
          </div>
        </div>
      </div>

      {/* Charts and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => navigate('/admin/statistics')}
                className="text-nova-primary hover:text-nova-secondary text-sm font-medium"
              >
                View All
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Calendar className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Mock Chart Area */}
          <div className="h-64 bg-gradient-to-r from-nova-primary/5 to-nova-secondary/5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-nova-primary mx-auto mb-2" />
              <p className="text-gray-600">Revenue Chart Visualization</p>
              <p className="text-sm text-gray-500">Interactive chart component would be integrated here</p>
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => navigate('/admin/notifications')}
                className="text-nova-primary hover:text-nova-secondary text-sm font-medium"
              >
                View All
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <MoreVertical className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions and User Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <button 
              onClick={() => navigate('/admin/transactions')}
              className="text-nova-primary hover:text-nova-secondary text-sm font-medium"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <CreditCard className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{transaction.user}</p>
                    <p className="text-xs text-gray-500">{transaction.service} • {transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{transaction.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Activity */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">User Activity</h3>
            <button 
              onClick={() => navigate('/admin/users')}
              className="text-nova-primary hover:text-nova-secondary text-sm font-medium"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {userActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-xs text-gray-500">{activity.action}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  <span className="text-xs">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <button 
            onClick={() => navigate('/admin/users')}
            className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-nova-primary hover:bg-nova-primary/5 transition-all text-center"
          >
            <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-nova-primary mx-auto mb-2" />
            <p className="text-xs sm:text-sm font-medium text-gray-900">Add User</p>
          </button>
          <button 
            onClick={() => navigate('/admin/transactions')}
            className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-nova-primary hover:bg-nova-primary/5 transition-all text-center"
          >
            <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-nova-primary mx-auto mb-2" />
            <p className="text-xs sm:text-sm font-medium text-gray-900">Manual Transaction</p>
          </button>
          <button 
            onClick={() => navigate('/admin/notifications')}
            className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-nova-primary hover:bg-nova-primary/5 transition-all text-center"
          >
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-nova-primary mx-auto mb-2" />
            <p className="text-xs sm:text-sm font-medium text-gray-900">Send Notification</p>
          </button>
          <button 
            onClick={() => navigate('/admin/settings')}
            className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-nova-primary hover:bg-nova-primary/5 transition-all text-center"
          >
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-nova-primary mx-auto mb-2" />
            <p className="text-xs sm:text-sm font-medium text-gray-900">System Settings</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
