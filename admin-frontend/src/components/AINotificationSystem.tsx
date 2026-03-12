import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info, 
  Bell, 
  Activity, 
  Zap, 
  Shield, 
  Eye, 
  EyeOff, 
  Power, 
  Settings, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Filter, 
  Search,
  MoreVertical,
  Volume2,
  VolumeX,
  Pause,
  Play,
  Square,
  AlertCircle,
  Database,
  Globe,
  Users,
  MessageSquare,
  FileText,
  BarChart3,
  Target,
  Bot,
  Cpu,
  Wifi,
  WifiOff,
  Ban,
  Unlock
} from 'lucide-react';

interface AINotification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  aiModel: string;
  action: string;
  read: boolean;
  category: 'validation' | 'training' | 'performance' | 'security' | 'system';
}

interface AIStatus {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'training' | 'error' | 'disabled';
  accuracy: number;
  speed: number;
  lastActivity: string;
  notificationsEnabled: boolean;
  autoMode: boolean;
  category: string;
  icon: React.ElementType;
}

interface AIActivity {
  id: string;
  timestamp: string;
  model: string;
  action: string;
  result: string;
  confidence: number;
  processingTime: number;
  status: 'success' | 'warning' | 'error';
}

const AINotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<AINotification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'AI Model Overperforming',
      description: 'Content Filter AI is processing 150% more requests than normal. This might indicate unusual activity.',
      timestamp: '2 mins ago',
      severity: 'medium',
      aiModel: 'Content Filter',
      action: 'Investigate Activity',
      read: false,
      category: 'performance'
    },
    {
      id: '2',
      type: 'error',
      title: 'AI Model Error',
      description: 'Fraud Detection AI encountered an error while processing transaction #12345. Manual review required.',
      timestamp: '5 mins ago',
      severity: 'high',
      aiModel: 'Fraud Detection',
      action: 'Review Transaction',
      read: false,
      category: 'validation'
    },
    {
      id: '3',
      type: 'info',
      title: 'AI Model Training Complete',
      description: 'User Behavior Analysis AI completed training with 2.3% accuracy improvement.',
      timestamp: '15 mins ago',
      severity: 'low',
      aiModel: 'User Behavior Analysis',
      action: 'View Report',
      read: true,
      category: 'training'
    },
    {
      id: '4',
      type: 'success',
      title: 'AI Performance Optimal',
      description: 'All AI models are performing within normal parameters. System health: 98.5%',
      timestamp: '30 mins ago',
      severity: 'low',
      aiModel: 'System Monitor',
      action: 'View Dashboard',
      read: true,
      category: 'system'
    },
    {
      id: '5',
      type: 'critical',
      title: 'AI Model Disabled',
      description: 'Image Recognition AI automatically disabled due to excessive false positives.',
      timestamp: '1 hour ago',
      severity: 'critical',
      aiModel: 'Image Recognition',
      action: 'Enable Model',
      read: false,
      category: 'security'
    }
  ]);

  const [aiStatuses, setAIStatuses] = useState<AIStatus[]>([
    {
      id: 'content_filter',
      name: 'Content Filter',
      status: 'active',
      accuracy: 94.5,
      speed: 120,
      lastActivity: 'Just now',
      notificationsEnabled: true,
      autoMode: true,
      category: 'Content',
      icon: Shield
    },
    {
      id: 'fraud_detection',
      name: 'Fraud Detection',
      status: 'active',
      accuracy: 91.2,
      speed: 95,
      lastActivity: '2 mins ago',
      notificationsEnabled: true,
      autoMode: false,
      category: 'Security',
      icon: AlertTriangle
    },
    {
      id: 'behavior_analysis',
      name: 'User Behavior Analysis',
      status: 'training',
      accuracy: 87.8,
      speed: 150,
      lastActivity: '5 mins ago',
      notificationsEnabled: true,
      autoMode: true,
      category: 'Analytics',
      icon: Activity
    },
    {
      id: 'image_recognition',
      name: 'Image Recognition',
      status: 'disabled',
      accuracy: 89.3,
      speed: 200,
      lastActivity: '1 hour ago',
      notificationsEnabled: false,
      autoMode: false,
      category: 'Security',
      icon: Eye
    }
  ]);

  const [aiActivities, setAIActivities] = useState<AIActivity[]>([
    {
      id: '1',
      timestamp: 'Just now',
      model: 'Content Filter',
      action: 'Content Validation',
      result: 'Approved',
      confidence: 96.2,
      processingTime: 115,
      status: 'success'
    },
    {
      id: '2',
      timestamp: '30 secs ago',
      model: 'Fraud Detection',
      action: 'Transaction Analysis',
      result: 'Flagged',
      confidence: 78.5,
      processingTime: 89,
      status: 'warning'
    },
    {
      id: '3',
      timestamp: '1 min ago',
      model: 'User Behavior Analysis',
      action: 'Pattern Detection',
      result: 'Normal',
      confidence: 92.1,
      processingTime: 142,
      status: 'success'
    },
    {
      id: '4',
      timestamp: '2 mins ago',
      model: 'Image Recognition',
      action: 'Document Validation',
      result: 'Failed',
      confidence: 45.3,
      processingTime: 210,
      status: 'error'
    }
  ]);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate new AI activity
      const newActivity: AIActivity = {
        id: Date.now().toString(),
        timestamp: 'Just now',
        model: aiStatuses[Math.floor(Math.random() * aiStatuses.length)].name,
        action: ['Content Validation', 'Transaction Analysis', 'Pattern Detection', 'Document Validation'][Math.floor(Math.random() * 4)],
        result: ['Approved', 'Flagged', 'Normal', 'Failed'][Math.floor(Math.random() * 4)],
        confidence: Math.random() * 40 + 60,
        processingTime: Math.floor(Math.random() * 150) + 50,
        status: ['success', 'warning', 'error'][Math.floor(Math.random() * 3)] as any
      };

      setAIActivities(prev => [newActivity, ...prev.slice(0, 9)]);

      // Occasionally add new notification
      if (Math.random() > 0.8) {
        const newNotification: AINotification = {
          id: Date.now().toString(),
          type: ['info', 'warning', 'error', 'success'][Math.floor(Math.random() * 4)] as any,
          title: ['AI Model Alert', 'Performance Update', 'Training Complete', 'System Health'][Math.floor(Math.random() * 4)],
          description: 'AI system generated a new notification requiring attention.',
          timestamp: 'Just now',
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
          aiModel: aiStatuses[Math.floor(Math.random() * aiStatuses.length)].name,
          action: 'Review',
          read: false,
          category: ['validation', 'training', 'performance', 'security', 'system'][Math.floor(Math.random() * 5)] as any
        };

        setNotifications(prev => [newNotification, ...prev.slice(0, 19)]);
        
        // Play sound if enabled
        if (soundEnabled) {
          // In real app, play notification sound
          console.log('🔔 AI Notification Sound');
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh, soundEnabled, aiStatuses]);

  const toggleAIModel = (modelId: string) => {
    setAIStatuses(prev => prev.map(model => {
      if (model.id === modelId) {
        const newStatus = model.status === 'active' ? 'inactive' : 
                          model.status === 'inactive' ? 'active' : 
                          model.status === 'disabled' ? 'active' : 'disabled';
        return { ...model, status: newStatus };
      }
      return model;
    }));
  };

  const toggleNotifications = (modelId: string) => {
    setAIStatuses(prev => prev.map(model => 
      model.id === modelId ? { ...model, notificationsEnabled: !model.notificationsEnabled } : model
    ));
  };

  const toggleAutoMode = (modelId: string) => {
    setAIStatuses(prev => prev.map(model => 
      model.id === modelId ? { ...model, autoMode: !model.autoMode } : model
    ));
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'training': return 'text-blue-600 bg-blue-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'disabled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-100 border-red-200';
      case 'critical': return 'text-red-700 bg-red-100 border-red-300';
      case 'info': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-700 bg-red-100';
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const activeModels = aiStatuses.filter(m => m.status === 'active').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Brain className="w-8 h-8 mr-3" />
              AI Notification & Control Center
            </h1>
            <p className="text-pink-100 mt-2">
              Real-time AI monitoring, notifications, and complete control
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{unreadCount}</div>
            <div className="text-pink-100 text-sm">Unread Notifications</div>
            <div className="text-pink-200 text-xs mt-1">{activeModels} Active Models</div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between">
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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearAllNotifications}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear All
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className={`w-2 h-2 rounded-full ${unreadCount > 0 ? 'bg-red-500' : 'bg-green-500'}`} />
              <span>{unreadCount > 0 ? `${unreadCount} Unread` : 'All Read'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Models Control */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">AI Models Control</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Bot className="w-4 h-4" />
            <span>Complete AI control at your fingertips</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {aiStatuses.map((model) => (
            <div
              key={model.id}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(model.status)}`}>
                    <model.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{model.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(model.status)}`}>
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

              <div className="space-y-2">
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

              <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Notifications</span>
                  <button
                    onClick={() => toggleNotifications(model.id)}
                    className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                      model.notificationsEnabled ? 'bg-blue-600' : 'bg-gray-300'
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
                    onClick={() => toggleAutoMode(model.id)}
                    className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                      model.autoMode ? 'bg-purple-600' : 'bg-gray-300'
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
      </div>

      {/* Notifications & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Notifications */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">AI Notifications</h2>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
                <Bell className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No AI notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                        {notification.type === 'success' && <CheckCircle className="w-4 h-4" />}
                        {notification.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
                        {notification.type === 'error' && <XCircle className="w-4 h-4" />}
                        {notification.type === 'critical' && <AlertCircle className="w-4 h-4" />}
                        {notification.type === 'info' && <Info className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">{notification.title}</h3>
                            <p className="text-xs text-gray-600 mt-1">{notification.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getSeverityColor(notification.severity)}`}>
                                {notification.severity.toUpperCase()}
                              </span>
                              <span className="text-xs text-gray-500">{notification.aiModel}</span>
                              <span className="text-xs text-gray-500">{notification.timestamp}</span>
                            </div>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AI Activity Feed */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">AI Activity Feed</h2>
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-500">Live</span>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            <div className="divide-y divide-gray-100">
              {aiActivities.map((activity) => (
                <div key={activity.id} className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activity.status === 'success' ? 'bg-green-100' :
                      activity.status === 'warning' ? 'bg-yellow-100' :
                      'bg-red-100'
                    }`}>
                      {activity.status === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                      {activity.status === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                      {activity.status === 'error' && <XCircle className="w-4 h-4 text-red-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{activity.model}</h3>
                          <p className="text-xs text-gray-600 mt-1">{activity.action}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className={`text-xs font-medium ${
                              activity.result === 'Approved' || activity.result === 'Normal' ? 'text-green-600' :
                              activity.result === 'Flagged' ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {activity.result}
                            </span>
                            <span className="text-xs text-gray-500">Confidence: {activity.confidence.toFixed(1)}%</span>
                            <span className="text-xs text-gray-500">{activity.processingTime}ms</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AINotificationSystem;
