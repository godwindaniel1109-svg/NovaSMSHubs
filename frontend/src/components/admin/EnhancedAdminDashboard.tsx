import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  CreditCard,
  FileText,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  Shield,
  Activity,
  DollarSign,
  AlertTriangle,
  Eye,
  ArrowUp,
  ArrowDown,
  Zap,
  Globe,
  Clock,
  Star,
  Award,
  Target,
  BarChart3,
  ArrowRight,
  UserPlus,
  TrendingDown,
  Calendar,
  Filter,
  Crown
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useNotify } from '../NotificationSystem';
import WalletBalance from '../WalletBalance';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalOrders: number;
  activeServices: number;
  pendingDeposits: number;
  totalRevenue: number;
  totalTransactions: number;
  newUsers: number;
  monthlyRevenue: number;
  pendingTransactions: number;
  failedTransactions: number;
  systemUptime: string;
  serverLoad: number;
  growthRate: number;
  conversionRate: number;
  avgOrderValue: number;
}

interface RecentActivity {
  id: string;
  type: 'order' | 'payment' | 'user' | 'system' | 'achievement';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'pending' | 'error' | 'milestone';
  value?: number;
  trend?: 'up' | 'down';
}

const EnhancedAdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 1247,
    activeUsers: 892,
    totalOrders: 3456,
    activeServices: 12,
    pendingDeposits: 23,
    totalRevenue: 2456789,
    totalTransactions: 5678,
    newUsers: 45,
    monthlyRevenue: 234567,
    pendingTransactions: 12,
    failedTransactions: 3,
    systemUptime: '99.9%',
    serverLoad: 45,
    growthRate: 12.5,
    conversionRate: 68.4,
    avgOrderValue: 710
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'achievement',
      title: '🏆 Milestone Reached',
      description: '1,000+ active users milestone achieved',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'milestone',
      value: 1000
    },
    {
      id: '2',
      type: 'order',
      title: '📈 Record Order Volume',
      description: 'New daily record: 156 orders processed',
      timestamp: '2024-01-15T09:45:00Z',
      status: 'success',
      trend: 'up'
    },
    {
      id: '3',
      type: 'payment',
      title: '💰 High-Value Transaction',
      description: '₦50,000 wallet funding completed',
      timestamp: '2024-01-15T08:30:00Z',
      status: 'success',
      value: 50000
    },
    {
      id: '4',
      type: 'user',
      title: '👥 Enterprise Client Onboarded',
      description: 'Acme Corporation joined as enterprise client',
      timestamp: '2024-01-15T07:15:00Z',
      status: 'success'
    },
    {
      id: '5',
      type: 'system',
      title: '⚡ System Performance Alert',
      description: 'Server load exceeded 80% threshold',
      timestamp: '2024-01-15T06:00:00Z',
      status: 'error',
      trend: 'down'
    },
    {
      id: '6',
      type: 'achievement',
      title: '🌍 Global Expansion',
      description: 'Launched services in 3 new countries',
      timestamp: '2024-01-14T16:45:00Z',
      status: 'milestone',
      value: 3
    },
    {
      id: '7',
      type: 'payment',
      title: '💎 Premium Subscription',
      description: 'User upgraded to enterprise plan',
      timestamp: '2024-01-14T14:20:00Z',
      status: 'success',
      value: 25000
    },
    {
      id: '8',
      type: 'order',
      title: '🚀 Order Processing Speed',
      description: 'Average order time reduced to 2.3 minutes',
      timestamp: '2024-01-14T12:00:00Z',
      status: 'success',
      trend: 'up'
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');
  const location = useLocation();
  const navigate = useNavigate();
  const notify = useNotify();

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        setRecentActivity([
          {
            id: '1',
            type: 'achievement',
            title: 'Milestone Reached',
            description: '1,000+ active users milestone achieved',
            timestamp: '2024-01-15T10:30:00Z',
            status: 'milestone',
            value: 1000
          },
          {
            id: '2',
            type: 'order',
            title: 'Record Order Volume',
            description: 'New daily record: 156 orders processed',
            timestamp: '2024-01-15T09:45:00Z',
            status: 'success',
            trend: 'up'
          },
          {
            id: '3',
            type: 'payment',
            title: 'High-Value Transaction',
            description: '₦50,000 wallet funding completed',
            timestamp: '2024-01-15T08:30:00Z',
            status: 'success',
            value: 50000
          },
          {
            id: '4',
            type: 'user',
            title: 'Enterprise Client Onboarded',
            description: 'Acme Corporation joined as enterprise client',
            timestamp: '2024-01-15T07:15:00Z',
            status: 'success'
          },
          {
            id: '5',
            type: 'system',
            title: 'System Performance Alert',
            description: 'Server load exceeded 80% threshold',
            timestamp: '2024-01-15T06:00:00Z',
            status: 'error',
            trend: 'down'
          }
        ]);
      } catch (error) {
        notify.error('Dashboard Error', 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [notify]);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/admin',
      badge: null,
      description: 'Executive Overview'
    },
    {
      title: 'Users',
      icon: <Users className="w-5 h-5" />,
      path: '/admin/users',
      badge: stats.newUsers.toString(),
      description: 'Customer Management'
    },
    {
      title: 'Orders',
      icon: <ShoppingCart className="w-5 h-5" />,
      path: '/admin/orders',
      badge: stats.pendingDeposits.toString(),
      description: 'Order Processing'
    },
    {
      title: 'Payments',
      icon: <CreditCard className="w-5 h-5" />,
      path: '/admin/payment-proofs',
      badge: stats.pendingTransactions.toString(),
      description: 'Payment Validation'
    },
    {
      title: 'Services',
      icon: <Package className="w-5 h-5" />,
      path: '/admin/services',
      badge: stats.activeServices.toString(),
      description: 'Service Management'
    },
    {
      title: 'Reports',
      icon: <BarChart3 className="w-5 h-5" />,
      path: '/admin/reports',
      description: 'Analytics & Insights'
    },
    {
      title: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/admin/settings',
      description: 'System Configuration'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getTrendIcon = (trend?: 'up' | 'down') => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <ArrowDown className="w-4 h-4 text-red-500" />;
    return null;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="w-5 h-5 text-blue-600" />;
      case 'payment':
        return <CreditCard className="w-5 h-5 text-green-600" />;
      case 'user':
        return <Users className="w-5 h-5 text-purple-600" />;
      case 'system':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'achievement':
        return <Award className="w-5 h-5 text-yellow-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const ExecutiveMetricCard: React.FC<{
    title: string;
    value: string | number;
    change?: number;
    changeType?: 'percentage' | 'currency';
    icon: React.ReactNode;
    color: string;
    trend?: 'up' | 'down';
    description?: string;
    viewAllLink?: string;
  }> = ({ title, value, change, changeType = 'percentage', icon, color, trend, description, viewAllLink }) => (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl hover:scale-105 transition-all duration-500 group relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-nova-primary/5 to-nova-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            {description && (
              <p className="text-sm text-gray-300">{description}</p>
            )}
          </div>
          <div className={`p-3 rounded-xl ${color} bg-opacity-20 group-hover:bg-opacity-30 transition-all shadow-lg`}>
            {icon}
          </div>
        </div>
        
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">
              {typeof value === 'number' ? formatNumber(value) : value}
            </div>
            {change !== undefined && (
              <div className={`flex items-center text-sm font-medium ${
                change > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {trend && getTrendIcon(trend)}
                <span className="ml-2">
                  {change > 0 ? '+' : ''}{changeType === 'percentage' ? `${change}%` : formatCurrency(change)}
                </span>
              </div>
            )}
          </div>
          
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-xl hover:bg-white/20 transition-all border border-white/20"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  const ActivityFeed: React.FC<{ activities: RecentActivity[] }> = ({ activities }) => (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Recent Activity</h3>
        <Link
          to="/admin/activity"
          className="text-sm text-nova-primary hover:text-nova-secondary font-medium flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20"
        >
          View All Activity
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
      
      <div className="space-y-4">
        {activities.slice(0, 6).map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all border border-white/10">
            <div className={`p-2 rounded-full ${
              activity.status === 'success' ? 'bg-green-500/20' :
              activity.status === 'error' ? 'bg-red-500/20' :
              activity.status === 'milestone' ? 'bg-yellow-500/20' :
              'bg-blue-500/20'
            }`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">{activity.title}</p>
                  <p className="text-sm text-gray-300">{activity.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {activity.value && (
                    <span className="text-lg font-bold text-nova-primary">
                      {activity.type === 'payment' ? formatCurrency(activity.value) : formatNumber(activity.value)}
                    </span>
                  )}
                  {activity.trend && getTrendIcon(activity.trend)}
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <Clock className="w-4 h-4" />
                {new Date(activity.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-4">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-nova-primary border-t-transparent shadow-2xl"></div>
              <div className="text-left">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-nova-primary to-nova-secondary bg-clip-text text-transparent mb-2">
                  NovaSMSHub
                </h1>
                <p className="text-xl text-gray-300 font-medium">Executive Dashboard</p>
                <p className="text-sm text-gray-500">Initializing CEO Control Center...</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-2 h-2 bg-nova-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-nova-primary rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-nova-primary rounded-full animate-pulse delay-150"></div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Shield className="w-8 h-8 text-nova-primary mx-auto mb-2" />
              <p className="text-xs text-gray-400">Security</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Activity className="w-8 h-8 text-nova-primary mx-auto mb-2" />
              <p className="text-xs text-gray-400">Analytics</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Crown className="w-8 h-8 text-nova-primary mx-auto mb-2" />
              <p className="text-xs text-gray-400">Executive</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-nova-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-nova-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10">
      {/* Sidebar */}
      <aside className="w-80 bg-white/10 backdrop-blur-md border-r border-white/20 fixed inset-y-0 left-0 z-50 hidden lg:block">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-nova-primary to-nova-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-nova-primary to-nova-secondary bg-clip-text text-transparent">
                  NovaSMSHub
                </h1>
                <p className="text-xs text-gray-400 font-medium">EXECUTIVE</p>
              </div>
            </div>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-nova-primary to-nova-secondary text-black shadow-lg'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  {item.icon}
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                  <ChevronDown className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                JD
              </div>
              <div>
                <p className="font-medium text-gray-900">John Doe</p>
                <p className="text-sm text-gray-600">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-80 min-h-screen">
        {/* Top Header */}
        <header className="bg-white/5 backdrop-blur-md shadow-xl border-b border-white/20 sticky top-0 z-40">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-white">Executive Dashboard</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Globe className="w-4 h-4" />
                <span>Global Operations</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Time Range Selector */}
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                <Calendar className="w-4 h-4 text-gray-300" />
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-transparent border-none text-sm font-medium text-white focus:outline-none"
                >
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                </select>
              </div>
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users, orders, transactions..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-nova-primary focus:border-transparent text-white placeholder-gray-400"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 rounded-xl hover:bg-white/10 transition-colors">
                <Bell className="w-5 h-5 text-gray-300" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              
              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    JD
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-300" />
                </button>
                
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 py-2 z-50">
                    <Link
                      to="/admin/profile"
                      className="flex items-center px-4 py-2 text-gray-300 hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {/* KPI Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <ExecutiveMetricCard
              title="Total Revenue"
              value={formatCurrency(stats.totalRevenue)}
              change={stats.growthRate}
              changeType="percentage"
              icon={<DollarSign className="w-8 h-8 text-green-600" />}
              color="bg-green-500"
              trend="up"
              description="Total revenue across all services"
              viewAllLink="/admin/reports?tab=revenue"
            />
            
            <ExecutiveMetricCard
              title="Active Users"
              value={formatNumber(stats.activeUsers)}
              change={stats.newUsers}
              changeType="percentage"
              icon={<Users className="w-8 h-8 text-blue-600" />}
              color="bg-blue-500"
              trend="up"
              description="Currently active customers"
              viewAllLink="/admin/users?status=active"
            />
            
            <ExecutiveMetricCard
              title="Conversion Rate"
              value={`${stats.conversionRate}%`}
              change={3.2}
              changeType="percentage"
              icon={<Target className="w-8 h-8 text-indigo-600" />}
              color="bg-indigo-500"
              trend="up"
              description="Visitor to customer conversion"
              viewAllLink="/admin/reports?tab=conversion"
            />
            
            <ExecutiveMetricCard
              title="Avg Order Value"
              value={formatCurrency(stats.avgOrderValue)}
              change={8.7}
              changeType="percentage"
              icon={<TrendingUp className="w-8 h-8 text-purple-600" />}
              color="bg-purple-500"
              trend="up"
              description="Average order value"
              viewAllLink="/admin/reports?tab=aov"
            />
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <ExecutiveMetricCard
              title="Total Orders"
              value={formatNumber(stats.totalOrders)}
              change={12.4}
              changeType="percentage"
              icon={<ShoppingCart className="w-8 h-8 text-orange-600" />}
              color="bg-orange-500"
              trend="up"
              description="Orders processed this period"
              viewAllLink="/admin/orders"
            />
            
            <ExecutiveMetricCard
              title="Pending Actions"
              value={formatNumber(stats.pendingDeposits + stats.pendingTransactions)}
              change={-12.3}
              changeType="percentage"
              icon={<Clock className="w-8 h-8 text-yellow-600" />}
              color="bg-yellow-500"
              trend="down"
              description="Pending deposits and transactions"
              viewAllLink="/admin/payment-proofs?status=pending"
            />
            
            <ExecutiveMetricCard
              title="System Health"
              value={`${stats.systemUptime} Uptime`}
              change={0.1}
              changeType="percentage"
              icon={<Shield className="w-8 h-8 text-green-600" />}
              color="bg-green-500"
              trend="up"
              description="System performance and availability"
              viewAllLink="/admin/system-health"
            />
            
            <ExecutiveMetricCard
              title="Performance Score"
              value={`${stats.serverLoad}%`}
              change={-5.2}
              changeType="percentage"
              icon={<Activity className="w-8 h-8 text-blue-600" />}
              color="bg-blue-500"
              trend="down"
              description="Server load and performance"
              viewAllLink="/admin/performance"
            />
          </div>

          {/* Wallet Balance Component */}
          <WalletBalance 
            showDetails={true} 
            showStatus={true}
            className="mb-8"
          />

          {/* Recent Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ActivityFeed activities={recentActivity} />
            </div>
            
            <div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6">
                <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    to="/admin/users"
                    className="flex items-center p-3 rounded-xl hover:bg-white/10 transition-colors text-white"
                  >
                    <Users className="w-5 h-5 mr-3" />
                    <span>Manage Users</span>
                  </Link>
                  <Link
                    to="/admin/payment-proofs"
                    className="flex items-center p-3 rounded-xl hover:bg-white/10 transition-colors text-white"
                  >
                    <CreditCard className="w-5 h-5 mr-3" />
                    <span>Validate Payments</span>
                  </Link>
                  <Link
                    to="/admin/orders"
                    className="flex items-center p-3 rounded-xl hover:bg-white/10 transition-colors text-white"
                  >
                    <ShoppingCart className="w-5 h-5 mr-3" />
                    <span>View Orders</span>
                  </Link>
                  <Link
                    to="/admin/reports"
                    className="flex items-center p-3 rounded-xl hover:bg-white/10 transition-colors text-white"
                  >
                    <BarChart3 className="w-5 h-5 mr-3" />
                    <span>Generate Reports</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      </div>
    </div>
  );
};

export default EnhancedAdminDashboard;
