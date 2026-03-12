import React, { useState, useRef } from 'react';
import { User, Camera, Mail, Shield, Settings, Edit2, Save, X, Bell, Moon, Globe, Upload, Smartphone, Lock, Key, Eye, EyeOff, Check, AlertTriangle, UserPlus } from 'lucide-react';

interface AdminProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  profileImage: string;
  createdAt: string;
  phone?: string;
  bio?: string;
  lastLogin?: string;
  loginCount?: number;
  activeSessions?: number;
}

interface ProfileSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  twoFactorAuth: boolean;
  darkMode: boolean;
  language: string;
  sessionTimeout: string;
  loginAlerts: boolean;
  autoSave: boolean;
  publicProfile: boolean;
}

interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  ip: string;
  device: string;
  status: 'success' | 'warning' | 'error';
}

const AdminProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfile>({
    id: '1',
    name: 'Admin User',
    username: 'admin',
    email: 'admin@novasmshubs.com',
    role: 'Super Admin',
    profileImage: '/images/admin-avatar.png',
    createdAt: '2024-01-01',
    phone: '+2345678901',
    bio: 'System administrator managing NovaSMSHubs platform',
    lastLogin: new Date().toISOString(),
    loginCount: 1247,
    activeSessions: 3
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<AdminProfile>(profile);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'security' | 'activity'>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fileInputRef] = useRef<HTMLInputElement>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const [settings, setSettings] = useState<ProfileSettings>({
    emailNotifications: true,
    pushNotifications: true,
    twoFactorAuth: true,
    darkMode: false,
    language: 'en',
    sessionTimeout: '30',
    loginAlerts: true,
    autoSave: true,
    publicProfile: false
  });

  const [activityLogs] = useState<ActivityLog[]>([
    {
      id: '1',
      action: 'Profile Update',
      timestamp: new Date().toISOString(),
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'success'
    },
    {
      id: '2',
      action: 'Password Changed',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'success'
    },
    {
      id: '3',
      action: 'Login Attempt',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      ip: '192.168.1.105',
      device: 'Firefox on Windows',
      status: 'warning'
    }
  ]);

  // Mock data for demonstration
  const recentLogins = [
    { time: '2 hours ago', ip: '192.168.1.100', device: 'Chrome on Windows', location: 'New York, USA' },
    { time: '1 day ago', ip: '192.168.1.105', device: 'Firefox on Windows', location: 'London, UK' },
    { time: '3 days ago', ip: '192.168.1.102', device: 'Safari on iPhone', location: 'Lagos, Nigeria' },
    { time: '1 week ago', ip: '192.168.1.101', device: 'Edge on Windows', location: 'Tokyo, Japan' }
  ];

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
    setSuccess('');
    setError('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
    setSuccess('');
    setError('');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile({
          ...editedProfile,
          profileImage: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');

    // Basic validation
    if (!editedProfile.name.trim()) {
      setError('Name is required');
      return;
    }

    if (!editedProfile.email.trim()) {
      setError('Email is required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedProfile.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setProfile(editedProfile);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof AdminProfile, value: string) => {
    setEditedProfile({
      ...editedProfile,
      [field]: value
    });
  };

  const handleSettingChange = (setting: keyof ProfileSettings, value: boolean | string) => {
    setSettings({
      ...settings,
      [setting]: value
    });
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess('Password changed successfully!');
      setShowPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateApiKey = () => {
    const newKey = 'nova_' + Math.random().toString(36).substr(2, 16) + Date.now();
    setApiKey(newKey);
    setShowApiKey(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSuccess('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Admin Profile</h1>
                <p className="text-gray-600">Manage your administrator account settings and preferences</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <button className="bg-nova-primary text-black px-4 sm:px-6 py-2 rounded-lg hover:bg-nova-secondary transition-colors text-sm sm:text-base">
                  <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                  Buy Number
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-green-700 font-medium">{success}</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
              <span className="text-red-700 font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{profile.loginCount}</p>
                  <p className="text-sm text-gray-500">Total Logins</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{profile.activeSessions}</p>
                  <p className="text-sm text-gray-500">Active Sessions</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">150+</p>
                  <p className="text-sm text-gray-500">Countries</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{settings.twoFactorAuth ? 'ON' : 'OFF'}</p>
                  <p className="text-sm text-gray-500">2FA Status</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-3 px-4 sm:px-6 font-medium text-sm sm:text-base transition-colors ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-nova-primary text-nova-primary'
                    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-3 px-4 sm:px-6 font-medium text-sm sm:text-base transition-colors ${
                  activeTab === 'settings'
                    ? 'border-b-2 border-nova-primary text-nova-primary'
                    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                Settings
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`py-3 px-4 sm:px-6 font-medium text-sm sm:text-base transition-colors ${
                  activeTab === 'security'
                    ? 'border-b-2 border-nova-primary text-nova-primary'
                    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                Security
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`py-3 px-4 sm:px-6 font-medium text-sm sm:text-base transition-colors ${
                  activeTab === 'activity'
                    ? 'border-b-2 border-nova-primary text-nova-primary'
                    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                Activity Log
              </button>
            </nav>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Image Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Profile Picture
                </h3>
                <div className="text-center">
                  <div className="relative inline-block">
                    <img
                      src={isEditing ? editedProfile.profileImage : profile.profileImage}
                      alt="Profile"
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-200"
                    />
                    {isEditing && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 bg-nova-primary text-white p-2 rounded-full hover:bg-nova-secondary transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF (max 5MB)</p>
                </div>
              </div>
            </div>

            {/* Profile Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Edit2 className="w-5 h-5 mr-2" />
                  Profile Information
                </h3>
                
                {isEditing ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={editedProfile.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                      <input
                        type="text"
                        value={editedProfile.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        value={editedProfile.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent sm:text-base"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="px-4 py-2 bg-nova-primary text-white rounded-lg hover:bg-nova-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Full Name</p>
                        <p className="text-gray-900 font-medium">{profile.name}</p>
                      </div>
                      <button
                        onClick={handleEdit}
                        className="text-nova-primary hover:text-nova-secondary font-medium text-sm"
                      >
                        Edit
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Username</p>
                        <p className="text-gray-900 font-medium">{profile.username}</p>
                      </div>
                      <button
                        onClick={handleEdit}
                        className="text-nova-primary hover:text-nova-secondary font-medium text-sm"
                      >
                        Edit
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Email Address</p>
                        <p className="text-gray-900 font-medium">{profile.email}</p>
                      </div>
                      <button
                        onClick={handleEdit}
                        className="text-nova-primary hover:text-nova-secondary font-medium text-sm"
                      >
                        Edit
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Phone Number</p>
                        <p className="text-gray-900 font-medium">{profile.phone}</p>
                      </div>
                      <button
                        onClick={handleEdit}
                        className="text-nova-primary hover:text-nova-secondary font-medium text-sm"
                      >
                        Edit
                      </button>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Bio</p>
                      <p className="text-gray-900">{profile.bio}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Settings
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive email updates</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.emailNotifications ? 'bg-nova-primary' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Push Notifications</p>
                    <p className="text-sm text-gray-500">Browser notifications</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.pushNotifications ? 'bg-nova-primary' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Auto-save</p>
                    <p className="text-sm text-gray-500">Automatically save changes</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.autoSave ? 'bg-nova-primary' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => {/* Simulate API call */}}
                  className="px-4 py-2 bg-nova-primary text-white rounded-lg hover:bg-nova-secondary transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Moon className="w-5 h-5 mr-2" />
                Preferences
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Dark Mode</p>
                    <p className="text-sm text-gray-500">Use dark theme</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('darkMode', !settings.darkMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.darkMode ? 'bg-nova-primary' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Language</p>
                    <p className="text-sm text-gray-500">Interface language</p>
                  </div>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                    <option value="hi">Hindi</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Session Timeout</p>
                    <p className="text-sm text-gray-500">Auto logout time</p>
                  </div>
                  <select
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="240">4 hours</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Password Change */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Key className="w-5 h-5 mr-2" />
                Change Password
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent pr-10"
                      placeholder="Enter current password"
                    />
                    <button
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                    placeholder="Enter new password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setShowPassword(false);
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePasswordChange}
                    disabled={isLoading}
                    className="px-4 py-2 bg-nova-primary text-white rounded-lg hover:bg-nova-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              </div>
            </div>

            {/* API Key */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Key className="w-5 h-5 mr-2" />
                API Key Management
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current API Key</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type={showApiKey ? "text" : "password"}
                      value={apiKey}
                      readOnly
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                    />
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={generateApiKey}
                      className="text-nova-primary hover:text-nova-secondary font-medium text-sm ml-2"
                    >
                      Generate New
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <p>• API keys provide full access to all NovaSMSHubs services</p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <p>• Keep your API keys secure and never share them</p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <p>• Regenerate keys if you suspect unauthorized access</p>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => copyToClipboard(apiKey)}
                    className="px-4 py-2 bg-nova-primary text-white rounded-lg hover:bg-nova-secondary transition-colors"
                  >
                    Copy Key
                  </button>
                  <button
                    onClick={() => {/* Simulate API call */}}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Recent Activity
            </h3>
            
            <div className="space-y-4">
              {/* Recent Logins */}
              <div className="mb-8">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Recent Login Activity</h4>
                <div className="space-y-3">
                  {recentLogins.map((login, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Login from {login.location}</p>
                            <p className="text-xs text-gray-500">{login.ip} • {login.device}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{login.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Activity Logs */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-4">System Activity Logs</h4>
                <div className="space-y-3">
                  {activityLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          log.status === 'success' ? 'bg-green-100' :
                          log.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                        }`}>
                          {log.status === 'success' && <Check className="w-4 h-4 text-green-600" />}
                          {log.status === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                          {log.status === 'error' && <X className="w-4 h-4 text-red-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{log.action}</p>
                          <p className="text-xs text-gray-500">{log.timestamp}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{log.ip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfilePage;
