import React, { useState, useRef } from 'react';
import {
  User,
  Camera,
  Edit2,
  Save,
  X,
  Mail,
  Phone,
  Calendar,
  Shield,
  Settings,
  Upload,
  Check,
  Bell,
  Lock,
  Globe,
  CreditCard
} from 'lucide-react';
import { useNotify } from './NotificationSystem';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  country: string;
  joinedAt: string;
  lastLogin: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  language: string;
  timezone: string;
  currency: string;
}

interface NotificationPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  orderUpdates: boolean;
  paymentAlerts: boolean;
  promotionalEmails: boolean;
  securityAlerts: boolean;
}

const UserProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    id: 'USR001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+2347012345678',
    avatar: '/default-avatar.png',
    bio: 'Regular user of NovaSMSHub platform.',
    country: 'Nigeria',
    joinedAt: '2024-01-01',
    lastLogin: '2024-01-15T14:30:00Z',
    emailVerified: true,
    phoneVerified: true,
    twoFactorEnabled: false,
    language: 'en',
    timezone: 'UTC',
    currency: 'NGN'
  });

  const [notifications, setNotifications] = useState<NotificationPreferences>({
    emailNotifications: true,
    smsNotifications: true,
    orderUpdates: true,
    paymentAlerts: true,
    promotionalEmails: false,
    securityAlerts: true
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(profile.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const notify = useNotify();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        notify.error('File Too Large', 'Profile picture must be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        notify.error('Invalid File', 'Please upload an image file');
        return;
      }

      setUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setPreviewUrl(url);
        setProfile(prev => ({ ...prev, avatar: url }));
        setUploading(false);
        notify.success('Profile Picture Updated', 'Your profile picture has been updated');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    notify.success('Profile Updated', 'Your profile has been saved successfully');
  };

  const handleNotificationChange = (key: keyof NotificationPreferences, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveNotifications = () => {
    // Simulate API call
    notify.success('Preferences Saved', 'Your notification preferences have been updated');
  };

  const handleChangePassword = () => {
    // Simulate password change
    notify.success('Password Changed', 'Your password has been changed successfully');
  };

  const handleEnable2FA = () => {
    setProfile(prev => ({ ...prev, twoFactorEnabled: true }));
    notify.success('2FA Enabled', 'Two-factor authentication has been enabled');
  };

  const handleDisable2FA = () => {
    setProfile(prev => ({ ...prev, twoFactorEnabled: false }));
    notify.success('2FA Disabled', 'Two-factor authentication has been disabled');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors"
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'profile', label: 'Profile Information', icon: User },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'security', label: 'Security', icon: Lock },
              { id: 'preferences', label: 'Preferences', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-nova-primary text-nova-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Information Tab */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
                  
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-nova-primary"
                      />
                      {isEditing && (
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-0 right-0 w-10 h-10 bg-nova-primary rounded-full flex items-center justify-center text-black hover:bg-nova-secondary transition-colors"
                        >
                          {uploading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></div>
                          ) : (
                            <Camera className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{profile.name}</p>
                      <p className="text-sm text-gray-500">Member since {profile.joinedAt}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent disabled:bg-gray-50"
                        />
                      </div>
                      <div className="flex items-center mt-1">
                        {profile.emailVerified ? (
                          <span className="text-xs text-green-600 flex items-center">
                            <Check className="w-3 h-3 mr-1" />
                            Verified
                          </span>
                        ) : (
                          <span className="text-xs text-red-600">Not Verified</span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent disabled:bg-gray-50"
                        />
                      </div>
                      <div className="flex items-center mt-1">
                        {profile.phoneVerified ? (
                          <span className="text-xs text-green-600 flex items-center">
                            <Check className="w-3 h-3 mr-1" />
                            Verified
                          </span>
                        ) : (
                          <span className="text-xs text-red-600">Not Verified</span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <input
                        type="text"
                        value={profile.country}
                        onChange={(e) => setProfile(prev => ({ ...prev, country: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.emailNotifications}
                      onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nova-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                    <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.smsNotifications}
                      onChange={(e) => handleNotificationChange('smsNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nova-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Order Updates</h4>
                    <p className="text-sm text-gray-600">Get updates about your orders</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.orderUpdates}
                      onChange={(e) => handleNotificationChange('orderUpdates', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nova-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Payment Alerts</h4>
                    <p className="text-sm text-gray-600">Alerts for payments and transactions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.paymentAlerts}
                      onChange={(e) => handleNotificationChange('paymentAlerts', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nova-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Promotional Emails</h4>
                    <p className="text-sm text-gray-600">Receive promotional offers and updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.promotionalEmails}
                      onChange={(e) => handleNotificationChange('promotionalEmails', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nova-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Security Alerts</h4>
                    <p className="text-sm text-gray-600">Important security notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.securityAlerts}
                      onChange={(e) => handleNotificationChange('securityAlerts', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nova-primary"></div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveNotifications}
                  className="px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                  </div>
                  <button
                    onClick={profile.twoFactorEnabled ? handleDisable2FA : handleEnable2FA}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      profile.twoFactorEnabled
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {profile.twoFactorEnabled ? 'Disable' : 'Enable'}
                  </button>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <Lock className="w-5 h-5 text-gray-600" />
                    <h4 className="font-medium text-gray-900">Change Password</h4>
                  </div>
                  <button
                    onClick={handleChangePassword}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Change Password
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <h4 className="font-medium text-gray-900">Email Verification</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {profile.emailVerified ? 'Your email is verified' : 'Your email is not verified'}
                    </p>
                    {!profile.emailVerified && (
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                        Verify Email
                      </button>
                    )}
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <h4 className="font-medium text-gray-900">Phone Verification</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {profile.phoneVerified ? 'Your phone is verified' : 'Your phone is not verified'}
                    </p>
                    {!profile.phoneVerified && (
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                        Verify Phone
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={profile.language}
                    onChange={(e) => setProfile(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={profile.timezone}
                    onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                  >
                    <option value="UTC">UTC</option>
                    <option value="GMT+1">GMT+1 (West Africa)</option>
                    <option value="GMT+2">GMT+2 (Central Africa)</option>
                    <option value="EST">EST (Eastern Time)</option>
                    <option value="PST">PST (Pacific Time)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={profile.currency}
                    onChange={(e) => setProfile(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                  >
                    <option value="NGN">Nigerian Naira (₦)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="GBP">British Pound (£)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Actions */}
      {isEditing && activeTab === 'profile' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Save Changes</h3>
              <p className="text-sm text-gray-600">Review your changes before saving</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
