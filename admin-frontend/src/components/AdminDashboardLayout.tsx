import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  CreditCard, 
  MessageSquare, 
  Bell, 
  Settings, 
  Menu, 
  X, 
  LogOut, 
  PieChart,
  Zap,
  Crown,
  Brain,
  LayoutDashboard,
  Shield
} from 'lucide-react';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    sessionStorage.clear();
    navigate('/admin/login');
  };

  const menuItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      route: '/admin/dashboard',
      badge: null
    },
    {
      name: 'Analytics',
      icon: PieChart,
      route: '/admin/analytics',
      badge: 'New'
    },
    {
      name: 'Power Control',
      icon: Crown,
      route: '/admin/power-control',
      badge: 'Super'
    },
    {
      name: 'AI Validator',
      icon: Brain,
      route: '/admin/ai-validator',
      badge: 'AI'
    },
    {
      name: 'User Management',
      icon: Users,
      route: '/admin/users',
      badge: '25'
    },
    {
      name: 'Transactions',
      icon: CreditCard,
      route: '/admin/transactions',
      badge: '142'
    },
    {
      name: 'Chat',
      icon: MessageSquare,
      route: '/admin/chat',
      badge: '3'
    },
    {
      name: 'Announcements',
      icon: Bell,
      route: '/admin/announcements',
      badge: '3'
    },
    {
      name: 'Settings',
      icon: Settings,
      route: '/admin/settings',
      badge: null
    }
  ];

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-nova-primary to-nova-secondary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Admin</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform bg-white border-r border-gray-200 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`} aria-label="Sidebar">
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-nova-primary to-nova-secondary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Admin Panel</span>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.route);
                
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.route);
                      setIsSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                      ${isActive 
                        ? 'bg-nova-primary text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1 text-left font-medium">{item.name}</span>
                    {item.badge && (
                      <span className={`
                        px-2 py-1 text-xs rounded-full
                        ${isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-200 text-gray-600'
                        }
                      `}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Logout Button */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-lg bg-white shadow-md border border-gray-200"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          {/* Page Content */}
          <main className="min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
