import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  Settings, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  Ban, 
  Crown,
  UserCheck,
  UserX,
  Activity,
  Globe,
  DollarSign,
  MessageSquare,
  Bell,
  Key,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search,
  Edit,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  FileText,
  Database,
  Server,
  Wifi,
  WifiOff
} from 'lucide-react';

interface AdminPower {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: 'user' | 'system' | 'communication' | 'security' | 'analytics';
  enabled: boolean;
  impact: 'high' | 'medium' | 'low';
  lastUsed?: string;
}

interface CoAdmin {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  status: 'active' | 'suspended' | 'pending';
  lastLogin: string;
  createdBy: string;
  createdAt: string;
  permissionsCount: number;
}

interface UserControl {
  id: string;
  action: string;
  description: string;
  target: 'all' | 'specific' | 'role';
  status: 'active' | 'inactive';
  impact: string;
  icon: React.ElementType;
}

const AdminPowerControl: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'powers' | 'coadmins' | 'controls'>('powers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPower, setSelectedPower] = useState<AdminPower | null>(null);

  // Admin Powers Configuration
  const [adminPowers, setAdminPowers] = useState<AdminPower[]>([
    // User Control Powers
    {
      id: 'user_suspend',
      title: 'Suspend Users',
      description: 'Temporarily or permanently suspend user accounts',
      icon: Ban,
      category: 'user',
      enabled: true,
      impact: 'high',
      lastUsed: '2 hours ago'
    },
    {
      id: 'user_delete',
      title: 'Delete Users',
      description: 'Permanently delete user accounts and data',
      icon: Trash2,
      category: 'user',
      enabled: true,
      impact: 'high',
      lastUsed: '1 day ago'
    },
    {
      id: 'user_edit',
      title: 'Edit User Profiles',
      description: 'Modify user information and settings',
      icon: Edit,
      category: 'user',
      enabled: true,
      impact: 'medium',
      lastUsed: '5 mins ago'
    },
    {
      id: 'user_impersonate',
      title: 'Impersonate Users',
      description: 'Login as any user to troubleshoot issues',
      icon: UserCheck,
      category: 'user',
      enabled: false,
      impact: 'high',
      lastUsed: 'Never'
    },
    {
      id: 'user_mass_action',
      title: 'Mass User Actions',
      description: 'Perform actions on multiple users at once',
      icon: Users,
      category: 'user',
      enabled: true,
      impact: 'high',
      lastUsed: '3 hours ago'
    },

    // System Control Powers
    {
      id: 'system_maintenance',
      title: 'System Maintenance',
      description: 'Put system in maintenance mode',
      icon: Settings,
      category: 'system',
      enabled: true,
      impact: 'high',
      lastUsed: '1 week ago'
    },
    {
      id: 'system_backup',
      title: 'System Backup',
      description: 'Create and restore system backups',
      icon: Database,
      category: 'system',
      enabled: true,
      impact: 'medium',
      lastUsed: '6 hours ago'
    },
    {
      id: 'system_logs',
      title: 'Access System Logs',
      description: 'View and download system logs',
      icon: FileText,
      category: 'system',
      enabled: true,
      impact: 'medium',
      lastUsed: '30 mins ago'
    },
    {
      id: 'system_config',
      title: 'System Configuration',
      description: 'Modify system settings and parameters',
      icon: Server,
      category: 'system',
      enabled: true,
      impact: 'high',
      lastUsed: '2 hours ago'
    },

    // Communication Control
    {
      id: 'comm_broadcast',
      title: 'Broadcast Messages',
      description: 'Send messages to all users',
      icon: MessageSquare,
      category: 'communication',
      enabled: true,
      impact: 'medium',
      lastUsed: '1 hour ago'
    },
    {
      id: 'comm_monitor',
      title: 'Monitor Chats',
      description: 'View all user conversations',
      icon: Eye,
      category: 'communication',
      enabled: true,
      impact: 'high',
      lastUsed: '10 mins ago'
    },
    {
      id: 'comm_control',
      title: 'Control Communication',
      description: 'Restrict or enable user communications',
      icon: Lock,
      category: 'communication',
      enabled: false,
      impact: 'high',
      lastUsed: 'Never'
    },

    // Security Powers
    {
      id: 'security_ban',
      title: 'IP & Device Bans',
      description: 'Ban IPs, devices, or regions',
      icon: Shield,
      category: 'security',
      enabled: true,
      impact: 'high',
      lastUsed: '4 hours ago'
    },
    {
      id: 'security_monitor',
      title: 'Security Monitoring',
      description: 'View security events and alerts',
      icon: AlertTriangle,
      category: 'security',
      enabled: true,
      impact: 'medium',
      lastUsed: '15 mins ago'
    },
    {
      id: 'security_access',
      title: 'Access Control',
      description: 'Manage who can access what',
      icon: Key,
      category: 'security',
      enabled: true,
      impact: 'high',
      lastUsed: '1 hour ago'
    },

    // Analytics Powers
    {
      id: 'analytics_full',
      title: 'Full Analytics Access',
      description: 'Complete access to all analytics data',
      icon: BarChart3,
      category: 'analytics',
      enabled: true,
      impact: 'low',
      lastUsed: '5 mins ago'
    },
    {
      id: 'analytics_export',
      title: 'Data Export',
      description: 'Export any system data',
      icon: Download,
      category: 'analytics',
      enabled: true,
      impact: 'medium',
      lastUsed: '3 hours ago'
    }
  ]);

  // Co-Admins Configuration
  const [coAdmins, setCoAdmins] = useState<CoAdmin[]>([
    {
      id: '1',
      name: 'John Admin',
      email: 'john@novasmshub.com',
      role: 'Super Admin',
      permissions: ['user_control', 'system_control', 'communication', 'security', 'analytics'],
      status: 'active',
      lastLogin: '2 hours ago',
      createdBy: 'Super Admin',
      createdAt: '2024-01-15',
      permissionsCount: 15
    },
    {
      id: '2',
      name: 'Sarah Manager',
      email: 'sarah@novasmshub.com',
      role: 'Support Admin',
      permissions: ['user_control', 'communication'],
      status: 'active',
      lastLogin: '1 day ago',
      createdBy: 'Super Admin',
      createdAt: '2024-02-01',
      permissionsCount: 8
    },
    {
      id: '3',
      name: 'Mike Support',
      email: 'mike@novasmshub.com',
      role: 'Support Admin',
      permissions: ['user_control', 'communication'],
      status: 'suspended',
      lastLogin: '3 days ago',
      createdBy: 'John Admin',
      createdAt: '2024-02-15',
      permissionsCount: 6
    },
    {
      id: '4',
      name: 'Lisa Analyst',
      email: 'lisa@novasmshub.com',
      role: 'Analytics Admin',
      permissions: ['analytics', 'user_view'],
      status: 'active',
      lastLogin: '6 hours ago',
      createdBy: 'Super Admin',
      createdAt: '2024-03-01',
      permissionsCount: 5
    }
  ]);

  // User Controls Configuration
  const [userControls, setUserControls] = useState<UserControl[]>([
    {
      id: 'login_control',
      action: 'Login Control',
      description: 'Control who can login to the platform',
      target: 'all',
      status: 'active',
      impact: 'Complete platform access control',
      icon: Lock
    },
    {
      id: 'feature_access',
      action: 'Feature Access',
      description: 'Enable/disable platform features',
      target: 'all',
      status: 'active',
      impact: 'Users can only access enabled features',
      icon: Eye
    },
    {
      id: 'content_control',
      action: 'Content Control',
      description: 'Control what users can see and do',
      target: 'role',
      status: 'active',
      impact: 'Role-based content restrictions',
      icon: Filter
    },
    {
      id: 'communication_control',
      action: 'Communication Control',
      description: 'Control user communication channels',
      target: 'all',
      status: 'active',
      impact: 'Can disable chat, support, notifications',
      icon: MessageSquare
    },
    {
      id: 'payment_control',
      action: 'Payment Control',
      description: 'Control payment processing and wallet access',
      target: 'all',
      status: 'active',
      impact: 'Can freeze payments and wallets',
      icon: DollarSign
    },
    {
      id: 'data_control',
      action: 'Data Control',
      description: 'Control user data access and export',
      target: 'specific',
      status: 'active',
      impact: 'Can restrict data access per user',
      icon: Database
    }
  ]);

  const togglePower = (powerId: string) => {
    setAdminPowers(prev => prev.map(power => 
      power.id === powerId 
        ? { ...power, enabled: !power.enabled, lastUsed: 'Just now' }
        : power
    ));
  };

  const toggleCoAdminStatus = (adminId: string) => {
    setCoAdmins(prev => prev.map(admin => 
      admin.id === adminId 
        ? { ...admin, status: admin.status === 'active' ? 'suspended' : 'active' as const }
        : admin
    ));
  };

  const toggleUserControl = (controlId: string) => {
    setUserControls(prev => prev.map(control => 
      control.id === controlId 
        ? { ...control, status: control.status === 'active' ? 'inactive' : 'active' as const }
        : control
    ));
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredPowers = adminPowers.filter(power => 
    power.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    power.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCoAdmins = coAdmins.filter(admin => 
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPowerStats = () => {
    const enabled = adminPowers.filter(p => p.enabled).length;
    const total = adminPowers.length;
    const highImpact = adminPowers.filter(p => p.enabled && p.impact === 'high').length;
    return { enabled, total, highImpact };
  };

  const stats = getPowerStats();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Crown className="w-8 h-8 mr-3" />
              Admin Power Control
            </h1>
            <p className="text-red-100 mt-2">
              Complete control over platform, users, and co-admins
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{stats.enabled}/{stats.total}</div>
            <div className="text-red-100 text-sm">Powers Active</div>
            <div className="text-red-200 text-xs mt-1">{stats.highImpact} High Impact</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('powers')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'powers' 
                ? 'text-red-600 border-b-2 border-red-600 bg-red-50' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Admin Powers</span>
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {stats.enabled}
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('coadmins')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'coadmins' 
                ? 'text-red-600 border-b-2 border-red-600 bg-red-50' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Co-Admins</span>
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {coAdmins.filter(a => a.status === 'active').length}
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('controls')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'controls' 
                ? 'text-red-600 border-b-2 border-red-600 bg-red-50' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>User Controls</span>
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {userControls.filter(c => c.status === 'active').length}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Admin Powers Tab */}
      {activeTab === 'powers' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Admin Superpowers</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search powers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPowers.map((power) => (
              <div
                key={power.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      power.enabled ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      <power.icon className={`w-6 h-6 ${power.enabled ? 'text-red-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{power.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getImpactColor(power.impact)}`}>
                        {power.impact.toUpperCase()} IMPACT
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => togglePower(power.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      power.enabled ? 'bg-red-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      power.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{power.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Category: <span className="font-medium capitalize">{power.category}</span></span>
                  <span>Last used: <span className="font-medium">{power.lastUsed}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Co-Admins Tab */}
      {activeTab === 'coadmins' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Co-Administrator Management</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search admins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Admin</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Permissions</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Last Login</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Created By</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoAdmins.map((admin) => (
                  <tr key={admin.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 font-bold text-sm">
                            {admin.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{admin.name}</div>
                          <div className="text-sm text-gray-500">{admin.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        admin.role === 'Super Admin' ? 'bg-red-100 text-red-700' :
                        admin.role === 'Support Admin' ? 'bg-blue-100 text-blue-700' :
                        admin.role === 'Analytics Admin' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {admin.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {admin.permissions.slice(0, 3).map((perm, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {perm}
                          </span>
                        ))}
                        {admin.permissions.length > 3 && (
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            +{admin.permissions.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleCoAdminStatus(admin.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${getStatusColor(admin.status)}`}
                      >
                        {admin.status}
                      </button>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{admin.lastLogin}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{admin.createdBy}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User Controls Tab */}
      {activeTab === 'controls' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">User Access Controls</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search controls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userControls.map((control) => (
              <div
                key={control.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      control.status === 'active' ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      <control.icon className={`w-6 h-6 ${control.status === 'active' ? 'text-red-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{control.action}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        control.target === 'all' ? 'bg-red-100 text-red-700' :
                        control.target === 'role' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {control.target.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleUserControl(control.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      control.status === 'active' ? 'bg-red-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      control.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{control.description}</p>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600">
                    <strong>Impact:</strong> {control.impact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPowerControl;
