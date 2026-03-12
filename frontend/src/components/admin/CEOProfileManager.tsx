import React, { useState, useRef } from 'react';
import {
  Upload,
  X,
  Camera,
  CheckCircle,
  AlertCircle,
  Crown,
  Star,
  Shield,
  MessageSquare,
  Phone,
  Mail,
  Globe,
  Edit,
  Save,
  UserPlus,
  Users,
  Bell,
  Settings
} from 'lucide-react';
import { useNotify } from '../NotificationSystem';

interface CEOProfile {
  name: string;
  title: string;
  email: string;
  phone: string;
  bio: string;
  profilePicture: string;
  coverImage: string;
  company: string;
  location: string;
  website: string;
  linkedin: string;
  twitter: string;
  signature: string;
  achievements: string[];
  certifications: string[];
}

interface UserMessage {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  message: string;
  timestamp: string;
  status: 'unread' | 'read' | 'replied';
  reply?: string;
  replyTimestamp?: string;
}

const CEOProfileManager: React.FC = () => {
  const [profile, setProfile] = useState<CEOProfile>({
    name: 'John Doe',
    title: 'Chief Executive Officer',
    email: 'ceo@novasmshub.com',
    phone: '+2348012345678',
    bio: 'Leading NovaSMSHub to revolutionize SMS verification services globally with innovative technology and exceptional customer experience.',
    profilePicture: '/images/ceo-avatar.jpg',
    coverImage: '/images/ceo-cover.jpg',
    company: 'NovaSMSHub Technologies',
    location: 'Lagos, Nigeria',
    website: 'https://novasmshub.com',
    linkedin: 'https://linkedin.com/in/ceo-novasmshub',
    twitter: 'https://twitter.com/ceo_novasmshub',
    signature: 'Best regards,\nJohn Doe\nCEO, NovaSMSHub',
    achievements: [
      'Led company to 1M+ users milestone',
      'Secured $10M+ in Series A funding',
      'Expanded to 15 countries globally',
      'Achieved 99.9% uptime SLA'
    ],
    certifications: [
      'AWS Solutions Architect',
      'Google Cloud Professional',
      'Microsoft Azure Expert',
      'ISO 27001 Security'
    ]
  });

  const [messages, setMessages] = useState<UserMessage[]>([
    {
      id: '1',
      userId: 'user123',
      userName: 'Sarah Johnson',
      userEmail: 'sarah@example.com',
      message: 'Thank you for creating such an amazing platform! The service has been life-changing for my business.',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'unread'
    },
    {
      id: '2',
      userId: 'user456',
      userName: 'Michael Chen',
      userEmail: 'michael@example.com',
      message: 'Could you add more country options? We need services in Asia Pacific region.',
      timestamp: '2024-01-14T15:45:00Z',
      status: 'read',
      reply: 'Thank you for your feedback! We\'re actively expanding to more countries and will prioritize Asia Pacific region in Q2 2024.',
      replyTimestamp: '2024-01-15T09:00:00Z'
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'messages' | 'direct-access'>('profile');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);
  const notify = useNotify();

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        notify.error('File Too Large', 'Profile picture must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile(prev => ({
          ...prev,
          profilePicture: event.target?.result as string
        }));
        notify.success('Profile Picture Updated', 'Your profile picture has been updated successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        notify.error('File Too Large', 'Cover image must be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile(prev => ({
          ...prev,
          coverImage: event.target?.result as string
        }));
        notify.success('Cover Image Updated', 'Your cover image has been updated successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // In production, this would save to backend
    setIsEditing(false);
    notify.success('Profile Updated', 'Your CEO profile has been saved successfully');
  };

  const handleSendMessage = (userId: string, reply: string) => {
    setMessages(prev => prev.map(msg => 
      msg.userId === userId 
        ? { ...msg, status: 'replied', reply, replyTimestamp: new Date().toISOString() }
        : msg
    ));
    setReplyingTo(null);
    setReplyText('');
    notify.success('Message Sent', 'Your reply has been sent to the user');
  };

  const handleDirectAccess = (userId: string) => {
    // In production, this would generate a special access token
    const accessLink = `${window.location.origin}/direct-access?token=ceo-${userId}&expires=24h`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(accessLink).then(() => {
      notify.success('Direct Access Link Generated', 'Access link copied to clipboard');
    }).catch(() => {
      notify.error('Failed to Copy', 'Could not copy access link to clipboard');
    });
  };

  const unreadCount = messages.filter(msg => msg.status === 'unread').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">CEO Control Center</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-nova-primary text-black'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Crown className="w-5 h-5 mr-2" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
                  activeTab === 'messages'
                    ? 'bg-nova-primary text-black'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Messages
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('direct-access')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'direct-access'
                    ? 'bg-nova-primary text-black'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Globe className="w-5 h-5 mr-2" />
                Direct Access
              </button>
            </div>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Executive Profile</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isEditing
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-nova-primary text-black hover:bg-nova-secondary'
                }`}
              >
                {isEditing ? (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="w-5 h-5 mr-2" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            {/* Cover Image */}
            <div className="relative mb-8">
              <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden">
                {profile.coverImage ? (
                  <img
                    src={profile.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <Camera className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-lg font-medium">Add Cover Image</p>
                    </div>
                  </div>
                )}
              </div>
              
              {isEditing && (
                <div className="absolute bottom-4 right-4">
                  <input
                    ref={coverImageRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => coverImageRef.current?.click()}
                    className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-white transition-colors"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Change Cover
                  </button>
                </div>
              )}
              
              {/* Profile Picture */}
              <div className="flex items-end -mt-16 mb-4">
                <div className="relative">
                  <div className="w-32 h-32 bg-white rounded-2xl border-4 border-white shadow-xl overflow-hidden">
                    {profile.profilePicture ? (
                      <img
                        src={profile.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <UserPlus className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  {isEditing && (
                    <div className="absolute bottom-0 right-0">
                      <input
                        ref={profilePictureRef}
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureUpload}
                        className="hidden"
                      />
                      <button
                        onClick={() => profilePictureRef.current?.click()}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-lg text-gray-700 hover:bg-white transition-colors"
                      >
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                      />
                    ) : (
                      <p className="text-lg font-semibold text-gray-900">{profile.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.title}
                        onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                      />
                    ) : (
                      <p className="text-lg text-gray-900">{profile.title}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-700">{profile.bio}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-700 flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {profile.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-700 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {profile.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profile.company}
                          onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-700">{profile.company}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profile.location}
                          onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-700 flex items-center">
                          <Globe className="w-4 h-4 mr-2 text-gray-400" />
                          {profile.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">User Messages</h2>
              <div className="flex items-center space-x-2">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium">
                  {messages.length} Total
                </span>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                  {messages.filter(m => m.status === 'read').length} Read
                </span>
                <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-medium">
                  {unreadCount} Unread
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-6 rounded-xl border ${
                    message.status === 'unread' ? 'bg-yellow-50 border-yellow-200' :
                    message.status === 'replied' ? 'bg-green-50 border-green-200' :
                    'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {message.userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{message.userName}</p>
                        <p className="text-sm text-gray-500">{message.userEmail}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(message.timestamp).toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-900">{message.message}</p>
                  </div>

                  {message.reply && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Crown className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-gray-900">CEO Reply</span>
                      </div>
                      <p className="text-gray-900">{message.reply}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(message.replyTimestamp!).toLocaleString()}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    {message.status === 'unread' && (
                      <button
                        onClick={() => setMessages(prev => prev.map(m =>
                          m.id === message.id ? { ...m, status: 'read' } : m
                        ))}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Mark as Read
                      </button>
                    )}
                    
                    {!message.reply && (
                      <button
                        onClick={() => setReplyingTo(message.id)}
                        className="px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors"
                      >
                        Reply
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDirectAccess(message.userId)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Direct Access
                    </button>
                  </div>

                  {replyingTo === message.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                        rows={3}
                      />
                      <div className="flex items-center space-x-3 mt-3">
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSendMessage(message.userId, replyText)}
                          className="px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors"
                        >
                          Send Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Direct Access Tab */}
        {activeTab === 'direct-access' && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Direct Access Management</h2>
              <p className="text-gray-600">Generate secure access links for users to visit the dashboard directly</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Generate Access Link</h3>
                    <p className="text-sm text-gray-600">Create secure one-time access links</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const userId = prompt('Enter User ID for direct access:');
                    if (userId) {
                      handleDirectAccess(userId);
                    }
                  }}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Generate Link for User
                </button>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Bulk Access</h3>
                    <p className="text-sm text-gray-600">Generate links for multiple users</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const userIds = prompt('Enter User IDs (comma-separated):');
                    if (userIds) {
                      userIds.split(',').forEach(id => handleDirectAccess(id.trim()));
                    }
                  }}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Generate Bulk Links
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Access Link Features</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Secure, one-time use links</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>24-hour expiration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Automatic dashboard redirection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>CEO branding and welcome</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Activity tracking and analytics</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CEOProfileManager;
