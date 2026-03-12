import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Crown,
  Shield,
  Star,
  Award,
  CheckCircle,
  AlertTriangle,
  Clock,
  Globe,
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Zap,
  ArrowRight,
  X,
  Lock,
  Unlock
} from 'lucide-react';
import { useNotify } from './NotificationSystem';

interface CEOProfile {
  name: string;
  title: string;
  profilePicture: string;
  company: string;
  bio: string;
  achievements: string[];
}

const DirectAccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [accessGranted, setAccessGranted] = useState(false);
  const [ceoProfile, setCeoProfile] = useState<CEOProfile | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const notify = useNotify();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    // Validate token and fetch CEO profile
    const validateAccess = async () => {
      try {
        // In production, this would validate the token with the backend
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
        
        // Mock CEO profile data
        setCeoProfile({
          name: 'John Doe',
          title: 'Chief Executive Officer',
          profilePicture: '/images/ceo-avatar.jpg',
          company: 'NovaSMSHub Technologies',
          bio: 'Leading NovaSMSHub to revolutionize SMS verification services globally with innovative technology and exceptional customer experience.',
          achievements: [
            'Led company to 1M+ users milestone',
            'Secured $10M+ in Series A funding',
            'Expanded to 15 countries globally',
            'Achieved 99.9% uptime SLA',
            'Named Tech CEO of the Year 2023'
          ]
        });
        
        setAccessGranted(true);
        notify.success('Welcome!', 'You have been granted special CEO access');
      } catch (error) {
        notify.error('Access Denied', 'Invalid or expired access token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    validateAccess();
  }, [searchParams, navigate, notify]);

  useEffect(() => {
    if (!accessGranted) return;

    const updateTimer = () => {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours from now
      
      const now = new Date();
      const diff = expiresAt.getTime() - now.getTime();
      
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeRemaining(`${hours}h ${minutes}m`);
      } else {
        setTimeRemaining('Expired');
        setAccessGranted(false);
        notify.error('Access Expired', 'Your CEO access has expired');
        navigate('/login');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [accessGranted, navigate, notify]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-nova-primary border-t-transparent"></div>
            <div>
              <p className="text-lg font-semibold text-gray-900">NovaSMSHub</p>
              <p className="text-sm text-gray-600">Validating CEO Access...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!accessGranted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">Invalid or expired CEO access token</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors font-medium"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-nova-primary to-nova-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-nova-primary to-nova-secondary bg-clip-text text-transparent">
                    NovaSMSHub
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">CEO ACCESS</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-lg">
                <Clock className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Expires in {timeRemaining}</span>
              </div>
              
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors font-medium"
              >
                <Unlock className="w-4 h-4 mr-2" />
                Enter Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* CEO Welcome Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                {ceoProfile?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome from {ceoProfile?.name}
              </h2>
              <p className="text-lg text-gray-600 mb-2">{ceoProfile?.title}</p>
              <p className="text-gray-700">{ceoProfile?.bio}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">1M+ Users</h3>
                  <p className="text-sm text-gray-600">Global Community</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">15 Countries</h3>
                  <p className="text-sm text-gray-600">Global Presence</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">99.9% Uptime</h3>
                  <p className="text-sm text-gray-600">Reliability</p>
                </div>
              </div>
            </div>
          </div>

          {/* CEO Achievements */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Award className="w-6 h-6 mr-2 text-yellow-600" />
              CEO Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ceoProfile?.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Special Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">CEO Special Features</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Zap className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Priority Support</h4>
                  <p className="text-sm text-gray-600">Direct access to CEO for critical issues</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Exclusive Features</h4>
                  <p className="text-sm text-gray-600">Access to premium dashboard features</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Real-time Analytics</h4>
                  <p className="text-sm text-gray-600">Live business intelligence and insights</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Access</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">What You Can Access:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Complete user management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Financial analytics and reports</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Order tracking and management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Service configuration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>System monitoring and health</span>
                  </li>
                </ul>
              </div>
              
              <button
                onClick={() => navigate('/admin')}
                className="w-full px-6 py-4 bg-gradient-to-r from-nova-primary to-nova-secondary text-black rounded-lg hover:opacity-90 transition-all font-medium flex items-center justify-center space-x-2"
              >
                <Unlock className="w-5 h-5" />
                <span>Enter Executive Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* CEO Message */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-xl p-8 text-center">
          <Crown className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
          <h3 className="text-2xl font-bold mb-4">A Message from the CEO</h3>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Thank you for being part of NovaSMSHub's journey. Your trust and support have helped us build a platform that serves millions of users globally. 
            This special access gives you a behind-the-scenes look at how we operate and grow. Feel free to explore the dashboard and see the magic that powers our service.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>Innovation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>Excellence</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>Trust</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DirectAccessPage;
