import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Users,
  CreditCard,
  MessageSquare,
  Bell,
  Settings,
  Menu,
  X,
  LogOut,
  PieChart,
  Zap,
  Crown,
  Brain,
  LayoutDashboard,
  Shield,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Power,
  Globe,
  Server,
  Database,
  Wifi,
  WifiOff,
  RefreshCw,
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
  Volume2,
  VolumeX,
  Info,
  Target,
  Sparkles,
  Network,
  Cloud,
  HardDrive,
  Monitor,
  Smartphone,
  DollarSign
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

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    cpu: 45,
    memory: 62,
    disk: 78,
    uptime: '15 days 8 hours',
    activeUsers: 1247,
    serverStatus: 'online',
    lastBackup: '2 hours ago'
  });

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
      icon: Shield,
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

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * 20) + 40,
        memory: Math.floor(Math.random() * 15) + 55,
        activeUsers: Math.floor(Math.random() * 100) + 1200
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Shield className="w-8 h-8 mr-3" />
              Admin Dashboard
            </h1>
            <p className="text-gray-300 mt-2">
              Complete system monitoring and control
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

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Users Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Users</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-600">15,847</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">+12%</div>
          <div className="text-sm text-gray-500">Active Users: 1,247</div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">Total registered</span>
            <button 
              onClick={() => navigate('/admin/users')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All →
            </button>
          </div>
        </div>

        {/* Transactions Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Transactions</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-gray-600">₦45,200,000</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">+23%</div>
          <div className="text-sm text-gray-500">142 today</div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">This month</span>
            <button 
              onClick={() => navigate('/admin/transactions')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All →
            </button>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-sm text-gray-600">89</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">+5</div>
          <div className="text-sm text-gray-500">New today</div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">Pending</span>
            <button 
              onClick={() => navigate('/admin/orders')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All →
            </button>
          </div>
        </div>

        {/* Messages Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-sm text-gray-600">24</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">3</div>
          <div className="text-sm text-gray-500">Urgent</div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">Unread</span>
            <button 
              onClick={() => navigate('/admin/messages')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Power className="w-4 h-4" />
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
              <Database className="w-4 h-4" />
              <span>Last backup: {systemStatus.lastBackup}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemControls.map((control) => (
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
                    <h3 className="font-bold text-gray-900">{control.title}</h3>
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
    </div>
  );
};

export default AdminDashboard;
