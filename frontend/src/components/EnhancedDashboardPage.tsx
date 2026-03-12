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
  Sparkles
} from 'lucide-react';

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

const EnhancedDashboardPage: React.FC = () => {
  const [userStats, setUserStats] = useState({
    totalNumbers: 5,
    totalSpent: 12500,
    walletBalance: 8500,
    pendingOrders: 2,
    verificationSuccess: 98,
    memberSince: '2024-01-15'
  });

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'purchase',
      title: 'WhatsApp Number Purchase',
      description: 'Number: +1234567890',
      amount: '₦2,265',
      status: 'completed',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'funding',
      title: 'Wallet Funding',
      description: 'Funding via Paystack',
      amount: '₦5,000',
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
      amount: '₦3,500',
      status: 'pending',
      timestamp: '2 days ago'
    }
  ]);

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
      description: 'Spend ₦10,000 total',
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

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { value: 'all', label: 'All Activities' },
    { value: 'purchase', label: 'Purchases' },
    { value: 'funding', label: 'Wallet Funding' },
    { value: 'verification', label: 'Verifications' }
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
      {/* Enhanced Welcome Section */}
      <div className="bg-gradient-to-r from-nova-primary via-nova-secondary to-nova-accent rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Welcome back! 🎉
              </h1>
              <p className="text-white/90 text-lg mb-4">
                Your verification journey continues with NovaSMSHub
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">Member since {userStats.memberSince}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span className="text-sm">Level 2 Verified User</span>
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

      {/* Enhanced Stats Grid */}
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
            <p className="text-xs text-gray-500 mt-2">Across 3 countries</p>
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
            <p className="text-3xl font-bold text-gray-900">₦{userStats.walletBalance.toLocaleString()}</p>
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
            <p className="text-3xl font-bold text-gray-900">₦{userStats.totalSpent.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Lifetime value</p>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
            <p className="text-sm text-gray-600 mt-1">Track your progress and unlock rewards</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-nova-primary font-medium">
            <Sparkles className="w-4 h-4" />
            <span>2 of 4 Unlocked</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            const progressPercentage = (achievement.progress / achievement.total) * 100;
            
            return (
              <div key={achievement.id} className={`relative rounded-xl p-4 border-2 transition-all duration-300 ${
                achievement.unlocked 
                  ? 'border-nova-primary bg-nova-primary/5' 
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 ${achievement.color} rounded-lg flex items-center justify-center ${
                    achievement.unlocked ? '' : 'opacity-50'
                  }`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  {achievement.unlocked && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
                
                <h3 className={`font-semibold text-sm mb-1 ${
                  achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {achievement.title}
                </h3>
                
                <p className="text-xs text-gray-600 mb-3">{achievement.description}</p>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className={achievement.unlocked ? 'text-gray-700' : 'text-gray-500'}>
                      Progress
                    </span>
                    <span className={achievement.unlocked ? 'text-gray-700' : 'text-gray-500'}>
                      {achievement.progress}/{achievement.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        achievement.unlocked ? 'bg-nova-primary' : 'bg-gray-400'
                      }`}
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
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
        
        <div className="p-4 border-t border-gray-100">
          <Link 
            to="/transaction-history"
            className="flex items-center justify-center text-nova-primary hover:text-nova-secondary font-medium text-sm"
          >
            <span>View All Activity</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          to="/buy-number"
          className="group bg-gradient-to-r from-nova-primary to-nova-secondary text-black rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Buy Number</h3>
            <Globe className="w-8 h-8 text-black/70" />
          </div>
          <p className="text-sm opacity-80 mb-4">Get virtual numbers from 500+ countries</p>
          <div className="flex items-center font-medium">
            <span>Explore Now</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
        
        <Link 
          to="/fund-wallet"
          className="group bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Fund Wallet</h3>
            <DollarSign className="w-8 h-8 text-white/70" />
          </div>
          <p className="text-sm opacity-80 mb-4">Add funds for instant purchases</p>
          <div className="flex items-center font-medium">
            <span>Add Funds</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
        
        <Link 
          to="/chat"
          className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Get Support</h3>
            <Users className="w-8 h-8 text-white/70" />
          </div>
          <p className="text-sm opacity-80 mb-4">Chat with our support team</p>
          <div className="flex items-center font-medium">
            <span>Start Chat</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EnhancedDashboardPage;
