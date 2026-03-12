import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Shield,
  Database,
  Mail,
  Globe,
  Smartphone,
  CreditCard,
  Users,
  BarChart3,
  Save,
  RefreshCw,
  Check,
  X
} from 'lucide-react';
import { useNotify } from '../NotificationSystem';

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  settings: {
    id: string;
    label: string;
    type: 'toggle' | 'text' | 'number' | 'select' | 'textarea';
    value: any;
    options?: string[];
    description: string;
  }[];
}

const AdminSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const notify = useNotify();

  const [settings, setSettings] = useState({
    general: {
      siteName: 'NovaSMSHub',
      siteDescription: 'Professional SMS Virtual Number Platform',
      adminEmail: 'admin@novasmshub.com',
      timezone: 'UTC',
      language: 'en',
      maintenanceMode: false,
      debugMode: false
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      newUserAlert: true,
      paymentAlert: true,
      systemAlert: true,
      weeklyReports: true
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordMinLength: 8,
      requireStrongPassword: true,
      maxLoginAttempts: 5,
      ipWhitelist: false,
      apiRateLimit: 100
    },
    payment: {
      defaultCurrency: 'NGN',
      maxWalletBalance: 100000,
      autoApproveBelow: 1000,
      requireProofAbove: 5000,
      paymentGateways: ['paystack', 'flutterwave', 'bank'],
      refundPolicy: '7_days'
    },
    sms: {
      defaultProvider: '5sim',
      backupProvider: 'sms-activate',
      autoRetry: true,
      maxRetryAttempts: 3,
      pricingMarkup: 10,
      numberValidity: '30_days'
    }
  });

  const settingsSections: SettingsSection[] = [
    {
      id: 'general',
      title: 'General Settings',
      icon: <Settings className="w-5 h-5" />,
      settings: [
        {
          id: 'siteName',
          label: 'Site Name',
          type: 'text',
          value: settings.general.siteName,
          description: 'The name of your platform'
        },
        {
          id: 'siteDescription',
          label: 'Site Description',
          type: 'textarea',
          value: settings.general.siteDescription,
          description: 'Brief description of your platform'
        },
        {
          id: 'adminEmail',
          label: 'Admin Email',
          type: 'text',
          value: settings.general.adminEmail,
          description: 'Primary administrator email address'
        },
        {
          id: 'timezone',
          label: 'Timezone',
          type: 'select',
          value: settings.general.timezone,
          options: ['UTC', 'GMT+1', 'GMT+2', 'EST', 'PST', 'CST'],
          description: 'Default timezone for the platform'
        },
        {
          id: 'language',
          label: 'Default Language',
          type: 'select',
          value: settings.general.language,
          options: ['en', 'es', 'fr', 'de', 'zh'],
          description: 'Default language for new users'
        },
        {
          id: 'maintenanceMode',
          label: 'Maintenance Mode',
          type: 'toggle',
          value: settings.general.maintenanceMode,
          description: 'Put site in maintenance mode'
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      settings: [
        {
          id: 'emailNotifications',
          label: 'Email Notifications',
          type: 'toggle',
          value: settings.notifications.emailNotifications,
          description: 'Enable email notifications'
        },
        {
          id: 'smsNotifications',
          label: 'SMS Notifications',
          type: 'toggle',
          value: settings.notifications.smsNotifications,
          description: 'Enable SMS notifications'
        },
        {
          id: 'newUserAlert',
          label: 'New User Alerts',
          type: 'toggle',
          value: settings.notifications.newUserAlert,
          description: 'Alert when new users register'
        },
        {
          id: 'paymentAlert',
          label: 'Payment Alerts',
          type: 'toggle',
          value: settings.notifications.paymentAlert,
          description: 'Alert on new payments'
        },
        {
          id: 'weeklyReports',
          label: 'Weekly Reports',
          type: 'toggle',
          value: settings.notifications.weeklyReports,
          description: 'Send weekly summary reports'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield className="w-5 h-5" />,
      settings: [
        {
          id: 'twoFactorAuth',
          label: 'Two-Factor Authentication',
          type: 'toggle',
          value: settings.security.twoFactorAuth,
          description: 'Require 2FA for admin login'
        },
        {
          id: 'sessionTimeout',
          label: 'Session Timeout (minutes)',
          type: 'number',
          value: settings.security.sessionTimeout,
          description: 'Auto-logout after inactivity'
        },
        {
          id: 'passwordMinLength',
          label: 'Minimum Password Length',
          type: 'number',
          value: settings.security.passwordMinLength,
          description: 'Minimum characters for passwords'
        },
        {
          id: 'maxLoginAttempts',
          label: 'Max Login Attempts',
          type: 'number',
          value: settings.security.maxLoginAttempts,
          description: 'Maximum failed login attempts'
        },
        {
          id: 'apiRateLimit',
          label: 'API Rate Limit (per minute)',
          type: 'number',
          value: settings.security.apiRateLimit,
          description: 'API requests per minute'
        }
      ]
    },
    {
      id: 'payment',
      title: 'Payment Settings',
      icon: <CreditCard className="w-5 h-5" />,
      settings: [
        {
          id: 'maxWalletBalance',
          label: 'Maximum Wallet Balance (₦)',
          type: 'number',
          value: settings.payment.maxWalletBalance,
          description: 'Maximum user wallet balance'
        },
        {
          id: 'autoApproveBelow',
          label: 'Auto-Approve Below (₦)',
          type: 'number',
          value: settings.payment.autoApproveBelow,
          description: 'Auto-approve payments below this amount'
        },
        {
          id: 'requireProofAbove',
          label: 'Require Proof Above (₦)',
          type: 'number',
          value: settings.payment.requireProofAbove,
          description: 'Require proof for payments above this amount'
        }
      ]
    },
    {
      id: 'sms',
      title: 'SMS Settings',
      icon: <Smartphone className="w-5 h-5" />,
      settings: [
        {
          id: 'defaultProvider',
          label: 'Default Provider',
          type: 'select',
          value: settings.sms.defaultProvider,
          options: ['5sim', 'sms-activate', 'twilio', 'nexmo'],
          description: 'Primary SMS service provider'
        },
        {
          id: 'backupProvider',
          label: 'Backup Provider',
          type: 'select',
          value: settings.sms.backupProvider,
          options: ['5sim', 'sms-activate', 'twilio', 'nexmo'],
          description: 'Backup SMS service provider'
        },
        {
          id: 'autoRetry',
          label: 'Auto Retry Failed SMS',
          type: 'toggle',
          value: settings.sms.autoRetry,
          description: 'Automatically retry failed SMS'
        },
        {
          id: 'maxRetryAttempts',
          label: 'Max Retry Attempts',
          type: 'number',
          value: settings.sms.maxRetryAttempts,
          description: 'Maximum retry attempts for failed SMS'
        },
        {
          id: 'pricingMarkup',
          label: 'Pricing Markup (%)',
          type: 'number',
          value: settings.sms.pricingMarkup,
          description: 'Markup percentage on SMS pricing'
        }
      ]
    }
  ]);

  const handleSettingChange = (section: string, settingId: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [settingId]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setHasChanges(false);
      notify.success('Settings Saved', 'All settings have been saved successfully');
    } catch (error) {
      notify.error('Save Failed', 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults?')) {
      // Reset to default values
      setHasChanges(false);
      notify.success('Settings Reset', 'All settings have been reset to defaults');
    }
  };

  const renderSettingInput = (setting: any) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={setting.value}
              onChange={(e) => handleSettingChange(activeTab, setting.id, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nova-primary"></div>
          </label>
        );
      case 'text':
        return (
          <input
            type="text"
            value={setting.value}
            onChange={(e) => handleSettingChange(activeTab, setting.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={setting.value}
            onChange={(e) => handleSettingChange(activeTab, setting.id, parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
          />
        );
      case 'select':
        return (
          <select
            value={setting.value}
            onChange={(e) => handleSettingChange(activeTab, setting.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
          >
            {setting.options?.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            value={setting.value}
            onChange={(e) => handleSettingChange(activeTab, setting.id, e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleReset}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges || saving}
              className="flex items-center px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2"></div>
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === section.id
                    ? 'border-nova-primary text-nova-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {section.icon}
                  <span>{section.title}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="p-6">
          {settingsSections
            .filter(section => section.id === activeTab)
            .map((section) => (
              <div key={section.id} className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{section.title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.settings.map((setting) => (
                    <div key={setting.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                          {setting.label}
                        </label>
                        {setting.type === 'toggle' && (
                          <div className="text-xs text-gray-500">
                            {setting.value ? 'Enabled' : 'Disabled'}
                          </div>
                        )}
                      </div>
                      {renderSettingInput(setting)}
                      {setting.description && (
                        <p className="text-xs text-gray-500">{setting.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
