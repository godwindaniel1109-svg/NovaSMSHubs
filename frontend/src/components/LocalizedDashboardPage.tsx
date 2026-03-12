import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Globe, 
  CheckCircle, 
  TrendingUp, 
  Clock, 
  Shield, 
  Star,
  Zap,
  Target,
  Award,
  Activity,
  Users,
  DollarSign,
  Calendar,
  Filter,
  Search,
  Bell,
  Settings,
  ChevronRight,
  Sparkles,
  MapPin,
  CreditCard,
  BarChart3
} from 'lucide-react';
import { useLocalization } from '../contexts/LocalizationContext';

interface RecentActivity {
  id: string;
  type: 'purchase' | 'funding' | 'verification';
  title: string;
  description: string;
  amount?: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  progress: number;
  total: number;
  unlocked: boolean;
  color: string;
}

const LocalizedDashboardPage: React.FC = () => {
  const { country, config, formatCurrency, formatDate, formatTime } = useLocalization();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Localized user stats
  const [userStats, setUserStats] = useState({
    totalNumbers: 5,
    totalSpent: 12500,
    walletBalance: 8500,
    pendingOrders: 2,
    verificationSuccess: 98,
    memberSince: '2024-01-15'
  });

  // Localized recent activities
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'purchase',
      title: `${config.features.popularCountries[0]} Number Purchase`,
      description: `Number: +1234567890`,
      amount: formatCurrency(2265),
      status: 'completed',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'funding',
      title: 'Wallet Funding',
      description: `Funding via ${config.features.localPaymentMethods[0]}`,
      amount: formatCurrency(5000),
      status: 'completed',
      timestamp: '5 hours ago'
    },
    {
      id: '3',
      type: 'verification',
      title: 'Instagram Verification',
      description: 'Successfully verified account',
      status: 'completed',
      timestamp: '1 day ago'
    },
    {
      id: '4',
      type: 'purchase',
      title: 'USA Number Purchase',
      description: 'Number: +1987654321',
      amount: formatCurrency(3500),
      status: 'pending',
      timestamp: '2 days ago'
    }
  ]);

  // Localized achievements
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Purchase',
      description: 'Complete your first number purchase',
      icon: Star,
      progress: 1,
      total: 1,
      unlocked: true,
      color: 'bg-yellow-500'
    },
    {
      id: '2',
      title: 'Verification Master',
      description: 'Complete 50 successful verifications',
      icon: Shield,
      progress: 32,
      total: 50,
      unlocked: false,
      color: 'bg-blue-500'
    },
    {
      id: '3',
      title: 'Big Spender',
      description: `Spend ${formatCurrency(10000)} total`,
      icon: DollarSign,
      progress: 12500,
      total: 10000,
      unlocked: true,
      color: 'bg-green-500'
    },
    {
      id: '4',
      title: 'Loyal Customer',
      description: 'Be a member for 30 days',
      icon: Calendar,
      progress: 25,
      total: 30,
      unlocked: false,
      color: 'bg-purple-500'
    }
  ]);

  const filters = [
    { value: 'all', label: 'All Activities' },
    { value: 'purchase', label: 'Purchases' },
    { value: 'funding', label: 'Wallet Funding' },
    { value: 'verification', label: 'Verifications' }
  ];

  // Localized quick actions
  const getLocalizedQuickActions = () => [
    {
      title: config.content.buyNumber,
      description: `Get virtual numbers from ${config.features.popularCountries.join(', ')}`,
      icon: Globe,
      route: '/buy-number',
      color: 'from-nova-primary to-nova-secondary'
    },
    {
      title: 'Fund Wallet',
      description: `Add funds using ${config.features.localPaymentMethods[0]}`,
      icon: DollarSign,
      route: '/fund-wallet',
      color: 'from-green-500 to-green-600'
    },
    {
      title: config.content.support,
      description: `Chat with our ${config.features.supportHours.toLowerCase()}`,
      icon: Users,
      route: '/chat',
      color: 'from-blue-500 to-purple-600'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <Globe className="w-5 h-5" />;
      case 'funding':
        return <DollarSign className="w-5 h-5" />;
      case 'verification':
        return <Shield className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredActivities = recentActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || activity.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Country-specific Welcome Header */}
      <div className="bg-gradient-to-r from-nova-primary via-nova-secondary to-nova-accent rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-bold">
                  Welcome back! 🎉
                </h1>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{config.name}</span>
                </div>
              </div>
              <p className="text-white/90 text-lg mb-4">
                {config.content.tagline}
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">Member since {formatDate(new Date(userStats.memberSince))}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span className="text-sm">Level 2 Verified User</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">Current time: {formatTime(new Date())} ({config.features.timezone})</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{userStats.verificationSuccess}%</div>
                  <div className="text-sm text-white/80">Success Rate</div>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-xs">+2.3%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Localized Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-nova-primary/10 rounded-xl flex items-center justify-center">
              <Globe className="w-7 h-7 text-nova-primary" />
            </div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12%</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Active Numbers</p>
            <p className="text-3xl font-bold text-gray-900">{userStats.totalNumbers}</p>
            <p className="text-xs text-gray-500 mt-2">Across {config.features.popularCountries.length} countries</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-green-600" />
            </div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+8%</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Wallet Balance</p>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(userStats.walletBalance)}</p>
            <p className="text-xs text-gray-500 mt-2">Ready for purchases</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <Target className="w-7 h-7 text-purple-600" />
            </div>
            <div className="flex items-center text-blue-600 text-sm font-medium">
              <Clock className="w-4 h-4 mr-1" />
              <span>{userStats.pendingOrders}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Pending Orders</p>
            <p className="text-3xl font-bold text-gray-900">{userStats.pendingOrders}</p>
            <p className="text-xs text-gray-500 mt-2">Processing now</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <Award className="w-7 h-7 text-blue-600" />
            </div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <Zap className="w-4 h-4 mr-1" />
              <span>Active</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Spent</p>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(userStats.totalSpent)}</p>
            <p className="text-xs text-gray-500 mt-2">Lifetime value</p>
          </div>
        </div>
      </div>

      {/* Localized Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {getLocalizedQuickActions().map((action, index) => (
          <Link 
            key={index}
            to={action.route}
            className={`group bg-gradient-to-r ${action.color} text-black rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{action.title}</h3>
              <action.icon className="w-8 h-8 text-black/70" />
            </div>
            <p className="text-sm opacity-80 mb-4">{action.description}</p>
            <div className="flex items-center font-medium">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity with Localized Content */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <p className="text-sm text-gray-600 mt-1">Your latest transactions and verifications</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent text-sm"
                />
              </div>
              
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent text-sm"
              >
                {filters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === 'purchase' ? 'bg-nova-primary/10' :
                    activity.type === 'funding' ? 'bg-green-100' :
                    'bg-blue-100'
                  }`}>
                    <div className={
                      activity.type === 'purchase' ? 'text-nova-primary' :
                      activity.type === 'funding' ? 'text-green-600' :
                      'text-blue-600'
                    }>
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{activity.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{activity.timestamp}</span>
                      {activity.amount && (
                        <span className="font-semibold text-gray-900">{activity.amount}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalizedDashboardPage;
