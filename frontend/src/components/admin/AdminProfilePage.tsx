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
  Check
} from 'lucide-react';
import { useNotify } from '../NotificationSystem';

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  bio: string;
  department: string;
  joinedAt: string;
  lastLogin: string;
  permissions: string[];
}

const AdminProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfile>({
    id: 'ADMIN001',
    name: 'John Doe',
    email: 'admin@novasmshub.com',
    phone: '+2348012345678',
    role: 'Super Admin',
    avatar: '/default-avatar.png',
    bio: 'Experienced administrator with expertise in system management and user support.',
    department: 'IT Administration',
    joinedAt: '2024-01-01',
    lastLogin: '2024-01-15T14:30:00Z',
    permissions: ['all']
  });
  
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

  const handleCancel = () => {
    setIsEditing(false);
    setPreviewUrl(profile.avatar);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h2>
            
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
                <p className="text-sm text-gray-500">{profile.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
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
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={profile.department}
                    onChange={(e) => setProfile(prev => ({ ...prev, department: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
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
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Joined Date</label>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <input
                        type="text"
                        value={profile.joinedAt}
                        disabled
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Login</label>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-gray-400 mr-2" />
                      <input
                        type="text"
                        value={new Date(profile.lastLogin).toLocaleString()}
                        disabled
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Actions */}
      {isEditing && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Save Changes</h3>
              <p className="text-sm text-gray-600">Review your changes before saving</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCancel}
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

export default AdminProfilePage;
