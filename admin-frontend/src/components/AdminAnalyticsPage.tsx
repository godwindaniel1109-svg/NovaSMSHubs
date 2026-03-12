import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Activity,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUp,
  ArrowDown,
  MoreHorizontal
} from 'lucide-react';

interface AnalyticsData {
  revenue: number[];
  users: number[];
  orders: number[];
  labels: string[];
}

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ElementType;
  color: string;
}

const AdminAnalyticsPage: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    revenue: [12000, 15000, 18000, 14000, 20000, 22000, 25000],
    users: [450, 520, 480, 590, 650, 720, 810],
    orders: [23, 31, 28, 35, 42, 38, 45],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  });

  const [metrics, setMetrics] = useState<MetricCard[]>([
    {
      title: 'Total Revenue',
      value: '₦126,000',
      change: 12.5,
      changeType: 'increase',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Active Users',
      value: '4,220',
      change: 8.2,
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Orders',
      value: '242',
      change: -3.1,
      changeType: 'decrease',
      icon: ShoppingCart,
      color: 'bg-purple-500'
    },
    {
      title: 'Conversion Rate',
      value: '3.8%',
      change: 0.5,
      changeType: 'increase',
      icon: Activity,
      color: 'bg-orange-500'
    }
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [isLoading, setIsLoading] = useState(false);

  const periods = [
    { value: '24hours', label: 'Last 24 Hours' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' }
  ];

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleExport = () => {
    // Simulate export functionality
    console.log('Exporting analytics data...');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Deep insights into your business performance</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
          >
            {periods.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
          
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = metric.changeType === 'increase';
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${metric.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isPositive ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-xs text-gray-500 mt-2">
                  vs last period
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Revenue Overview</h2>
              <p className="text-sm text-gray-600 mt-1">Daily revenue trends</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData.revenue.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-nova-primary to-nova-secondary rounded-t-lg transition-all duration-500 hover:opacity-80"
                  style={{ height: `${(value / Math.max(...analyticsData.revenue)) * 100}%` }}
                />
                <span className="text-xs text-gray-500 mt-2">{analyticsData.labels[index]}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600">Total: ₦126,000</span>
            <span className="text-green-600 font-medium">+12.5%</span>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">User Growth</h2>
              <p className="text-sm text-gray-600 mt-1">New user acquisition</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData.users.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500 hover:opacity-80"
                  style={{ height: `${(value / Math.max(...analyticsData.users)) * 100}%` }}
                />
                <span className="text-xs text-gray-500 mt-2">{analyticsData.labels[index]}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600">Total: 4,220 users</span>
            <span className="text-green-600 font-medium">+8.2%</span>
          </div>
        </div>
      </div>

      {/* Orders & Activity Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <p className="text-sm text-gray-600 mt-1">Latest transactions and user actions</p>
            </div>
            <button className="text-nova-primary hover:text-nova-secondary font-medium text-sm">
              View All
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { user: 'John Doe', action: 'Number Purchase', amount: '₦2,265', status: 'Completed', time: '2 mins ago' },
                { user: 'Jane Smith', action: 'Wallet Funding', amount: '₦5,000', status: 'Pending', time: '5 mins ago' },
                { user: 'Mike Wilson', action: 'Number Purchase', amount: '₦1,800', status: 'Completed', time: '12 mins ago' },
                { user: 'Sarah Jones', action: 'Wallet Funding', amount: '₦10,000', status: 'Completed', time: '1 hour ago' },
                { user: 'David Brown', action: 'Number Purchase', amount: '₦3,500', status: 'Failed', time: '2 hours ago' }
              ].map((activity, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-nova-primary/10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-nova-primary font-semibold text-xs">
                          {activity.user.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{activity.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {activity.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {activity.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      activity.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">85%</span>
          </div>
          <h3 className="font-semibold text-blue-900 mb-2">Server Uptime</h3>
          <p className="text-sm text-blue-700">Excellent performance this month</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <PieChart className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-green-900">92%</span>
          </div>
          <h3 className="font-semibold text-green-900 mb-2">Success Rate</h3>
          <p className="text-sm text-green-700">High transaction completion rate</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-900">4.8</span>
          </div>
          <h3 className="font-semibold text-purple-900 mb-2">User Satisfaction</h3>
          <p className="text-sm text-purple-700">Based on recent feedback</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
