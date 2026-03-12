import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Database, 
  Globe, 
  Mail, 
  Lock, 
  Key,
  Save,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Info,
  Smartphone,
  CreditCard,
  FileText,
  Users,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Download,
  Upload,
  Zap,
  Clock,
  TrendingUp,
  BarChart3,
  UserPlus
} from 'lucide-react';

interface SystemSetting {
  id: string;
  category: string;
  name: string;
  description: string;
  value: string | boolean | number;
  type: 'text' | 'boolean' | 'number' | 'select' | 'textarea';
  options?: string[];
  icon: React.ReactNode;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

const AdminSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // System Settings
  const [systemSettings, setSystemSettings] = useState<SystemSetting[]>([
    {
      id: 'site_name',
      category: 'general',
      name: 'Site Name',
      description: 'The name of your SMS platform',
      value: 'NovaSMSHub',
      type: 'text',
      icon: <Globe className="w-4 h-4" />
    },
    {
      id: 'site_description',
      category: 'general',
      name: 'Site Description',
      description: 'A brief description of your platform',
      value: 'Professional SMS services for businesses and individuals',
      type: 'textarea',
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: 'maintenance_mode',
      category: 'general',
      name: 'Maintenance Mode',
      description: 'Put the site in maintenance mode',
      value: false,
      type: 'boolean',
      icon: <Settings className="w-4 h-4" />
    },
    {
      id: 'max_users',
      category: 'limits',
      name: 'Maximum Users',
      description: 'Maximum number of users allowed',
      value: 10000,
      type: 'number',
      icon: <Users className="w-4 h-4" />
    },
    {
      id: 'max_numbers_per_user',
      category: 'limits',
      name: 'Max Numbers Per User',
      description: 'Maximum virtual numbers a user can have',
      value: 10,
      type: 'number',
      icon: <Smartphone className="w-4 h-4" />
    },
    {
      id: 'daily_transaction_limit',
      category: 'limits',
      name: 'Daily Transaction Limit',
      description: 'Maximum transactions per user per day',
      value: 50,
      type: 'number',
      icon: <CreditCard className="w-4 h-4" />
    },
    {
      id: 'email_notifications',
      category: 'notifications',
      name: 'Email Notifications',
      description: 'Send email notifications for important events',
      value: true,
      type: 'boolean',
      icon: <Mail className="w-4 h-4" />
    },
    {
      id: 'sms_alerts',
      category: 'notifications',
      name: 'SMS Alerts',
      description: 'Send SMS alerts for system issues',
      value: true,
      type: 'boolean',
      icon: <Smartphone className="w-4 h-4" />
    },
    {
      id: 'auto_backup',
      category: 'backup',
      name: 'Automatic Backup',
      description: 'Enable automatic daily backups',
      value: true,
      type: 'boolean',
      icon: <Database className="w-4 h-4" />
    },
    {
      id: 'backup_frequency',
      category: 'backup',
      name: 'Backup Frequency',
      description: 'How often to perform automatic backups',
      value: 'daily',
      type: 'select',
      options: ['hourly', 'daily', 'weekly', 'monthly'],
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: 'session_timeout',
      category: 'security',
      name: 'Session Timeout (minutes)',
      description: 'Auto-logout after inactivity',
      value: 30,
      type: 'number',
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: 'require_2fa',
      category: 'security',
      name: 'Require 2FA',
      description: 'Require two-factor authentication for admins',
      value: true,
      type: 'boolean',
      icon: <Shield className="w-4 h-4" />
    },
    {
      id: 'password_complexity',
      category: 'security',
      name: 'Password Complexity',
      description: 'Minimum password requirements',
      value: 'medium',
      type: 'select',
      options: ['low', 'medium', 'high'],
      icon: <Lock className="w-4 h-4" />
    }
  ]);

  // Admin users
  const [adminUsers] = useState<AdminUser[]>([
    {
      id: '1',
      name: 'Super Admin',
      email: 'admin@novasmshubs.com',
      role: 'Super Admin',
      lastLogin: '2024-03-04 14:30:00',
      status: 'active'
    },
    {
      id: '2',
      name: 'System Admin',
      email: 'system@novasmshubs.com',
      role: 'System Admin',
      lastLogin: '2024-03-04 13:45:00',
      status: 'active'
    },
    {
      id: '3',
      name: 'Support Admin',
      email: 'support@novasmshubs.com',
      role: 'Support Admin',
      lastLogin: '2024-03-04 12:20:00',
      status: 'active'
    }
  ]);

  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSettingChange = (id: string, value: any) => {
    setSystemSettings(prev => 
      prev.map(setting => 
        setting.id === id ? { ...setting, value } : setting
      )
    );
  };

  const handleSave = async () => {
    setIsLoading(true);
    setSaveStatus('saving');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setSaveStatus('success');
    
    // Reset status after 3 seconds
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const getSettingsByCategory = (category: string) => {
    return systemSettings.filter(setting => setting.category === category);
  };

  const renderSettingInput = (setting: SystemSetting) => {
    switch (setting.type) {
      case 'boolean':
        return (
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={setting.value as boolean}
              onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
              className="w-5 h-5 text-nova-primary rounded focus:ring-nova-primary focus:ring-offset-0"
            />
            <span className="ml-3 text-sm text-gray-700">
              {setting.value ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={setting.value as number}
            onChange={(e) => handleSettingChange(setting.id, parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
          />
        );
      
      case 'select':
        return (
          <select
            value={setting.value as string}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
          >
            {setting.options?.map(option => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            value={setting.value as string}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent resize-none"
          />
        );
      
      default:
        return (
          <input
            type="text"
            value={setting.value as string}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-600">Manage system configuration and preferences</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Save Status Alert */}
      {saveStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          <span>Failed to save settings. Please try again.</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'general', name: 'General', icon: <Settings className="w-4 h-4" /> },
              { id: 'limits', name: 'Limits', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'notifications', name: 'Notifications', icon: <Bell className="w-4 h-4" /> },
              { id: 'backup', name: 'Backup', icon: <Database className="w-4 h-4" /> },
              { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" /> },
              { id: 'admins', name: 'Admin Users', icon: <User className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-nova-primary text-nova-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getSettingsByCategory('general').map((setting) => (
                  <div key={setting.id} className="space-y-2">
                    <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      {setting.icon}
                      <span>{setting.name}</span>
                    </label>
                    {renderSettingInput(setting)}
                    <p className="text-xs text-gray-500">{setting.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Limits Settings */}
          {activeTab === 'limits' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Limits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getSettingsByCategory('limits').map((setting) => (
                  <div key={setting.id} className="space-y-2">
                    <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      {setting.icon}
                      <span>{setting.name}</span>
                    </label>
                    {renderSettingInput(setting)}
                    <p className="text-xs text-gray-500">{setting.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getSettingsByCategory('notifications').map((setting) => (
                  <div key={setting.id} className="space-y-2">
                    <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      {setting.icon}
                      <span>{setting.name}</span>
                    </label>
                    {renderSettingInput(setting)}
                    <p className="text-xs text-gray-500">{setting.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Backup Settings */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup & Recovery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getSettingsByCategory('backup').map((setting) => (
                  <div key={setting.id} className="space-y-2">
                    <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      {setting.icon}
                      <span>{setting.name}</span>
                    </label>
                    {renderSettingInput(setting)}
                    <p className="text-xs text-gray-500">{setting.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Backup Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Backup Actions</h4>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Latest Backup
                  </button>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Create Backup Now
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Restore Backup
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getSettingsByCategory('security').map((setting) => (
                  <div key={setting.id} className="space-y-2">
                    <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      {setting.icon}
                      <span>{setting.name}</span>
                    </label>
                    {renderSettingInput(setting)}
                    <p className="text-xs text-gray-500">{setting.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Security Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Security Actions</h4>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    Regenerate API Keys
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Clear All Sessions
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Security Logs
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Admin Users Management */}
          {activeTab === 'admins' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Admin Users</h3>
                <button className="px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Add Admin User
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Admin User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {adminUsers.map((admin) => (
                      <tr key={admin.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-nova-primary rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-xs">
                                {admin.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{admin.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{admin.email}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                            {admin.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{admin.lastLogin}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            admin.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {admin.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                              <Edit className="w-4 h-4 text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                              <Trash2 className="w-4 h-4 text-gray-400" />
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
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Info className="w-4 h-4" />
              <span>Version</span>
            </div>
            <p className="font-medium text-gray-900">v2.1.0</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Database className="w-4 h-4" />
              <span>Database</span>
            </div>
            <p className="font-medium text-gray-900">PostgreSQL 14.2</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Zap className="w-4 h-4" />
              <span>Node.js</span>
            </div>
            <p className="font-medium text-gray-900">v18.17.0</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>Uptime</span>
            </div>
            <p className="font-medium text-gray-900">99.9%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
