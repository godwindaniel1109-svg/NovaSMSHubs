import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  DollarSign, 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Zap, 
  Power, 
  Globe, 
  Server, 
  Database, 
  Wifi, 
  WifiOff,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Ban,
  UserPlus,
  UserMinus,
  MessageSquare,
  Bell,
  FileText,
  BarChart3,
  PieChart,
  Download,
  Upload,
  Trash2,
  Edit,
  Filter,
  Search,
  MoreVertical,
  Play,
  Pause,
  Square,
  Circle,
  Brain,
  Bot,
  Volume2,
  VolumeX,
  Info
} from 'lucide-react';

interface SystemStatus {
  cpu: number;
  memory: number;
  disk: number;
  uptime: string;
  activeUsers: number;
  serverStatus: 'online' | 'offline' | 'maintenance';
  lastBackup: string;
}

interface AIModel {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'training' | 'error' | 'disabled';
  accuracy: number;
  speed: number;
  notificationsEnabled: boolean;
  autoMode: boolean;
  lastActivity: string;
}

interface AINotification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  read: boolean;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  action: () => void;
  color: string;
  status: 'available' | 'unavailable' | 'warning';
}

interface SystemControl {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  currentValue: boolean | string | number;
  type: 'toggle' | 'input' | 'select' | 'action';
  category: 'system' | 'security' | 'performance' | 'backup';
  impact: 'high' | 'medium' | 'low';
  lastModified: string;
}

const EnhancedAdminDashboard: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    cpu: 45,
    memory: 62,
    disk: 78,
    uptime: '15 days 8 hours',
    activeUsers: 1247,
    serverStatus: 'online',
    lastBackup: '2 hours ago'
  });

  const [aiModels, setAIModels] = useState<AIModel[]>([
    {
      id: 'content_filter',
      name: 'Content Filter',
      status: 'active',
      accuracy: 94.5,
      speed: 120,
      notificationsEnabled: true,
      autoMode: true,
      lastActivity: 'Just now'
    },
    {
      id: 'fraud_detection',
      name: 'Fraud Detection',
      status: 'active',
      accuracy: 91.2,
      speed: 95,
      notificationsEnabled: true,
      autoMode: false,
      lastActivity: '2 mins ago'
    },
    {
      id: 'behavior_analysis',
      name: 'User Behavior Analysis',
      status: 'training',
      accuracy: 87.8,
      speed: 150,
      notificationsEnabled: true,
      autoMode: true,
      lastActivity: '5 mins ago'
    },
    {
      id: 'image_recognition',
      name: 'Image Recognition',
      status: 'disabled',
      accuracy: 89.3,
      speed: 200,
      notificationsEnabled: false,
      autoMode: false,
      lastActivity: '1 hour ago'
    }
  ]);

  const [aiNotifications, setAINotifications] = useState<AINotification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'AI Model Overperforming',
      description: 'Content Filter is processing 150% more requests than normal.',
      timestamp: '2 mins ago',
      severity: 'medium',
      read: false
    },
    {
      id: '2',
      type: 'error',
      title: 'AI Model Error',
      description: 'Fraud Detection encountered an error processing transaction.',
      timestamp: '5 mins ago',
      severity: 'high',
      read: false
    },
    {
      id: '3',
      type: 'success',
      title: 'AI Training Complete',
      description: 'User Behavior Analysis completed training with 2.3% improvement.',
      timestamp: '15 mins ago',
      severity: 'low',
      read: true
    }
  ]);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const [quickActions, setQuickActions] = useState<QuickAction[]>([
    {
      id: 'backup_now',
      title: 'Backup System',
      description: 'Create immediate system backup',
      icon: Upload,
      action: () => console.log('Backup initiated'),
      color: 'bg-blue-500',
      status: 'available'
    },
    {
      id: 'maintenance_mode',
      title: 'Maintenance Mode',
      description: 'Put system in maintenance',
      icon: Settings,
      action: () => console.log('Maintenance mode'),
      color: 'bg-yellow-500',
      status: 'warning'
    },
    {
      id: 'clear_cache',
      title: 'Clear Cache',
      description: 'Clear system cache',
      icon: RefreshCw,
      action: () => console.log('Cache cleared'),
      color: 'bg-green-500',
      status: 'available'
    },
    {
      id: 'emergency_stop',
      title: 'Emergency Stop',
      description: 'Stop all services immediately',
      icon: Power,
      action: () => console.log('Emergency stop'),
      color: 'bg-red-500',
      status: 'available'
    }
  ]);

  const [systemControls, setSystemControls] = useState<SystemControl[]>([
    // System Controls
    {
      id: 'user_registration',
      title: 'User Registration',
      description: 'Allow new user registrations',
      icon: UserPlus,
      currentValue: true,
      type: 'toggle',
      category: 'system',
      impact: 'high',
      lastModified: '1 hour ago'
    },
    {
      id: 'site_maintenance',
      title: 'Site Maintenance',
      description: 'Put site in maintenance mode',
      icon: Settings,
      currentValue: false,
      type: 'toggle',
      category: 'system',
      impact: 'high',
      lastModified: '6 hours ago'
    },
    {
      id: 'api_rate_limit',
      title: 'API Rate Limit',
      description: 'Requests per minute per user',
      icon: Zap,
      currentValue: 100,
      type: 'input',
      category: 'performance',
      impact: 'medium',
      lastModified: '2 days ago'
    },
    {
      id: 'session_timeout',
      title: 'Session Timeout',
      description: 'User session duration in minutes',
      icon: Clock,
      currentValue: 30,
      type: 'input',
      category: 'security',
      impact: 'medium',
      lastModified: '1 week ago'
    },
    {
      id: 'max_file_upload',
      title: 'Max File Upload',
      description: 'Maximum file size in MB',
      icon: Upload,
      currentValue: 10,
      type: 'input',
      category: 'system',
      impact: 'low',
      lastModified: '3 days ago'
    },
    {
      id: 'auto_backup',
      title: 'Auto Backup',
      description: 'Automatic backup schedule',
      icon: Database,
      currentValue: 'daily',
      type: 'select',
      category: 'backup',
      impact: 'high',
      lastModified: '12 hours ago'
    },
    {
      id: 'log_level',
      title: 'Log Level',
      description: 'System logging verbosity',
      icon: FileText,
      currentValue: 'info',
      type: 'select',
      category: 'system',
      impact: 'low',
      lastModified: '1 day ago'
    },
    {
      id: 'force_logout',
      title: 'Force Logout',
      description: 'Force all users to logout',
      icon: Ban,
      currentValue: false,
      type: 'action',
      category: 'security',
      impact: 'high',
      lastModified: 'Never'
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * 20) + 40,
        memory: Math.floor(Math.random() * 15) + 55,
        activeUsers: Math.floor(Math.random() * 100) + 1200
      }));

      // Simulate AI notifications
      if (Math.random() > 0.8) {
        const newNotification: AINotification = {
          id: Date.now().toString(),
          type: ['info', 'warning', 'error', 'success'][Math.floor(Math.random() * 4)] as any,
          title: ['AI Alert', 'Performance Update', 'Training Complete'][Math.floor(Math.random() * 3)],
          description: 'AI system generated a notification.',
          timestamp: 'Just now',
          severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
          read: false
        };
        setAINotifications(prev => [newNotification, ...prev.slice(0, 9)]);
        
        if (soundEnabled) {
          console.log('🔔 AI Notification Sound');
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  const toggleAIModel = (modelId: string) => {
    setAIModels(prev => prev.map(model => {
      if (model.id === modelId) {
        const newStatus = model.status === 'active' ? 'inactive' : 
                          model.status === 'inactive' ? 'active' : 
                          model.status === 'disabled' ? 'active' : 'disabled';
        return { ...model, status: newStatus };
      }
      return model;
    }));
  };

  const toggleAINotifications = (modelId: string) => {
    setAIModels(prev => prev.map(model => 
      model.id === modelId ? { ...model, notificationsEnabled: !model.notificationsEnabled } : model
    ));
  };

  const toggleAIAutoMode = (modelId: string) => {
    setAIModels(prev => prev.map(model => 
      model.id === modelId ? { ...model, autoMode: !model.autoMode } : model
    ));
  };

  const markNotificationAsRead = (notificationId: string) => {
    setAINotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const toggleSystemControl = (controlId: string) => {
    setSystemControls(prev => prev.map(control => 
      control.id === controlId 
        ? { ...control, currentValue: typeof control.currentValue === 'boolean' ? !control.currentValue : control.currentValue, lastModified: 'Just now' }
        : control
    ));
  };

  const updateSystemControl = (controlId: string, value: any) => {
    setSystemControls(prev => prev.map(control => 
      control.id === controlId 
        ? { ...control, currentValue: value, lastModified: 'Just now' }
        : control
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'offline': return 'text-red-600 bg-red-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'system': return 'text-blue-600 bg-blue-100';
      case 'security': return 'text-red-600 bg-red-100';
      case 'performance': return 'text-purple-600 bg-purple-100';
      case 'backup': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredControls = systemControls.filter(control => 
    control.title.toLowerCase().includes('') || // Add search functionality if needed
    control.description.toLowerCase().includes('')
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Shield className="w-8 h-8 mr-3" />
              Enhanced Admin Control
            </h1>
            <p className="text-gray-300 mt-2">
              Complete system control and monitoring dashboard
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{systemStatus.activeUsers.toLocaleString()}</div>
            <div className="text-gray-300 text-sm">Active Users</div>
            <div className="flex items-center justify-end mt-1">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                systemStatus.serverStatus === 'online' ? 'bg-green-500' :
                systemStatus.serverStatus === 'maintenance' ? 'bg-yellow-500' :
                'bg-red-500'
              }`} />
              <span className={`text-sm font-medium ${getStatusColor(systemStatus.serverStatus)}`}>
                {systemStatus.serverStatus.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">CPU Usage</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                systemStatus.cpu > 80 ? 'bg-red-500' :
                systemStatus.cpu > 60 ? 'bg-yellow-500' :
                'bg-green-500'
              }`} />
              <span className="text-sm text-gray-600">{systemStatus.cpu}%</span>
            </div>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
                systemStatus.cpu > 80 ? 'bg-red-500' :
                systemStatus.cpu > 60 ? 'bg-yellow-500' :
                'bg-green-500'
              }`}
              style={{ width: `${systemStatus.cpu}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Memory Usage</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                systemStatus.memory > 80 ? 'bg-red-500' :
                systemStatus.memory > 60 ? 'bg-yellow-500' :
                'bg-green-500'
              }`} />
              <span className="text-sm text-gray-600">{systemStatus.memory}%</span>
            </div>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
                systemStatus.memory > 80 ? 'bg-red-500' :
                systemStatus.memory > 60 ? 'bg-yellow-500' :
                'bg-green-500'
              }`}
              style={{ width: `${systemStatus.memory}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Disk Usage</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                systemStatus.disk > 80 ? 'bg-red-500' :
                systemStatus.disk > 60 ? 'bg-yellow-500' :
                'bg-green-500'
              }`} />
              <span className="text-sm text-gray-600">{systemStatus.disk}%</span>
            </div>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
                systemStatus.disk > 80 ? 'bg-red-500' :
                systemStatus.disk > 60 ? 'bg-yellow-500' :
                'bg-green-500'
              }`}
              style={{ width: `${systemStatus.disk}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">System Uptime</h3>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">{systemStatus.uptime}</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">99.9%</div>
          <div className="text-sm text-gray-500">Uptime SLA</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Zap className="w-4 h-4" />
            <span>Execute critical actions</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              disabled={action.status === 'unavailable'}
              className={`p-4 rounded-xl border-2 border-dashed transition-all duration-300 hover:scale-105 ${
                action.status === 'unavailable' 
                  ? 'border-gray-300 opacity-50 cursor-not-allowed' 
                  : `${action.color} border-transparent hover:opacity-80 cursor-pointer`
              }`}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  action.status === 'unavailable' ? 'bg-gray-200' : 'bg-white'
                }`}>
                  <action.icon className={`w-6 h-6 ${
                    action.status === 'unavailable' ? 'text-gray-400' : action.color.replace('bg-', 'text-')
                  }`} />
                </div>
                <h3 className={`font-semibold text-sm ${
                  action.status === 'unavailable' ? 'text-gray-500' : 'text-gray-900'
                }`}>{action.title}</h3>
                <p className={`text-xs text-center ${
                  action.status === 'unavailable' ? 'text-gray-400' : 'text-gray-600'
                }`}>{action.description}</p>
                {action.status === 'warning' && (
                  <div className="flex items-center justify-center space-x-1 text-yellow-600">
                    <AlertTriangle className="w-3 h-3" />
                    <span className="text-xs">Use with caution</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Overview Cards with View All */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Users Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Users</h3>
                <p className="text-sm text-gray-500">Total registered</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">1,247</div>
              <div className="text-xs text-green-600">+12%</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">Active now</div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All →
            </button>
          </div>
        </div>

        {/* Transactions Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Transactions</h3>
                <p className="text-sm text-gray-500">This month</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">$45.2K</div>
              <div className="text-xs text-green-600">+23%</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">142 today</div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All →
            </button>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Orders</h3>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">89</div>
              <div className="text-xs text-yellow-600">+5 new</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">Processing</div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All →
            </button>
          </div>
        </div>

        {/* Messages Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Messages</h3>
                <p className="text-sm text-gray-500">Unread</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">24</div>
              <div className="text-xs text-red-600">3 urgent</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">From users</div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All →
            </button>
          </div>
        </div>
      </div>

      {/* AI Control Center */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg p-6 border border-purple-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-purple-600" />
            AI Control Center
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  soundEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}
                title={soundEnabled ? 'Disable Sound' : 'Enable Sound'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`p-2 rounded-lg transition-colors ${
                  autoRefresh ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}
                title={autoRefresh ? 'Disable Auto Refresh' : 'Enable Auto Refresh'}
              >
                <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <div className="flex items-center space-x-2 text-sm text-purple-600">
              <div className={`w-2 h-2 rounded-full ${aiNotifications.filter(n => !n.read).length > 0 ? 'bg-red-500' : 'bg-green-500'}`} />
              <span>{aiNotifications.filter(n => !n.read).length} Unread AI Alerts</span>
            </div>
          </div>
        </div>

        {/* AI Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {aiModels.map((model) => (
            <div
              key={model.id}
              className="bg-white rounded-xl p-4 border border-purple-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    model.status === 'active' ? 'bg-green-100' :
                    model.status === 'training' ? 'bg-blue-100' :
                    model.status === 'disabled' ? 'bg-red-100' :
                    'bg-gray-100'
                  }`}>
                    <Bot className={`w-4 h-4 ${
                      model.status === 'active' ? 'text-green-600' :
                      model.status === 'training' ? 'text-blue-600' :
                      model.status === 'disabled' ? 'text-red-600' :
                      'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{model.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      model.status === 'active' ? 'text-green-600 bg-green-100' :
                      model.status === 'training' ? 'text-blue-600 bg-blue-100' :
                      model.status === 'disabled' ? 'text-red-600 bg-red-100' :
                      'text-gray-600 bg-gray-100'
                    }`}>
                      {model.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleAIModel(model.id)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    model.status === 'active' ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                    model.status === 'active' ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Accuracy</span>
                  <span className="font-medium text-gray-900">{model.accuracy}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Speed</span>
                  <span className="font-medium text-gray-900">{model.speed}ms</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Last Activity</span>
                  <span className="font-medium text-gray-900">{model.lastActivity}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Notifications</span>
                  <button
                    onClick={() => toggleAINotifications(model.id)}
                    className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                      model.notificationsEnabled ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-2 w-2 transform rounded-full bg-white transition-transform ${
                      model.notificationsEnabled ? 'translate-x-4' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Auto Mode</span>
                  <button
                    onClick={() => toggleAIAutoMode(model.id)}
                    className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                      model.autoMode ? 'bg-pink-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-2 w-2 transform rounded-full bg-white transition-transform ${
                      model.autoMode ? 'translate-x-4' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Notifications */}
        <div className="bg-white rounded-xl p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">AI Notifications</h3>
            <div className="flex items-center space-x-2">
              {aiNotifications.filter(n => !n.read).length > 0 && (
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                  {aiNotifications.filter(n => !n.read).length}
                </span>
              )}
              <Bell className="w-4 h-4 text-purple-400" />
            </div>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {aiNotifications.slice(0, 5).map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-purple-50 ${
                  !notification.read ? 'bg-purple-100 border-l-4 border-purple-500' : 'bg-gray-50'
                }`}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    notification.type === 'success' ? 'bg-green-100' :
                    notification.type === 'warning' ? 'bg-yellow-100' :
                    notification.type === 'error' ? 'bg-red-100' :
                    notification.type === 'critical' ? 'bg-red-100' :
                    'bg-blue-100'
                  }`}>
                    {notification.type === 'success' && <CheckCircle className="w-3 h-3 text-green-600" />}
                    {notification.type === 'warning' && <AlertTriangle className="w-3 h-3 text-yellow-600" />}
                    {notification.type === 'error' && <XCircle className="w-3 h-3 text-red-600" />}
                    {notification.type === 'critical' && <AlertTriangle className="w-3 h-3 text-red-700" />}
                    {notification.type === 'info' && <Info className="w-3 h-3 text-blue-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{notification.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        notification.severity === 'critical' ? 'text-red-700 bg-red-100' :
                        notification.severity === 'high' ? 'text-red-600 bg-red-100' :
                        notification.severity === 'medium' ? 'text-yellow-600 bg-yellow-100' :
                        'text-green-600 bg-green-100'
                      }`}>
                        {notification.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">{notification.timestamp}</span>
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-1"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">System Controls</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Settings className="w-4 h-4" />
              <span>Configure system behavior</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <RefreshCw className="w-4 h-4" />
              <span>Last backup: {systemStatus.lastBackup}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredControls.map((control) => (
            <div
              key={control.id}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(control.category)}`}>
                    <control.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{control.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(control.category)}`}>
                        {control.category.toUpperCase()}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getImpactColor(control.impact)}`}>
                        {control.impact.toUpperCase()} IMPACT
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Control Input */}
                <div className="flex items-center space-x-2">
                  {control.type === 'toggle' && (
                    <button
                      onClick={() => toggleSystemControl(control.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        control.currentValue ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        control.currentValue ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  )}
                  
                  {control.type === 'input' && (
                    <input
                      type="number"
                      value={control.currentValue as number}
                      onChange={(e) => updateSystemControl(control.id, parseInt(e.target.value))}
                      className="w-20 px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                  
                  {control.type === 'select' && (
                    <select
                      value={control.currentValue as string}
                      onChange={(e) => updateSystemControl(control.id, e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  )}
                  
                  {control.type === 'action' && (
                    <button
                      onClick={() => toggleSystemControl(control.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                    >
                      Execute
                    </button>
                  )}
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{control.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Modified: <span className="font-medium">{control.lastModified}</span></span>
                {control.type === 'toggle' && (
                  <span className={`font-medium ${
                    control.currentValue ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {control.currentValue ? 'ENABLED' : 'DISABLED'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent System Activity</h2>
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">System backup completed</span>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <p className="text-sm text-gray-600">All user data and system settings backed up successfully</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">High CPU usage detected</span>
                <span className="text-xs text-gray-500">15 minutes ago</span>
              </div>
              <p className="text-sm text-gray-600">CPU usage exceeded 80% threshold for 5 minutes</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <Users className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">New user registration spike</span>
                <span className="text-xs text-gray-500">1 hour ago</span>
              </div>
              <p className="text-sm text-gray-600">50 new users registered in the last hour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAdminDashboard;
