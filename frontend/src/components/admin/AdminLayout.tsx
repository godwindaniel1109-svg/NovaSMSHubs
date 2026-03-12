import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  CreditCard,
  FileText,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  Shield,
  Activity,
  DollarSign,
  AlertTriangle
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/admin',
      badge: null
    },
    {
      title: 'Users',
      icon: <Users className="w-5 h-5" />,
      path: '/admin/users',
      badge: '45'
    },
    {
      title: 'Orders',
      icon: <ShoppingCart className="w-5 h-5" />,
      path: '/admin/orders',
      badge: '23'
    },
    {
      title: 'Payment Proofs',
      icon: <CreditCard className="w-5 h-5" />,
      path: '/admin/payment-proofs',
      badge: '12'
    },
    {
      title: 'Transactions',
      icon: <FileText className="w-5 h-5" />,
      path: '/admin/transactions',
      badge: null
    },
    {
      title: 'Services',
      icon: <Package className="w-5 h-5" />,
      path: '/admin/services',
      badge: null
    },
    {
      title: 'Reports',
      icon: <TrendingUp className="w-5 h-5" />,
      path: '/admin/reports',
      badge: null
    },
    {
      title: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/admin/settings',
      badge: null
    }
  ];

  const handleLogout = () => {
    // Clear admin session
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0 ${!sidebarOpen ? '-translate-x-full' : ''}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className={`flex items-center ${sidebarOpen ? '' : 'justify-center'}`}>
              <Shield className="w-8 h-8 text-nova-primary" />
              {sidebarOpen && (
                <span className="ml-3 text-xl font-bold">NovaSMSHub</span>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1 rounded hover:bg-gray-800"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors group ${
                  isActive(item.path)
                    ? 'bg-nova-primary text-black'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                <div className="flex items-center">
                  {item.icon}
                  {sidebarOpen && (
                    <span className="ml-3 font-medium">{item.title}</span>
                  )}
                </div>
                {sidebarOpen && item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-nova-primary rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">A</span>
              </div>
              {sidebarOpen && (
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-400">admin@novasmshub.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} transition-all duration-300 ease-in-out`}>
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users, orders, transactions..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent w-64"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-nova-primary rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">A</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Admin</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <Link
                      to="/admin/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
