import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from 'lucide-react';

const AdminLoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if admin is already logged in
    const token = localStorage.getItem('adminToken');
    const admin = localStorage.getItem('adminData');
    if (token && admin) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        setError('Please enter both email and password');
        setIsLoading(false);
        return;
      }
      
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }
      
      // Simulate API call with validation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock admin validation
      if (formData.email === 'admin@novasmshubs.com' && formData.password === 'admin123') {
        const mockAdmin = {
          id: '1',
          email: formData.email,
          username: formData.email.split('@')[0],
          role: 'super_admin'
        };
        
        const mockToken = 'mock-admin-token-' + Date.now();
        
        // Store authentication data
        localStorage.setItem('adminToken', mockToken);
        localStorage.setItem('adminData', JSON.stringify(mockAdmin));
        
        // Get return URL from query params
        const returnUrl = searchParams.get('returnUrl');
        
        // Redirect to intended page or dashboard
        if (returnUrl) {
          navigate(decodeURIComponent(returnUrl));
        } else {
          navigate('/admin/dashboard');
        }
      } else {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
        return;
      }
      
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nova-primary/10 to-nova-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Login Form */}
          <main className="p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              {/* Logo */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-nova-primary to-nova-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-nova-primary to-nova-secondary bg-clip-text text-transparent">
                  NovaSMSHub Admin
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Display */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 00016zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">{error}</span>
                    </div>
                  </div>
                )}
                
                {/* Demo Credentials Info */}
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
                  <div className="text-sm">
                    <p className="font-medium mb-2">Admin Login Credentials:</p>
                    <div className="space-y-1 text-xs">
                      <p><strong>Email:</strong> admin@novasmshubs.com</p>
                      <p><strong>Password:</strong> admin123</p>
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="admin@novasmshubs.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent transition-all"
                      required
                      autoComplete="username"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent transition-all"
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="w-4 h-4 text-nova-primary border-gray-300 rounded focus:ring-nova-primary"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-nova-primary text-black font-semibold py-3 rounded-lg hover:bg-nova-secondary transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      <span>Logging you in...</span>
                    </>
                  ) : (
                    <>
                      <span>Login to Admin Dashboard</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </main>

          {/* Info Side */}
          <aside className="hidden md:flex flex-col justify-center items-center p-8 lg:p-12 bg-gradient-to-br from-nova-primary/20 to-nova-secondary/20">
            <div className="text-center space-y-6">
              <div className="w-64 h-64 bg-white/30 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-nova-primary to-nova-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Admin Access</h3>
                  <p className="text-gray-600">Your admin dashboard is protected with enterprise-grade security</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Admin Control Panel
                </h2>
                <p className="text-gray-600 max-w-sm">
                  Manage users, transactions, and system settings with full administrative privileges.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
